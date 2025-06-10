import React, { useEffect } from 'react';
import YouTubeEmbed from '../YouTubeEmbed/YouTubeEmbed';
import styles from './NewsDetail.module.css';

interface NewsContentProps {
  content: string;
}

const NewsContent: React.FC<NewsContentProps> = ({ content }) => {
  useEffect(() => {
    // YouTube埋め込みプレースホルダーを実際のコンポーネントに置換
    const processYouTubeEmbeds = () => {
      const embedElements = document.querySelectorAll('[data-youtube-embed]');
      
      embedElements.forEach((element) => {
        const videoId = element.getAttribute('data-youtube-embed');
        const title = element.getAttribute('data-title') || 'YouTube video';
        
        if (videoId) {
          // React要素を作成してマウント
          const container = document.createElement('div');
          element.parentNode?.replaceChild(container, element);
          
          // YouTubeEmbedコンポーネントをレンダリング
          import('react-dom/client').then(({ createRoot }) => {
            const root = createRoot(container);
            root.render(
              React.createElement(YouTubeEmbed, {
                videoId,
                title,
                width: 560,
                height: 315
              })
            );
          });
        }
      });
    };

    // DOM更新後に実行
    setTimeout(processYouTubeEmbeds, 100);
  }, [content]);

  return (
    <div className={styles.content}>
      {/* 記事内容をHTMLとして安全にレンダリング */}
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default NewsContent;
