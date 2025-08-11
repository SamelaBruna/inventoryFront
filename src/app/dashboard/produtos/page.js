'use client';

import { useState, useMemo } from 'react';

export default function ProdutosPage() {
  // Estado para a busca
  const [searchTerm, setSearchTerm] = useState('');
  
  // Estado para controlar modais (futuramente)
  const [showAddModal, setShowAddModal] = useState(false);
  const [showCsvModal, setShowCsvModal] = useState(false);

  // Dados de exemplo dos produtos/serviços
  const [produtos] = useState([
    {
      id: 1,
      codigo: 'PROD-001',
      nome: 'Notebook Dell Inspiron 15',
      tipo: 'produto',
      categoria: 'Informática',
      preco: 2499.90,
      estoque: 15,
      unidade: 'UN',
      fornecedor: 'Dell Brasil',
      status: 'ativo'
    },
    {
      id: 2,
      codigo: 'SERV-001',
      nome: 'Consultoria em TI',
      tipo: 'servico',
      categoria: 'Consultoria',
      preco: 150.00,
      estoque: null,
      unidade: 'HORA',
      fornecedor: 'TechConsult',
      status: 'ativo'
    },
    {
      id: 3,
      codigo: 'PROD-002',
      nome: 'Mesa de Escritório Executive',
      tipo: 'produto',
      categoria: 'Móveis',
      preco: 890.50,
      estoque: 8,
      unidade: 'UN',
      fornecedor: 'Móveis & CIA',
      status: 'ativo'
    },
    {
      id: 4,
      codigo: 'PROD-003',
      nome: 'Impressora Multifuncional HP',
      tipo: 'produto',
      categoria: 'Informática',
      preco: 1250.00,
      estoque: 0,
      unidade: 'UN',
      fornecedor: 'HP Brasil',
      status: 'inativo'
    },
    {
      id: 5,
      codigo: 'SERV-002',
      nome: 'Manutenção Preventiva',
      tipo: 'servico',
      categoria: 'Manutenção',
      preco: 200.00,
      estoque: null,
      unidade: 'VISITA',
      fornecedor: 'ManutTech',
      status: 'ativo'
    },
    {
      id: 6,
      codigo: 'PROD-004',
      nome: 'Cadeira Ergonômica Premium',
      tipo: 'produto',
      categoria: 'Móveis',
      preco: 750.00,
      estoque: 25,
      unidade: 'UN',
      fornecedor: 'ErgoFlex',
      status: 'ativo'
    }
  ]);

  // Filtrar produtos baseado na busca
  const produtosFiltrados = useMemo(() => {
    if (!searchTerm) return produtos;
    
    return produtos.filter(produto =>
      produto.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      produto.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      produto.categoria.toLowerCase().includes(searchTerm.toLowerCase()) ||
      produto.fornecedor.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [produtos, searchTerm]);

  // Função para formatar preço
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  // Função para obter cor do tipo
  const getTipoColor = (tipo) => {
    return tipo === 'produto' 
      ? 'bg-blue-100 text-blue-800 border-blue-200' 
      : 'bg-green-100 text-green-800 border-green-200';
  };

  // Função para obter cor do status
  const getStatusColor = (status) => {
    return status === 'ativo' 
      ? 'bg-green-100 text-green-800 border-green-200' 
      : 'bg-red-100 text-red-800 border-red-200';
  };

  // Função para obter cor do estoque
  const getEstoqueColor = (estoque) => {
    if (estoque === null) return 'text-gray-500'; // Serviços
    if (estoque === 0) return 'text-red-600';
    if (estoque <= 5) return 'text-yellow-600';
    return 'text-green-600';
  };

  // Simular upload de CSV
  const handleCsvUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log('Arquivo CSV selecionado:', file.name);
      // Aqui você implementaria o processamento do CSV
      alert(`Arquivo ${file.name} selecionado. Implementar processamento do CSV.`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header da página */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Produtos e Serviços</h1>
          <p className="text-gray-600">Gerencie seu catálogo de produtos e serviços</p>
        </div>
        
        <div className="flex gap-3">
          {/* Botão Cadastrar por CSV */}
          <label className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            Importar CSV
            <input
              type="file"
              accept=".csv"
              onChange={handleCsvUpload}
              className="hidden"
            />
          </label>
          
          {/* Botão Cadastrar Produto */}
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Novo Produto
          </button>
        </div>
      </div>

      {/* Campo de busca */}
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <div className="flex gap-4 items-center">
          <div className="flex-1 relative">
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Buscar por nome, código, categoria ou fornecedor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="text-sm text-gray-500">
            {produtosFiltrados.length} de {produtos.length} item(s)
          </div>
        </div>
      </div>

      {/* Lista de produtos */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        {produtosFiltrados.length === 0 ? (
          <div className="p-8 text-center">
            <svg className="mx-auto w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-1">Nenhum produto encontrado</h3>
            <p className="text-gray-500">Tente ajustar sua busca ou cadastre novos produtos</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Código / Nome
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tipo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Categoria
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Preço
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estoque
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fornecedor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {produtosFiltrados.map((produto) => (
                  <tr key={produto.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{produto.codigo}</div>
                        <div className="text-sm text-gray-500">{produto.nome}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getTipoColor(produto.tipo)}`}>
                        {produto.tipo === 'produto' ? 'Produto' : 'Serviço'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {produto.categoria}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {formatCurrency(produto.preco)}
                      <div className="text-xs text-gray-500">por {produto.unidade}</div>
                    </td>
                    <td className="px-6 py-4">
                      {produto.estoque === null ? (
                        <span className="text-sm text-gray-500">N/A</span>
                      ) : (
                        <div className={`text-sm font-medium ${getEstoqueColor(produto.estoque)}`}>
                          {produto.estoque} {produto.unidade}
                          {produto.estoque === 0 && (
                            <div className="text-xs text-red-600">Sem estoque</div>
                          )}
                          {produto.estoque > 0 && produto.estoque <= 5 && (
                            <div className="text-xs text-yellow-600">Estoque baixo</div>
                          )}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {produto.fornecedor}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(produto.status)}`}>
                        {produto.status === 'ativo' ? 'Ativo' : 'Inativo'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">
                      <div className="flex gap-2">
                        <button className="text-blue-600 hover:text-blue-900" title="Visualizar">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                        <button className="text-gray-600 hover:text-gray-900" title="Editar">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button className="text-red-600 hover:text-red-900" title="Excluir">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Cards de resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="text-sm text-gray-500">Total de Itens</div>
          <div className="text-2xl font-bold text-gray-900">{produtos.length}</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="text-sm text-gray-500">Produtos</div>
          <div className="text-2xl font-bold text-blue-600">
            {produtos.filter(p => p.tipo === 'produto').length}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="text-sm text-gray-500">Serviços</div>
          <div className="text-2xl font-bold text-green-600">
            {produtos.filter(p => p.tipo === 'servico').length}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="text-sm text-gray-500">Sem Estoque</div>
          <div className="text-2xl font-bold text-red-600">
            {produtos.filter(p => p.estoque === 0).length}
          </div>
        </div>
      </div>
    </div>
  );
}