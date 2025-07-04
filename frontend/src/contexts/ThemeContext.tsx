import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // デフォルトをダークテーマに変更
  const [theme, setTheme] = useState<Theme>('dark');

  // ローカルストレージから設定を読み込み
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      // システムの設定を確認（デフォルトはダーク優先）
      const systemDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      // ユーザーのシステム設定に関係なく、デフォルトはダークテーマにする
      //setTheme('dark');
      // もしシステム設定を尊重したい場合は以下を使用：
      setTheme(systemDarkMode ? 'dark' : 'light');
    }
  }, []);

  // テーマ変更時の処理
  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
