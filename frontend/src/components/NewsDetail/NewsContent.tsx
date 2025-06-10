import React, { useEffect } from 'react';
import YouTubeEmbed, { extractVideoId } from '../YouTubeEmbed/YouTubeEmbed';
import XEmbed from '../XEmbed/XEmbed';
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
          const container = document.createElement('div');
          element.parentNode?.replaceChild(container, element);
          
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

    // X埋め込みプレースホルダーを実際のコンポーネントに置換
    const processXEmbeds = () => {
      const embedElements = document.querySelectorAll('[data-x-embed]');
      
      embedElements.forEach((element) => {
        const tweetUrl = element.getAttribute('data-x-embed') ?? undefined;
        const username = element.getAttribute('data-username') ?? undefined;
        const displayName = element.getAttribute('data-display-name') ?? undefined;
        const content = element.getAttribute('data-content') ?? undefined;
        const timestamp = element.getAttribute('data-timestamp') ?? undefined;
        const embedType = (element.getAttribute('data-embed-type') as 'full' | 'simple' | 'quote') ?? 'full';
        
        if (tweetUrl) {
          const container = document.createElement('div');
          element.parentNode?.replaceChild(container, element);
          
          import('react-dom/client').then(({ createRoot }) => {
            const root = createRoot(container);
            root.render(
              React.createElement(XEmbed, {
                tweetUrl,
                username,
                displayName,
                content,
                timestamp,
                embedType
              })
            );
          });
        }
      });
    };

    // DOM更新後に実行
    setTimeout(() => {
      processYouTubeEmbeds();
      processXEmbeds();
    }, 100);
  }, [content]);

  return (
    <div className={styles.content}>
      {/* 記事内容をHTMLとして安全にレンダリング */}
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default NewsContent;
