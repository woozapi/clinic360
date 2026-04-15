import { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Search, 
  Filter,
  Clock,
  User,
  Stethoscope
} from 'lucide-react';
import { format, addDays, startOfWeek, addWeeks, subWeeks, isSameDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

const professionals = [
  { id: '1', name: 'Dra. Ana Silva', specialty: 'Dentista', color: 'bg-blue-500' },
  { id: '2', name: 'Dr. Marcos Oliveira', specialty: 'Ortodontista', color: 'bg-purple-500' },
  { id: '3', name: 'Dra. Beatriz Santos', specialty: 'Estética', color: 'bg-rose-500' },
];

const hours = Array.from({ length: 13 }, (_, i) => i + 8); // 8:00 to 20:00

export default function Agenda() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'day' | 'week'>('day');

  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(startOfWeek(currentDate, { weekStartsOn: 1 }), i));

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-[1.5rem] font-bold text-text-primary">Agenda Inteligente</h1>
          <p className="text-text-secondary text-sm">Gerencie seus horários e otimize a ocupação da clínica.</p>
        </div>
        <div className="flex gap-2">
          <div className="bg-white border border-border rounded-lg p-1 flex">
            <button 
              onClick={() => setView('day')}
              className={cn(
                "px-4 py-1.5 text-xs font-semibold rounded-md transition-all",
                view === 'day' ? "bg-accent text-white shadow-sm" : "text-text-secondary hover:text-text-primary"
              )}
            >
              Dia
            </button>
            <button 
              onClick={() => setView('week')}
              className={cn(
                "px-4 py-1.5 text-xs font-semibold rounded-md transition-all",
                view === 'week' ? "bg-accent text-white shadow-sm" : "text-text-secondary hover:text-text-primary"
              )}
            >
              Semana
            </button>
          </div>
          <button className="px-4 py-2 bg-accent text-white rounded-md text-[13px] font-semibold hover:bg-blue-700 transition-colors">
            + Novo Agendamento
          </button>
        </div>
      </div>

      <div className="panel-card overflow-hidden">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-slate-50/30">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <button 
                onClick={() => setCurrentDate(view === 'day' ? addDays(currentDate, -1) : subWeeks(currentDate, 1))}
                className="p-1.5 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-border"
              >
                <ChevronLeft size={18} />
              </button>
              <button 
                onClick={() => setCurrentDate(view === 'day' ? addDays(currentDate, 1) : addWeeks(currentDate, 1))}
                className="p-1.5 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-border"
              >
                <ChevronRight size={18} />
              </button>
            </div>
            <h2 className="text-base font-bold text-text-primary capitalize">
              {format(currentDate, "MMMM yyyy", { locale: ptBR })}
            </h2>
            <button 
              onClick={() => setCurrentDate(new Date())}
              className="px-3 py-1 text-[11px] font-bold text-accent bg-blue-50 rounded-md hover:bg-blue-100 transition-colors"
            >
              Hoje
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
              <input 
                type="text" 
                placeholder="Buscar paciente..."
                className="pl-9 pr-4 py-1.5 bg-white border border-border rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-accent/20 w-48"
              />
            </div>
            <button className="p-2 bg-white border border-border rounded-lg text-text-secondary hover:text-text-primary transition-colors">
              <Filter size={16} />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Header Row */}
            <div className="grid grid-cols-[100px_1fr] border-b border-border">
              <div className="p-4 bg-slate-50/10 border-r border-border"></div>
              <div className={cn(
                "grid",
                view === 'day' ? `grid-cols-${professionals.length}` : "grid-cols-7"
              )}>
                {view === 'day' ? (
                  professionals.map(p => (
                    <div key={p.id} className="p-4 text-center border-r border-border last:border-r-0">
                      <p className="text-sm font-bold text-text-primary">{p.name}</p>
                      <p className="text-[11px] text-text-secondary">{p.specialty}</p>
                    </div>
                  ))
                ) : (
                  weekDays.map(day => (
                    <div key={day.toString()} className={cn(
                      "p-4 text-center border-r border-border last:border-r-0",
                      isSameDay(day, new Date()) && "bg-blue-50/50"
                    )}>
                      <p className="text-[11px] font-bold text-text-secondary uppercase tracking-wider">
                        {format(day, "EEE", { locale: ptBR })}
                      </p>
                      <p className={cn(
                        "text-lg font-bold mt-1",
                        isSameDay(day, new Date()) ? "text-accent" : "text-text-primary"
                      )}>
                        {format(day, "dd")}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Time Grid */}
            <div className="relative h-[600px] overflow-y-auto no-scrollbar">
              {hours.map(hour => (
                <div key={hour} className="grid grid-cols-[100px_1fr] border-b border-border group">
                  <div className="p-4 text-right text-[11px] font-bold text-text-secondary border-r border-border bg-slate-50/5">
                    {hour}:00
                  </div>
                  <div className={cn(
                    "grid h-20",
                    view === 'day' ? `grid-cols-${professionals.length}` : "grid-cols-7"
                  )}>
                    {Array.from({ length: view === 'day' ? professionals.length : 7 }).map((_, i) => (
                      <div key={i} className="border-r border-border last:border-r-0 relative hover:bg-slate-50/50 transition-colors cursor-pointer group/cell">
                        <div className="absolute inset-0 opacity-0 group-hover/cell:opacity-100 flex items-center justify-center">
                           <Plus size={16} className="text-accent/40" />
                        </div>
                        
                        {/* Mock Appointments */}
                        {view === 'day' && hour === 10 && i === 0 && (
                          <motion.div 
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="absolute inset-1 bg-accent text-white p-2 rounded-lg shadow-sm z-10 overflow-hidden"
                          >
                            <p className="text-[10px] font-bold opacity-80">10:00 - 11:00</p>
                            <p className="text-xs font-bold truncate">Paulo Argolo</p>
                            <p className="text-[10px] truncate">Limpeza Dental</p>
                          </motion.div>
                        )}

                        {view === 'day' && hour === 14 && i === 2 && (
                          <motion.div 
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="absolute inset-1 bg-rose-500 text-white p-2 rounded-lg shadow-sm z-10 overflow-hidden"
                          >
                            <p className="text-[10px] font-bold opacity-80">14:00 - 15:30</p>
                            <p className="text-xs font-bold truncate">Maria Costa</p>
                            <p className="text-[10px] truncate">Harmonização Facial</p>
                          </motion.div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="panel-card p-5 flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-accent rounded-xl">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-xs font-medium text-text-secondary">Próximo Atendimento</p>
            <p className="text-lg font-bold text-text-primary">Em 15 minutos</p>
          </div>
        </div>
        <div className="panel-card p-5 flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-success rounded-xl">
            <User size={24} />
          </div>
          <div>
            <p className="text-xs font-medium text-text-secondary">Pacientes Hoje</p>
            <p className="text-lg font-bold text-text-primary">18 Agendados</p>
          </div>
        </div>
        <div className="panel-card p-5 flex items-center gap-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
            <Stethoscope size={24} />
          </div>
          <div>
            <p className="text-xs font-medium text-text-secondary">Salas Ocupadas</p>
            <p className="text-lg font-bold text-text-primary">3 de 5 Salas</p>
          </div>
        </div>
      </div>
      
      <div className="ai-insight-box">
        <div className="font-bold text-[11px] text-ai-purple mb-1 flex items-center gap-1.5">
          ✦ OTIMIZAÇÃO DE AGENDA
        </div>
        <p className="text-[12px] text-[#4C1D95] leading-relaxed">
          Identifiquei um buraco de 45min às 14h. Sugiro antecipar o paciente <strong>Carlos Mendes</strong> ou oferecer este horário para a lista de espera.
        </p>
      </div>
    </div>
  );
}
