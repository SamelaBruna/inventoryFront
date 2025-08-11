'use client';

import { useState, useMemo } from 'react';

export default function ClientesPage() {
  // Estado para a busca
  const [searchTerm, setSearchTerm] = useState('');
  
  // Estado para controlar modal (futuramente)
  const [showAddModal, setShowAddModal] = useState(false);

  // Dados de exemplo dos clientes
  const [clientes] = useState([
    {
      id: 1,
      nome: 'João Silva Santos',
      cpfCnpj: '123.456.789-01',
      tipo: 'pessoa_fisica',
      email: 'joao.silva@email.com',
      telefone: '(11) 99999-1234',
      endereco: {
        rua: 'Rua das Flores, 123',
        cidade: 'São Paulo',
        estado: 'SP',
        cep: '01234-567'
      },
      dataCadastro: '2024-01-15',
      status: 'ativo'
    },
    {
      id: 2,
      nome: 'Tech Solutions Ltda',
      cpfCnpj: '12.345.678/0001-90',
      tipo: 'pessoa_juridica',
      email: 'contato@techsolutions.com',
      telefone: '(11) 3333-5678',
      endereco: {
        rua: 'Av. Paulista, 1000, Sala 501',
        cidade: 'São Paulo',
        estado: 'SP',
        cep: '01310-100'
      },
      dataCadastro: '2024-02-10',
      status: 'ativo'
    },
    {
      id: 3,
      nome: 'Maria Oliveira Costa',
      cpfCnpj: '987.654.321-09',
      tipo: 'pessoa_fisica',
      email: 'maria.costa@gmail.com',
      telefone: '(11) 98765-4321',
      endereco: {
        rua: 'Rua dos Ipês, 456',
        cidade: 'Guarulhos',
        estado: 'SP',
        cep: '07110-000'
      },
      dataCadastro: '2024-03-05',
      status: 'ativo'
    },
    {
      id: 4,
      nome: 'Comércio ABC Ltda',
      cpfCnpj: '98.765.432/0001-10',
      tipo: 'pessoa_juridica',
      email: 'vendas@comercioabc.com.br',
      telefone: '(11) 2222-8888',
      endereco: {
        rua: 'Rua do Comércio, 789',
        cidade: 'São Bernardo do Campo',
        estado: 'SP',
        cep: '09750-000'
      },
      dataCadastro: '2023-12-20',
      status: 'inativo'
    },
    {
      id: 5,
      nome: 'Carlos Eduardo Ferreira',
      cpfCnpj: '456.789.123-45',
      tipo: 'pessoa_fisica',
      email: 'carlos.ferreira@outlook.com',
      telefone: '(11) 91234-5678',
      endereco: {
        rua: 'Av. Brasil, 2000, Apto 15B',
        cidade: 'Santo André',
        estado: 'SP',
        cep: '09040-000'
      },
      dataCadastro: '2024-07-12',
      status: 'ativo'
    },
    {
      id: 6,
      nome: 'Ana Paula Rodrigues',
      cpfCnpj: '321.654.987-33',
      tipo: 'pessoa_fisica',
      email: 'ana.rodrigues@email.com',
      telefone: '(11) 95555-7777',
      endereco: {
        rua: 'Rua das Acácias, 321',
        cidade: 'Diadema',
        estado: 'SP',
        cep: '09900-000'
      },
      dataCadastro: '2024-06-08',
      status: 'ativo'
    }
  ]);

  // Filtrar clientes baseado na busca
  const clientesFiltrados = useMemo(() => {
    if (!searchTerm) return clientes;
    
    return clientes.filter(cliente =>
      cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.cpfCnpj.replace(/[^\d]/g, '').includes(searchTerm.replace(/[^\d]/g, '')) ||
      cliente.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.telefone.replace(/[^\d]/g, '').includes(searchTerm.replace(/[^\d]/g, ''))
    );
  }, [clientes, searchTerm]);

  // Função para formatar CPF/CNPJ
  const formatCpfCnpj = (documento) => {
    const numbers = documento.replace(/[^\d]/g, '');
    if (numbers.length === 11) {
      return documento; // Já está formatado como CPF
    } else if (numbers.length === 14) {
      return documento; // Já está formatado como CNPJ
    }
    return documento;
  };

  // Função para formatar telefone
  const formatTelefone = (telefone) => {
    return telefone;
  };

  // Função para formatar data
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  // Função para obter cor do tipo
  const getTipoColor = (tipo) => {
    return tipo === 'pessoa_fisica' 
      ? 'bg-blue-100 text-blue-800 border-blue-200' 
      : 'bg-purple-100 text-purple-800 border-purple-200';
  };

  // Função para obter cor do status
  const getStatusColor = (status) => {
    return status === 'ativo' 
      ? 'bg-green-100 text-green-800 border-green-200' 
      : 'bg-red-100 text-red-800 border-red-200';
  };

  // Função para obter ícone do tipo
  const getTipoIcon = (tipo) => {
    if (tipo === 'pessoa_fisica') {
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      );
    } else {
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header da página */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Clientes</h1>
          <p className="text-gray-600">Gerencie sua base de clientes</p>
        </div>
        
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Novo Cliente
        </button>
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
              placeholder="Buscar por nome, CPF/CNPJ, email ou telefone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="text-sm text-gray-500">
            {clientesFiltrados.length} de {clientes.length} cliente(s)
          </div>
        </div>
      </div>

      {/* Lista de clientes */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        {clientesFiltrados.length === 0 ? (
          <div className="p-8 text-center">
            <svg className="mx-auto w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-1">Nenhum cliente encontrado</h3>
            <p className="text-gray-500">Tente ajustar sua busca ou cadastre novos clientes</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cliente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    CPF/CNPJ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tipo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contato
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Localização
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data Cadastro
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
                {clientesFiltrados.map((cliente) => (
                  <tr key={cliente.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                            {getTipoIcon(cliente.tipo)}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{cliente.nome}</div>
                          <div className="text-sm text-gray-500">{cliente.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-mono text-gray-900">
                      {formatCpfCnpj(cliente.cpfCnpj)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getTipoColor(cliente.tipo)}`}>
                        {cliente.tipo === 'pessoa_fisica' ? 'Pessoa Física' : 'Pessoa Jurídica'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{formatTelefone(cliente.telefone)}</div>
                      <div className="text-sm text-gray-500">{cliente.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{cliente.endereco.cidade}/{cliente.endereco.estado}</div>
                      <div className="text-sm text-gray-500">{cliente.endereco.cep}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {formatDate(cliente.dataCadastro)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(cliente.status)}`}>
                        {cliente.status === 'ativo' ? 'Ativo' : 'Inativo'}
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
                        <button className="text-green-600 hover:text-green-900" title="Histórico de Compras">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
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
          <div className="text-sm text-gray-500">Total de Clientes</div>
          <div className="text-2xl font-bold text-gray-900">{clientes.length}</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="text-sm text-gray-500">Pessoa Física</div>
          <div className="text-2xl font-bold text-blue-600">
            {clientes.filter(c => c.tipo === 'pessoa_fisica').length}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="text-sm text-gray-500">Pessoa Jurídica</div>
          <div className="text-2xl font-bold text-purple-600">
            {clientes.filter(c => c.tipo === 'pessoa_juridica').length}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="text-sm text-gray-500">Clientes Ativos</div>
          <div className="text-2xl font-bold text-green-600">
            {clientes.filter(c => c.status === 'ativo').length}
          </div>
        </div>
      </div>
    </div>
  );
}