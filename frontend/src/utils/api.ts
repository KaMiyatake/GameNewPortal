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

// 人気記事を取得する関数
export const getPopularNews = (): Promise<NewsItem[]> => {
  return Promise.resolve([
    {
      id: 5,
      title: '『GTA VI』開発の進捗状況、Rockstarがコメント',
      summary: 'Rockstar Gamesは待望の『Grand Theft Auto VI』の開発状況について珍しくコメントを発表しました。',
      imageUrl: 'https://placehold.co/80x50?text=GTA&font=montserrat',
      category: 'コンソール',
      date: '2025-05-17',
      slug: 'gta-vi-development-update',
    },
    {
      id: 2,
      title: '『Elden Ring』大型DLCの詳細が明らかに',
      summary: 'フロムソフトウェアは『Elden Ring』の大型DLCについての新情報を公開しました。',
      imageUrl: 'https://placehold.co/80x50?text=Elden+Ring&font=montserrat',
      category: 'PC',
      date: '2025-05-20',
      slug: 'elden-ring-dlc-details',
    },
    {
      id: 7,
      title: '『ファイナルファンタジーVII Rebirth』追加コンテンツ発表',
      summary: 'スクウェア・エニックスは『ファイナルファンタジーVII Rebirth』の追加コンテンツを発表しました。',
      imageUrl: 'https://placehold.co/80x50?text=FF7&font=montserrat',
      category: 'コンソール',
      date: '2025-05-15',
      slug: 'ffvii-rebirth-dlc',
    },
    {
      id: 4,
      title: '『Fortnite』新シーズン開始、大幅なマップ変更',
      summary: 'Epic Gamesは人気バトルロイヤルゲーム『Fortnite』の新シーズンを開始しました。',
      imageUrl: 'https://placehold.co/80x50?text=Fortnite&font=montserrat',
      category: 'マルチプラットフォーム',
      date: '2025-05-18',
      slug: 'fortnite-new-season',
    },
    {
      id: 10,
      title: '『Minecraft』大型アップデート「Wild Update」配信開始',
      summary: 'Mojangは『Minecraft』の大型アップデート「Wild Update」の配信を開始しました。',
      imageUrl: 'https://placehold.co/80x50?text=Minecraft&font=montserrat',
      category: 'マルチプラットフォーム',
      date: '2025-05-10',
      slug: 'minecraft-wild-update',
    },
  ]);
};

// 注目記事を取得する関数（スライダー用）
export const getFeaturedNews = (): Promise<NewsItem[]> => {
  return Promise.resolve([
    {
      id: 1,
      title: '『ゼルダの伝説』最新作、発売日が2025年10月15日に決定',
      summary: '任天堂は本日、『ゼルダの伝説』シリーズの最新作の発売日を正式に発表しました。',
      imageUrl: 'https://via.placeholder.com/600x338?text=Zelda+最新作',
      category: 'コンソール',
      date: '2025-05-21',
      slug: 'zelda-new-release-date',
    },
    {
      id: 2,
      title: '『Elden Ring』大型DLC「Shadow of the Erdtree」詳細発表',
      summary: 'フロムソフトウェアは『Elden Ring』の大型DLCについて新情報を公開。',
      imageUrl: 'https://via.placeholder.com/600x338?text=Elden+Ring+DLC',
      category: 'PC',
      date: '2025-05-20',
      slug: 'elden-ring-dlc-details',
    },
    {
      id: 5,
      title: '『GTA VI』開発の進捗状況、Rockstarが公式コメント',
      summary: 'Rockstar Gamesは待望の『Grand Theft Auto VI』の開発状況について発表。',
      imageUrl: 'https://via.placeholder.com/600x338?text=GTA+VI+進捗',
      category: 'コンソール',
      date: '2025-05-17',
      slug: 'gta-vi-development-update',
    },
    {
      id: 4,
      title: '『Fortnite』新シーズン開始、マップが大幅リニューアル',
      summary: 'Epic Gamesは人気バトルロイヤルゲーム『Fortnite』の新シーズンを開始。',
      imageUrl: 'https://via.placeholder.com/600x338?text=Fortnite+新シーズン',
      category: 'マルチプラットフォーム',
      date: '2025-05-18',
      slug: 'fortnite-new-season',
    },
    {
      id: 8,
      title: '次世代ニンテンドースイッチ、開発が最終段階に突入',
      summary: '任天堂の次世代ゲーム機「Nintendo Switch 2（仮称）」の開発が最終段階に。',
      imageUrl: 'https://via.placeholder.com/600x338?text=Switch+2',
      category: 'コンソール',
      date: '2025-05-12',
      slug: 'next-gen-nintendo-switch',
    },
    {
      id: 6,
      title: '『Cyberpunk 2077』新DLC「Phantom Liberty」のレビュー',
      summary: 'CD Projekt REDの『Cyberpunk 2077』の新DLCのレビューが解禁。',
      imageUrl: 'https://via.placeholder.com/600x338?text=Cyberpunk+DLC',
      category: 'PC',
      date: '2025-05-16',
      slug: 'cyberpunk-phantom-liberty-review',
    },
    {
      id: 9,
      title: '『Starfield』新拡張パック「Shattered Space」発表',
      summary: 'Bethesdaは『Starfield』の新拡張パックを発表しました。',
      imageUrl: 'https://via.placeholder.com/600x338?text=Starfield+DLC',
      category: 'PC',
      date: '2025-05-11',
      slug: 'starfield-shattered-space',
    },
    {
      id: 10,
      title: '『Minecraft』大型アップデート「Wild Update」配信開始',
      summary: 'Mojangは『Minecraft』の大型アップデートの配信を開始。',
      imageUrl: 'https://via.placeholder.com/600x338?text=Minecraft+Update',
      category: 'マルチプラットフォーム',
      date: '2025-05-10',
      slug: 'minecraft-wild-update',
    },
    {
      id: 11,
      title: '『Dragon Age: The Veilguard』ゲームプレイ映像公開',
      summary: 'BioWareは『Dragon Age: The Veilguard』の最新ゲームプレイ映像を公開。',
      imageUrl: 'https://via.placeholder.com/600x338?text=Dragon+Age',
      category: 'PC',
      date: '2025-05-08',
      slug: 'dragon-age-veilguard-gameplay',
    },
    {
      id: 12,
      title: '『Call of Duty』新作が2025年秋にリリース予定',
      summary: 'Activisionが『Call of Duty』シリーズの新作を発表しました。',
      imageUrl: 'https://via.placeholder.com/600x338?text=Call+of+Duty',
      category: 'マルチプラットフォーム',
      date: '2025-05-07',
      slug: 'call-of-duty-new-release',
    },
    {
      id: 13,
      title: '『Final Fantasy VII Rebirth』PC版が2025年に登場',
      summary: 'スクウェア・エニックスがPC版の開発を正式に発表しました。',
      imageUrl: 'https://via.placeholder.com/600x338?text=FF7+Rebirth+PC',
      category: 'PC',
      date: '2025-05-06',
      slug: 'ff7-rebirth-pc-version',
    },
    {
      id: 14,
      title: '『Street Fighter 6』新キャラクター「橘」が参戦',
      summary: 'CAPCOMが『Street Fighter 6』に新たなファイターを追加。',
      imageUrl: 'https://via.placeholder.com/600x338?text=Street+Fighter+6',
      category: 'コンソール',
      date: '2025-05-05',
      slug: 'street-fighter-6-new-character',
    }
  ]);
};
