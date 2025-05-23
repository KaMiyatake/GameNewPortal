import { NewsItem, NewsItemDetail, Category } from '../types';

// ページネーション用の型定義
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

// 実際の記事データを定義
const actualNewsData: NewsItem[] = [
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
  {
    id: 3,
    title: '『GTA VI』ロックスターが2025年秋リリースを正式発表',
    summary: 'ロックスター・ゲームズが待望の『グランド・セフト・オート VI』の発売時期を正式に発表しました。',
    imageUrl: 'https://placehold.co/600x338?text=GTA+VI+Release&font=montserrat',
    category: 'コンソール',
    date: '2025-05-21',
    slug: 'gta-vi-official-release-date',
  },
  {
    id: 4,
    title: '『フォートナイト』チャプター5シーズン3開始、日本神話テーマ',
    summary: 'Epic Gamesが『フォートナイト』の新シーズンを開始。日本の神話をテーマにした新マップが登場します。',
    imageUrl: 'https://placehold.co/600x338?text=Fortnite+Japan&font=montserrat',
    category: 'マルチプラットフォーム',
    date: '2025-05-20',
    slug: 'fortnite-chapter5-season3-japan',
  },
  {
    id: 5,
    title: '『ファイナルファンタジーVII リバース』PC版が2025年12月発売決定',
    summary: 'スクウェア・エニックスが『ファイナルファンタジーVII リバース』のPC版発売を正式発表しました。',
    imageUrl: 'https://placehold.co/600x338?text=FF7+Rebirth+PC&font=montserrat',
    category: 'PC',
    date: '2025-05-19',
    slug: 'ff7-rebirth-pc-version',
  },
  {
    id: 6,
    title: '『サイバーパンク2077』拡張パック第2弾制作開始を発表',
    summary: 'CD Projekt REDが『サイバーパンク2077』の新たな拡張パックの制作開始を発表しました。',
    imageUrl: 'https://placehold.co/600x338?text=Cyberpunk+Expansion&font=montserrat',
    category: 'PC',
    date: '2025-05-18',
    slug: 'cyberpunk-2077-expansion-2',
  },
  {
    id: 7,
    title: '『ニンテンドースイッチ2』2025年内発売へ、4K対応とマルチディスプレイ機能',
    summary: '任天堂の次世代ゲーム機『ニンテンドースイッチ2』の詳細スペックが明らかになりました。',
    imageUrl: 'https://placehold.co/600x338?text=Nintendo+Switch+2&font=montserrat',
    category: 'コンソール',
    date: '2025-05-17',
    slug: 'nintendo-switch-2-specs',
  },
  {
    id: 8,
    title: '『ストリートファイター6』新キャラクター「隆」の弟子登場',
    summary: 'カプコンが『ストリートファイター6』に隆の新たな弟子キャラクターを追加すると発表しました。',
    imageUrl: 'https://placehold.co/600x338?text=Street+Fighter+6&font=montserrat',
    category: 'コンソール',
    date: '2025-05-16',
    slug: 'street-fighter-6-new-character',
  },
  {
    id: 9,
    title: '『マインクラフト』大型アップデート「深淵の世界」実装開始',
    summary: 'Mojang Studiosが『マインクラフト』に新次元「深淵の世界」を追加する大型アップデートを実装しました。',
    imageUrl: 'https://placehold.co/600x338?text=Minecraft+Abyss&font=montserrat',
    category: 'マルチプラットフォーム',
    date: '2025-05-15',
    slug: 'minecraft-abyss-world-update',
  },
  {
    id: 11,
    title: '『マインクラフト』大型アップデート「深淵の世界」実装開始',
    summary: 'Mojang Studiosが『マインクラフト』に新次元「深淵の世界」を追加する大型アップデートを実装しました。',
    imageUrl: 'https://placehold.co/600x338?text=Minecraft+Abyss&font=montserrat',
    category: 'マルチプラットフォーム',
    date: '2025-05-15',
    slug: 'minecraft-abyss-world-update',
  },
  {
    id: 12,
    title: '『マインクラフト』大型アップデート「深淵の世界」実装開始',
    summary: 'Mojang Studiosが『マインクラフト』に新次元「深淵の世界」を追加する大型アップデートを実装しました。',
    imageUrl: 'https://placehold.co/600x338?text=Minecraft+Abyss&font=montserrat',
    category: 'マルチプラットフォーム',
    date: '2025-05-15',
    slug: 'minecraft-abyss-world-update',
  },
  {
    id: 10,
    title: '『原神』新地域「フォンテーヌ」の水中探索システム詳細公開',
    summary: 'miHoYoが『原神』の新地域「フォンテーヌ」で追加される水中探索システムの詳細を公開しました。',
    imageUrl: 'https://placehold.co/600x338?text=Genshin+Fontaine&font=montserrat',
    category: 'マルチプラットフォーム',
    date: '2025-05-14',
    slug: 'genshin-fontaine-underwater-system',
  },
];

