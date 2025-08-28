'use client';

import { useEffect, useRef, useState } from 'react';

export default function SimpleNovelTest() {
  console.log('🧪 SimpleNovelTest コンポーネント開始');
  
  const containerRef = useRef<HTMLDivElement>(null);
  const [debugInfo, setDebugInfo] = useState<string[]>([]);
  const [isReady, setIsReady] = useState(false);
  const [scenario, setScenario] = useState<any>(null);

  // デバッグログ追加
  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    const logMessage = `${timestamp}: ${message}`;
    console.log(logMessage);
    setDebugInfo(prev => [...prev, logMessage]);
  };

  useEffect(() => {
    addLog('🚀 SimpleNovelTest 開始');
    
    const initialize = async () => {
      try {
        // 1. DOM要素チェック
        addLog('📱 DOM要素チェック開始');
        
        if (!containerRef.current) {
          addLog('❌ containerRef.current が null');
          throw new Error('DOM要素が見つかりません');
        }
        
        addLog('✅ DOM要素確認完了');
        const rect = containerRef.current.getBoundingClientRect();
        addLog(`📐 要素サイズ: ${rect.width}x${rect.height}`);

        // 2. シナリオファイル読み込み
        addLog('📄 シナリオファイル読み込み開始');
        
        try {
          const response = await fetch('/data/scenarios/test_scenario.json');
          addLog(`📄 応答ステータス: ${response.status}`);
          
          if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
          }
          
          const data = await response.json();
          addLog(`✅ シナリオ読み込み成功: ${data.steps?.length || 0}個のステップ`);
          setScenario(data);
          
        } catch (fetchError) {
          addLog(`❌ シナリオ読み込みエラー: ${fetchError instanceof Error ? fetchError.message : String(fetchError)}`);
          // シナリオ読み込み失敗でも続行
          setScenario({ steps: [] });
        }

        // 3. 簡単なテスト表示
        addLog('🎨 テスト表示作成');
        
        const testDiv = document.createElement('div');
        testDiv.style.cssText = `
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: white;
          font-family: Arial, sans-serif;
          text-align: center;
          padding: 20px;
          box-sizing: border-box;
        `;
        
        testDiv.innerHTML = `
          <h1 style="margin: 0 0 20px 0; font-size: 2em;">🎉 DOM要素テスト成功！</h1>
          <p style="margin: 0 0 15px 0; font-size: 1.2em;">✅ DOM要素が正常に準備されました</p>
          <p style="margin: 0 0 15px 0;">📄 シナリオファイル: ${scenario?.steps?.length || 0}個のステップ</p>
          <p style="margin: 0 0 20px 0;">📐 コンテナサイズ: ${rect.width}x${rect.height}</p>
          <button id="test-button" style="
            padding: 12px 24px;
            font-size: 16px;
            background: #28a745;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            margin: 10px;
          ">🚀 PixiJS版に進む</button>
          <button id="reload-button" style="
            padding: 12px 24px;
            font-size: 16px;
            background: #007bff;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            margin: 10px;
          ">🔄 再読み込み</button>
        `;
        
        containerRef.current.appendChild(testDiv);
        addLog('✅ テスト表示追加完了');

        // 4. イベントリスナー追加
        const testButton = testDiv.querySelector('#test-button');
        const reloadButton = testDiv.querySelector('#reload-button');
        
        testButton?.addEventListener('click', () => {
          addLog('🚀 PixiJS版へ移行');
          // PixiJS版への移行処理をここに追加
          alert('PixiJS版の実装を進めます！DOM要素の準備は正常です。');
        });
        
        reloadButton?.addEventListener('click', () => {
          addLog('🔄 ページ再読み込み');
          window.location.reload();
        });

        addLog('🎉 初期化完全成功！');
        setIsReady(true);
        
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        addLog(`💥 初期化エラー: ${errorMessage}`);
        
        // エラー表示も同様にDOM操作で行う
        if (containerRef.current) {
          const errorDiv = document.createElement('div');
          errorDiv.style.cssText = `
            width: 100%;
            height: 100%;
            background: #dc3545;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: white;
            font-family: Arial, sans-serif;
            text-align: center;
            padding: 20px;
          `;
          
          errorDiv.innerHTML = `
            <h1>🚨 エラーが発生しました</h1>
            <p>${errorMessage}</p>
            <button onclick="window.location.reload()" style="
              padding: 12px 24px;
              font-size: 16px;
              background: white;
              color: #dc3545;
              border: none;
              border-radius: 8px;
              cursor: pointer;
              margin-top: 20px;
            ">🔄 再読み込み</button>
          `;
          
          containerRef.current.appendChild(errorDiv);
        }
      }
    };

    // 短い遅延で実行
    const timer = setTimeout(initialize, 100);
    
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div style={{ 
      width: '100%', 
      height: '100vh', 
      position: 'relative',
      backgroundColor: '#1a1a2e'
    }}>
      {/* DOM要素テスト用コンテナ */}
      <div 
        ref={containerRef}
        style={{ 
          width: '100%', 
          height: '100%',
          minHeight: '600px',
          minWidth: '400px'
        }}
      />
      
      {/* デバッグ情報（固定表示） */}
      <div style={{
        position: 'absolute',
        top: '10px',
        left: '10px',
        backgroundColor: 'rgba(0,0,0,0.8)',
        color: 'white',
        padding: '10px',
        borderRadius: '5px',
        fontSize: '12px',
        fontFamily: 'monospace',
        maxWidth: '400px',
        maxHeight: '200px',
        overflow: 'auto',
        zIndex: 1000
      }}>
        <strong>デバッグログ:</strong>
        {debugInfo.map((log, index) => (
          <div key={index} style={{ marginBottom: '2px' }}>
            {log}
          </div>
        ))}
      </div>
    </div>
  );
}
