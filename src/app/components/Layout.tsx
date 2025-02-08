// src/app/components/Layout.tsx
import React from 'react';
import Header from './Header';
import '../styles/globals.css';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      <main className="container mx-auto my-8 px-4">
        {children}
      </main>
    </div>
  );
};

export default Layout;
