'use client';

import { useState, useEffect } from 'react';

export default function OrderModal({ ordem, isOpen, onClose, onSave, initialEditMode }) {
  const [isEditing, setIsEditing] = useState(initialEditMode || false);
  const [editedOrdem, setEditedOrdem] = useState(null);

  // Atualiza os dados quando a ordem muda
  useEffect(() => {
    if (ordem) {
      setEditedOrdem({
        ...ordem,
        detalhesItens: [...ordem.detalhesItens]
      });
    }
  }, [ordem]);

  // Atualiza o modo de edição quando initialEditMode muda
  useEffect(() => {
    setIsEditing(initialEditMode || false);
  }, [initialEditMode]);

  // Se não estiver aberto ou não houver ordem, não renderiza nada
  if (!isOpen || !ordem || !editedOrdem) return null;

  // Função para formatar moeda
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  // Função para formatar data para input
  const formatDateForInput = (dateString) => {
    return dateString; // Já está no formato YYYY-MM-DD
  };

  // Função para formatar data para exibição
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

  // Fechar modal ao clicar no overlay
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Atualizar campo da ordem
  const handleFieldChange = (field, value) => {
    setEditedOrdem(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Atualizar item da lista
  const handleItemChange = (index, field, value) => {
    setEditedOrdem(prev => ({
      ...prev,
      detalhesItens: prev.detalhesItens.map((item, i) => 
        i === index ? { ...item, [field]: field === 'quantidade' || field === 'valorUnitario' ? parseFloat(value) || 0 : value } : item
      )
    }));
  };

  // Adicionar novo item
  const handleAddItem = () => {
    setEditedOrdem(prev => ({
      ...prev,
      detalhesItens: [...prev.detalhesItens, { produto: '', quantidade: 1, valorUnitario: 0 }]
    }));
  };

  // Remover item
  const handleRemoveItem = (index) => {
    setEditedOrdem(prev => ({
      ...prev,
      detalhesItens: prev.detalhesItens.filter((_, i) => i !== index)
    }));
  };

  // Calcular valor total
  const calculateTotal = () => {
    return editedOrdem.detalhesItens.reduce((total, item) => 
      total + (item.quantidade * item.valorUnitario), 0
    );
  };

  // Salvar alterações
  const handleSave = () => {
    const updatedOrdem = {
      ...editedOrdem,
      valor: calculateTotal(),
      itens: editedOrdem.detalhesItens.length
    };
    
    if (onSave) {
      onSave(updatedOrdem);
    }
    setIsEditing(false);
  };

  // Cancelar edição
  const handleCancelEdit = () => {
    setEditedOrdem({
      ...ordem,
      detalhesItens: [...ordem.detalhesItens]
    });
    setIsEditing(false);
  };

  return (
    <div 
      className="fixed inset-0 bg-white bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-lg shadow-xl border-2 border-gray max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header do Modal */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {isEditing ? 'Editar Ordem' : 'Detalhes da Ordem'}
            </h2>
            <p className="text-gray-600">{editedOrdem.id}</p>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Conteúdo do Modal */}
        <div className="p-6 space-y-6">
          {/* Informações Gerais */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Fornecedor</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedOrdem.fornecedor}
                    onChange={(e) => handleFieldChange('fornecedor', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-lg font-semibold text-gray-900">{editedOrdem.fornecedor}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Status</label>
                {isEditing ? (
                  <select
                    value={editedOrdem.status}
                    onChange={(e) => handleFieldChange('status', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="pendente">Pendente</option>
                    <option value="aprovada">Aprovada</option>
                    <option value="em_transito">Em Trânsito</option>
                    <option value="entregue">Entregue</option>
                    <option value="cancelada">Cancelada</option>
                  </select>
                ) : (
                  <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full border ${getStatusColor(editedOrdem.status)}`}>
                    {formatStatus(editedOrdem.status)}
                  </span>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Valor Total</label>
                <p className="text-2xl font-bold text-green-600">{formatCurrency(isEditing ? calculateTotal() : editedOrdem.valor)}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Data da Ordem</label>
                {isEditing ? (
                  <input
                    type="date"
                    value={formatDateForInput(editedOrdem.dataOrdem)}
                    onChange={(e) => handleFieldChange('dataOrdem', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-lg text-gray-900">{formatDate(editedOrdem.dataOrdem)}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Previsão de Entrega</label>
                {isEditing ? (
                  <input
                    type="date"
                    value={formatDateForInput(editedOrdem.previsaoEntrega)}
                    onChange={(e) => handleFieldChange('previsaoEntrega', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-lg text-gray-900">{formatDate(editedOrdem.previsaoEntrega)}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Contato</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedOrdem.contato}
                    onChange={(e) => handleFieldChange('contato', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-lg text-gray-900">{editedOrdem.contato}</p>
                )}
              </div>
            </div>
          </div>

          {/* Endereço e Observações */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Endereço de Entrega</label>
              {isEditing ? (
                <textarea
                  value={editedOrdem.endereco}
                  onChange={(e) => handleFieldChange('endereco', e.target.value)}
                  rows="3"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{editedOrdem.endereco}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Observações</label>
              {isEditing ? (
                <textarea
                  value={editedOrdem.observacoes}
                  onChange={(e) => handleFieldChange('observacoes', e.target.value)}
                  rows="3"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{editedOrdem.observacoes}</p>
              )}
            </div>
          </div>

          {/* Detalhes dos Itens */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Itens da Ordem</h3>
              {isEditing && (
                <button
                  onClick={handleAddItem}
                  className="px-3 py-1 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
                >
                  + Adicionar Item
                </button>
              )}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Produto</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-gray-500">Quantidade</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">Valor Unitário</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">Subtotal</th>
                    {isEditing && (
                      <th className="px-4 py-3 text-center text-sm font-medium text-gray-500">Ações</th>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {editedOrdem.detalhesItens.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        {isEditing ? (
                          <input
                            type="text"
                            value={item.produto}
                            onChange={(e) => handleItemChange(index, 'produto', e.target.value)}
                            className="w-full px-2 py-1 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                        ) : (
                          <span className="text-sm text-gray-900">{item.produto}</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {isEditing ? (
                          <input
                            type="number"
                            value={item.quantidade}
                            onChange={(e) => handleItemChange(index, 'quantidade', e.target.value)}
                            className="w-20 px-2 py-1 text-sm border rounded text-center focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                        ) : (
                          <span className="text-sm text-gray-900">{item.quantidade}</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right">
                        {isEditing ? (
                          <input
                            type="number"
                            step="0.01"
                            value={item.valorUnitario}
                            onChange={(e) => handleItemChange(index, 'valorUnitario', e.target.value)}
                            className="w-24 px-2 py-1 text-sm border rounded text-right focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                        ) : (
                          <span className="text-sm text-gray-900">{formatCurrency(item.valorUnitario)}</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm font-semibold text-gray-900 text-right">
                        {formatCurrency(item.quantidade * item.valorUnitario)}
                      </td>
                      {isEditing && (
                        <td className="px-4 py-3 text-center">
                          <button
                            onClick={() => handleRemoveItem(index)}
                            className="text-red-600 hover:text-red-800 transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-gray-50">
                  <tr>
                    <td colSpan={isEditing ? "4" : "3"} className="px-4 py-3 text-right text-sm font-medium text-gray-900">
                      Total da Ordem:
                    </td>
                    <td className="px-4 py-3 text-right text-lg font-bold text-green-600">
                      {formatCurrency(isEditing ? calculateTotal() : editedOrdem.valor)}
                    </td>
                    {isEditing && <td></td>}
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            {isEditing ? (
              <>
                <button 
                  onClick={handleCancelEdit}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  onClick={handleSave}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Salvar Alterações
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={onClose}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Fechar
                </button>
                <button 
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Editar Ordem
                </button>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  Imprimir
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}