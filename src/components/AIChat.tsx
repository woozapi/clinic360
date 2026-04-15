import { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  Paperclip, 
  Mic,
  MoreHorizontal,
  BrainCircuit,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';
import { GoogleGenAI } from "@google/genai";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: '1',
    role: 'assistant',
    content: 'Olá! Sou seu assistente Clinic 360 AI. Como posso ajudar você a otimizar sua clínica hoje? Posso analisar dados, prever faltas ou sugerir campanhas de marketing.',
    timestamp: new Date(),
  }
];

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          {
            role: "user",
            parts: [{ text: `Você é o assistente inteligente do sistema CLINIC 360 AI. Seu objetivo é ajudar o dono da clínica a gerir o negócio. 
            Contexto atual: A clínica tem 124 pacientes novos este mês, faturamento de R$ 45.280 (+12.5%) e taxa de ocupação de 88%.
            Responda de forma profissional, executiva e orientada a dados. Use markdown para formatar.
            
            Pergunta do usuário: ${input}` }]
          }
        ],
        config: {
          systemInstruction: "Você é um consultor sênior de gestão de clínicas de saúde e estética. Fale em Português do Brasil."
        }
      });

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.text || 'Desculpe, tive um problema ao processar sua solicitação.',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Gemini Error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Houve um erro ao conectar com a inteligência artificial. Verifique sua chave de API.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col gap-4 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[1.5rem] font-bold text-text-primary flex items-center gap-2">
            Atendimento IA <Sparkles size={20} className="text-ai-purple" />
          </h1>
          <p className="text-text-secondary text-sm">Sua inteligência de dados e automação em um só lugar.</p>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 text-text-secondary rounded-md text-[10px] font-bold uppercase tracking-wider">
            <BrainCircuit size={14} />
            Gemini 3 Flash
          </div>
        </div>
      </div>

      <div className="flex-1 bg-white rounded-xl border border-border shadow-sm flex flex-col overflow-hidden">
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar bg-slate-50/30"
        >
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "flex gap-4 max-w-[85%]",
                msg.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm",
                msg.role === 'assistant' ? "bg-ai-purple text-white" : "bg-white border border-border text-text-secondary"
              )}>
                {msg.role === 'assistant' ? <Bot size={16} /> : <User size={16} />}
              </div>
              <div className={cn(
                "p-4 rounded-xl text-sm leading-relaxed",
                msg.role === 'assistant' 
                  ? "bg-white text-text-primary border border-border shadow-sm" 
                  : "bg-accent text-white shadow-md shadow-accent/10"
              )}>
                <div className={cn(
                  "prose prose-sm max-w-none",
                  msg.role === 'user' ? "prose-invert" : "prose-slate"
                )}>
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
                <p className={cn(
                  "text-[10px] mt-2 font-medium opacity-50",
                  msg.role === 'user' ? "text-right" : "text-left"
                )}>
                  {format(msg.timestamp, 'HH:mm')}
                </p>
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <div className="flex gap-4 mr-auto max-w-[85%]">
              <div className="w-8 h-8 rounded-lg bg-ai-purple text-white flex items-center justify-center shadow-sm">
                <Bot size={16} />
              </div>
              <div className="p-4 rounded-xl bg-white border border-border flex gap-1 items-center shadow-sm">
                <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-ai-purple rounded-full" />
                <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-ai-purple rounded-full" />
                <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-ai-purple rounded-full" />
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-border bg-white">
          <div className="max-w-4xl mx-auto relative">
            <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-xl border border-border focus-within:ring-2 focus-within:ring-accent/10 transition-all">
              <button className="p-2 text-text-secondary hover:text-text-primary transition-colors">
                <Paperclip size={18} />
              </button>
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Pergunte qualquer coisa sobre sua clínica..."
                className="flex-1 bg-transparent border-none focus:ring-0 text-xs py-2"
              />
              <button className="p-2 text-text-secondary hover:text-text-primary transition-colors">
                <Mic size={18} />
              </button>
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className={cn(
                  "p-2 rounded-lg transition-all",
                  input.trim() && !isTyping ? "bg-accent text-white shadow-md shadow-accent/20" : "bg-slate-200 text-text-secondary"
                )}
              >
                <Send size={18} />
              </button>
            </div>
            <div className="flex gap-2 mt-3 overflow-x-auto no-scrollbar pb-1">
              {[
                "Previsão de faturamento",
                "Risco de no-show hoje",
                "Campanha de Botox",
                "Ticket médio"
              ].map((suggestion) => (
                <button 
                  key={suggestion}
                  onClick={() => setInput(suggestion)}
                  className="whitespace-nowrap px-3 py-1.5 bg-white border border-border rounded-md text-[10px] font-bold text-text-secondary uppercase tracking-wider hover:bg-slate-50 transition-all"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function format(date: Date, pattern: string) {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}
