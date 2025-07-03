// data/amazon-products.ts
export interface GameProductLite {
  asin: string;
  title: string;
  imageUrl: string;
  categories?: string[]; // 表示制御用（オプション）
  platforms?: string[]; // 表示制御用（オプション）
}

export const gameProducts: GameProductLite[] = [
  {
    asin: "B0CKYM15RJ",
    title: "PlayStation 5 (CFI-2000A01)",
    imageUrl: "https://m.media-amazon.com/images/I/51KBX8ycq1L._AC_SY500_.jpg",
    categories: ["playstation", "hardware"],
    platforms: ["PlayStation"]
  },
  {
    asin: "B0DJBYD71H",
    title: "【純正品】DualSense ワイヤレスコントローラー クロマ パール（CFI-ZCT1J12）",
    imageUrl: "https://m.media-amazon.com/images/I/61MUWPS3g6L._AC_SX679_.jpg",
    categories: ["playstation", "accessory"],
    platforms: ["PlayStation"]
  },
  {
    asin: "B0F6D1S76Y",
    title: "【PS5】Ghost of Yōtei( ゴースト・オブ・ヨウテイ )コレクターズエディション【早期購入特典】",
    imageUrl: "https://m.media-amazon.com/images/I/91OsscY1bEL._AC_SX679_.jpg",
    categories: ["playstation", "action-adventure"],
    platforms: ["PlayStation"]
  },
  {
    asin: "B0CJT1NHWD",
    title: "【純正品】PlayStation Portal リモートプレーヤー(CFIJ-18000)",
    imageUrl: "https://m.media-amazon.com/images/I/51h4Rb9tr8L._AC_SX679_.jpg",
    categories: ["playstation", "hardware"],
    platforms: ["PlayStation"]
  },
  {
    asin: "B0DT3QWDMZ",
    title: "【純正品】PlayStation Portal リモートプレーヤー ミッドナイト ブラック(CFIJ-18001)",
    imageUrl: "https://m.media-amazon.com/images/I/61FQfrGWodL._AC_SX679_.jpg",
    categories: ["playstation", "hardware"],
    platforms: ["PlayStation"]
  },
  {
    asin: "B0DWZVYNM3",
    title: "【PS5】ELDEN RING NIGHTREIGN",
    imageUrl: "https://m.media-amazon.com/images/I/819xL53nK6L._AC_SX679_.jpg",
    categories: ["playstation", "action-adventure"],
    platforms: ["PlayStation"]
  },
  {
    asin: "B0DWZP6V4M",
    title: "【PS5】ELDEN RING NIGHTREIGN コレクターズエディション【数量限定特典】",
    imageUrl: "https://m.media-amazon.com/images/I/817MzqMhb3L._AC_SX679_.jpg",
    categories: ["playstation", "action-adventure"],
    platforms: ["PlayStation"]
  },
  {
    asin: "B098B8PFXY",
    title: "Nintendo Switch（有機ELモデル）",
    imageUrl: "https://m.media-amazon.com/images/I/41AZYiorO6S._AC_SY500_.jpg",
    categories: ["switch", "hardware"],
    platforms: ["Nintendo Switch"]
  },
  {
    asin: "B01NCX3W3O",
    title: "Nintendo Switch Pro コントローラー",
    imageUrl: "https://m.media-amazon.com/images/I/61drpi3cYUL._AC_SY500_.jpg",
    categories: ["switch", "accessory"],
    platforms: ["Nintendo Switch"]
  },
  {
    asin: "B07VCHKRVC",
    title: "【任天堂純正品】Joy-Con(L) ブルー/(R) ネオンイエロー",
    imageUrl: "https://m.media-amazon.com/images/I/51sRtKpMGIL._AC_SX679_.jpg",
    categories: ["switch", "accessory"],
    platforms: ["Nintendo Switch"]
  },
  {
    asin: "B07D131MS4",
    title: "Minecraft (マインクラフト) - Switch",
    imageUrl: "https://m.media-amazon.com/images/I/81c+Z4iQAAL._AC_SY879_.jpg",
    categories: ["switch", "action-adventure"],
    platforms: ["Nintendo Switch"]
  },
  {
    asin: "B0FCG3F2W6",
    title: "ソニックレーシング クロスワールド セガストア限定版",
    imageUrl: "https://m.media-amazon.com/images/I/510h0NHB+uL._AC_.jpg",
    categories: ["playstation", "racing"],
    platforms: ["PlayStation"]
  },
  {
    asin: "B0BV94KXFR",
    title: "ゼルダの伝説 ティアーズ オブ ザ キングダム",
    imageUrl: "https://m.media-amazon.com/images/I/61uY-USWknL._AC_SY500_.jpg",
    categories: ["switch", "action-adventure"],
    platforms: ["Nintendo Switch"]
  }
];

// カテゴリ別の商品取得ヘルパー関数
export const getProductsByCategory = (category: string, limit: number = 3): GameProductLite[] => {
  return gameProducts
    .filter(product => product.categories?.includes(category))
    .slice(0, limit);
};

// プラットフォーム別の商品取得ヘルパー関数
export const getProductsByPlatform = (platform: string, limit: number = 3): GameProductLite[] => {
  return gameProducts
    .filter(product => product.platforms?.some(p => 
      p.toLowerCase().includes(platform.toLowerCase())
    ))
    .slice(0, limit);
};

// ランダムな商品取得
export const getRandomProducts = (limit: number = 3): GameProductLite[] => {
  const shuffled = [...gameProducts].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, limit);
};

// src/data/amazon-products.ts に追加
// ASINから商品を取得する関数
export const getProductByAsin = (asin: string): GameProductLite | null => {
  return gameProducts.find(product => product.asin === asin) || null;
};

// 複数ASINから商品を取得する関数
export const getProductsByAsins = (asins: string[]): GameProductLite[] => {
  return asins
    .map(asin => getProductByAsin(asin))
    .filter((product): product is GameProductLite => product !== null);
};

// 記事関連商品を取得する関数（カテゴリ・プラットフォーム・手動指定の組み合わせ）
export const getArticleRelatedProducts = (
  categories: string[],
  platforms: string[],
  specificAsins: string[] = [],
  limit: number = 3
): GameProductLite[] => {
  // 手動指定のASINがある場合は優先
  const specificProducts = getProductsByAsins(specificAsins);
  
  if (specificProducts.length >= limit) {
    return specificProducts.slice(0, limit);
  }
  
  // 不足分をカテゴリ・プラットフォームから補完
  const remainingCount = limit - specificProducts.length;
  const autoProducts = gameProducts
    .filter(product => 
      !specificAsins.includes(product.asin) && // 手動指定商品は除外
      (
        product.categories?.some(cat => categories.includes(cat)) ||
        product.platforms?.some(platform => platforms.includes(platform))
      )
    )
    .slice(0, remainingCount);
  
  return [...specificProducts, ...autoProducts];
};
