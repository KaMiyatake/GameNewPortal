import { CategoryData } from '../utils/types';

export const categories: CategoryData[] = [
  {
    id: 1,
    name: 'PlayStation',
    slug: 'playstation',
    description: 'PS5・PS4の最新ゲーム情報、独占タイトル、アップデート情報',
    color: '#0070f3'
  },
  {
    id: 2,
    name: 'Switch',
    slug: 'switch',
    description: 'Nintendo Switch・Switch Liteの最新ゲーム情報、任天堂タイトル',
    color: '#e60012'
  },
  {
    id: 3,
    name: 'PC',
    slug: 'pc',
    description: 'PCゲーム、Steam、Epic Games Store、MOD情報',
    color: '#333333'
  },
  {
    id: 4,
    name: 'モバイル',
    slug: 'mobile',
    description: 'スマートフォン・タブレット向けゲーム、アプリゲーム情報',
    color: '#00a86b'
  },
  {
    id: 5,
    name: 'ゲーム賛否',
    slug: 'pros-cons',
    description: '話題のゲームを賛否両論で深掘り分析、レビュー',
    color: '#6c5ce7'
  },
  {
    id: 6,
    name: 'エンタメ',
    slug: 'entertainment',
    description: 'アニメ・マンガ、Vtuber、ゲーム関連エンタメ情報',
    color: '#fd79a8'
  },
  {
    id: 7,
    name: '業界ニュース',
    slug: 'industry',
    description: 'ゲーム業界動向、企業情報、市場分析、開発者情報',
    color: '#00b894'
  }
];
