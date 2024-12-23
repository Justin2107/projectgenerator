'use client'

import Link from 'next/link';
import { Home } from 'lucide-react';

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm py-4 px-6 fixed top-0 left-0 right-0 z-50 flex items-center">
      <Link 
        href="/" 
        className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
        aria-label="Home"
      >
        <Home className="w-6 h-6 text-renovo-orange" />
      </Link>
      <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
    </header>
  );
}