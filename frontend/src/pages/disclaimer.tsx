import React from 'react';
import Layout from '../components/Layout/Layout';
import SEOHead from '../components/SEO/SEOHead';
import styles from '../styles/About.module.css';
import Link from 'next/link';

const Disclaimer: React.FC = () => {
  return (
    <>
      <SEOHead
        title="免責事項 | ゲーム賛否"
        description="「ゲーム賛否」の免責事項です。コンテンツの正確性、外部リンク、著作権、損害の責任範囲について詳しく説明しています。"
        keywords={['免責事項', '著作権', '外部リンク', '責任範囲', 'ゲーム賛否']}
        canonicalUrl={`${process.env.NEXT_PUBLIC_BASE_URL || ''}/disclaimer`}
      />
      <Layout>
        <div className={styles.container}>
          <div className={styles.aboutContent}>
            <div className={styles.heroSection}>
              <h1 className={styles.pageTitle}>免責事項</h1>
              <p className={styles.heroText}>
                当サイトの利用に関する責任範囲について
              </p>
            </div>

            <div className={styles.contentSection}>
              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>基本方針</h2>
                <div className={styles.sectionContent}>
                  <p>
                    「ゲーム賛否」（以下「当サイト」）をご利用いただく前に、
                    以下の免責事項をご確認ください。当サイトをご利用いただくことで、
                    本免責事項に同意したものとみなします。
                  </p>
                  <p>
                    当サイトは、ユーザーの皆様に有益な情報を提供することを目指していますが、
                    情報の完全性や正確性について保証するものではありません。
                  </p>
                </div>
              </section>

              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>コンテンツの正確性について</h2>
                <div className={styles.sectionContent}>
                  <div className={styles.policyGrid}>
                    <div className={styles.policyItem}>
                      <h3>⚠️ 情報の更新</h3>
                      <p>ゲーム情報は日々変化するため、掲載時点での正確性を心がけていますが、最新情報と異なる場合があります</p>
                    </div>
                    <div className={styles.policyItem}>
                      <h3>📊 データの扱い</h3>
                      <p>売上データ、レビュースコア等は公開情報を基にしていますが、集計時期により差異が生じる場合があります</p>
                    </div>
                    <div className={styles.policyItem}>
                      <h3>💭 主観的評価</h3>
                      <p>レビューや分析は編集部の見解であり、すべてのユーザーの意見を代表するものではありません</p>
                    </div>
                    <div className={styles.policyItem}>
                      <h3>🔄 継続的改善</h3>
                      <p>誤情報を発見した場合は速やかに修正いたしますが、完全性を保証するものではありません</p>
                    </div>
                  </div>
                  <p>
                    <strong>重要:</strong> ゲーム購入やサービス利用の最終的な判断は、
                    必ず公式サイトや販売店舗での最新情報をご確認の上、ユーザー自身の責任で行ってください。
                  </p>
                </div>
              </section>

              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>外部リンクについて</h2>
                <div className={styles.sectionContent}>
                  <p>
                    当サイトには、外部サイトへのリンクが含まれています。
                    これらのリンク先サイトについて、以下の点をご理解ください。
                  </p>
                  
                  <div className={styles.editorialPolicy}>
                    <div className={styles.policyPoint}>
                      <h4>リンク先の責任</h4>
                      <p>リンク先サイトのコンテンツ、サービス、方針について当サイトは一切責任を負いません</p>
                    </div>
                    <div className={styles.policyPoint}>
                      <h4>利用規約の確認</h4>
                      <p>各外部サイトの利用規約、プライバシーポリシーをご確認の上ご利用ください</p>
                    </div>
                    <div className={styles.policyPoint}>
                      <h4>リンクの変更・削除</h4>
                      <p>外部サイトの都合により、リンクが無効になる場合があります</p>
                    </div>
                  </div>

                  <br />

                  <h3>主な外部リンク先</h3>
                  <ul className={styles.contentList}>
                    <li><strong>ゲーム公式サイト</strong> - 各ゲームメーカー・パブリッシャーの公式サイト</li>
                    <li><strong>販売サイト</strong> - Steam、PlayStation Store、Nintendo eShop、Amazon等</li>
                    <li><strong>レビューサイト</strong> - Metacritic、OpenCritic、各種レビューサイト</li>
                    <li><strong>ニュースソース</strong> - ゲーム業界ニュースサイト、プレスリリース</li>
                    <li><strong>SNS・動画</strong> - Twitter、YouTube、公式チャンネル等</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>著作権について</h2>
                <div className={styles.sectionContent}>
                  <p>
                    当サイトで使用している各種コンテンツの著作権について説明します。
                  </p>

                  <h3>ゲーム画像・スクリーンショット</h3>
                  <p>
                    当サイトに掲載されているゲーム画像、スクリーンショット、ロゴ等は、
                    各ゲームメーカー・パブリッシャーに帰属します。これらの画像は、
                    <strong>報道・批評・研究を目的とした引用</strong>として、
                    著作権法第32条に基づき使用しています。
                  </p>

                  <div className={styles.featureGrid}>
                    <div className={styles.featureCard}>
                      <div className={styles.featureIcon}>📄</div>
                      <h3>記事コンテンツ</h3>
                      <p>当サイトオリジナルの記事・分析・コメントの著作権は当サイトに帰属</p>
                    </div>
                    <div className={styles.featureCard}>
                      <div className={styles.featureIcon}>🎮</div>
                      <h3>ゲーム素材</h3>
                      <p>ゲーム画像・動画・音楽等の著作権は各権利者に帰属</p>
                    </div>
                    <div className={styles.featureCard}>
                      <div className={styles.featureIcon}>📰</div>
                      <h3>引用情報</h3>
                      <p>他メディアからの引用は出典を明記し、適切な範囲で実施</p>
                    </div>
                    <div className={styles.featureCard}>
                      <div className={styles.featureIcon}>⚖️</div>
                      <h3>公正利用</h3>
                      <p>著作権法に基づく公正な利用範囲内での使用を心がけ</p>
                    </div>
                  </div>

                  <br />

                  <h3>著作権に関するお問い合わせ</h3>
                  <p>
                    著作権に関してご指摘やご質問がございましたら、
                    <Link href="/contact" className={styles.inlineLink}>
                      お問い合わせフォーム
                    </Link>
                    よりご連絡ください。適切に対応いたします。
                  </p>
                </div>
              </section>

              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>アフィリエイト・広告について</h2>
                <div className={styles.sectionContent}>
                  <p>
                    当サイトは、以下のアフィリエイトプログラム・広告サービスに参加しています。
                  </p>

                  <div className={styles.editorialPolicy}>
                    <div className={styles.policyPoint}>
                      <h4>Amazon アソシエイト</h4>
                      <p>当サイトはAmazon.co.jpアソシエイトに参加し、適格販売により収入を得る場合があります</p>
                    </div>
                    <div className={styles.policyPoint}>
                      <h4>Google AdSense</h4>
                      <p>Google AdSenseによる自動広告を掲載し、クリックや表示により収益を得る場合があります</p>
                    </div>
                    <div className={styles.policyPoint}>
                      <h4>その他アフィリエイト</h4>
                      <p>ゲーム販売サイト等のアフィリエイトプログラムに参加し、紹介により収益を得る場合があります</p>
                    </div>
                  </div>

                  <br />

                  <p>
                    <strong>重要な原則:</strong> アフィリエイト収益の有無に関わらず、
                    当サイトは中立的で公正な情報提供を心がけます。
                    特定の商品やサービスを過度に推奨することはありません。
                  </p>
                </div>
              </section>

              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>損害に対する責任の限定</h2>
                <div className={styles.sectionContent}>
                  <p>
                    当サイトの利用により生じた損害について、以下の通り責任を限定させていただきます。
                  </p>

                  <h3>免責範囲</h3>
                  <ul className={styles.contentList}>
                    <li><strong>直接損害</strong> - 情報の誤り・遅延による購入判断ミス等の直接的損害</li>
                    <li><strong>間接損害</strong> - 機会損失、データ消失、業務中断等の間接的損害</li>
                    <li><strong>精神的損害</strong> - ストレス、精神的苦痛等の無形の損害</li>
                    <li><strong>第三者損害</strong> - 外部リンク先での取引トラブル等、第三者との問題</li>
                  </ul>

                  <div className={styles.policyGrid}>
                    <div className={styles.policyItem}>
                      <h3>🚫 システム障害</h3>
                      <p>サーバーダウン、メンテナンス等によるサービス中断について責任を負いません</p>
                    </div>
                    <div className={styles.policyItem}>
                      <h3>💻 技術的問題</h3>
                      <p>ブラウザ非対応、表示エラー等の技術的問題について責任を負いません</p>
                    </div>
                    <div className={styles.policyItem}>
                      <h3>🔗 外部サービス</h3>
                      <p>外部リンク先での取引、サービス利用について責任を負いません</p>
                    </div>
                    <div className={styles.policyItem}>
                      <h3>📱 個人環境</h3>
                      <p>ユーザーの端末、ネットワーク環境による問題について責任を負いません</p>
                    </div>
                  </div>
                </div>
              </section>

              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>サービスの変更・中断</h2>
                <div className={styles.sectionContent}>
                  <p>
                    当サイトは、以下の場合にサービスを変更・中断する場合があります。
                    事前の通知なく実施する場合がありますが、可能な限り事前告知に努めます。
                  </p>

                  <div className={styles.editorialPolicy}>
                    <div className={styles.policyPoint}>
                      <h4>定期メンテナンス</h4>
                      <p>システム改善、セキュリティ強化のためのメンテナンス作業</p>
                    </div>
                    <div className={styles.policyPoint}>
                      <h4>緊急メンテナンス</h4>
                      <p>障害発生、セキュリティ事故等への緊急対応</p>
                    </div>
                    <div className={styles.policyPoint}>
                      <h4>コンテンツ変更</h4>
                      <p>記事の修正、削除、カテゴリ構成の変更等</p>
                    </div>
                    <div className={styles.policyPoint}>
                      <h4>サービス終了</h4>
                      <p>運営上の理由によるサービス終了（事前告知を実施）</p>
                    </div>
                  </div>
                </div>
              </section>

              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>準拠法・管轄裁判所</h2>
                <div className={styles.sectionContent}>
                  <p>
                    本免責事項および当サイトの利用については、日本法を準拠法とします。
                    当サイトに関する紛争については、東京地方裁判所を専属的合意管轄裁判所とします。
                  </p>
                </div>
              </section>

              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>免責事項の変更</h2>
                <div className={styles.sectionContent}>
                  <p>
                    当サイトは、法令の変更やサービス内容の変更に伴い、
                    本免責事項を適宜見直し、変更する場合があります。
                  </p>
                  <p>
                    重要な変更については、サイト上で事前に告知いたします。
                    変更後の免責事項は、サイトに掲載した時点から効力を生じます。
                  </p>
                </div>
              </section>

              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>お問い合わせ</h2>
                <div className={styles.sectionContent}>
                  <p>
                    免責事項に関するご質問やお問い合わせは、
                    <Link href="/contact" className={styles.inlineLink}>
                      お問い合わせフォーム
                    </Link>
                    よりお気軽にご連絡ください。
                  </p>
                  <div className={styles.contactInfo}>
                    <p><strong>運営者:</strong> ゲーム賛否編集部</p>
                    <p><strong>担当者:</strong> Miyatake</p>
                    <p><strong>制定日:</strong> 2025年6月16日</p>
                    <p><strong>最終更新:</strong> 2025年6月16日</p>
                  </div>
                  <div className={styles.thankYou}>
                    当サイトは、ユーザーの皆様に安心してご利用いただけるよう、<br />
                    適切な情報提供と透明性の確保に努めてまいります。
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

export default Disclaimer;