// ページ付きでニュースを取得する関数
export const getLatestNewsPaginated = (page: number = 1, limit: number = 10): Promise<PaginatedResponse<NewsItem>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // 実際の記事データを使用
      const totalItems = actualNewsData.length;
      const totalPages = Math.ceil(totalItems / limit);
      
      // ページネーション処理
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedNews = actualNewsData.slice(startIndex, endIndex);
      
      resolve({
        data: paginatedNews,
        pagination: {
          currentPage: page,
          totalPages,
          totalItems,
          itemsPerPage: limit,
        },
      });
    }, 300); // APIレスポンス時間をシミュレート
  });
};

// // ページ付きでニュースを取得する関数
// export const getLatestNewsPaginated = (page: number = 1, limit: number = 10): Promise<PaginatedResponse<NewsItem>> => {
//   // 実際のAPIでは、ここでHTTPリクエストを送信
//   // 今回はサンプル実装のため、ダミーデータを返す
  
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       // 実際のAPIレスポンスをシミュレート
//       const totalItems = 50; // 総記事数
//       const totalPages = Math.ceil(totalItems / limit);
      
//       // ダミーデータを生成（実際の実装では不要）
//       const allNews: NewsItem[] = Array.from({ length: totalItems }, (_, index) => ({
//         id: index + 1,
//         title: `サンプル記事 ${index + 1}`,
//         summary: `これは記事 ${index + 1} の要約です。`,
//         imageUrl: `https://via.placeholder.com/600x338?text=記事${index + 1}`,
//         category: ['コンソール', 'PC', 'モバイル', 'インディー'][index % 4],
//         date: new Date(Date.now() - index * 86400000).toISOString().split('T')[0],
//         slug: `sample-news-${index + 1}`,
//       }));
      
//       // ページネーション処理
//       const startIndex = (page - 1) * limit;
//       const endIndex = startIndex + limit;
//       const paginatedNews = allNews.slice(startIndex, endIndex);
      
//       resolve({
//         data: paginatedNews,
//         pagination: {
//           currentPage: page,
//           totalPages,
//           totalItems,
//           itemsPerPage: limit,
//         },
//       });
//     }, 300); // APIレスポンス時間をシミュレート
//   });
// };

// // 仮のニュースデータ（後でAPIに置き換え）
// export const getLatestNews = (): Promise<NewsItem[]> => {
//   return Promise.resolve([
//     {
//       id: 1,
//       title: '『ゼルダの伝説』最新作、発売日が決定',
//       summary: '任天堂は本日、『ゼルダの伝説』シリーズの最新作の発売日を正式に発表しました。',
//       imageUrl: 'https://placehold.co/400x250?text=Zelda&font=montserrat',
//       category: 'コンソール',
//       date: '2025-05-21',
//       slug: 'zelda-new-release-date',
//     },
//     {
//       id: 2,
//       title: '『Elden Ring』大型DLCの詳細が明らかに',
//       summary: 'フロムソフトウェアは『Elden Ring』の大型DLCについての新情報を公開しました。',
//       imageUrl: 'https://placehold.co/400x250?text=Elden+Ring&font=montserrat',
//       category: 'PC',
//       date: '2025-05-20',
//       slug: 'elden-ring-dlc-details',
//     },
//     {
//       id: 13,
//       title: '『Final Fantasy VII Rebirth』PC版が発表',
//       summary: 'スクウェア・エニックスがPC版の開発を正式に発表しました。',
//       imageUrl: 'https://placehold.co/400x250?text=FF7+Rebirth&font=montserrat',
//       category: 'PC',
//       date: '2025-05-06',
//       slug: 'final-fantasy-vii-rebirth-pc',
//     },
//     {
//       id: 14,
//       title: '『Street Fighter 6』大型アップデート配信',
//       summary: 'CAPCOMが新キャラクターと新モードを含む大型アップデートを発表。',
//       imageUrl: 'https://placehold.co/400x250?text=SF6&font=montserrat',
//       category: 'コンソール',
//       date: '2025-05-05',
//       slug: 'street-fighter-6-update',
//     },
//     {
//       id: 15,
//       title: '『鉄拳8』発売日決定、新キャラクター情報も',
//       summary: 'バンダイナムコが『鉄拳8』の発売日と新キャラクターの情報を公開しました。',
//       imageUrl: 'https://placehold.co/400x250?text=Tekken8&font=montserrat',
//       category: 'コンソール',
//       date: '2025-05-03',
//       slug: 'tekken-8-release-date',
//     },
//     {
//       id: 16,
//       title: '『Dragon Age: The Veilguard』開発進捗報告',
//       summary: 'BioWareが新作RPG『Dragon Age: The Veilguard』の開発状況について報告。',
//       imageUrl: 'https://placehold.co/400x250?text=Dragon+Age&font=montserrat',
//       category: 'PC',
//       date: '2025-05-02',
//       slug: 'dragon-age-development-update',
//     },
//     {
//       id: 17,
//       title: '『Starfield』新拡張コンテンツの詳細公開',
//       summary: 'Bethesdaが『Starfield』の新拡張コンテンツ「Shattered Space」の詳細を発表。',
//       imageUrl: 'https://placehold.co/400x250?text=Starfield&font=montserrat',
//       category: 'PC',
//       date: '2025-05-01',
//       slug: 'starfield-expansion-details',
//     },
//     {
//       id: 18,
//       title: '『Call of Duty』2025年の新作情報リーク',
//       summary: '『Call of Duty』シリーズの次回作に関する情報がリークされ、話題に。',
//       imageUrl: 'https://placehold.co/400x250?text=CoD&font=montserrat',
//       category: 'マルチプラットフォーム',
//       date: '2025-04-30',
//       slug: 'call-of-duty-2025-leak',
//     },
//     // 他の記事も同様...
//   ]);
// };

