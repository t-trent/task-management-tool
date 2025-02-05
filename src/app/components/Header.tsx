import Link from 'next/link';
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 text-white py-4 shadow">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <Link href="/">Task Manager</Link>
        </h1>
        <nav>
          <Link href="/dashboard" className="px-3 hover:underline">Dashboard</Link>
          <Link href="/login" className="px-3 hover:underline">Login</Link>
          <Link href="/register" className="px-3 hover:underline">Register</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
