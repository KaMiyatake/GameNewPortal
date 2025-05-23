import { CategoryData } from '../utils/types';

export const categories: CategoryData[] = [
  {
    id: 1,
    name: 'コンソール',
    slug: 'console',
    description: 'PlayStation、Xbox、Nintendo Switchなどのコンソールゲーム情報'
  },
  {
    id: 2,
    name: 'PC',
    slug: 'pc',
    description: 'PCゲーム、Steam、Epic Games Storeの最新情報'
  },
  {
    id: 3,
    name: 'モバイル',
    slug: 'mobile',
    description: 'スマートフォン・タブレット向けゲーム情報'
  },
  {
    id: 4,
    name: 'インディー',
    slug: 'indie',
    description: 'インディーゲーム開発者による独創的なゲーム情報'
  },
  {
    id: 5,
    name: 'マルチプラットフォーム',
    slug: 'multi',
    description: '複数プラットフォームで展開されるゲーム情報'
  }
];
