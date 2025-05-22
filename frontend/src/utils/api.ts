import { NewsItem, Category } from '../types';

// 仮のニュースデータ（後でAPIに置き換え）
export const getLatestNews = (): Promise<NewsItem[]> => {
  return Promise.resolve([
    {
      id: 1,
      title: '『ゼルダの伝説』最新作、発売日が決定',
      summary: '任天堂は本日、『ゼルダの伝説』シリーズの最新作の発売日を正式に発表しました。',
      imageUrl: 'https://via.placeholder.com/400x250?text=Zelda',
      category: 'コンソール',
      date: '2025-05-21',
      url: '/news/1',
    },
    {
      id: 2,
      title: '『Elden Ring』大型DLCの詳細が明らかに',
      summary: 'フロムソフトウェアは『Elden Ring』の大型DLCについての新情報を公開しました。',
      imageUrl: 'https://via.placeholder.com/400x250?text=Elden+Ring',
      category: 'PC',
      date: '2025-05-20',
      url: '/news/2',
    },
    {
      id: 3,
      title: '新型PlayStation 6の噂、性能と発売時期',
      summary: 'ソニーの次世代ゲーム機に関する情報がリークされ、業界に衝撃を与えています。',
      imageUrl: 'https://via.placeholder.com/400x250?text=PlayStation+6',
      category: 'コンソール',
      date: '2025-05-19',
      url: '/news/3',
    },
    {
      id: 4,
      title: '『Fortnite』新シーズン開始、大幅なマップ変更',
      summary: 'Epic Gamesは人気バトルロイヤルゲーム『Fortnite』の新シーズンを開始し、ゲームマップに大幅な変更を加えました。',
      imageUrl: 'https://via.placeholder.com/400x250?text=Fortnite',
      category: 'マルチプラットフォーム',
      date: '2025-05-18',
      url: '/news/4',
    },
    {
      id: 5,
      title: '『GTA VI』開発の進捗状況、Rockstarがコメント',
      summary: 'Rockstar Gamesは待望の『Grand Theft Auto VI』の開発状況について珍しくコメントを発表しました。',
      imageUrl: 'https://via.placeholder.com/400x250?text=GTA+VI',
      category: 'コンソール',
      date: '2025-05-17',
      url: '/news/5',
    },
    {
      id: 6,
      title: '『Cyberpunk 2077』新DLC「Phantom Liberty」のレビュー',
      summary: 'CD Projekt REDの『Cyberpunk 2077』の新DLC「Phantom Liberty」のレビューが解禁されました。',
      imageUrl: 'https://via.placeholder.com/400x250?text=Cyberpunk',
      category: 'PC',
      date: '2025-05-16',
      url: '/news/6',
    },
  ]);
};

// カテゴリデータ
export const getCategories = (): Promise<Category[]> => {
  return Promise.resolve([
    { id: 1, name: 'コンソール', slug: 'console' },
    { id: 2, name: 'PC', slug: 'pc' },
    { id: 3, name: 'モバイル', slug: 'mobile' },
    { id: 4, name: 'インディー', slug: 'indie' },
    { id: 5, name: 'マルチプラットフォーム', slug: 'multi' },
  ]);
};
