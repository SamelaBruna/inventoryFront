'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const pathname = usePathname();

  //obter o título baseado na rota
  const getPageTitle = () => {
    switch (pathname) {
      case '/dashboard':
        return 'Dashboard';
      case '/dashboard/ordem':
        return 'Ordens de Serviço';
      case '/dashboard/produtos':
        return 'Produtos';
      case '/dashboard/clientes':
        return 'Clientes';
      default:
        return 'Dashboard';
    }
  };

  return (
    <div className="flex h-screen w-full bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`${
          isCollapsed ? 'w-20' : 'w-64'
        } bg-white border-r shadow-sm transition-all duration-300`}
        onMouseEnter={() => setIsCollapsed(false)}
        onMouseLeave={() => setIsCollapsed(true)}
      >
        {/* Logo/Título */}
        <div className="p-6 text-xl font-bold text-blue-500 overflow-hidden">
          {isCollapsed ? 'SM' : 'Supply Manager'}
        </div>
        
        {/* Navegação */}
        <nav className="flex flex-col gap-2 p-4 text-gray-700">
          <Link href="/dashboard">
            <div className="hover:bg-gray-100 rounded px-3 py-2 flex items-center gap-3">
              {/* Ícone Home */}
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              {/* Texto que aparece/desaparece */}
              <span className={`transition-all duration-300 ${isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}>
                Home
              </span>
            </div>
          </Link>
          
          <Link href="/dashboard/ordem">
            <div className="hover:bg-gray-100 rounded px-3 py-2 flex items-center gap-3">
              {/* Ícone Ordens */}
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className={`transition-all duration-300 ${isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}>
                Ordens
              </span>
            </div>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="flex items-center justify-between border-b bg-white p-4 shadow-sm">
          <div className="text-xl font-semibold text-blue-500">{getPageTitle()}</div>
          <div className="flex items-center gap-2">
            <input type="text" placeholder="Search" className="rounded border px-3 py-1 text-sm" />
            <button className="rounded bg-blue-600 px-3 py-1.5 text-white hover:bg-blue-700">+ Add New</button>
            <div className="h-8 w-8 rounded-full bg-gray-300" />
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}