// 既存の関数（後方互換性のため残す）
export const getLatestNews = (): Promise<NewsItem[]> => {
  return getLatestNewsPaginated(1, 10).then(response => response.data);
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
    'final-fantasy-vii-rebirth-pc': {
      id: 13,
      title: '『Final Fantasy VII Rebirth』PC版が発表',
      summary: 'スクウェア・エニックスがPC版の開発を正式に発表しました。',
      imageUrl: 'https://placehold.co/400x250?text=FF7+Rebirth&font=montserrat',
      category: 'PC',
      date: '2025-05-06',
      slug: 'final-fantasy-vii-rebirth-pc',
      author: '佐藤花子',
      content: `<p>スクウェア・エニックスは本日、人気RPG『Final Fantasy VII Rebirth』のPC版を正式発表しました。</p><p>PS5版で好評を博した高品質なグラフィックスはPC版でさらに進化し、mod対応も予定されているとのことです。</p><p>発売は2025年冬を予定しています。</p>`,
      tags: ['Final Fantasy', 'スクウェア・エニックス', 'PC', 'RPG'],
      relatedNews: [
        {
          id: 7,
          title: '『FF7 Rebirth』追加コンテンツ発表',
          summary: 'スクウェア・エニックスが新たなDLCの詳細を公開。',
          imageUrl: 'https://placehold.co/80x50?text=FF7+DLC&font=montserrat',
          category: 'コンソール',
          date: '2025-05-15',
          slug: 'ff7-rebirth-dlc',
        }
      ]
    },
    'street-fighter-6-update': {
      id: 14,
      title: '『Street Fighter 6』大型アップデート配信',
      summary: 'CAPCOMが新キャラクターと新モードを含む大型アップデートを発表。',
      imageUrl: 'https://placehold.co/400x250?text=SF6&font=montserrat',
      category: 'コンソール',
      date: '2025-05-05',
      slug: 'street-fighter-6-update',
      author: '中村剛',
      content: `<p>CAPCOMは『Street Fighter 6』の大型アップデートを発表しました。</p><p>新キャラクター「橘」の参戦や、新たなバトルモード「Team Battle」の追加など、多数の新コンテンツが含まれています。</p><p>アップデートは来週配信予定で、無料で提供されます。</p>`,
      tags: ['Street Fighter', 'CAPCOM', '格闘ゲーム', 'アップデート'],
      relatedNews: [
        {
          id: 15,
          title: '『鉄拳8』発売日決定',
          summary: 'バンダイナムコが『鉄拳8』の発売日を発表。',
          imageUrl: 'https://placehold.co/80x50?text=Tekken8&font=montserrat',
          category: 'コンソール',
          date: '2025-05-03',
          slug: 'tekken-8-release-date',
        }
      ]
    },
    'tekken-8-release-date': {
      id: 15,
      title: '『鉄拳8』発売日決定、新キャラクター情報も',
      summary: 'バンダイナムコが『鉄拳8』の発売日と新キャラクターの情報を公開しました。',
      imageUrl: 'https://placehold.co/400x250?text=Tekken8&font=montserrat',
      category: 'コンソール',
      date: '2025-05-03',
      slug: 'tekken-8-release-date',
      author: '高橋健一',
      content: `<p>バンダイナムコエンターテインメントは本日、『鉄拳8』の発売日を2025年8月15日に決定したことを発表しました。</p><p>また、新キャラクター「レイヴン」の参戦も明らかになり、その独特の戦闘スタイルが注目を集めています。</p><p>予約特典として、クラシックコスチュームパックが用意されています。</p>`,
      tags: ['鉄拳', 'バンダイナムコ', '格闘ゲーム'],
      relatedNews: [
        {
          id: 14,
          title: '『Street Fighter 6』アップデート情報',
          imageUrl: 'https://placehold.co/80x50?text=SF6&font=montserrat',
          category: 'コンソール',
          date: '2025-05-05',
          summary: '新キャラクター追加のアップデート情報',
          slug: 'street-fighter-6-update'
        }
      ]
    },

    'dragon-age-development-update': {
      id: 16,
      title: '『Dragon Age: The Veilguard』開発進捗報告',
      summary: 'BioWareが新作RPG『Dragon Age: The Veilguard』の開発状況について報告。',
      imageUrl: 'https://placehold.co/400x250?text=Dragon+Age&font=montserrat',
      category: 'PC',
      date: '2025-05-02',
      slug: 'dragon-age-development-update',
      author: '田中美咲',
      content: `<p>BioWareは『Dragon Age: The Veilguard』の開発が順調に進んでいることを報告しました。</p><p>本作では、シリーズ史上最大規模のオープンワールドが実装され、プレイヤーの選択がより重要な意味を持つようになるとのことです。</p><p>また、新たなコンバットシステムの詳細も明らかになり、戦術的な戦闘が強化されています。</p>`,
      tags: ['Dragon Age', 'BioWare', 'RPG', 'オープンワールド'],
      relatedNews: [
        {
          id: 17,
          title: '『Starfield』新拡張コンテンツ情報',
          imageUrl: 'https://placehold.co/80x50?text=Starfield&font=montserrat',
          category: 'PC',
          date: '2025-05-01',
          summary: 'Bethesdaの新作RPGの最新情報',
          slug: 'starfield-expansion-details'
        }
      ]
    },

    'starfield-expansion-details': {
      id: 17,
      title: '『Starfield』新拡張コンテンツの詳細公開',
      summary: 'Bethesdaが『Starfield』の新拡張コンテンツ「Shattered Space」の詳細を発表。',
      imageUrl: 'https://placehold.co/400x250?text=Starfield&font=montserrat',
      category: 'PC',
      date: '2025-05-01',
      slug: 'starfield-expansion-details',
      author: '山本義明',
      content: `<p>Bethesda Game Studiosは『Starfield』の新拡張コンテンツ「Shattered Space」の詳細を発表しました。</p><p>本DLCでは、謎の宇宙現象「シャタードゾーン」を探索し、新たな文明との出会いが待っています。</p><p>また、新たな宇宙船カスタマイズオプションや、複数の居住可能な惑星が追加されます。</p>`,
      tags: ['Starfield', 'Bethesda', 'RPG', 'DLC'],
      relatedNews: [
        {
          id: 16,
          title: '『Dragon Age』開発進捗',
          imageUrl: 'https://placehold.co/80x50?text=Dragon+Age&font=montserrat',
          category: 'PC',
          date: '2025-05-02',
          summary: 'BioWareの新作RPGの開発状況',
          slug: 'dragon-age-development-update'
        }
      ]
    },

    'call-of-duty-2025-leak': {
      id: 18,
      title: '『Call of Duty』2025年の新作情報リーク',
      summary: '『Call of Duty』シリーズの次回作に関する情報がリークされ、話題に。',
      imageUrl: 'https://placehold.co/400x250?text=CoD&font=montserrat',
      category: 'マルチプラットフォーム',
      date: '2025-04-30',
      slug: 'call-of-duty-2025-leak',
      author: '佐々木隆',
      content: `<p>著名なリーカーによって、2025年の『Call of Duty』新作に関する詳細な情報が明らかになりました。</p><p>次回作は現代戦を舞台に、より戦術的なゲームプレイが特徴になるとされています。</p><p>また、バトルロイヤルモードも大幅にリニューアルされ、新たな要素が追加される予定とのことです。</p>`,
      tags: ['Call of Duty', 'Activision', 'FPS', 'リーク情報'],
      relatedNews: [
        {
          id: 4,
          title: '『Fortnite』新シーズン情報',
          imageUrl: 'https://placehold.co/80x50?text=Fortnite&font=montserrat',
          category: 'マルチプラットフォーム',
          date: '2025-05-18',
          summary: 'バトルロイヤルゲームの最新アップデート',
          slug: 'fortnite-new-season'
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
