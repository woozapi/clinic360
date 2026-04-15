import { 
  Users, 
  Calendar, 
  TrendingUp, 
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

const data = [
  { name: 'Jan', revenue: 4000, patients: 240 },
  { name: 'Fev', revenue: 3000, patients: 198 },
  { name: 'Mar', revenue: 2000, patients: 150 },
  { name: 'Abr', revenue: 2780, patients: 210 },
  { name: 'Mai', revenue: 1890, patients: 120 },
  { name: 'Jun', revenue: 2390, patients: 180 },
  { name: 'Jul', revenue: 3490, patients: 250 },
];

const StatCard = ({ title, value, change, icon: Icon, trend }: any) => (
  <motion.div
    whileHover={{ y: -2 }}
    className="bg-white p-5 rounded-xl border border-border"
  >
    <p className="text-text-secondary text-[13px] mb-2">{title}</p>
    <p className="text-xl font-bold text-text-primary">{value}</p>
    <div className={cn(
      "flex items-center text-xs font-medium mt-1",
      trend === 'up' ? "text-success" : "text-rose-500"
    )}>
      {trend === 'up' ? '↑' : '↓'} {change} vs mês ant.
    </div>
  </motion.div>
);

export default function Dashboard() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-[1.5rem] font-bold text-text-primary">Visão Geral da Clínica</h1>
        <div className="flex items-center gap-3">
          <div className="ai-status-badge">
            <span className="w-2 h-2 bg-ai-purple rounded-full animate-pulse" />
            IA Processando: 14 insights ativos
          </div>
          <button className="px-4 py-2 bg-accent text-white rounded-md text-[13px] font-semibold hover:bg-blue-700 transition-colors">
            + Novo Agendamento
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard title="Faturamento Mensal" value="R$ 142.580" change="12.4%" icon={DollarSign} trend="up" />
        <StatCard title="Taxa de No-Show" value="4.2%" change="1.5%" icon={Calendar} trend="down" />
        <StatCard title="ROI Campanhas" value="4.8x" change="0.5%" icon={TrendingUp} trend="up" />
        <StatCard title="Pacientes Ativos" value="1.240" change="0%" icon={Users} trend="up" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
        <div className="panel-card flex flex-col">
          <div className="px-5 py-4 border-b border-border flex items-center justify-between">
            <h3 className="text-[15px] font-semibold">Próximos Procedimentos</h3>
            <span className="text-xs text-accent font-medium cursor-pointer">Ver Agenda Completa</span>
          </div>
          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-5 py-3 text-[11px] font-semibold text-text-secondary uppercase tracking-wider">Paciente</th>
                  <th className="px-5 py-3 text-[11px] font-semibold text-text-secondary uppercase tracking-wider">Procedimento</th>
                  <th className="px-5 py-3 text-[11px] font-semibold text-text-secondary uppercase tracking-wider">Horário</th>
                  <th className="px-5 py-3 text-[11px] font-semibold text-text-secondary uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  { name: 'Mariana Oliveira', proc: 'Harmonização Facial', time: '09:00', status: 'confirmed' },
                  { name: 'João Pedro Santos', proc: 'Implante Dentário', time: '10:30', status: 'confirmed' },
                  { name: 'Beatriz Costa', proc: 'Avaliação Estética', time: '11:45', status: 'pending' },
                  { name: 'Carlos Mendes', proc: 'Botox - Retorno', time: '14:00', status: 'confirmed' },
                  { name: 'Luciana Lima', proc: 'Lipo de Papada', time: '15:30', status: 'confirmed' },
                ].map((item, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-3.5 text-[13px] font-medium">{item.name}</td>
                    <td className="px-5 py-3.5 text-[13px] text-text-secondary">{item.proc}</td>
                    <td className="px-5 py-3.5 text-[13px] text-text-secondary">{item.time}</td>
                    <td className="px-5 py-3.5">
                      <span className={cn(
                        item.status === 'confirmed' ? "status-pill-confirmed" : "status-pill-pending"
                      )}>
                        {item.status === 'confirmed' ? 'Confirmado' : 'Pendente'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="ai-insight-box m-5">
            <div className="font-bold text-[12px] text-ai-purple mb-1 flex items-center gap-1.5">
              ✦ INSIGHT DE IA: REDUÇÃO DE FALTAS
            </div>
            <p className="text-[13px] text-[#4C1D95] leading-relaxed">
              Beatriz Costa ainda não confirmou via WhatsApp. Probabilidade de <strong>no-show: 65%</strong>. Gostaria que eu ligasse via Assistente de Voz agora?
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="panel-card p-5">
            <h3 className="text-[15px] font-semibold mb-6">Funil de Conversão</h3>
            <div className="space-y-6">
              {[
                { label: 'Leads Novos (84)', sub: 'R$ 12.400 em potencial', width: '80%', color: 'bg-accent' },
                { label: 'Consultas Marcadas (32)', sub: 'Taxa de conv.: 38%', width: '45%', color: 'bg-[#F59E0B]' },
                { label: 'Procedimentos (12)', sub: 'Ticket Médio: R$ 3.200', width: '20%', color: 'bg-success' },
              ].map((item) => (
                <div key={item.label} className="space-y-2">
                  <div className="flex flex-col">
                    <span className="text-[12px] font-semibold">{item.label}</span>
                    <span className="text-[11px] text-text-secondary">{item.sub}</span>
                  </div>
                  <div className="h-2 w-full bg-border rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: item.width }}
                      transition={{ duration: 1 }}
                      className={cn("h-full rounded-full", item.color)} 
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-5 border-t border-border">
              <h4 className="text-[13px] font-semibold mb-3">Alertas de Estoque</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-[12px]">
                  <span>Toxina Botulínica (100u)</span>
                  <span className="text-[#EF4444] font-bold">2 un.</span>
                </div>
                <div className="flex justify-between text-[12px]">
                  <span>Ácido Hialurônico</span>
                  <span className="text-success font-bold">14 un.</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="panel-card p-5 bg-linear-to-br from-accent to-blue-700 text-white border-none">
            <h3 className="text-[15px] font-semibold mb-2">Meta Mensal</h3>
            <p className="text-[11px] opacity-80 mb-4">Você atingiu 72% da meta de faturamento.</p>
            <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-white rounded-full w-[72%]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
