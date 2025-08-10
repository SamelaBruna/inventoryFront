export default function HomePage() {
  return (
    <div className="flex h-screen w-full bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r shadow-sm">
        <div className="p-6 text-xl font-bold text-blue-500">Supply Manager</div>
        <nav className="flex flex-col gap-2 p-4 text-gray-700">
          <a href="#" className="hover:bg-gray-100 rounded px-3 py-2">Home</a>
          <a href="#" className="hover:bg-gray-100 rounded px-3 py-2">Ordens</a>
          <a href="#" className="hover:bg-gray-100 rounded px-3 py-2">Fila</a>
          <div className="mt-4 text-sm text-gray-500 uppercase">Pessoas</div>
          <a href="#" className="hover:bg-gray-100 rounded px-3 py-2">Clientes</a>
          <a href="#" className="hover:bg-gray-100 rounded px-3 py-2">Técnicos</a>
          <div className="mt-4 text-sm text-gray-500 uppercase">Estoque</div>
          <a href="#" className="hover:bg-gray-100 rounded px-3 py-2">Produtos</a>
          <div className="mt-4 text-sm text-gray-500 uppercase">Finanças</div>
          <a href="#" className="hover:bg-gray-100 rounded px-3 py-2">Pagamentos e Faturamentos</a>
          <div className="mt-4 text-sm text-gray-500 uppercase">Configurações</div>
          <a href="#" className="hover:bg-gray-100 rounded px-3 py-2">Suporte</a>
          <a href="#" className="hover:bg-gray-100 rounded px-3 py-2">Usuários</a>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <header className="flex items-center justify-between border-b bg-white p-4 shadow-sm">
          <div className="text-xl font-semibold text-blue-500">Orders</div>
          <div className="flex items-center gap-2">
            <input type="text" placeholder="Search" className="rounded border px-3 py-1 text-sm" />
            <button className="rounded bg-blue-600 px-3 py-1.5 text-white hover:bg-blue-700">+ Add New</button>
            <div className="h-8 w-8 rounded-full bg-gray-300" /> {/* Avatar */}
          </div>
        </header>

        {/* Content placeholder */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="text-gray-600">Bem-vindo! Aqui virá sua tabela de dados.</div>
        </main>
      </div>
    </div>
  );
}
