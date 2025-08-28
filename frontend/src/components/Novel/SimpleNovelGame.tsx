'use client';

import { useEffect, useRef, useState } from 'react';

export default function SimpleNovelGame() {
  console.log('🧪 SimpleNovelGame 開始');
  
  const [debugInfo, setDebugInfo] = useState<string[]>([]);
  const [gameReady, setGameReady] = useState(false);
  const [scenario, setScenario] = useState<any[]>([]);
  const [currentStep, setCurrentStep] = useState(1);

  // デバッグログ
  const addLog = (message: string) => {
    const log = `${new Date().toLocaleTimeString()}: ${message}`;
    console.log(log);
    setDebugInfo(prev => [...prev, log]);
  };

  // 初期化（DOM要素チェックなし）
  useEffect(() => {
    addLog('🚀 初期化開始（DOM要素チェックなし）');
    
    const init = async () => {
      try {
        // シナリオ読み込み
        addLog('📄 シナリオ読み込み開始');
        
        try {
          const response = await fetch('/data/scenarios/test_scenario.json');
          const data = await response.json();
          addLog(`✅ シナリオ読み込み成功: ${data.steps?.length}個`);
          setScenario(data.steps || []);
        } catch (error) {
          addLog('⚠️ シナリオ読み込み失敗、デフォルト使用');
          setScenario([
            {
              id: 1,
              type: 'narration',
              character: 'システム',
              text: '🎉 DOM要素問題を回避したテスト版です！\n\nこのバージョンではDOM要素のチェックを行わず、直接ゲーム画面を表示します。',
              next: 2
            },
            {
              id: 2,
              type: 'choice',
              text: 'このテスト版が正常に動作していますか？',
              choices: [
                { text: '✅ はい、正常に動作しています', next: 3 },
                { text: '❌ 問題があります', next: 4 }
              ]
            },
            {
              id: 3,
              type: 'narration',
              character: 'システム',
              text: '素晴らしい！🎉\n\nこれでPixiJSを使わない基本的なビジュアルノベルシステムが動作することが確認できました。\n\n次はPixiJSの実装に挑戦できます。'
            },
            {
              id: 4,
              type: 'narration',
              character: 'システム',
              text: '問題が報告されました。\n\nデバッグログを確認して、どこで問題が発生しているか調査しましょう。'
            }
          ]);
        }
        
        addLog('🎉 初期化完了');
        setGameReady(true);
        
      } catch (error) {
        addLog(`💥 初期化エラー: ${error}`);
      }
    };
    
    init();
  }, []);

  // シナリオ進行
  const nextStep = () => {
    const current = scenario.find(s => s.id === currentStep);
    if (current?.next) {
      setCurrentStep(current.next);
      addLog(`📖 ステップ ${current.next} に進行`);
    }
  };

  // 選択肢選択
  const selectChoice = (nextId: number) => {
    setCurrentStep(nextId);
    addLog(`🎯 選択: ステップ ${nextId}`);
  };

  // 現在のシナリオ
  const currentScenario = scenario.find(s => s.id === currentStep);

  // ローディング中
  if (!gameReady) {
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
          width: '50px',
          height: '50px',
          border: '3px solid #f3f3f3',
          borderTop: '3px solid #3498db',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          marginBottom: '20px'
        }}></div>
        <h2>🧪 DOM要素チェックなし版 読み込み中...</h2>
        <p style={{ color: '#aaa' }}>基本的なReactコンポーネントテスト</p>
        
        <div style={{
          backgroundColor: '#2d2d44',
          padding: '15px',
          borderRadius: '8px',
          marginTop: '20px',
          maxWidth: '500px',
          maxHeight: '150px',
          overflow: 'auto'
        }}>
          <strong>デバッグログ:</strong>
          {debugInfo.map((log, i) => (
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

  // メインゲーム表示
  return (
    <div style={{
      width: '100%',
      height: '100vh',
      backgroundColor: '#1a1a2e',
      color: 'white',
      fontFamily: 'Arial, sans-serif',
      position: 'relative'
    }}>
      {/* メインゲーム画面 */}
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        boxSizing: 'border-box'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '800px',
          height: '600px',
          backgroundColor: '#2c3e50',
          borderRadius: '15px',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
        }}>
          {/* ヘッダー */}
          <div style={{
            backgroundColor: '#34495e',
            padding: '20px',
            textAlign: 'center',
            borderBottom: '2px solid #3498db'
          }}>
            <h1 style={{ margin: 0, fontSize: '24px' }}>
              🎮 SimpleNovelGame - テスト版
            </h1>
            <p style={{ margin: '8px 0 0 0', opacity: 0.8 }}>
              ステップ {currentStep} / {scenario.length}
            </p>
          </div>
          
          {/* コンテンツエリア */}
          <div style={{
            flex: 1,
            padding: '40px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center'
          }}>
            {currentScenario ? (
              <>
                {/* キャラクター名 */}
                {currentScenario.character && (
                  <div style={{
                    backgroundColor: '#3498db',
                    color: 'white',
                    padding: '10px 20px',
                    borderRadius: '25px',
                    marginBottom: '25px',
                    fontSize: '16px',
                    fontWeight: 'bold'
                  }}>
                    {currentScenario.character}
                  </div>
                )}
                
                {/* メッセージテキスト */}
                <div style={{
                  fontSize: '20px',
                  lineHeight: '1.7',
                  marginBottom: '35px',
                  minHeight: '120px',
                  display: 'flex',
                  alignItems: 'center',
                  whiteSpace: 'pre-line',
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  padding: '25px',
                  borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}>
                  {currentScenario.text}
                </div>
                
                {/* ボタンエリア */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%', maxWidth: '400px' }}>
                  {currentScenario.type === 'choice' && currentScenario.choices ? (
                    // 選択肢ボタン
                    currentScenario.choices.map((choice: any, index: number) => (
                      <button
                        key={index}
                        onClick={() => selectChoice(choice.next)}
                        style={{
                          padding: '15px 25px',
                          fontSize: '18px',
                          backgroundColor: '#e74c3c',
                          color: 'white',
                          border: 'none',
                          borderRadius: '10px',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          fontWeight: 'bold'
                        }}
                        onMouseOver={(e) => {
                          (e.target as HTMLButtonElement).style.backgroundColor = '#c0392b';
                          (e.target as HTMLButtonElement).style.transform = 'translateY(-2px)';
                        }}
                        onMouseOut={(e) => {
                          (e.target as HTMLButtonElement).style.backgroundColor = '#e74c3c';
                          (e.target as HTMLButtonElement).style.transform = 'translateY(0)';
                        }}
                      >
                        {choice.text}
                      </button>
                    ))
                  ) : (
                    // 次へボタン
                    currentScenario.next && (
                      <button
                        onClick={nextStep}
                        style={{
                          padding: '15px 40px',
                          fontSize: '18px',
                          backgroundColor: '#27ae60',
                          color: 'white',
                          border: 'none',
                          borderRadius: '10px',
                          cursor: 'pointer',
                          fontWeight: 'bold',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseOver={(e) => {
                          (e.target as HTMLButtonElement).style.backgroundColor = '#229954';
                          (e.target as HTMLButtonElement).style.transform = 'translateY(-2px)';
                        }}
                        onMouseOut={(e) => {
                          (e.target as HTMLButtonElement).style.backgroundColor = '#27ae60';
                          (e.target as HTMLButtonElement).style.transform = 'translateY(0)';
                        }}
                      >
                        ▶ 次へ進む
                      </button>
                    )
                  )}
                  
                  {/* 特別ボタン */}
                  {currentStep === 3 && (
                    <button
                      onClick={() => {
                        alert('🎉 基本システムの動作確認が完了しました！\n\n次はPixiJSを使った高度なビジュアルノベルの実装に進むことができます。');
                        addLog('🚀 基本システム動作確認完了');
                      }}
                      style={{
                        padding: '20px 30px',
                        fontSize: '20px',
                        backgroundColor: '#9b59b6',
                        color: 'white',
                        border: 'none',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        marginTop: '20px',
                        fontWeight: 'bold',
                        boxShadow: '0 4px 15px rgba(155,89,182,0.3)'
                      }}
                    >
                      🚀 PixiJS実装に進む準備完了！
                    </button>
                  )}
                </div>
              </>
            ) : (
              <div>
                <h2>🎉 テスト完了</h2>
                <p>基本的なビジュアルノベルシステムが正常に動作しました！</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* ステータス表示 */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        backgroundColor: 'rgba(0,0,0,0.8)',
        padding: '15px',
        borderRadius: '8px',
        fontSize: '14px'
      }}>
        <div><strong>🎮 システム状態</strong></div>
        <div>✅ 基本システム: 動作中</div>
        <div>📄 シナリオ: {scenario.length}ステップ</div>
        <div>📍 現在位置: ステップ {currentStep}</div>
        <div>🔧 DOM要素チェック: 無効</div>
      </div>
      
      {/* デバッグログ */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        right: '20px',
        backgroundColor: 'rgba(0,0,0,0.8)',
        padding: '15px',
        borderRadius: '8px',
        maxWidth: '400px',
        maxHeight: '150px',
        overflow: 'auto',
        fontSize: '12px',
        fontFamily: 'monospace'
      }}>
        <strong>デバッグログ:</strong>
        {debugInfo.slice(-8).map((log, i) => (
          <div key={i} style={{ marginBottom: '2px', color: '#ccc' }}>
            {log}
          </div>
        ))}
      </div>
      
      {/* リロードボタン */}
      <div style={{
        position: 'absolute',
        top: '20px',
        right: '20px'
      }}>
        <button
          onClick={() => window.location.reload()}
          style={{
            padding: '10px 15px',
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          🔄 リロード
        </button>
      </div>
    </div>
  );
}
