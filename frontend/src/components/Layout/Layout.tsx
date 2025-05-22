import React, { ReactNode } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import styles from './Layout.module.css';
import { Category } from '../../types';

interface LayoutProps {
  children: ReactNode;
  categories: Category[];
}

const Layout: React.FC<LayoutProps> = ({ children, categories }) => {
  return (
    <div className={styles.layout}>
      <Header categories={categories} />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
