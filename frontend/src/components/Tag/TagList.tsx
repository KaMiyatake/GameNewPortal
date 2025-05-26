import React from 'react';
import Link from 'next/link';
import styles from './TagList.module.css';

interface Tag {
  tag: string;
  count: number;
}

interface TagListProps {
  tags: Tag[];
  title?: string;
  maxTags?: number;
}

const TagList: React.FC<TagListProps> = ({ 
  tags, 
  title = "人気タグ", 
  maxTags = 10 
}) => {
  const displayTags = tags.slice(0, maxTags);

  return (
    <div className={styles.tagList}>
      <h3 className={styles.tagListTitle}>{title}</h3>
      <div className={styles.tags}>
        {displayTags.map(({ tag, count }) => (
          <Link key={tag} href={`/tag/${encodeURIComponent(tag)}`} passHref>
            <span className={styles.tagItem}>
              #{tag}
              <span className={styles.tagCount}>({count})</span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TagList;
