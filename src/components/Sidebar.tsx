import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  MessageSquare, 
  TrendingUp, 
  DollarSign, 
  Package, 
  Settings,
  LogOut,
  ChevronRight,
  Menu,
  X,
  Plus
} from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';

interface SidebarItemProps {
  icon: any;
  label: string;
  active?: boolean;
  onClick: () => void;
  collapsed?: boolean;
}

const SidebarItem = ({ icon: Icon, label, active, onClick, collapsed }: SidebarItemProps) => (
  <button
    onClick={onClick}
    className={cn(
      "flex items-center w-full px-6 py-2.5 text-sm font-medium transition-all duration-200 group relative",
      active 
        ? "text-accent bg-[#EFF6FF] border-r-3 border-accent" 
        : "text-text-secondary hover:text-text-primary"
    )}
  >
    <Icon size={18} className={cn("min-w-[18px]", active ? "text-accent" : "group-hover:scale-110 transition-transform")} />
    {!collapsed && (
      <span className="ml-3 whitespace-nowrap overflow-hidden">
        {label}
      </span>
    )}
  </button>
);

export default function Sidebar({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (tab: string) => void }) {
  const [collapsed, setCollapsed] = useState(false);

  const navGroups = [
    {
      label: 'Operacional',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'agenda', label: 'Agenda Inteligente', icon: Calendar },
        { id: 'patients', label: 'CRM Pacientes', icon: Users },
      ]
    },
    {
      label: 'Crescimento',
      items: [
        { id: 'crm', label: 'Funil de Vendas', icon: TrendingUp },
        { id: 'chat', label: 'Atendimento IA', icon: MessageSquare },
        { id: 'finance', label: 'Financeiro', icon: DollarSign },
      ]
    },
    {
      label: 'Configurações',
      items: [
        { id: 'inventory', label: 'Gestão de Estoque', icon: Package },
        { id: 'settings', label: 'Configurações', icon: Settings },
      ]
    }
  ];

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 80 : 240 }}
      className="h-screen bg-sidebar border-r border-border flex flex-col sticky top-0 z-40"
    >
      <div className="py-6 px-6 mb-4">
        {!collapsed ? (
          <div className="font-extrabold text-xl tracking-tight text-accent flex items-center gap-1">
            CLINIC <span className="text-ai-purple">360 AI</span>
          </div>
        ) : (
          <div className="w-8 h-8 bg-accent rounded flex items-center justify-center mx-auto">
            <span className="text-white font-bold text-lg">C</span>
          </div>
        )}
      </div>

      <div className="flex-1 space-y-6 overflow-y-auto no-scrollbar">
        {navGroups.map((group) => (
          <div key={group.label} className="nav-group">
            {!collapsed && (
              <div className="text-[11px] font-semibold text-text-secondary uppercase tracking-wider px-6 mb-3">
                {group.label}
              </div>
            )}
            <div className="space-y-1">
              {group.items.map((item) => (
                <SidebarItem
                  key={item.id}
                  icon={item.icon}
                  label={item.label}
                  active={activeTab === item.id}
                  onClick={() => setActiveTab(item.id)}
                  collapsed={collapsed}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-auto border-t border-border">
        {!collapsed && (
          <div className="px-6 py-4 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-200 flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-[13px] font-semibold text-text-primary truncate">Dr. Ricardo Silva</p>
              <p className="text-[11px] text-text-secondary truncate">Diretor Clínico</p>
            </div>
          </div>
        )}
        <div className="p-4 border-t border-border/50">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex items-center w-full p-2 text-text-secondary hover:bg-slate-50 rounded-lg transition-colors group"
          >
            <Menu size={18} className="group-hover:rotate-180 transition-transform duration-500" />
            {!collapsed && <span className="ml-3 text-xs font-medium">Recolher</span>}
          </button>
        </div>
      </div>
    </motion.aside>
  );
}
