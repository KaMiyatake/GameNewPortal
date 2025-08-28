import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

// テスト版を動的インポート
const SimpleNovelTest = dynamic(
  () => import('../../components/Novel/SimpleNovelGame'),
  { 
    ssr: false,
    loading: () => <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#1a1a2e',
      color: 'white'
    }}>
      <div>
        <div style={{
          width: '50px',
          height: '50px',
          border: '3px solid #f3f3f3',
          borderTop: '3px solid #3498db',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          margin: '0 auto 20px'
        }}></div>
        <p>DOM要素テスト版読み込み中...</p>
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
  const router = useRouter();

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

  return <SimpleNovelTest />;
}
