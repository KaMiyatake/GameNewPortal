import React from 'react';
import styles from './NewsDetail.module.css';

interface NewsContentProps {
  content: string;
}

const NewsContent: React.FC<NewsContentProps> = ({ content }) => {
  return (
    <div className={styles.content}>
      {/* 記事内容をHTMLとして安全にレンダリング */}
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default NewsContent;
