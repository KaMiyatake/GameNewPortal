import { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Game News Portal</title>
        <meta name="description" content="Latest gaming news and updates" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <span className={styles.highlight}>Game News Portal</span>
        </h1>

        <p className={styles.description}>
          最新のゲームニュースをチェックしよう！
        </p>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h2>最新ニュース</h2>
            <p>ゲーム業界の最新情報をお届けします。</p>
          </div>

          <div className={styles.card}>
            <h2>レビュー</h2>
            <p>新作ゲームのレビューを掲載しています。</p>
          </div>

          <div className={styles.card}>
            <h2>発売予定</h2>
            <p>今後発売予定のゲームをチェック！</p>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>© 2025 Game News Portal</p>
      </footer>
    </div>
  );
};

export default Home;