import React from 'react';
import Header from './Header';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <AuthProvider>
      <div>
        <Header />
        <main className="container mx-auto my-8 px-4">
          {children}
        </main>
      </div>
    </AuthProvider>
  );
};

export default Layout;
