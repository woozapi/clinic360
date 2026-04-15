/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Dashboard from '@/components/Dashboard';
import Agenda from '@/components/Agenda';
import PatientList from '@/components/PatientList';
import SalesFunnel from '@/components/SalesFunnel';
import AIChat from '@/components/AIChat';
import Finance from '@/components/Finance';
import Inventory from '@/components/Inventory';
import Settings from '@/components/Settings';
import { cn } from '@/lib/utils';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 p-8 overflow-y-auto max-h-screen">
        <div className="max-w-7xl mx-auto">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'agenda' && <Agenda />}
          {activeTab === 'patients' && <PatientList />}
          {activeTab === 'crm' && <SalesFunnel />}
          {activeTab === 'chat' && <AIChat />}
          {activeTab === 'finance' && <Finance />}
          {activeTab === 'inventory' && <Inventory />}
          {activeTab === 'settings' && <Settings />}
          {activeTab !== 'dashboard' && activeTab !== 'agenda' && activeTab !== 'patients' && activeTab !== 'crm' && activeTab !== 'chat' && activeTab !== 'finance' && activeTab !== 'inventory' && activeTab !== 'settings' && (
            <div className="flex flex-col items-center justify-center h-[80vh] text-center">
              <div className="w-20 h-20 bg-slate-200 rounded-full flex items-center justify-center mb-4 animate-pulse">
                <span className="text-slate-400 font-bold text-2xl">?</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Módulo em Desenvolvimento</h2>
              <p className="text-slate-500 mt-2 max-w-md">
                Estamos trabalhando para trazer o módulo de <span className="font-bold text-blue-600 capitalize">{activeTab}</span> em breve.
              </p>
              <button 
                onClick={() => setActiveTab('dashboard')}
                className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
              >
                Voltar ao Dashboard
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
