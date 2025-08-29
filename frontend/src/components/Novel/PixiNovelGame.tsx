'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as PIXI from 'pixi.js';

interface ScenarioStep {
  id: number;
  type: 'narration' | 'choice';
  character?: string;
  text: string;
  background?: string;
  character_image?: {
    name: string;
    expression: string;
    position: string;
  };
  choices?: {
    text: string;
    next: number;
  }[];
  next?: number;
}

interface GameState {
  currentStep: number;
  bgmEnabled: boolean;
  scenario: ScenarioStep[];
}

export default function PixiNovelGame() {
  console.log('🎨 PixiNovelGame 開始');
  
  const pixiAppRef = useRef<PIXI.Application | null>(null);
  const bgmRef = useRef<HTMLAudioElement | null>(null);
  const initDoneRef = useRef<boolean>(false);
  const nextButtonRef = useRef<PIXI.Graphics | null>(null);
  const bgmLoadedRef = useRef<boolean>(false); // BGM読み込み状態追加
  
  // PixiJS表示オブジェクトの参照
  const backgroundSpriteRef = useRef<PIXI.Sprite | null>(null);
  const characterSpriteRef = useRef<PIXI.Sprite | null>(null);
  const textContainerRef = useRef<PIXI.Container | null>(null);
  const choiceContainerRef = useRef<PIXI.Container | null>(null);
  
  const [gameState, setGameState] = useState<GameState>({
    currentStep: 1,
    bgmEnabled: true,
    scenario: []
  });
  
  const [debugInfo, setDebugInfo] = useState<string[]>([]);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pixiContainer, setPixiContainer] = useState<HTMLDivElement | null>(null);

  // デバッグログ
  const addLog = (message: string) => {
    const log = `${new Date().toLocaleTimeString()}: ${message}`;
    console.log(log);
    setDebugInfo(prev => [...prev.slice(-8), log]);
  };

  // BGM制御関数を追加
  const initializeBGM = async () => {
    try {
      addLog('🎵 BGM初期化開始');
      
      // 複数のBGMファイルパスを試す
      const bgmPaths = [
        '/sounds/bgm/game/summer_memories.mp3',
        '/music/novel/summer_memories.mp3',
        '/sounds/bgm/title/main_theme.mp3',
        '/audio/bgm/game_main.mp3'
      ];
      
      let bgmLoaded = false;
      
      for (const path of bgmPaths) {
        try {
          const audio = new Audio(path);
          
          // オーディオの読み込み完了を待つ
          await new Promise((resolve, reject) => {
            audio.addEventListener('canplaythrough', resolve, { once: true });
            audio.addEventListener('error', reject, { once: true });
            audio.load();
          });
          
          // BGM設定
          audio.loop = true;
          audio.volume = 0.4;
          audio.preload = 'auto';
          
          bgmRef.current = audio;
          bgmLoadedRef.current = true;
          bgmLoaded = true;
          
          addLog(`✅ BGM読み込み成功: ${path.split('/').pop()}`);
          break;
          
        } catch (pathError) {
          addLog(`⚠️ BGMパス失敗: ${path.split('/').pop()}`);
          continue;
        }
      }
      
      if (!bgmLoaded) {
        addLog('⚠️ すべてのBGMパスで読み込み失敗 - BGMなしで続行');
        // BGMなしでも続行
      }
      
    } catch (error) {
      addLog(`❌ BGM初期化エラー: ${error}`);
    }
  };

  const playBGM = async () => {
    if (!bgmRef.current || !bgmLoadedRef.current) {
      addLog('⚠️ BGM未準備 - 再初期化試行');
      await initializeBGM();
    }
    
    if (bgmRef.current && gameState.bgmEnabled) {
      try {
        // ユーザーインタラクション後の再生
        const playPromise = bgmRef.current.play();
        
        if (playPromise !== undefined) {
          await playPromise;
          addLog('🎵 BGM再生開始');
        }
      } catch (playError) {
        addLog(`❌ BGM再生エラー: ${playError}`);
        
        // ユーザーインタラクション待ちの場合
        if (
          typeof playError === 'object' &&
          playError !== null &&
          'name' in playError &&
          (playError as { name: string }).name === 'NotAllowedError'
        ) {
          addLog('🎵 ユーザーインタラクション待ち - クリック後に再生');
          
          // 次回のクリックで再生を試す
          const handleUserClick = async () => {
            try {
              if (bgmRef.current && gameState.bgmEnabled) {
                await bgmRef.current.play();
                addLog('🎵 ユーザーインタラクション後BGM再生成功');
                document.removeEventListener('click', handleUserClick);
              }
            } catch (retryError) {
              addLog(`❌ リトライ後もBGM再生失敗: ${retryError}`);
            }
          };
          
          document.addEventListener('click', handleUserClick, { once: true });
        }
      }
    }
  };

  const stopBGM = () => {
    if (bgmRef.current) {
      bgmRef.current.pause();
      bgmRef.current.currentTime = 0;
      addLog('🔇 BGM停止');
    }
  };

  const toggleBGM = async () => {
    const newBgmEnabled = !gameState.bgmEnabled;
    setGameState(prev => ({ ...prev, bgmEnabled: newBgmEnabled }));
    
    if (newBgmEnabled) {
      await playBGM();
    } else {
      stopBGM();
    }
  };

  // 背景表示更新
  const updateBackground = (backgroundName?: string) => {
    if (!pixiAppRef.current || !backgroundName) return;
    
    try {
      addLog(`🖼️ 背景切り替え: ${backgroundName}`);
      
      // 既存背景を削除
      if (backgroundSpriteRef.current) {
        pixiAppRef.current.stage.removeChild(backgroundSpriteRef.current);
        backgroundSpriteRef.current.destroy();
        backgroundSpriteRef.current = null;
      }
      
      // 新しい背景を作成
      const backgroundPath = `/images/novel/backgrounds/${backgroundName}.jpg`;
      const texture = PIXI.Texture.from(backgroundPath);
      const backgroundSprite = new PIXI.Sprite(texture);
      
      // サイズ調整
      const app = pixiAppRef.current;
      backgroundSprite.width = app.screen.width;
      backgroundSprite.height = app.screen.height;
      
      // 最背面に追加
      app.stage.addChildAt(backgroundSprite, 0);
      backgroundSpriteRef.current = backgroundSprite;
      
      addLog(`✅ 背景表示完了: ${backgroundName}`);
    } catch (error) {
      addLog(`❌ 背景表示エラー: ${error}`);
    }
  };

  // キャラクター表示更新
  const updateCharacter = (characterData?: ScenarioStep['character_image']) => {
    if (!pixiAppRef.current) return;
    
    try {
      // 既存キャラクターを削除
      if (characterSpriteRef.current) {
        pixiAppRef.current.stage.removeChild(characterSpriteRef.current);
        characterSpriteRef.current.destroy();
        characterSpriteRef.current = null;
      }
      
      if (!characterData) return;
      
      addLog(`👤 キャラクター表示: ${characterData.name}_${characterData.expression}`);
      
      // 新しいキャラクターを作成
      const characterPath = `/images/novel/characters/${characterData.name}/${characterData.expression}.png`;
      const texture = PIXI.Texture.from(characterPath);
      const characterSprite = new PIXI.Sprite(texture);
      
      // サイズ調整（立ち絵として適切なサイズに）
      const maxHeight = pixiAppRef.current.screen.height * 0.8;
      if (characterSprite.height > maxHeight) {
        const scale = maxHeight / characterSprite.height;
        characterSprite.scale.set(scale);
      }
      
      // 配置設定
      const app = pixiAppRef.current;
      characterSprite.anchor.set(0.5, 1); // 底辺中央を基準点に
      characterSprite.y = app.screen.height - 50; // 底辺から少し上
      
      switch (characterData.position) {
        case 'left':
          characterSprite.x = app.screen.width * 0.25;
          break;
        case 'right':
          characterSprite.x = app.screen.width * 0.75;
          break;
        case 'center':
        default:
          characterSprite.x = app.screen.width * 0.5;
          break;
      }
      
      app.stage.addChild(characterSprite);
      characterSpriteRef.current = characterSprite;
      
      addLog(`✅ キャラクター配置完了: ${characterData.position}`);
    } catch (error) {
      addLog(`❌ キャラクター表示エラー: ${error}`);
    }
  };

  // テキスト表示更新
  const updateText = (scenario: ScenarioStep) => {
    if (!pixiAppRef.current) return;
    
    try {
      // 既存テキストを削除
      if (textContainerRef.current) {
        pixiAppRef.current.stage.removeChild(textContainerRef.current);
        textContainerRef.current.destroy();
        textContainerRef.current = null;
      }
      
      const app = pixiAppRef.current;
      const textContainer = new PIXI.Container();
      
      // テキストボックス背景
      const textBg = new PIXI.Graphics();
      textBg.beginFill(0x000000, 0.8);
      textBg.drawRoundedRect(20, app.screen.height - 180, app.screen.width - 40, 160, 15);
      textBg.endFill();
      textContainer.addChild(textBg);
      
      // キャラクター名（背景付き）
      if (scenario.character) {
        // 名前用背景
        const nameBg = new PIXI.Graphics();
        nameBg.beginFill(0x3498db, 1.0);
        nameBg.drawRoundedRect(0, 0, 120, 30, 15);
        nameBg.endFill();
        nameBg.x = 40;
        nameBg.y = app.screen.height - 200;
        textContainer.addChild(nameBg);
        
        // 名前テキスト
        const nameStyle = new PIXI.TextStyle({
          fontFamily: 'Arial, sans-serif',
          fontSize: 18,
          fontWeight: 'bold',
          fill: '#ffffff'
        });
        
        const nameText = new PIXI.Text(scenario.character, nameStyle);
        nameText.anchor.set(0.5);
        nameText.x = 100; // 背景の中央
        nameText.y = app.screen.height - 185;
        textContainer.addChild(nameText);
      }
      
      // メインテキスト
      const textStyle = new PIXI.TextStyle({
        fontFamily: 'Arial, sans-serif',
        fontSize: 16,
        fill: '#ffffff',
        wordWrap: true,
        wordWrapWidth: app.screen.width - 80,
        lineHeight: 24
      });
      
      const mainText = new PIXI.Text(scenario.text, textStyle);
      mainText.x = 40;
      mainText.y = app.screen.height - 150;
      textContainer.addChild(mainText);
      
      app.stage.addChild(textContainer);
      textContainerRef.current = textContainer;
      
      addLog('💬 テキスト表示更新完了');
    } catch (error) {
      addLog(`❌ テキスト表示エラー: ${error}`);
    }
  };

  // 選択肢表示更新
  const updateChoices = (scenario: ScenarioStep) => {
    if (!pixiAppRef.current) return;
    
    try {
      // 既存選択肢を削除
      if (choiceContainerRef.current) {
        pixiAppRef.current.stage.removeChild(choiceContainerRef.current);
        choiceContainerRef.current.destroy();
        choiceContainerRef.current = null;
      }
      
      if (scenario.type !== 'choice' || !scenario.choices) return;
      
      const app = pixiAppRef.current;
      const choiceContainer = new PIXI.Container();
      
      scenario.choices.forEach((choice, index) => {
        // 選択肢ボタン背景
        const buttonBg = new PIXI.Graphics();
        buttonBg.beginFill(0x3498db, 0.9);
        buttonBg.drawRoundedRect(0, 0, app.screen.width - 100, 50, 10);
        buttonBg.endFill();
        
        // ホバー効果用の境界線
        buttonBg.lineStyle(2, 0x2980b9);
        buttonBg.drawRoundedRect(0, 0, app.screen.width - 100, 50, 10);
        
        buttonBg.x = 50;
        buttonBg.y = app.screen.height - 300 + (index * 60);
        buttonBg.eventMode = 'static';
        buttonBg.cursor = 'pointer';
        
        // 選択肢テキスト
        const choiceStyle = new PIXI.TextStyle({
          fontFamily: 'Arial, sans-serif',
          fontSize: 16,
          fill: '#ffffff',
          fontWeight: 'bold'
        });
        
        const choiceText = new PIXI.Text(choice.text, choiceStyle);
        choiceText.anchor.set(0.5);
        choiceText.x = (app.screen.width - 100) / 2;
        choiceText.y = 25;
        
        buttonBg.addChild(choiceText);
        
        // クリックイベント
        buttonBg.on('pointerdown', () => {
          addLog(`🎯 選択: ${choice.text}`);
          setGameState(prev => ({ ...prev, currentStep: choice.next }));
        });
        
        // ホバー効果
        buttonBg.on('pointerover', () => {
          buttonBg.tint = 0xdddddd;
        });
        
        buttonBg.on('pointerout', () => {
          buttonBg.tint = 0xffffff;
        });
        
        choiceContainer.addChild(buttonBg);
      });
      
      app.stage.addChild(choiceContainer);
      choiceContainerRef.current = choiceContainer;
      
      addLog(`🎯 選択肢表示: ${scenario.choices.length}個`);
    } catch (error) {
      addLog(`❌ 選択肢表示エラー: ${error}`);
    }
  };

  // Nextボタン表示/非表示更新
  const updateNextButton = (scenario: ScenarioStep) => {
    if (!pixiAppRef.current) return;
    
    try {
      // 既存Nextボタンを削除
      if (nextButtonRef.current) {
        pixiAppRef.current.stage.removeChild(nextButtonRef.current);
        nextButtonRef.current.destroy();
        nextButtonRef.current = null;
      }
      
      // narrationタイプでnextがある場合のみNextボタンを表示
      if (scenario.type === 'narration' && scenario.next) {
        const app = pixiAppRef.current;
        
        // Next ボタン（画面下部）
        const nextButton = new PIXI.Graphics();
        nextButton.beginFill(0x27ae60, 0.9);
        nextButton.drawRoundedRect(app.screen.width - 120, app.screen.height - 60, 100, 40, 8);
        nextButton.endFill();
        
        // ボタン境界線
        nextButton.lineStyle(2, 0x229954);
        nextButton.drawRoundedRect(app.screen.width - 120, app.screen.height - 60, 100, 40, 8);
        
        const nextText = new PIXI.Text('▶ Next', {
          fontFamily: 'Arial',
          fontSize: 16,
          fill: '#ffffff',
          fontWeight: 'bold'
        });
        nextText.anchor.set(0.5);
        nextText.x = app.screen.width - 70; // ボタンの中央
        nextText.y = app.screen.height - 40; // ボタンの中央
        
        nextButton.addChild(nextText);
        
        nextButton.eventMode = 'static';
        nextButton.cursor = 'pointer';
        
        // クリックイベント
        nextButton.on('pointerdown', () => {
          addLog(`🔄 Nextボタンクリック: ステップ${scenario.next}へ`);
          setGameState(prev => ({ ...prev, currentStep: scenario.next! }));
        });
        
        // ホバー効果
        nextButton.on('pointerover', () => {
          nextButton.tint = 0xdddddd;
        });
        
        nextButton.on('pointerout', () => {
          nextButton.tint = 0xffffff;
        });
        
        app.stage.addChild(nextButton);
        nextButtonRef.current = nextButton;
        
        addLog('✅ Nextボタン表示完了');
      }
    } catch (error) {
      addLog(`❌ Nextボタン更新エラー: ${error}`);
    }
  };

  // シナリオ表示更新
  const updateScenario = (stepId: number) => {
    const scenario = gameState.scenario.find(s => s.id === stepId);
    if (!scenario) {
      addLog(`⚠️ ステップ${stepId}が見つかりません`);
      return;
    }
    
    addLog(`📖 シナリオ更新: ステップ${stepId} (${scenario.type})`);
    
    // 背景更新
    updateBackground(scenario.background);
    
    // キャラクター更新
    updateCharacter(scenario.character_image);
    
    // テキスト更新
    updateText(scenario);
    
    // 選択肢更新
    updateChoices(scenario);
    
    // Nextボタン更新
    updateNextButton(scenario);
    
    addLog(`✅ シナリオ表示完了: ステップ${stepId}`);
  };

  // シナリオ更新時の処理
  useEffect(() => {
    if (isReady && gameState.scenario.length > 0) {
      updateScenario(gameState.currentStep);
    }
  }, [gameState.currentStep, gameState.scenario, isReady]);

  // BGM状態変更時の処理を追加
  useEffect(() => {
    if (isReady) {
      if (gameState.bgmEnabled) {
        playBGM();
      } else {
        stopBGM();
      }
    }
  }, [gameState.bgmEnabled, isReady]);

  // PixiJSコンテナ要素が設定されたときの処理
  useEffect(() => {
    if (!pixiContainer || initDoneRef.current) {
      return;
    }
    
    initDoneRef.current = true;
    addLog('🚀 PixiJS初期化開始（コンテナ設定後）');
    
    const initialize = async () => {
      try {
        // BGM初期化を最初に実行
        await initializeBGM();
        
        // シナリオ読み込み
        addLog('📄 シナリオ読み込み開始');
        const response = await fetch('/data/scenarios/test_scenario.json');
        const data = await response.json();
        addLog(`✅ シナリオ読み込み成功: ${data.steps?.length}個`);
        
        setGameState(prev => ({ ...prev, scenario: data.steps || [] }));
        
        // アセットプリロード
        addLog('🖼️ アセットプリロード開始');
        const assetsToLoad = [
          '/images/novel/backgrounds/library.jpg',
          '/images/novel/backgrounds/school_yard.jpg',
          '/images/novel/characters/yuki/normal.png',
          '/images/novel/characters/yuki/happy.png',
          '/images/novel/characters/akira/normal.png',
          '/images/novel/characters/akira/happy.png',
        ];
        
        for (const assetUrl of assetsToLoad) {
          try {
            await PIXI.Assets.load(assetUrl);
            addLog(`✅ アセット読み込み完了: ${assetUrl.split('/').pop()}`);
          } catch (loadError) {
            addLog(`⚠️ アセット読み込み失敗: ${assetUrl.split('/').pop()}`);
          }
        }
        
        // PixiJS初期化
        addLog('🎨 PixiJS Application作成');
        const app = new PIXI.Application({
          width: 900,
          height: 600,
          backgroundColor: 0x1a1a2e,
          antialias: true,
        });
        
        pixiAppRef.current = app;
        
        // キャンバス追加
        const canvas = app.view as HTMLCanvasElement;
        canvas.style.display = 'block';
        canvas.style.margin = '0 auto';
        pixiContainer.appendChild(canvas);
        addLog('✅ キャンバス追加完了');
        
        addLog('🎉 PixiJS初期化完了');
        setIsReady(true);
        
        // 初期化完了後にBGM再生を試行
        if (gameState.bgmEnabled) {
          setTimeout(() => {
            playBGM();
          }, 1000);
        }
        
      } catch (error) {
        addLog(`💥 初期化エラー: ${error}`);
        setError(String(error));
        initDoneRef.current = false;
      }
    };
    
    initialize();
    
  }, [pixiContainer]);

  // クリーンアップ
  useEffect(() => {
    return () => {
      addLog('🧹 クリーンアップ実行');
      if (pixiAppRef.current) {
        pixiAppRef.current.destroy(true);
        pixiAppRef.current = null;
      }
      if (bgmRef.current) {
        bgmRef.current.pause();
        bgmRef.current = null;
      }
      bgmLoadedRef.current = false;
      initDoneRef.current = false;
    };
  }, []);

  // エラー表示
  if (error) {
    return (
      <div style={{
        width: '100%',
        height: '100vh',
        backgroundColor: '#dc3545',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        textAlign: 'center'
      }}>
        <h1>🚨 PixiJS初期化エラー</h1>
        <p style={{ marginBottom: '20px' }}>{error}</p>
        
        <div style={{
          backgroundColor: 'rgba(0,0,0,0.3)',
          padding: '15px',
          borderRadius: '8px',
          maxWidth: '600px',
          maxHeight: '200px',
          overflow: 'auto',
          textAlign: 'left',
          fontSize: '12px',
          fontFamily: 'monospace'
        }}>
          <strong>デバッグログ:</strong>
          {debugInfo.map((log, i) => (
            <div key={i} style={{ marginBottom: '2px' }}>{log}</div>
          ))}
        </div>
        
        <button
          onClick={() => window.location.reload()}
          style={{
            padding: '12px 24px',
            backgroundColor: 'white',
            color: '#dc3545',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            marginTop: '20px'
          }}
        >
          🔄 再読み込み
        </button>
      </div>
    );
  }

  // ローディング表示
  if (!isReady) {
    return (
      <div style={{
        width: '100%',
        height: '100vh',
        backgroundColor: '#1a1a2e',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Arial, sans-serif'
      }}>
        <div style={{
          width: '80px',
          height: '80px',
          border: '4px solid #f3f3f3',
          borderTop: '4px solid #3498db',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          marginBottom: '30px'
        }}></div>
        
        <h2>🎨 PixiJS ビジュアルノベル 初期化中...</h2>
        <p style={{ color: '#aaa', marginBottom: '20px' }}>画像とシステムを読み込んでいます</p>
        
        {/* コンテナ設定ボタン */}
        {!pixiContainer && (
          <button
            onClick={() => {
              const container = document.createElement('div');
              container.style.width = '900px';
              container.style.height = '600px';
              container.style.border = '2px solid #333';
              container.style.backgroundColor = '#1a1a2e';
              container.style.position = 'relative';
              addLog('📦 手動コンテナ作成');
              setPixiContainer(container);
            }}
            style={{
              padding: '15px 30px',
              fontSize: '18px',
              backgroundColor: '#3498db',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              marginBottom: '20px'
            }}
          >
            🚀 ゲーム開始
          </button>
        )}
        
        <div style={{
          backgroundColor: '#2d2d44',
          padding: '15px',
          borderRadius: '8px',
          marginTop: '20px',
          maxWidth: '500px',
          maxHeight: '150px',
          overflow: 'auto'
        }}>
          <strong>読み込み状況:</strong>
          {debugInfo.slice(-8).map((log, i) => (
            <div key={i} style={{ 
              fontSize: '12px', 
              fontFamily: 'monospace',
              color: '#ccc',
              marginBottom: '2px' 
            }}>
              {log}
            </div>
          ))}
        </div>
        
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // メインゲーム画面
  return (
    <div style={{
      width: '100%',
      height: '100vh',
      backgroundColor: '#000000',
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      {/* PixiJSキャンバス */}
      {pixiContainer && (
        <div style={{ position: 'relative' }}>
          {/* pixiContainer はJavaScriptで直接DOMに追加されるため、refは不要 */}
          {React.createElement('div', {
            ref: (el: HTMLDivElement) => {
              if (el && !el.contains(pixiContainer)) {
                el.appendChild(pixiContainer);
              }
            }
          })}
        </div>
      )}
      
      {/* UI コントロール */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        color: 'white',
        backgroundColor: 'rgba(0,0,0,0.7)',
        padding: '10px',
        borderRadius: '8px',
        fontSize: '14px'
      }}>
        <div><strong>🎮 PixiJS ノベルゲーム</strong></div>
        <div>ステップ: {gameState.currentStep}</div>
        <div>シナリオ: {gameState.scenario.length}個</div>
        <div>BGM状態: {bgmLoadedRef.current ? '準備完了' : '読み込み中'}</div>
        <div>初期化: {initDoneRef.current ? '完了' : '待機中'}</div>
      </div>
      
      {/* BGM コントロール */}
      <div style={{
        position: 'absolute',
        top: '20px',
        right: '20px'
      }}>
        <button
          onClick={toggleBGM}
          style={{
            padding: '10px 15px',
            backgroundColor: gameState.bgmEnabled ? '#28a745' : '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          🎵 BGM {gameState.bgmEnabled ? 'ON' : 'OFF'}
        </button>
      </div>
      
      {/* デバッグ情報 */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '20px',
        backgroundColor: 'rgba(0,0,0,0.7)',
        color: 'white',
        padding: '10px',
        borderRadius: '8px',
        fontSize: '12px',
        fontFamily: 'monospace',
        maxWidth: '400px',
        maxHeight: '120px',
        overflow: 'auto'
      }}>
        <strong>デバッグログ:</strong>
        {debugInfo.slice(-6).map((log, i) => (
          <div key={i} style={{ marginBottom: '1px' }}>{log}</div>
        ))}
      </div>
    </div>
  );
}
