import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// PixiNovelGameを動的インポート
const PixiNovelGame = dynamic(
  () => import('../../components/Novel/PixiNovelGame'),
  { 
    ssr: false,
    loading: () => <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#1a1a2e',
      color: 'white',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div>
        <div style={{
          width: '60px',
          height: '60px',
          border: '4px solid #f3f3f3',
          borderTop: '4px solid #3498db',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          margin: '0 auto 20px'
        }}></div>
        <h2>🎨 PixiJS ビジュアルノベル</h2>
        <p>読み込み中...</p>
      </div>
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  }
);

export default function NovelGamePage() {
  const [isClient, setIsClient] = useState(false);

  console.log('🚀 NovelGamePage マウント開始');

  useEffect(() => {
    console.log('✅ NovelGamePage クライアント準備完了');
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        backgroundColor: '#1a1a2e',
        color: 'white'
      }}>
        <p>サーバーサイド初期化中...</p>
      </div>
    );
  }

  return <PixiNovelGame />;
}
