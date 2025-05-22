import { NewsItem, NewsItemDetail, Category } from '../types';

// 仮のニュースデータ（後でAPIに置き換え）
export const getLatestNews = (): Promise<NewsItem[]> => {
  return Promise.resolve([
    {
      id: 1,
      title: '『ゼルダの伝説』最新作、発売日が決定',
      summary: '任天堂は本日、『ゼルダの伝説』シリーズの最新作の発売日を正式に発表しました。',
      imageUrl: 'https://placehold.co/400x250?text=Zelda&font=montserrat',
      category: 'コンソール',
      date: '2025-05-21',
      slug: 'zelda-new-release-date',
    },
    {
      id: 2,
      title: '『Elden Ring』大型DLCの詳細が明らかに',
      summary: 'フロムソフトウェアは『Elden Ring』の大型DLCについての新情報を公開しました。',
      imageUrl: 'https://placehold.co/400x250?text=Elden+Ring&font=montserrat',
      category: 'PC',
      date: '2025-05-20',
      slug: 'elden-ring-dlc-details',
    },
    // 他の記事も同様...
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

// 記事詳細データを取得する関数
export const getNewsDetail = (slug: string): Promise<NewsItemDetail> => {
  // 仮のデータ（本来はAPIから取得）
  const newsDetails: { [key: string]: NewsItemDetail } = {
    'zelda-new-release-date': {
      id: 1,
      title: '『ゼルダの伝説』最新作、発売日が決定',
      summary: '任天堂は本日、『ゼルダの伝説』シリーズの最新作の発売日を正式に発表しました。',
      imageUrl: 'https://placehold.co/400x250?text=Zelda&font=montserrat',
      category: 'コンソール',
      date: '2025-05-21',
      slug: 'zelda-new-release-date',
      author: '山田太郎',
      content: `<p>任天堂は本日、『ゼルダの伝説』シリーズの最新作の発売日を発表しました。</p><p>詳細な情報は後日公開される予定です。</p>`,
      tags: ['ゼルダの伝説', '任天堂', 'Switch'],
      relatedNews: [
        {
          id: 3,
          title: '新型PlayStation 6の噂、性能と発売時期',
          summary: 'ソニーの次世代ゲーム機に関する情報がリークされました。',
          imageUrl: 'https://placehold.co/80x50?text=Playstation+6&font=montserrat',
          category: 'コンソール',
          date: '2025-05-19',
          slug: 'playstation-6-rumors',
        }
      ]
    },
    'elden-ring-dlc-details': {
      id: 2,
      title: '『Elden Ring』大型DLCの詳細が明らかに',
      summary: 'フロムソフトウェアは『Elden Ring』の大型DLCについての新情報を公開しました。',
      imageUrl: 'https://placehold.co/400x250?text=Elden+Ring&font=montserrat',
      category: 'PC',
      date: '2025-05-20',
      slug: 'elden-ring-dlc-details',
      author: '鈴木一郎',
      content: `<p>フロムソフトウェアは『Elden Ring』の大型DLCについての詳細を発表しました。</p><p>新たなボスや武器が追加される予定です。</p>`,
      tags: ['Elden Ring', 'フロムソフトウェア', 'DLC'],
      relatedNews: [
        {
          id: 6,
          title: '『Cyberpunk 2077』新DLCのレビュー',
          summary: 'CD Projekt REDの『Cyberpunk 2077』の新DLCのレビューが解禁されました。',
          imageUrl: 'https://placehold.co/80x50?text=Cyberpunk&font=montserrat',
          category: 'PC',
          date: '2025-05-16',
          slug: 'cyberpunk-phantom-liberty-review',
        }
      ]
    }
  };

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const newsDetail = newsDetails[slug];
      if (newsDetail) {
        resolve(newsDetail);
      } else {
        reject(new Error('記事が見つかりませんでした'));
      }
    }, 500); // 0.5秒の遅延を追加して非同期処理をシミュレート
  });
};
