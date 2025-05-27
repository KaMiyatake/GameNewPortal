import dynamic from 'next/dynamic';
import { NewsItem } from '../../types';

const HeroSlider = dynamic(
  () => import('./HeroSlider'),
  { 
    ssr: false, // サーバーサイドレンダリングを無効化
    loading: () => (
      <div style={{ 
        height: '200px', 
        backgroundColor: '#f8f9fa', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        読み込み中...
      </div>
    )
  }
);

export default HeroSlider;
