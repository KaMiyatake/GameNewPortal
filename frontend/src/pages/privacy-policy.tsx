import React from 'react';
import Layout from '../components/Layout/Layout';
import SEOHead from '../components/SEO/SEOHead';
import styles from '../styles/About.module.css';
import Link from 'next/link';

const PrivacyPolicy: React.FC = () => {
  return (
    <>
      <SEOHead
        title="プライバシーポリシー | ゲーム賛否"
        description="「ゲーム賛否」のプライバシーポリシーです。個人情報の取り扱い、Cookie利用、広告配信について詳しく説明しています。"
        keywords={['プライバシーポリシー', '個人情報', 'Cookie', '広告配信', 'ゲーム賛否']}
        canonicalUrl={`${process.env.NEXT_PUBLIC_BASE_URL || ''}/privacy-policy`}
      />
      <Layout>
        <div className={styles.container}>
          <div className={styles.aboutContent}>
            <div className={styles.heroSection}>
              <h1 className={styles.pageTitle}>プライバシーポリシー</h1>
              <p className={styles.heroText}>
                個人情報の取り扱いについて
              </p>
            </div>

            <div className={styles.contentSection}>
              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>基本方針</h2>
                <div className={styles.sectionContent}>
                  <p>
                    「ゲーム賛否」（以下「当サイト」）は、ユーザーの個人情報を適切に保護することを重要な責務と考えています。
                    本プライバシーポリシーでは、当サイトにおける個人情報の取り扱いについて説明します。
                  </p>
                  <p>
                    当サイトをご利用いただくことで、本プライバシーポリシーに同意したものとみなします。
                  </p>
                </div>
              </section>

              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>収集する情報</h2>
                <div className={styles.sectionContent}>
                  <h3>自動的に収集される情報</h3>
                  <ul className={styles.contentList}>
                    <li><strong>アクセス情報</strong> - IPアドレス、ブラウザの種類、アクセス日時、参照元URL</li>
                    <li><strong>利用状況</strong> - 閲覧ページ、滞在時間、クリック情報、検索キーワード</li>
                    <li><strong>デバイス情報</strong> - OS、画面解像度、言語設定</li>
                  </ul>
                  
                  <h3>お問い合わせ時に収集する情報</h3>
                  <ul className={styles.contentList}>
                    <li><strong>連絡先情報</strong> - お名前、メールアドレス</li>
                    <li><strong>お問い合わせ内容</strong> - メッセージ</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>情報の利用目的</h2>
                <div className={styles.sectionContent}>
                  <p>収集した情報は以下の目的で利用します：</p>
                  <div className={styles.policyGrid}>
                    <div className={styles.policyItem}>
                      <h3>📊 サイト改善</h3>
                      <p>ユーザーの利用状況を分析し、サイトの利便性向上や新機能開発に活用</p>
                    </div>
                    <div className={styles.policyItem}>
                      <h3>💬 お問い合わせ対応</h3>
                      <p>ユーザーからのお問い合わせに対する回答・サポート提供</p>
                    </div>
                    <div className={styles.policyItem}>
                      <h3>🔒 セキュリティ</h3>
                      <p>不正アクセスの防止、スパムや悪用の監視・対策</p>
                    </div>
                    <div className={styles.policyItem}>
                      <h3>📢 サービス向上</h3>
                      <p>コンテンツの最適化、パーソナライズされた体験の提供</p>
                    </div>
                  </div>
                </div>
              </section>

              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Cookieの利用</h2>
                <div className={styles.sectionContent}>
                  <p>
                    当サイトでは、サービスの向上を目的として、Cookieを使用しています。
                    Cookieは、ユーザーがサイトを訪問した際に、ブラウザに保存される小さなデータファイルです。
                  </p>
                  
                  <h3>使用するCookieの種類</h3>
                  <div className={styles.editorialPolicy}>
                    <div className={styles.policyPoint}>
                      <h4>必須Cookie</h4>
                      <p>サイトの基本機能（テーマ設定、セッション管理等）に必要なCookie</p>
                    </div>
                    <div className={styles.policyPoint}>
                      <h4>分析Cookie</h4>
                      <p>Google Analytics等のアクセス解析ツールで使用されるCookie</p>
                    </div>
                    <div className={styles.policyPoint}>
                      <h4>広告Cookie</h4>
                      <p>Google AdSense等の広告配信サービスで使用されるCookie</p>
                    </div>
                  </div>
                  
                  <p>
                    Cookieの使用を無効にする場合は、ブラウザの設定から変更できます。
                    ただし、一部機能が正常に動作しない場合があります。
                  </p>
                </div>
              </section>

              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>第三者サービス</h2>
                <div className={styles.sectionContent}>
                  <p>当サイトでは、以下の第三者サービスを利用しています：</p>
                  
                  <h3>Google Analytics</h3>
                  <p>
                    Googleが提供するアクセス解析サービスです。当サイトの利用状況を分析し、
                    サービス向上に活用しています。
                    <a href="https://policies.google.com/privacy" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className={styles.inlineLink}>
                      Googleプライバシーポリシー
                    </a>
                    をご確認ください。
                  </p>
                  
                  <h3>Google AdSense</h3>
                  <p>
                    Googleが提供する広告配信サービスです。ユーザーの興味関心に応じた広告を表示します。
                    広告の個人設定は
                    <a href="https://adssettings.google.com/" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className={styles.inlineLink}>
                      Google広告設定
                    </a>
                    から変更できます。
                  </p>
                  
                  <h3>Amazon アソシエイト</h3>
                  <p>
                    当サイトは、Amazon.co.jpを宣伝しリンクすることによってサイトが紹介料を獲得できる手段を
                    提供することを目的に設定されたアフィリエイトプログラムである、
                    Amazonアソシエイト・プログラムに参加しています。
                  </p>
                </div>
              </section>

              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>情報の第三者提供</h2>
                <div className={styles.sectionContent}>
                  <p>当サイトは、以下の場合を除き、個人情報を第三者に提供しません：</p>
                  <ul className={styles.contentList}>
                    <li><strong>法的義務がある場合</strong> - 法令に基づく開示要求があった場合</li>
                    <li><strong>ユーザーの同意がある場合</strong> - 事前に明示的な同意を得た場合</li>
                    <li><strong>緊急性がある場合</strong> - 人の生命、身体または財産の保護に必要な場合</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>情報の保護・管理</h2>
                <div className={styles.sectionContent}>
                  <div className={styles.editorialPolicy}>
                    <div className={styles.policyPoint}>
                      <h4>セキュリティ対策</h4>
                      <p>適切な技術的・組織的措置により、個人情報の漏洩、滅失、毀損を防止します</p>
                    </div>
                    <div className={styles.policyPoint}>
                      <h4>アクセス制限</h4>
                      <p>個人情報へのアクセスは、業務上必要な範囲に限定し、厳格に管理します</p>
                    </div>
                    <div className={styles.policyPoint}>
                      <h4>保存期間</h4>
                      <p>個人情報は利用目的達成後、適切な期間内に削除または匿名化します</p>
                    </div>
                  </div>
                </div>
              </section>

              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>ユーザーの権利</h2>
                <div className={styles.sectionContent}>
                  <p>ユーザーは、自身の個人情報について以下の権利を有します：</p>
                  <div className={styles.featureGrid}>
                    <div className={styles.featureCard}>
                      <div className={styles.featureIcon}>📋</div>
                      <h3>開示請求</h3>
                      <p>保有する個人情報の内容確認を求める権利</p>
                    </div>
                    <div className={styles.featureCard}>
                      <div className={styles.featureIcon}>✏️</div>
                      <h3>訂正・削除</h3>
                      <p>個人情報の訂正、追加、削除を求める権利</p>
                    </div>
                    <div className={styles.featureCard}>
                      <div className={styles.featureIcon}>🚫</div>
                      <h3>利用停止</h3>
                      <p>個人情報の利用停止を求める権利</p>
                    </div>
                    <div className={styles.featureCard}>
                      <div className={styles.featureIcon}>📞</div>
                      <h3>お問い合わせ</h3>
                      <p>個人情報に関する質問や苦情を申し出る権利</p>
                    </div>
                  </div>
                  <p>
                    これらの権利行使をご希望の場合は、
                    <Link href="/contact" className={styles.inlineLink}>
                      お問い合わせフォーム
                    </Link>
                    よりご連絡ください。
                  </p>
                </div>
              </section>

              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>プライバシーポリシーの変更</h2>
                <div className={styles.sectionContent}>
                  <p>
                    当サイトは、法令の変更やサービス内容の変更に伴い、
                    本プライバシーポリシーを適宜見直し、変更する場合があります。
                  </p>
                  <p>
                    重要な変更については、サイト上で事前に告知いたします。
                    変更後のプライバシーポリシーは、サイトに掲載した時点から効力を生じます。
                  </p>
                </div>
              </section>

              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>お問い合わせ</h2>
                <div className={styles.sectionContent}>
                  <p>
                    プライバシーポリシーに関するご質問やお問い合わせは、
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
                    個人情報の適切な管理に努めてまいります。
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

export default PrivacyPolicy;
