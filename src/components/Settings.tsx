import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Lock, 
  Globe, 
  Database,
  Shield,
  Smartphone,
  CreditCard,
  ChevronRight
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

export default function Settings() {
  const sections = [
    {
      title: 'Perfil e Conta',
      items: [
        { icon: User, label: 'Informações Pessoais', desc: 'Gerencie seu nome, e-mail e foto de perfil.' },
        { icon: CreditCard, label: 'Assinatura e Plano', desc: 'Visualize seu plano atual e faturas.' },
      ]
    },
    {
      title: 'Configurações da Clínica',
      items: [
        { icon: Globe, label: 'Dados da Unidade', desc: 'Endereço, horários de funcionamento e contatos.' },
        { icon: Database, label: 'Backup e Dados', desc: 'Exporte seus dados ou gerencie o armazenamento.' },
      ]
    },
    {
      title: 'Segurança e Notificações',
      items: [
        { icon: Shield, label: 'Privacidade (LGPD)', desc: 'Configurações de consentimento e termos de uso.' },
        { icon: Lock, label: 'Segurança', desc: 'Alterar senha e autenticação em duas etapas.' },
        { icon: Bell, label: 'Notificações', desc: 'Configure alertas de WhatsApp, SMS e E-mail.' },
      ]
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-[1.5rem] font-bold text-text-primary">Configurações</h1>
        <p className="text-text-secondary text-sm">Gerencie as preferências do seu sistema Clinic 360 AI.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {sections.map((section) => (
            <div key={section.title} className="space-y-4">
              <h3 className="text-[10px] font-bold text-text-secondary uppercase tracking-wider px-2">{section.title}</h3>
              <div className="panel-card divide-y divide-border overflow-hidden">
                {section.items.map((item) => (
                  <button 
                    key={item.label}
                    className="w-full flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors text-left group"
                  >
                    <div className="p-2 bg-slate-50 text-text-secondary rounded-lg group-hover:bg-blue-50 group-hover:text-accent transition-colors">
                      <item.icon size={20} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-text-primary">{item.label}</p>
                      <p className="text-xs text-text-secondary">{item.desc}</p>
                    </div>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-slate-300 group-hover:text-accent group-hover:translate-x-1 transition-all">
                      <ChevronRight size={18} />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="bg-accent p-6 rounded-xl text-white shadow-lg shadow-accent/20 relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="font-bold text-lg mb-2">Plano Premium</h3>
              <p className="text-blue-100 text-xs leading-relaxed mb-4">
                Você está utilizando todos os recursos da inteligência artificial e automação ilimitada.
              </p>
              <div className="flex items-center justify-between text-[10px] font-bold bg-white/10 p-3 rounded-lg border border-white/20 uppercase tracking-wider">
                <span>Próxima fatura:</span>
                <span>15 Mai, 2024</span>
              </div>
            </div>
            <div className="absolute -right-4 -bottom-4 opacity-10">
              <Smartphone size={120} />
            </div>
          </div>

          <div className="panel-card p-6">
            <h3 className="font-bold text-text-primary mb-4">Suporte e Ajuda</h3>
            <div className="space-y-3">
              <button className="w-full py-2 px-4 bg-slate-50 text-text-secondary text-xs font-bold rounded-md hover:bg-slate-100 transition-colors text-left uppercase tracking-wider">
                Central de Ajuda
              </button>
              <button className="w-full py-2 px-4 bg-slate-50 text-text-secondary text-xs font-bold rounded-md hover:bg-slate-100 transition-colors text-left uppercase tracking-wider">
                Falar com Especialista
              </button>
              <button className="w-full py-2 px-4 bg-slate-50 text-text-secondary text-xs font-bold rounded-md hover:bg-slate-100 transition-colors text-left uppercase tracking-wider">
                Documentação da API
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
