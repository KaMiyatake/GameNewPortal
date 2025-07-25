// src/pages/app.tsx
import React from 'react';
import Layout from '../components/Layout/Layout';
import SEOHead from '../components/SEO/SEOHead';
import styles from '../styles/App.module.css';

const AppPage: React.FC = () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://gamesanpi.com';

  return (
    <>
      <SEOHead
        title="アプリダウンロード | ゲーム賛否"
        description="「ゲーム賛否」のモバイルアプリをダウンロードしてください。iOSとAndroid対応、Expo GOで簡単にアクセスできます。"
        keywords={['ゲーム賛否', 'アプリ', 'モバイルアプリ', 'iOS', 'Android', 'Expo GO', 'ダウンロード']}
        canonicalUrl={`${baseUrl}/app`}
        ogImage="/og-image.png"
        ogType="website"
        twitterCard="summary_large_image"
      />
      
      <Layout>

        <br />

        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.header}>
              <h1 className={styles.title}>📱 ゲーム賛否アプリ</h1>
              <p className={styles.subtitle}>
                モバイルアプリで、いつでもどこでも最新のゲーム情報をチェック！
              </p>
            </div>

            <br />

            {/* <div className={styles.section}>
              <h2 className={styles.sectionTitle}>🚀 アプリの特徴</h2>
              <div className={styles.featuresList}>
                <div className={styles.featureItem}>
                  <span className={styles.featureIcon}>⚡</span>
                  <div className={styles.featureContent}>
                    <h3>高速表示</h3>
                    <p>モバイル最適化により、サクサク快適に記事を読める</p>
                  </div>
                </div>
                <div className={styles.featureItem}>
                  <span className={styles.featureIcon}>🔔</span>
                  <div className={styles.featureContent}>
                    <h3>プッシュ通知</h3>
                    <p>重要な新着記事やゲーム情報をリアルタイムでお知らせ</p>
                  </div>
                </div>
                <div className={styles.featureItem}>
                  <span className={styles.featureIcon}>📚</span>
                  <div className={styles.featureContent}>
                    <h3>オフライン閲覧</h3>
                    <p>一度読んだ記事は、オフラインでも再読可能</p>
                  </div>
                </div>
                <div className={styles.featureItem}>
                  <span className={styles.featureIcon}>🎨</span>
                  <div className={styles.featureContent}>
                    <h3>ダークモード</h3>
                    <p>目に優しいダークモードで夜間も快適に閲覧</p>
                  </div>
                </div>
              </div>
            </div> */}

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>📥 アプリのダウンロード方法</h2>
              
              <div className={styles.downloadSection}>
                <div className={styles.qrCodeSection}>
                  <h3 className={styles.downloadTitle}>QRコードでアクセス</h3>
                  <div className={styles.qrCodeContainer}>
                    <img 
                      src="/gamesanpi-app-qr-code.png" 
                      alt="ゲーム賛否アプリ QRコード"
                      className={styles.qrCode}
                    />
                    <p className={styles.qrCodeDescription}>
                      上のQRコードをスマートフォンで読み取ってください
                    </p>
                  </div>
                </div>

                <div className={styles.stepsSection}>
                  <h3 className={styles.downloadTitle}>📋 ダウンロード手順</h3>
                  <div className={styles.stepsList}>
                    <div className={styles.step}>
                      <span className={styles.stepNumber}>1</span>
                      <div className={styles.stepContent}>
                        <h4>Expo GOアプリをダウンロード</h4>
                        <p>まず、お使いのスマートフォンにExpo GOアプリをインストールしてください。</p>
                        <div className={styles.storeLinks}>
                          <a 
                            href="https://apps.apple.com/app/expo-go/id982107779"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.storeLink}
                          >
                            <span className={styles.storeIcon}>🍎</span>
                            App Store (iOS)
                          </a>
                          <a 
                            href="https://play.google.com/store/apps/details?id=host.exp.exponent"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.storeLink}
                          >
                            <span className={styles.storeIcon}>🤖</span>
                            Google Play (Android)
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className={styles.step}>
                      <span className={styles.stepNumber}>2</span>
                      <div className={styles.stepContent}>
                        <h4>QRコードを読み取り</h4>
                        <p>Expo GOアプリを開き、上記のQRコードをスキャンしてください。</p>
                      </div>
                    </div>

                    <div className={styles.step}>
                      <span className={styles.stepNumber}>3</span>
                      <div className={styles.stepContent}>
                        <h4>アプリを起動</h4>
                        <p>QRコードを読み取ると、ゲーム賛否アプリが自動的に起動します。</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className={styles.section}>
              <h2 className={styles.sectionTitle}>💡 使用方法とヒント</h2>
              <div className={styles.tipsList}>
                <div className={styles.tip}>
                  <span className={styles.tipIcon}>📱</span>
                  <p><strong>初回起動時</strong>: アプリの読み込みに少し時間がかかる場合があります</p>
                </div>
                <div className={styles.tip}>
                  <span className={styles.tipIcon}>🔄</span>
                  <p><strong>アプリの更新</strong>: QRコードを再度読み取ることで最新版に更新されます</p>
                </div>
                <div className={styles.tip}>
                  <span className={styles.tipIcon}>📶</span>
                  <p><strong>ネット接続</strong>: 初回アクセス時はインターネット接続が必要です</p>
                </div>
                <div className={styles.tip}>
                  <span className={styles.tipIcon}>🏠</span>
                  <p><strong>ホーム画面追加</strong>: ブラウザの「ホーム画面に追加」機能も利用できます</p>
                </div>
              </div>
            </div> */}

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>❓ よくある質問</h2>
              <div className={styles.faqList}>
                <div className={styles.faqItem}>
                  <h4 className={styles.faqQuestion}>Q. アプリは無料ですか？</h4>
                  <p className={styles.faqAnswer}>A. はい、完全無料でご利用いただけます。</p>
                </div>
                <div className={styles.faqItem}>
                  <h4 className={styles.faqQuestion}>Q. Expo GOとは何ですか？</h4>
                  <p className={styles.faqAnswer}>A. Expo GOは、React Nativeで作られたアプリを簡単に体験できるプラットフォームです。</p>
                </div>
                <div className={styles.faqItem}>
                  <h4 className={styles.faqQuestion}>Q. アプリが起動しない場合は？</h4>
                  <p className={styles.faqAnswer}>A. Expo GOアプリを最新版に更新するか、QRコードを再度読み取ってください。</p>
                </div>
                <div className={styles.faqItem}>
                  <h4 className={styles.faqQuestion}>Q. ネイティブアプリ版の予定は？</h4>
                  <p className={styles.faqAnswer}>A. 現在検討中です。ユーザーの反応を見て今後決定いたします。</p>
                </div>
              </div>
            </div>

            <div className={styles.section}>
                <div className={styles.callToAction}>
                <h3 className={styles.ctaTitle}>今すぐアプリを体験！</h3>
                <p className={styles.ctaDescription}>
                    QRコードを読み取って、ゲーム賛否アプリの便利さを実感してください。
                </p>
                {/* QRコード画像を追加 */}
                <div className={styles.ctaQrImageWrapper}>
                    <img
                    src="/gamesanpi-app-qr-code.png"
                    alt="ゲーム賛否アプリ QRコード"
                    className={styles.ctaQrImage}
                    />
                </div>
                <div className={styles.ctaButton}>
                    <span className={styles.ctaIcon}>📱</span>
                    QRコードを読み取ってアクセス
                </div>
                </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default AppPage;
