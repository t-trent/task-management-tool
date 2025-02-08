import './styles/globals.css';
import Header from './components/Header';
import { ReactNode } from 'react';
import { AuthProvider } from '@/context/AuthContext';
import './styles/globals.css';

export const metadata = {
  title: 'Task Manager',
  description: 'A Next.js Task Management Tool',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Header />
          <main className="container mx-auto my-8 px-4">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
