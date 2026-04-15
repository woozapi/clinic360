import { useState } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  ArrowUpRight, 
  ArrowDownRight,
  Plus,
  Search,
  Filter,
  Download,
  Calendar as CalendarIcon,
  MoreHorizontal,
  CheckCircle2,
  Clock,
  XCircle,
  Sparkles
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const data = [
  { name: 'Seg', income: 4000, expense: 2400 },
  { name: 'Ter', income: 3000, expense: 1398 },
  { name: 'Qua', income: 2000, expense: 9800 },
  { name: 'Qui', income: 2780, expense: 3908 },
  { name: 'Sex', income: 1890, expense: 4800 },
  { name: 'Sáb', income: 2390, expense: 3800 },
];

const transactions = [
  { id: '1', description: 'Limpeza Dental - Paulo Argolo', category: 'Procedimento', amount: 350, type: 'income', date: new Date(), status: 'paid' },
  { id: '2', description: 'Aluguel Sala 02', category: 'Infraestrutura', amount: 2500, type: 'expense', date: new Date(), status: 'paid' },
  { id: '3', description: 'Botox - Juliana Silva', category: 'Estética', amount: 1200, type: 'income', date: new Date(), status: 'pending' },
  { id: '4', description: 'Compra de Insumos (Luvas/Máscaras)', category: 'Estoque', amount: 450, type: 'expense', date: new Date(), status: 'paid' },
  { id: '5', description: 'Harmonização - Maria Costa', category: 'Estética', amount: 3200, type: 'income', date: new Date(), status: 'paid' },
];

export default function Finance() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-[1.5rem] font-bold text-text-primary">Gestão Financeira</h1>
          <p className="text-text-secondary text-sm">Controle seu fluxo de caixa, faturamento e ROI em tempo real.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-border rounded-md text-[13px] font-semibold text-text-secondary hover:bg-slate-50 transition-colors">
            <Download size={18} />
            Relatórios
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-md text-[13px] font-semibold hover:bg-blue-700 transition-colors">
            <Plus size={18} />
            Nova Transação
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="panel-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-emerald-50 text-success rounded-lg">
              <TrendingUp size={20} />
            </div>
            <span className="text-[10px] font-bold text-success bg-emerald-50 px-2 py-1 rounded-full uppercase tracking-wider">+15%</span>
          </div>
          <p className="text-text-secondary text-[11px] font-bold uppercase tracking-wider mb-1">Entradas (Mês)</p>
          <p className="text-2xl font-bold text-text-primary">R$ 45.280,00</p>
        </div>
        <div className="panel-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-rose-50 text-rose-600 rounded-lg">
              <TrendingDown size={20} />
            </div>
            <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-1 rounded-full uppercase tracking-wider">-5%</span>
          </div>
          <p className="text-text-secondary text-[11px] font-bold uppercase tracking-wider mb-1">Saídas (Mês)</p>
          <p className="text-2xl font-bold text-text-primary">R$ 12.450,00</p>
        </div>
        <div className="panel-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-50 text-accent rounded-lg">
              <DollarSign size={20} />
            </div>
            <span className="text-[10px] font-bold text-accent bg-blue-50 px-2 py-1 rounded-full uppercase tracking-wider">+22%</span>
          </div>
          <p className="text-text-secondary text-[11px] font-bold uppercase tracking-wider mb-1">Lucro Líquido</p>
          <p className="text-2xl font-bold text-text-primary">R$ 32.830,00</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 panel-card p-6">
          <h3 className="font-bold text-text-primary mb-6">Fluxo Semanal</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11, fontWeight: 600 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11, fontWeight: 600 }} />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="income" fill="#10b981" radius={[2, 2, 0, 0]} barSize={24} />
                <Bar dataKey="expense" fill="#f43f5e" radius={[2, 2, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="panel-card p-6">
          <h3 className="font-bold text-text-primary mb-6">Distribuição por Categoria</h3>
          <div className="space-y-5">
            {[
              { label: 'Procedimentos', value: 65, color: 'bg-success' },
              { label: 'Estética', value: 25, color: 'bg-accent' },
              { label: 'Consultas', value: 10, color: 'bg-amber-500' },
            ].map((item) => (
              <div key={item.label} className="space-y-2">
                <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider">
                  <span className="text-text-secondary">{item.label}</span>
                  <span className="text-text-primary">{item.value}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className={cn("h-full rounded-full", item.color)} style={{ width: `${item.value}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 p-4 bg-blue-50/50 rounded-lg border border-blue-100">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={14} className="text-ai-purple" />
              <p className="text-[10px] font-bold text-ai-purple uppercase tracking-wider">Insight IA</p>
            </div>
            <p className="text-[11px] text-slate-700 leading-relaxed">
              Seu ticket médio em Estética subiu 12% este mês. Considere criar um pacote de fidelidade para manter essa tendência.
            </p>
          </div>
        </div>
      </div>

      <div className="panel-card overflow-hidden">
        <div className="px-6 py-4 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h3 className="font-bold text-text-primary">Últimas Transações</h3>
          <div className="flex gap-2">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
              <input 
                type="text" 
                placeholder="Buscar transação..."
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
                <th className="px-6 py-3 text-[11px] font-semibold text-text-secondary uppercase tracking-wider">Descrição</th>
                <th className="px-6 py-3 text-[11px] font-semibold text-text-secondary uppercase tracking-wider">Categoria</th>
                <th className="px-6 py-3 text-[11px] font-semibold text-text-secondary uppercase tracking-wider">Data</th>
                <th className="px-6 py-3 text-[11px] font-semibold text-text-secondary uppercase tracking-wider">Valor</th>
                <th className="px-6 py-3 text-[11px] font-semibold text-text-secondary uppercase tracking-wider">Status</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {transactions.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-text-primary">{t.description}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] font-bold text-text-secondary bg-slate-100 px-2 py-1 rounded-md uppercase tracking-wider">{t.category}</span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-xs text-text-secondary">{format(t.date, "dd/MM/yyyy")}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className={cn(
                      "text-sm font-bold",
                      t.type === 'income' ? "text-success" : "text-rose-600"
                    )}>
                      {t.type === 'income' ? '+' : '-'} R$ {t.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <div className={cn(
                      "flex items-center text-[10px] font-bold px-2 py-1 rounded-full w-fit uppercase tracking-wider",
                      t.status === 'paid' ? "bg-emerald-50 text-success" : "bg-amber-50 text-amber-600"
                    )}>
                      {t.status === 'paid' ? <CheckCircle2 size={12} className="mr-1" /> : <Clock size={12} className="mr-1" />}
                      {t.status === 'paid' ? 'Pago' : 'Pendente'}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1.5 bg-slate-50 text-text-secondary hover:text-accent rounded-md transition-colors">
                      <MoreHorizontal size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 bg-slate-50/30 border-t border-border text-center">
          <button className="text-[11px] font-bold text-accent uppercase tracking-wider hover:underline">Ver todas as transações</button>
        </div>
      </div>
    </div>
  );
}
