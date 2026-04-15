import { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  MoreVertical, 
  User, 
  Phone, 
  Mail, 
  Calendar,
  ChevronRight,
  Star,
  FileText,
  Camera
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { Patient } from '@/types';
import { format } from 'date-fns';

const mockPatients: Patient[] = [
  {
    id: '1',
    name: 'Paulo Argolo',
    email: 'paulo@example.com',
    phone: '(11) 98888-7777',
    cpf: '123.456.789-00',
    birthDate: new Date(1987, 5, 15),
    history: 'Paciente recorrente para limpeza e clareamento.',
    score: 95,
    status: 'active',
    createdAt: new Date(2023, 0, 1),
    lastVisit: new Date(2024, 3, 10),
  },
  {
    id: '2',
    name: 'Juliana Silva',
    email: 'juliana@example.com',
    phone: '(11) 97777-6666',
    cpf: '987.654.321-11',
    birthDate: new Date(1992, 2, 20),
    history: 'Interesse em procedimentos estéticos (Botox).',
    score: 82,
    status: 'active',
    createdAt: new Date(2023, 5, 12),
    lastVisit: new Date(2024, 2, 25),
  },
  {
    id: '3',
    name: 'Ricardo Bento',
    email: 'ricardo@example.com',
    phone: '(11) 96666-5555',
    cpf: '456.789.123-22',
    birthDate: new Date(1980, 10, 5),
    history: 'Paciente com histórico de faltas.',
    score: 45,
    status: 'lead',
    createdAt: new Date(2024, 1, 5),
  },
];

export default function PatientList() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-[1.5rem] font-bold text-text-primary">CRM Pacientes</h1>
          <p className="text-text-secondary text-sm">Gestão completa da base de pacientes e histórico clínico.</p>
        </div>
        <button className="px-4 py-2 bg-accent text-white rounded-md text-[13px] font-semibold hover:bg-blue-700 transition-colors">
          + Novo Paciente
        </button>
      </div>

      <div className="panel-card">
        <div className="px-6 py-4 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <h3 className="font-bold text-text-primary">Base de Pacientes</h3>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-slate-100 text-text-secondary text-[10px] font-bold rounded-full uppercase tracking-wider">Todos</button>
              <button className="px-3 py-1 bg-blue-50 text-accent text-[10px] font-bold rounded-full uppercase tracking-wider">Ativos</button>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
              <input 
                type="text" 
                placeholder="Buscar paciente..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
                <th className="px-6 py-3 text-[11px] font-semibold text-text-secondary uppercase tracking-wider">Paciente</th>
                <th className="px-6 py-3 text-[11px] font-semibold text-text-secondary uppercase tracking-wider">Contato</th>
                <th className="px-6 py-3 text-[11px] font-semibold text-text-secondary uppercase tracking-wider">Score IA</th>
                <th className="px-6 py-3 text-[11px] font-semibold text-text-secondary uppercase tracking-wider">Última Visita</th>
                <th className="px-6 py-3 text-[11px] font-semibold text-text-secondary uppercase tracking-wider text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {mockPatients.map((patient) => (
                <tr key={patient.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-text-secondary">
                        {patient.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <p className="text-sm font-bold text-text-primary">{patient.name}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-xs text-text-secondary">{patient.email}</p>
                    <p className="text-[10px] text-slate-400">{patient.phone}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 w-16 bg-border rounded-full overflow-hidden">
                        <div 
                          className={cn(
                            "h-full rounded-full",
                            patient.score > 80 ? "bg-success" : patient.score > 50 ? "bg-amber-500" : "bg-rose-500"
                          )} 
                          style={{ width: `${patient.score}%` }} 
                        />
                      </div>
                      <span className="text-[11px] font-bold text-text-primary">{patient.score}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-xs text-text-secondary">
                      {patient.lastVisit ? format(patient.lastVisit, "dd/MM/yyyy") : 'N/A'}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 bg-slate-50 text-text-secondary hover:text-accent rounded-md transition-colors">
                        <Camera size={16} />
                      </button>
                      <button className="p-1.5 bg-slate-50 text-text-secondary hover:text-accent rounded-md transition-colors">
                        <FileText size={16} />
                      </button>
                      <button className="p-1.5 bg-slate-50 text-text-secondary hover:text-accent rounded-md transition-colors">
                        <MoreVertical size={16} />
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
