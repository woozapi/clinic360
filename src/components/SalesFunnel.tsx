import { useState } from 'react';
import { 
  Plus, 
  MoreHorizontal, 
  User, 
  DollarSign, 
  Clock,
  ArrowRight,
  Filter,
  Search
} from 'lucide-react';
import { motion, Reorder } from 'motion/react';
import { cn } from '@/lib/utils';

interface Lead {
  id: string;
  name: string;
  procedure: string;
  value: number;
  daysInStage: number;
  priority: 'low' | 'medium' | 'high';
}

interface Column {
  id: string;
  title: string;
  leads: Lead[];
}

const initialColumns: Column[] = [
  {
    id: 'lead',
    title: 'Novos Leads',
    leads: [
      { id: '1', name: 'Carlos Mendes', procedure: 'Implante', value: 4500, daysInStage: 2, priority: 'high' },
      { id: '2', name: 'Fernanda Lima', procedure: 'Clareamento', value: 800, daysInStage: 1, priority: 'medium' },
    ]
  },
  {
    id: 'consultation',
    title: 'Consulta Agendada',
    leads: [
      { id: '3', name: 'Roberto Silva', procedure: 'Botox', value: 1200, daysInStage: 5, priority: 'high' },
    ]
  },
  {
    id: 'budget',
    title: 'Orçamento Enviado',
    leads: [
      { id: '4', name: 'Amanda Rocha', procedure: 'Lentes de Contato', value: 15000, daysInStage: 3, priority: 'high' },
      { id: '5', name: 'Lucas Pires', procedure: 'Limpeza', value: 350, daysInStage: 7, priority: 'low' },
    ]
  },
  {
    id: 'closing',
    title: 'Em Negociação',
    leads: [
      { id: '6', name: 'Sônia Maria', procedure: 'Prótese', value: 3200, daysInStage: 12, priority: 'medium' },
    ]
  }
];

export default function SalesFunnel() {
  const [columns, setColumns] = useState(initialColumns);

  return (
    <div className="space-y-6 h-full animate-in fade-in duration-500 flex flex-col">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-[1.5rem] font-bold text-text-primary">Funil de Vendas</h1>
          <p className="text-text-secondary text-sm">Acompanhe a conversão de leads em procedimentos realizados.</p>
        </div>
        <div className="flex gap-2">
          <div className="bg-white border border-border rounded-lg p-3 flex items-center gap-6">
            <div>
              <p className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">Potencial Total</p>
              <p className="text-sm font-bold text-accent">R$ 142.500</p>
            </div>
            <div className="w-px h-8 bg-border" />
            <div>
              <p className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">Conversão</p>
              <p className="text-sm font-bold text-success">24%</p>
            </div>
          </div>
          <button className="px-4 py-2 bg-accent text-white rounded-md text-[13px] font-semibold hover:bg-blue-700 transition-colors self-center">
            + Novo Lead
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto pb-4 no-scrollbar">
        <div className="flex gap-6 h-full min-w-max">
          {columns.map((column) => (
            <div key={column.id} className="w-80 flex flex-col h-full">
              <div className="flex items-center justify-between mb-4 px-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-text-primary">{column.title}</h3>
                  <span className="px-2 py-0.5 bg-slate-100 text-text-secondary text-[10px] font-bold rounded-full">
                    {column.leads.length}
                  </span>
                </div>
                <button className="p-1 hover:bg-slate-100 rounded-md text-text-secondary">
                  <Plus size={16} />
                </button>
              </div>

              <div className="flex-1 bg-slate-50/50 rounded-xl border border-dashed border-border p-3 space-y-3 overflow-y-auto no-scrollbar">
                {column.leads.map((lead) => (
                  <motion.div
                    key={lead.id}
                    layoutId={lead.id}
                    whileHover={{ y: -2, boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                    className="bg-white p-4 rounded-xl border border-border cursor-grab active:cursor-grabbing group"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-xs font-bold text-text-primary group-hover:text-accent transition-colors">{lead.name}</h4>
                      <div className="flex gap-1">
                        {lead.priority === 'high' && <div className="w-2 h-2 rounded-full bg-rose-500" />}
                        {lead.priority === 'medium' && <div className="w-2 h-2 rounded-full bg-amber-500" />}
                      </div>
                    </div>
                    <p className="text-[10px] text-text-secondary mb-3">{lead.procedure}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-text-primary">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(lead.value)}
                      </span>
                      <div className="flex -space-x-2">
                        <div className="w-5 h-5 rounded-full bg-slate-200 border-2 border-white" />
                        <div className="w-5 h-5 rounded-full bg-slate-300 border-2 border-white flex items-center justify-center text-[8px] font-bold">
                          +1
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
