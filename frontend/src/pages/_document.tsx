// src/pages/_document.tsx (ファビコン設定追加版)
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="ja">
      <Head>
        {/* ファビコン設定（既存ファイル構成に基づく） */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        
        {/* PWA設定 */}
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#6c5ce7" />
        <meta name="msapplication-TileColor" content="#1e1e2c" />
        
        {/* モバイル対応 */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="ゲーム賛否" />
        
        {/* Android Chrome用 */}
        <link rel="icon" type="image/png" sizes="192x192" href="/web-app-manifest-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/web-app-manifest-512x512.png" />
        
        {/* ブラウザ互換性向上 */}
        <link rel="shortcut icon" href="/favicon.ico" />
        
        {/* テーマ初期化スクリプト（フラッシュ防止） */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const savedTheme = localStorage.getItem('theme');
                const theme = savedTheme || 'dark'; // デフォルトはダーク
                document.documentElement.setAttribute('data-theme', theme);
              })();
            `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
