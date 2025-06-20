// utils/smart-related-articles.ts
import { ArticleDetail } from '../data/utils/types';
//import { allArticles } from '../data/articles';

export class SmartRelatedArticlesManager {
  private articles: ArticleDetail[];
  
  constructor(articles: ArticleDetail[]) {
    this.articles = articles;
  }

/**
 * 指定された記事に関連する記事を自動で取得（自動生成優先）
 */
getSmartRelatedArticles(
  currentArticle: ArticleDetail, 
  limit: number = 4
): ArticleDetail[] {
  // まず自動生成で関連記事を取得
  const autoRelated = this.calculateAutoRelated(currentArticle, limit);
  
  // 手動設定がある場合、自動生成で足りない分を手動設定で補完
  if (currentArticle.relatedArticleIds && currentArticle.relatedArticleIds.length > 0) {
    const manualRelated = currentArticle.relatedArticleIds
      .map(id => this.articles.find(article => article.id === id))
      .filter(Boolean) as ArticleDetail[];
    
    // 自動生成の記事IDを取得
    const autoRelatedIds = new Set(autoRelated.map(a => a.id));
    
    // 手動設定の記事から、自動生成に含まれていないものを抽出
    const uniqueManualRelated = manualRelated.filter(article => 
      !autoRelatedIds.has(article.id)
    );
    
    // 自動生成が足りない場合は手動設定で補完
    if (autoRelated.length < limit) {
      const additionalCount = limit - autoRelated.length;
      const additionalManual = uniqueManualRelated.slice(0, additionalCount);
      return [...autoRelated, ...additionalManual];
    }
    
    return autoRelated;
  }
  
  // 手動設定がない場合は完全自動生成
  return autoRelated;
}

// utils/smart-related-articles.ts に追加メソッド

/**
 * 関連記事取得の詳細制御版
 */
getSmartRelatedArticlesAdvanced(
  currentArticle: ArticleDetail,
  options: {
    limit?: number;
    autoFirst?: boolean;    // 自動生成を優先するか
    autoCount?: number;     // 自動生成の記事数
    manualCount?: number;   // 手動設定の記事数
    allowDuplicates?: boolean; // 重複を許可するか
  } = {}
): ArticleDetail[] {
  const {
    limit = 4,
    autoFirst = true,
    autoCount,
    manualCount,
    allowDuplicates = false
  } = options;

  let autoRelated: ArticleDetail[] = [];
  let manualRelated: ArticleDetail[] = [];

  // 自動生成記事を取得
  const targetAutoCount = autoCount ?? Math.ceil(limit * 0.7); // デフォルトで70%を自動生成
  autoRelated = this.calculateAutoRelated(currentArticle, targetAutoCount);

  // 手動設定記事を取得
  if (currentArticle.relatedArticleIds && currentArticle.relatedArticleIds.length > 0) {
    const allManualRelated = currentArticle.relatedArticleIds
      .map(id => this.articles.find(article => article.id === id))
      .filter(Boolean) as ArticleDetail[];

    if (allowDuplicates) {
      manualRelated = allManualRelated;
    } else {
      // 重複を除去
      const autoIds = new Set(autoRelated.map(a => a.id));
      manualRelated = allManualRelated.filter(article => 
        !autoIds.has(article.id)
      );
    }

    // 手動設定の記事数を制限
    const targetManualCount = manualCount ?? (limit - autoRelated.length);
    manualRelated = manualRelated.slice(0, Math.max(0, targetManualCount));
  }

  // 結果を組み合わせ
  if (autoFirst) {
    const combined = [...autoRelated, ...manualRelated];
    return combined.slice(0, limit);
  } else {
    const combined = [...manualRelated, ...autoRelated];
    return combined.slice(0, limit);
  }
}

  /**
   * 自動関連記事計算
   */
  private calculateAutoRelated(
    currentArticle: ArticleDetail,
    limit: number,
    excludeIds: number[] = []
  ): ArticleDetail[] {
    const candidates = this.articles.filter(article => 
      article.id !== currentArticle.id && 
      !excludeIds.includes(article.id)
    );

    const scoredArticles = candidates.map(article => ({
      article,
      score: this.calculateRelevanceScore(currentArticle, article)
    }));

    return scoredArticles
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(item => item.article);
  }

