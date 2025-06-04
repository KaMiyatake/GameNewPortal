import { ArticleDetail } from '../../../utils/types';
import { getArticleImagePath } from '../../../../utils/image-paths';

export const comp25052302: ArticleDetail = {
  id: 1,
  title: '『ゼルダの伝説 ティアーズ オブ ザ キングダム』新DLC発表、2025年夏配信予定',
  summary: '任天堂は『ゼルダの伝説 ティアーズ オブ ザ キングダム』の大型DLCを発表しました。新たな冒険と謎が待っています。',
  content: `
    <p>任天堂は本日、『ゼルダの伝説 ティアーズ オブ ザ キングダム』の大型DLC「時の神殿」を2025年夏に配信すると発表しました。</p>
    
    <img src="${getArticleImagePath('2025', '05', '25052302-zelda-totk', 'screenshot-1.png')}" alt="ゲームプレイスクリーンショット" />
    
    <h2>新たな冒険の舞台</h2>
    <p>このDLCでは、ハイラル王国の地下に眠る古代の「時の神殿」を舞台に、時間操作を使った全く新しい謎解きが楽しめます。</p>
    
    <img src="${getArticleImagePath('2025', '05', '25052302-zelda-totk', 'screenshot-2.png')}" alt="時の神殿の内部" />
  `,
  // メイン画像
  imageUrl: getArticleImagePath('2025', '05', '25052302-zelda-totk', 'main.png'),
  categories: ['Switch'],
  tags: ['ゼルダの伝説', '任天堂', 'DLC', 'Switch', 'アクション'],
  publishedAt: '2025-05-23',
  slug: '25052302-zelda-totk',
  author: '山田太郎',
  featured: true,
  popular: true,
  relatedArticleIds: [7, 8]
};
