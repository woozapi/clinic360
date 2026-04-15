import { useState } from 'react';
import { 
  Package, 
  Plus, 
  Search, 
  Filter, 
  AlertTriangle, 
  ArrowUpRight, 
  ArrowDownRight,
  MoreHorizontal,
  History,
  ShoppingCart
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { InventoryItem } from '@/types';

const mockInventory: InventoryItem[] = [
  { id: '1', name: 'Botox (Frasco 100u)', quantity: 12, minQuantity: 5, unit: 'un' },
  { id: '2', name: 'Luvas de Procedimento (Caixa)', quantity: 45, minQuantity: 50, unit: 'cx' },
  { id: '3', name: 'Máscaras Descartáveis (Caixa)', quantity: 30, minQuantity: 20, unit: 'cx' },
  { id: '4', name: 'Resina Composta A2', quantity: 8, minQuantity: 10, unit: 'un' },
  { id: '5', name: 'Ácido Hialurônico 1ml', quantity: 15, minQuantity: 5, unit: 'un' },
];

export default function Inventory() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-[1.5rem] font-bold text-text-primary">Gestão de Estoque</h1>
          <p className="text-text-secondary text-sm">Controle de insumos, materiais e alertas de reposição.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-border rounded-md text-[13px] font-semibold text-text-secondary hover:bg-slate-50 transition-colors">
            <History size={18} />
            Histórico
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-md text-[13px] font-semibold hover:bg-blue-700 transition-colors">
            <Plus size={18} />
            Novo Item
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="panel-card p-6 flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-accent rounded-lg">
            <Package size={24} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-text-secondary uppercase tracking-wider mb-1">Total de Itens</p>
            <p className="text-lg font-bold text-text-primary">156 Materiais</p>
          </div>
        </div>
        <div className="panel-card p-6 flex items-center gap-4 border-l-4 border-l-rose-500">
          <div className="p-3 bg-rose-50 text-rose-600 rounded-lg">
            <AlertTriangle size={24} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-text-secondary uppercase tracking-wider mb-1">Abaixo do Mínimo</p>
            <p className="text-lg font-bold text-rose-600">12 Itens</p>
          </div>
        </div>
        <div className="panel-card p-6 flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-success rounded-lg">
            <ShoppingCart size={24} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-text-secondary uppercase tracking-wider mb-1">Pedidos Pendentes</p>
            <p className="text-lg font-bold text-text-primary">3 Pedidos</p>
          </div>
        </div>
      </div>

      <div className="panel-card overflow-hidden">
        <div className="px-6 py-4 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <h3 className="font-bold text-text-primary">Lista de Materiais</h3>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-slate-100 text-text-secondary text-[10px] font-bold rounded-full uppercase tracking-wider">Todos</button>
              <button className="px-3 py-1 bg-rose-50 text-rose-600 text-[10px] font-bold rounded-full uppercase tracking-wider">Crítico</button>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
              <input 
                type="text" 
                placeholder="Buscar material..."
                className="pl-9 pr-4 py-1.5 bg-background border border-border rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-accent/20 w-48"
              />
            </div>
            <button className="p-2 bg-background border border-border rounded-lg text-text-secondary hover:text-text-primary transition-colors">
              <Filter size={16} />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/30 border-b border-border">
                <th className="px-6 py-3 text-[11px] font-semibold text-text-secondary uppercase tracking-wider">Material</th>
                <th className="px-6 py-3 text-[11px] font-semibold text-text-secondary uppercase tracking-wider">Quantidade</th>
                <th className="px-6 py-3 text-[11px] font-semibold text-text-secondary uppercase tracking-wider">Mínimo</th>
                <th className="px-6 py-3 text-[11px] font-semibold text-text-secondary uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {mockInventory.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-text-primary">{item.name}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-text-primary">{item.quantity} {item.unit}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-xs text-text-secondary">{item.minQuantity} {item.unit}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className={cn(
                      "flex items-center text-[10px] font-bold px-2 py-1 rounded-full w-fit uppercase tracking-wider",
                      item.quantity > item.minQuantity ? "bg-emerald-50 text-success" : "bg-rose-50 text-rose-600"
                    )}>
                      {item.quantity > item.minQuantity ? 'Em Estoque' : 'Reposição'}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 bg-slate-50 text-text-secondary hover:text-accent rounded-md transition-colors">
                        <ArrowUpRight size={16} />
                      </button>
                      <button className="p-1.5 bg-slate-50 text-text-secondary hover:text-rose-600 rounded-md transition-colors">
                        <ArrowDownRight size={16} />
                      </button>
                      <button className="p-1.5 bg-slate-50 text-text-secondary hover:text-accent rounded-md transition-colors">
                        <MoreHorizontal size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
