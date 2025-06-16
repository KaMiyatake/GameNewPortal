import React from 'react';
import Layout from '../components/Layout/Layout';
import SEOHead from '../components/SEO/SEOHead';
import styles from '../styles/About.module.css';
import Link from 'next/link';

const Advertising: React.FC = () => {
  return (
    <>
      <SEOHead
        title="広告掲載について | ゲーム賛否"
        description="「ゲーム賛否」の広告掲載について。アフィリエイトパートナープログラム、広告料金、掲載基準、お申し込み方法を詳しく説明しています。"
        keywords={['広告掲載', 'アフィリエイト', '広告料金', 'メディア掲載', 'ゲーム賛否']}
        canonicalUrl={`${process.env.NEXT_PUBLIC_BASE_URL || ''}/advertising`}
      />
      <Layout>
        <div className={styles.container}>
          <div className={styles.aboutContent}>
            <div className={styles.heroSection}>
              <h1 className={styles.pageTitle}>広告掲載について</h1>
              <p className={styles.heroText}>
                ゲーム業界のプロモーションパートナーとして
              </p>
            </div>

            <div className={styles.contentSection}>
              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>媒体概要</h2>
                <div className={styles.sectionContent}>
                  <p>
                    「ゲーム賛否」は、賛否両論の視点でゲーム情報を分析する専門メディアです。
                    中立的な立場から、ゲーム愛好家に価値ある情報を提供しています。
                  </p>
                  
                  <div className={styles.featureGrid}>
                    <div className={styles.featureCard}>
                      <div className={styles.featureIcon}>👥</div>
                      <h3>ターゲット層</h3>
                      <p>18-45歳のゲーム愛好家、購入検討者、業界関係者</p>
                    </div>
                    <div className={styles.featureCard}>
                      <div className={styles.featureIcon}>📊</div>
                      <h3>月間PV</h3>
                      <p>成長中の新メディア（詳細は個別にお問い合わせください）</p>
                    </div>
                    <div className={styles.featureCard}>
                      <div className={styles.featureIcon}>🎯</div>
                      <h3>コンテンツ特性</h3>
                      <p>購入前の比較検討、詳細分析、トレンド解説</p>
                    </div>
                    <div className={styles.featureCard}>
                      <div className={styles.featureIcon}>⚖️</div>
                      <h3>編集方針</h3>
                      <p>公正中立、賛否両論、データ重視の客観的分析</p>
                    </div>
                  </div>
                </div>
              </section>

              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>広告掲載メニュー</h2>
                <div className={styles.sectionContent}>
                  <p>
                    様々な形態での広告掲載を承っております。
                    ゲーム業界に特化したメディアとして、効果的なプロモーションをご提案いたします。
                  </p>

                  <h3>ディスプレイ広告</h3>
                  <div className={styles.policyGrid}>
                    <div className={styles.policyItem}>
                      <h3>🖥️ バナー広告</h3>
                      <p>サイト内の主要位置に表示される画像・動画広告。レスポンシブ対応で全デバイスに最適化</p>
                    </div>
                    <div className={styles.policyItem}>
                      <h3>📱 ネイティブ広告</h3>
                      <p>記事一覧に自然に溶け込む形式の広告。高いクリック率を実現</p>
                    </div>
                    <div className={styles.policyItem}>
                      <h3>🎬 動画広告</h3>
                      <p>ゲームトレーラーや製品紹介動画の掲載。視覚的インパクトで訴求力を最大化</p>
                    </div>
                    <div className={styles.policyItem}>
                      <h3>🎯 ターゲティング広告</h3>
                      <p>カテゴリ別、デバイス別、時間帯別など、細かいターゲティングが可能</p>
                    </div>
                  </div>

                  <h3>コンテンツマーケティング</h3>
                  <div className={styles.editorialPolicy}>
                    <div className={styles.policyPoint}>
                      <h4>スポンサード記事</h4>
                      <p>ゲームレビュー、攻略記事、開発者インタビューなど、読者に価値を提供する記事形式の広告</p>
                    </div>
                    <div className={styles.policyPoint}>
                      <h4>製品紹介記事</h4>
                      <p>新作ゲーム、ハードウェア、サービスの詳細紹介記事。賛否両論の視点で公正に評価</p>
                    </div>
                    <div className={styles.policyPoint}>
                      <h4>イベント取材</h4>
                      <p>ゲームイベント、発表会、展示会の取材記事。リアルタイムでの情報発信も可能</p>
                    </div>
                  </div>

                  <br />

                  <h3>SNS・外部連携</h3>
                  <ul className={styles.contentList}>
                    <li><strong>SNS投稿</strong> - Twitter、Facebook等での情報拡散</li>
                    <li><strong>YouTube連携</strong> - 動画コンテンツとの連動企画</li>
                    <li><strong>ライブ配信</strong> - ゲーム実況、新作紹介の生配信</li>
                    <li><strong>メルマガ配信</strong> - 登録読者への直接的な情報発信</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>掲載基準・ガイドライン</h2>
                <div className={styles.sectionContent}>
                  <p>
                    読者の皆様に価値ある情報を提供するため、以下の基準に基づいて広告掲載を審査しています。
                  </p>

                  <h3>掲載可能な広告</h3>
                  <div className={styles.featureGrid}>
                    <div className={styles.featureCard}>
                      <div className={styles.featureIcon}>🎮</div>
                      <h3>ゲーム関連</h3>
                      <p>PCゲーム、コンシューマーゲーム、モバイルゲーム、VRゲーム</p>
                    </div>
                    <div className={styles.featureCard}>
                      <div className={styles.featureIcon}>💻</div>
                      <h3>ハードウェア</h3>
                      <p>ゲーミングPC、周辺機器、ゲーム機本体、アクセサリー</p>
                    </div>
                    <div className={styles.featureCard}>
                      <div className={styles.featureIcon}>🛒</div>
                      <h3>サービス</h3>
                      <p>ゲーム配信サービス、クラウドゲーミング、eスポーツ関連</p>
                    </div>
                    <div className={styles.featureCard}>
                      <div className={styles.featureIcon}>🎭</div>
                      <h3>エンタメ</h3>
                      <p>アニメ、マンガ、書籍、映画（ゲーム関連のもの）</p>
                    </div>
                  </div>

                  <br />

                  <h3>掲載をお断りする広告</h3>
                  <ul className={styles.contentList}>
                    <li><strong>違法・有害コンテンツ</strong> - 法令に違反するもの、社会的に有害なもの</li>
                    <li><strong>成人向けコンテンツ</strong> - 過度に性的な表現を含むもの</li>
                    <li><strong>ギャンブル関連</strong> - パチンコ、競馬等（ただし、ゲーム内ガチャは除く）</li>
                    <li><strong>詐欺・悪質商法</strong> - 誇大広告、虚偽の表示を含むもの</li>
                    <li><strong>競合メディア</strong> - 直接的な競合となるゲームメディア</li>
                    <li><strong>品質不明な商品</strong> - 安全性・品質に問題があると判断されるもの</li>
                  </ul>

                  <div className={styles.contactInfo}>
                    <h4>📋 審査プロセス</h4>
                    <p><strong>Step 1:</strong> お申し込み・資料提出</p>
                    <p><strong>Step 2:</strong> 内容審査（3-5営業日）</p>
                    <p><strong>Step 3:</strong> 掲載可否のご連絡</p>
                    <p><strong>Step 4:</strong> 契約・素材準備</p>
                    <p><strong>Step 5:</strong> 掲載開始</p>
                  </div>
                </div>
              </section>

              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>料金体系</h2>
                <div className={styles.sectionContent}>
                  <p>
                    広告の種類、掲載期間、位置により料金が異なります。
                    詳細な料金表は個別にお問い合わせください。
                  </p>

                  <div className={styles.policyGrid}>
                    <div className={styles.policyItem}>
                      <h3>💰 CPM課金</h3>
                      <p>1,000回表示あたりの料金設定。ブランド認知向上に効果的</p>
                    </div>
                    <div className={styles.policyItem}>
                      <h3>🖱️ CPC課金</h3>
                      <p>クリック数に応じた料金設定。コンバージョン重視の場合に最適</p>
                    </div>
                    <div className={styles.policyItem}>
                      <h3>📅 期間固定</h3>
                      <p>一定期間の固定料金。長期的なプロモーションに適している</p>
                    </div>
                    <div className={styles.policyItem}>
                      <h3>📝 記事制作</h3>
                      <p>スポンサード記事の制作費込み。質の高いコンテンツマーケティング</p>
                    </div>
                  </div>

                  <h3>お支払い方法</h3>
                  <div className={styles.editorialPolicy}>
                    <div className={styles.policyPoint}>
                      <h4>銀行振込</h4>
                      <p>月末締め翌月末払い。請求書発行いたします</p>
                    </div>
                    <div className={styles.policyPoint}>
                      <h4>クレジットカード</h4>
                      <p>小額の場合はクレジットカード決済も可能</p>
                    </div>
                    <div className={styles.policyPoint}>
                      <h4>前払い割引</h4>
                      <p>3ヶ月分前払いで5%割引、6ヶ月分前払いで10%割引</p>
                    </div>
                  </div>
                </div>
              </section>

              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>アフィリエイトパートナー制度</h2>
                <div className={styles.sectionContent}>
                  <p>
                    当サイトでは、以下のアフィリエイトプログラムに参加しています。
                    これらのプログラムを通じた収益により、サイト運営を支えています。
                  </p>

                  <div className={styles.editorialPolicy}>
                    <div className={styles.policyPoint}>
                      <h4>Amazon アソシエイト・プログラム</h4>
                      <p>当サイトは、Amazon.co.jpを宣伝しリンクすることによってサイトが紹介料を獲得できる手段を提供することを目的に設定されたアフィリエイト・プログラムである、Amazonアソシエイト・プログラムの参加者です。</p>
                    </div>
                    <div className={styles.policyPoint}>
                      <h4>Google AdSense</h4>
                      <p>Googleが提供する広告配信サービスを利用し、ユーザーの関心に応じた広告を表示しています</p>
                    </div>
                    <div className={styles.policyPoint}>
                      <h4>各種ASP</h4>
                      <p>ゲーム関連の商品・サービスを扱う各種アフィリエイトサービスプロバイダーと提携</p>
                    </div>
                  </div>

                  <div className={styles.contactInfo}>
                    <h4>🤝 新規パートナー募集</h4>
                    <p>ゲーム業界の企業様で、アフィリエイトパートナーシップにご興味がある場合は、お気軽にお問い合わせください。</p>
                    <p><strong>対象:</strong> ゲームメーカー、販売店、配信サービス、ハードウェアメーカー等</p>
                    <p><strong>条件:</strong> 当サイトの掲載基準を満たす商品・サービス</p>
                  </div>
                </div>
              </section>

              {/* <section className={styles.section}>
                <h2 className={styles.sectionTitle}>広告効果測定・レポート</h2>
                <div className={styles.sectionContent}>
                  <p>
                    広告の効果を最大化するため、詳細な効果測定とレポート提供を行います。
                  </p>

                  <div className={styles.featureGrid}>
                    <div className={styles.featureCard}>
                      <div className={styles.featureIcon}>📈</div>
                      <h3>アクセス解析</h3>
                      <p>PV数、UU数、滞在時間、離脱率などの基本指標</p>
                    </div>
                    <div className={styles.featureCard}>
                      <div className={styles.featureIcon}>🎯</div>
                      <h3>広告効果</h3>
                      <p>CTR、CVR、CPA等の広告パフォーマンス指標</p>
                    </div>
                    <div className={styles.featureCard}>
                      <div className={styles.featureIcon}>👥</div>
                      <h3>ユーザー属性</h3>
                      <p>年齢、性別、地域、デバイス等の詳細な属性分析</p>
                    </div>
                    <div className={styles.featureCard}>
                      <div className={styles.featureIcon}>💡</div>
                      <h3>改善提案</h3>
                      <p>データに基づく具体的な改善提案・最適化案</p>
                    </div>
                  </div>

                  <br />

                  <h3>レポート提供スケジュール</h3>
                  <ul className={styles.contentList}>
                    <li><strong>週次レポート</strong> - 主要指標のサマリー（メール配信）</li>
                    <li><strong>月次レポート</strong> - 詳細分析レポート（PDF提供）</li>
                    <li><strong>キャンペーン終了時</strong> - 総括レポート・改善提案</li>
                    <li><strong>リアルタイムダッシュボード</strong> - 24時間365日アクセス可能</li>
                  </ul>
                </div>
              </section> */}

              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>お申し込み・お問い合わせ</h2>
                <div className={styles.sectionContent}>
                  <p>
                    広告掲載をご検討の際は、以下の情報をご用意の上、
                    <Link href="/contact" className={styles.inlineLink}>
                      お問い合わせフォーム
                    </Link>
                    よりご連絡ください。
                  </p>

                  <h3>必要な情報</h3>
                  <div className={styles.editorialPolicy}>
                    <div className={styles.policyPoint}>
                      <h4>基本情報</h4>
                      <p>会社名、担当者名、連絡先、事業内容</p>
                    </div>
                    <div className={styles.policyPoint}>
                      <h4>広告内容</h4>
                      <p>商品・サービス名、広告の種類、掲載希望期間</p>
                    </div>
                    <div className={styles.policyPoint}>
                      <h4>予算・目標</h4>
                      <p>広告予算、目標値（PV、クリック数等）</p>
                    </div>
                    <div className={styles.policyPoint}>
                      <h4>素材</h4>
                      <p>広告素材（画像、動画、テキスト等）</p>
                    </div>
                  </div>

                  <div className={styles.contactInfo}>
                    <p><strong>運営者:</strong> ゲーム賛否編集部</p>
                    <p><strong>広告担当:</strong> Miyatake</p>
                    <p><strong>対応時間:</strong> 平日 10:00-18:00</p>
                    <p><strong>回答目安:</strong> 3営業日以内</p>
                  </div>

                  <div className={styles.thankYou}>
                    ゲーム業界の発展に貢献する、<br />
                    価値あるパートナーシップを築いてまいります。<br />
                    ご相談をお待ちしております。
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Advertising;
