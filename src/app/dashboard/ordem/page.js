'use client';

import { useState } from 'react';
import OrderModal from './componentes/orderModal';

export default function OrdensPage() {
  // Estado para controlar o modal
  const [selectedOrdem, setSelectedOrdem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [initialEditMode, setInitialEditMode] = useState(false);

// Modifique as funções existentes:

// Função para abrir modal com detalhes (modo visualização)
const handleViewDetails = (ordem) => {
  setSelectedOrdem(ordem);
  setInitialEditMode(false); // Abre em modo visualização
  setShowModal(true);
};

// Nova função para abrir modal em modo de edição
const handleEditDetails = (ordem) => {
  setSelectedOrdem(ordem);
  setInitialEditMode(true); // Abre em modo edição
  setShowModal(true);
};

// Modifique a função closeModal:
const closeModal = () => {
  setShowModal(false);
  setSelectedOrdem(null);
  setInitialEditMode(false);
};

// Adicione a função para salvar alterações:
const handleSaveOrder = (updatedOrdem) => {
  setOrdens(prevOrdens => 
    prevOrdens.map(ordem => 
      ordem.id === updatedOrdem.id ? updatedOrdem : ordem
    )
  );
  console.log('Ordem atualizada:', updatedOrdem);
};

  

  // Dados de exemplo das ordens
  const [ordens] = useState([
    {
      id: 'ORD-001',
      fornecedor: 'Fornecedor ABC Ltda',
      dataOrdem: '2024-08-05',
      valor: 1250.00,
      status: 'pendente',
      itens: 3,
      previsaoEntrega: '2024-08-15',
      observacoes: 'Entrega urgente - Material para projeto especial',
      endereco: 'Rua das Indústrias, 456 - São Paulo/SP',
      contato: '(11) 3333-4444',
      detalhesItens: [
        { produto: 'Parafusos M6', quantidade: 100, valorUnitario: 2.50 },
        { produto: 'Porcas M6', quantidade: 100, valorUnitario: 1.80 },
        { produto: 'Arruelas', quantidade: 200, valorUnitario: 0.90 }
      ]
    },
    {
      id: 'ORD-002',
      fornecedor: 'Tech Solutions Inc',
      dataOrdem: '2024-08-03',
      valor: 3750.50,
      status: 'aprovada',
      itens: 5,
      previsaoEntrega: '2024-08-12',
      observacoes: 'Equipamentos de informática para escritório',
      endereco: 'Av. Paulista, 1000 - São Paulo/SP',
      contato: '(11) 5555-7777',
      detalhesItens: [
        { produto: 'Monitor 24"', quantidade: 2, valorUnitario: 800.00 },
        { produto: 'Teclado Mecânico', quantidade: 2, valorUnitario: 250.00 },
        { produto: 'Mouse Wireless', quantidade: 2, valorUnitario: 80.00 },
        { produto: 'Cabo HDMI', quantidade: 3, valorUnitario: 45.00 },
        { produto: 'Hub USB', quantidade: 1, valorUnitario: 120.50 }
      ]
    },
    {
      id: 'ORD-003',
      fornecedor: 'Supply Express',
      dataOrdem: '2024-08-01',
      valor: 890.25,
      status: 'entregue',
      itens: 2,
      previsaoEntrega: '2024-08-08',
      observacoes: 'Material de limpeza para o mês',
      endereco: 'Rua do Comércio, 789 - Santo André/SP',
      contato: '(11) 9999-3333',
      detalhesItens: [
        { produto: 'Detergente Industrial', quantidade: 10, valorUnitario: 25.50 },
        { produto: 'Papel Higiênico (Fardo)', quantidade: 5, valorUnitario: 127.55 }
      ]
    },
    {
      id: 'ORD-004',
      fornecedor: 'Industrial Parts Co',
      dataOrdem: '2024-07-28',
      valor: 2100.00,
      status: 'cancelada',
      itens: 4,
      previsaoEntrega: '2024-08-10',
      observacoes: 'Cancelada por indisponibilidade do fornecedor',
      endereco: 'Distrito Industrial - Guarulhos/SP',
      contato: '(11) 2222-8888',
      detalhesItens: [
        { produto: 'Rolamento 6201', quantidade: 20, valorUnitario: 35.00 },
        { produto: 'Correia Dentada', quantidade: 5, valorUnitario: 120.00 },
        { produto: 'Óleo Hidráulico', quantidade: 4, valorUnitario: 180.00 },
        { produto: 'Filtro de Ar', quantidade: 10, valorUnitario: 45.00 }
      ]
    },
    {
      id: 'ORD-005',
      fornecedor: 'Premium Supplies',
      dataOrdem: '2024-08-07',
      valor: 5200.75,
      status: 'em_transito',
      itens: 8,
      previsaoEntrega: '2024-08-18',
      observacoes: 'Equipamentos de alta qualidade - Manuseio cuidadoso',
      endereco: 'Av. Industrial, 2500 - São Bernardo/SP',
      contato: '(11) 7777-9999',
      detalhesItens: [
        { produto: 'Compressor de Ar', quantidade: 1, valorUnitario: 1800.00 },
        { produto: 'Furadeira Profissional', quantidade: 3, valorUnitario: 450.00 },
        { produto: 'Serra Circular', quantidade: 2, valorUnitario: 380.00 },
        { produto: 'Parafusadeira', quantidade: 4, valorUnitario: 220.00 },
        { produto: 'Nível a Laser', quantidade: 2, valorUnitario: 350.00 },
        { produto: 'Trena Eletrônica', quantidade: 5, valorUnitario: 85.00 },
        { produto: 'Óculos de Proteção', quantidade: 10, valorUnitario: 25.00 },
        { produto: 'Capacete de Segurança', quantidade: 10, valorUnitario: 42.75 }
      ]
    }
  ]);

  // Função para formatar moeda
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  // Função para formatar data
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  // Função para obter a cor do status
  const getStatusColor = (status) => {
    switch (status) {
      case 'pendente':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'aprovada':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'em_transito':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'entregue':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelada':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Função para formatar o status para exibição
  const formatStatus = (status) => {
    switch (status) {
      case 'pendente':
        return 'Pendente';
      case 'aprovada':
        return 'Aprovada';
      case 'em_transito':
        return 'Em Trânsito';
      case 'entregue':
        return 'Entregue';
      case 'cancelada':
        return 'Cancelada';
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header da página */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Ordens de Serviço</h1>
          <p className="text-gray-600">Gerencie suas ordens de serviço</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Nova Ordem
        </button>
      </div>

      {/* Filtros e busca */}
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <div className="flex gap-4 items-center">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Buscar por ID, fornecedor..."
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Todos os status</option>
            <option value="pendente">Pendente</option>
            <option value="aprovada">Aprovada</option>
            <option value="em_transito">Em Trânsito</option>
            <option value="entregue">Entregue</option>
            <option value="cancelada">Cancelada</option>
          </select>
        </div>
      </div>

      {/* Lista de ordens */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID / Fornecedor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data da Ordem
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Valor Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Itens
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Previsão Entrega
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {ordens.map((ordem) => (
                <tr key={ordem.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{ordem.id}</div>
                      <div className="text-sm text-gray-500">{ordem.fornecedor}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {formatDate(ordem.dataOrdem)}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {formatCurrency(ordem.valor)}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(ordem.status)}`}>
                      {formatStatus(ordem.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {ordem.itens} {ordem.itens === 1 ? 'item' : 'itens'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {formatDate(ordem.previsaoEntrega)}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">
                    <div className="flex gap-2">
                      <button 
      className="text-blue-600 hover:text-blue-900"
      onClick={() => handleViewDetails(ordem)}
    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button 
    className="text-gray-600 hover:text-gray-900"
    onClick={() => handleEditDetails(ordem)}
    title="Editar ordem"
  >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="text-sm text-gray-500">Total de Ordens</div>
          <div className="text-2xl font-bold text-gray-900">{ordens.length}</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="text-sm text-gray-500">Valor Total</div>
          <div className="text-2xl font-bold text-green-600">
            {formatCurrency(ordens.reduce((acc, ordem) => acc + ordem.valor, 0))}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="text-sm text-gray-500">Pendentes</div>
          <div className="text-2xl font-bold text-yellow-600">
            {ordens.filter(ordem => ordem.status === 'pendente').length}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="text-sm text-gray-500">Entregues</div>
          <div className="text-2xl font-bold text-green-600">
            {ordens.filter(ordem => ordem.status === 'entregue').length}
          </div>
        </div>
      </div>

      

      {/* Modal de Detalhes da Ordem */}
     <OrderModal 
  ordem={selectedOrdem}
  isOpen={showModal}
  onClose={closeModal}
  onSave={handleSaveOrder}
  initialEditMode={initialEditMode}
/>
    </div>
  );
}