import React from 'react';
import Layout from '../components/Layout/Layout';
import SEOHead from '../components/SEO/SEOHead';
import styles from '../styles/About.module.css';

const About: React.FC = () => {
  return (
    <>
      <SEOHead
        title="サイトについて | ゲーム賛否"
        description="「ゲーム賛否」は賛否両論で読むゲームメディアです。最新ゲーム情報を中立的な視点で分析し、購入前の判断材料を提供します。"
        keywords={['ゲーム賛否', 'サイトについて', 'ゲームメディア', '賛否両論', 'ゲームレビュー']}
        canonicalUrl={`${process.env.NEXT_PUBLIC_BASE_URL || ''}/about`}
      />
      <Layout>
        <div className={styles.container}>
          <div className={styles.aboutContent}>
            <div className={styles.heroSection}>
              <h1 className={styles.pageTitle}>サイトについて</h1>
              <p className={styles.heroText}>
                「ゲーム賛否」は、賛否両論で読むゲームメディアです
              </p>
            </div>

            <div className={styles.contentSection}>
              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>私たちのミッション</h2>
                <div className={styles.sectionContent}>
                  <p>
                    ゲーム業界は日々進化し続けており、新しいタイトルやアップデート、業界の動向が次々と生まれています。
                    しかし、情報があふれる中で「本当に知りたい情報」を見つけるのは簡単ではありません。
                  </p>
                  <p>
                    「ゲーム賛否」は、ゲームに関する情報を<strong>「賛」と「否」の両面</strong>から客観的に分析し、
                    読者の皆様が適切な判断を下せるよう支援することを目的としています。
                  </p>
                </div>
              </section>

              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>サイトの特徴</h2>
                <div className={styles.featureGrid}>
                  <div className={styles.featureCard}>
                    <div className={styles.featureIcon}>⚖️</div>
                    <h3>公平な視点</h3>
                    <p>特定のプラットフォームやメーカーに偏らない、中立的な立場からの情報提供を心がけています。</p>
                  </div>
                  <div className={styles.featureCard}>
                    <div className={styles.featureIcon}>📊</div>
                    <h3>データ重視</h3>
                    <p>主観的な感想だけでなく、売上データやレビュースコアなど客観的な指標も重視しています。</p>
                  </div>
                  <div className={styles.featureCard}>
                    <div className={styles.featureIcon}>🎯</div>
                    <h3>購入判断サポート</h3>
                    <p>「買うべきか、待つべきか」を判断するための材料となる情報を分かりやすく整理して提供します。</p>
                  </div>
                  <div className={styles.featureCard}>
                    <div className={styles.featureIcon}>⚡</div>
                    <h3>速報性</h3>
                    <p>業界の最新動向を素早くキャッチし、重要な情報をタイムリーにお届けします。</p>
                  </div>
                </div>
              </section>

              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>コンテンツ方針</h2>
                <div className={styles.sectionContent}>
                  <div className={styles.policyGrid}>
                    <div className={styles.policyItem}>
                      <h3>🔥 賛成意見</h3>
                      <p>ゲームの魅力的な点、革新的な要素、プレイヤーに与える価値を積極的に評価</p>
                    </div>
                    <div className={styles.policyItem}>
                      <h3>❄️ 反対意見</h3>
                      <p>問題点、改善の余地、プレイヤーが感じる不満点を建設的に指摘</p>
                    </div>
                  </div>
                  <p>
                    どちらの視点も重要であり、バランスの取れた情報提供こそが、
                    読者の皆様にとって価値のあるコンテンツになると信じています。
                  </p>
                </div>
              </section>

              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>取り扱いコンテンツ</h2>
                <div className={styles.sectionContent}>
                  <ul className={styles.contentList}>
                    <li><strong>最新ニュース</strong> - ゲーム業界の速報・発表・アップデート情報</li>
                    <li><strong>ゲームレビュー</strong> - 新作タイトルの詳細分析と評価</li>
                    <li><strong>業界分析</strong> - 市場動向、売上データ、トレンド分析</li>
                    <li><strong>プラットフォーム比較</strong> - PC、コンソール、モバイルゲームの横断的分析</li>
                    <li><strong>各種エンタメ</strong> - 漫画、アニメ、YouTube</li>
                    <li><strong>eスポーツ情報</strong> - 競技シーンの最新動向</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>編集方針</h2>
                <div className={styles.sectionContent}>
                  <div className={styles.editorialPolicy}>
                    <div className={styles.policyPoint}>
                      <h4>正確性の確保</h4>
                      <p>情報の出典を明確にし、複数のソースから事実確認を行います</p>
                    </div>
                    <div className={styles.policyPoint}>
                      <h4>透明性の維持</h4>
                      <p>レビュー提供品や広告の場合は明記し、読者との信頼関係を重視します</p>
                    </div>
                    <div className={styles.policyPoint}>
                      <h4>継続的な更新</h4>
                      <p>ゲームのアップデートに合わせて記事内容も適宜更新します</p>
                    </div>
                  </div>
                </div>
              </section>

              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>お問い合わせ</h2>
                <div className={styles.sectionContent}>
                  <p>
                    「ゲーム賛否」に関するご意見、ご要望、取材依頼などがございましたら、
                    お気軽にお問い合わせください。
                  </p>
                  <div className={styles.contactInfo}>
                    <p><strong>運営チーム:</strong> ゲーム賛否編集部（担当：Miyatake）</p>
                    <p><strong>設立:</strong> 2025年</p>
                    <p><strong>更新頻度:</strong> 稼働日更新</p>
                  </div>
                  <p className={styles.thankYou}>
                    皆様に愛される、価値あるゲームメディアを目指してまいります。<br />
                    今後ともよろしくお願いいたします。
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default About;