  /**
   * 関連度スコア計算
   */
  private calculateRelevanceScore(
    currentArticle: ArticleDetail,
    candidateArticle: ArticleDetail
  ): number {
    let score = 0;

    // 1. カテゴリマッチング（重要度: 最高）
    const categoryMatches = currentArticle.categories.filter(cat => 
      candidateArticle.categories.includes(cat)
    ).length;
    score += categoryMatches * 20;

    // 2. タグマッチング（重要度: 非常に高）
    const currentTagsLower = currentArticle.tags.map(tag => tag.toLowerCase());
    const candidateTagsLower = candidateArticle.tags.map(tag => tag.toLowerCase());
    
    // 完全一致タグ
    const exactTagMatches = candidateTagsLower.filter(tag => 
      currentTagsLower.includes(tag)
    ).length;
    score += exactTagMatches * 15;
    
    // 部分一致タグ
    const partialTagMatches = candidateTagsLower.filter(cTag =>
      currentTagsLower.some(aTag => 
        aTag.includes(cTag) || cTag.includes(aTag)
      )
    ).length;
    score += partialTagMatches * 10;

    // 3. タイトルキーワードマッチング（重要度: 高）
    const currentKeywords = this.extractKeywords(currentArticle.title);
    const candidateKeywords = this.extractKeywords(candidateArticle.title);
    
    const titleMatches = currentKeywords.filter(keyword =>
      candidateKeywords.some(ck => 
        ck.includes(keyword) || keyword.includes(ck)
      )
    ).length;
    score += titleMatches * 12;

    // 4. サマリーキーワードマッチング（重要度: 中）
    const currentSummaryKeywords = this.extractKeywords(currentArticle.summary);
    const candidateSummaryKeywords = this.extractKeywords(candidateArticle.summary);
    
    const summaryMatches = currentSummaryKeywords.filter(keyword =>
      candidateSummaryKeywords.some(ck => 
        ck.includes(keyword) || keyword.includes(ck)
      )
    ).length;
    score += summaryMatches * 8;

    // 5. 著者マッチング（重要度: 低）
    if (currentArticle.author === candidateArticle.author) {
      score += 5;
    }

    // 6. 日付の近さ（重要度: 低）
    const daysDiff = Math.abs(
      (new Date(currentArticle.publishedAt).getTime() - 
       new Date(candidateArticle.publishedAt).getTime()) / (1000 * 60 * 60 * 24)
    );
    
    // 30日以内は追加スコア、それ以降は減点
    if (daysDiff <= 30) {
      score += (30 - daysDiff) * 0.5;
    } else if (daysDiff > 90) {
      score -= (daysDiff - 90) * 0.1;
    }

    // 7. 人気記事・注目記事ボーナス（重要度: 低）
    if (candidateArticle.popular) score += 3;
    if (candidateArticle.featured) score += 2;

    // 8. ゲーム固有キーワードマッチング
    const gameSeriesMatches = this.findGameSeriesMatches(
      currentArticle.title + ' ' + currentArticle.summary,
      candidateArticle.title + ' ' + candidateArticle.summary
    );
    score += gameSeriesMatches * 18;

    return score;
  }

  /**
   * キーワード抽出
   */
  private extractKeywords(text: string): string[] {
    return text.toLowerCase()
      .split(/[\s\-\[\]（）()「」『』・、。！？]+/)
      .filter(word => word.length >= 2)
      .filter(word => !this.isStopWord(word))
      .slice(0, 10);
  }

  /**
   * ゲームシリーズマッチング
   */
  private findGameSeriesMatches(text1: string, text2: string): number {
    const text1Lower = text1.toLowerCase();
    const text2Lower = text2.toLowerCase();
    
    const gameSeriesKeywords = [
      'ストリートファイター', 'ファイナルファンタジー', 'ドラゴンクエスト',
      'ゼルダ', 'マリオ', 'ポケモン', 'モンスターハンター', 'バイオハザード',
      'エルデンリング', 'ダークソウル', 'ペルソナ', '原神', 'フォートナイト',
      'マインクラフト', 'スプラトゥーン', 'メタルギア', 'グランツーリスモ',
      'アイドルマスター', 'シャドウバース', 'ホロライブ', 'にじさんじ'
    ];
    
    let matches = 0;
    gameSeriesKeywords.forEach(keyword => {
      if (text1Lower.includes(keyword) && text2Lower.includes(keyword)) {
        matches++;
      }
    });
    
    return matches;
  }

  /**
   * ストップワード判定
   */
  private isStopWord(word: string): boolean {
    const stopWords = [
      'の', 'に', 'は', 'を', 'が', 'で', 'と', 'から', 'まで', 'より',
      'こと', 'もの', 'ため', 'など', 'について', 'による', 'において',
      'する', 'した', 'される', 'れる', 'ある', 'いる', 'なる', 'この',
      'その', 'あの', 'どの', 'すべて', 'みんな', 'ここ', 'そこ', 'あそこ',
      'それ', 'これ', 'あれ', 'どれ', 'だけ', 'でも', 'しか', 'また',
      'ゲーム', '情報', 'ニュース', '発表', '公開', '実装', '配信', '更新',
      '登場', '参戦', '追加', '発売', 'リリース', '決定', '予定'
    ];
    return stopWords.includes(word);
  }
}
