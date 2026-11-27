import React from 'react';
import { Send, Plus, Sparkles, Moon, Sun, Globe, LogOut } from 'lucide-react';
import { AffiliateConfig } from '../lib/types';

interface TopNavbarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onOpenNewOffer: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  autoPilotActive: boolean;
  config: AffiliateConfig;
  onLogoutAdmin: () => void;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({
  currentTab,
  onSelectTab,
  onOpenNewOffer,
  darkMode,
  onToggleDarkMode,
  autoPilotActive,
  config,
  onLogoutAdmin,
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Painel Geral' },
    { id: 'radar', label: 'Radar de Ofertas' },
    { id: 'groups', label: 'Grupos WhatsApp' },
    { id: 'queue', label: 'Fila & Agendamento' },
    { id: 'settings', label: 'Afiliados & Bot' },
    { id: 'branding', label: 'Marca & Logo' },
    { id: 'logs', label: 'Histórico' },
  ];

  const currentAppName = config.appName || 'Click Ofertas';
  const currentAppSubtitle = config.appSubtitle || 'Automação WhatsApp & Radar';
  const currentLogoUrl = config.appLogoUrl || '/public/assets/aistudio/Mascote_Click_Ofertas_0bad9dc5.jpg';

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single text element wordmark + Mascot Logo */}
        <div className="flex items-center gap-3 shrink-0 cursor-pointer" onClick={() => onSelectTab('dashboard')}>
          <div className="w-10 h-10 rounded-xl overflow-hidden shadow-sm border border-orange-200 dark:border-orange-800/80 bg-orange-50 shrink-0">
            <img
              src={currentLogoUrl}
              alt="Logotipo do Aplicativo"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/public/assets/aistudio/Mascote_Click_Ofertas_0bad9dc5.jpg';
              }}
            />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap flex items-center gap-1.5">
              {currentAppName}
              <span className="text-[10px] px-1.5 py-0.2 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 rounded font-bold">Admin</span>
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
              {currentAppSubtitle}
            </span>
          </div>
        </div>

        {/* Zone 2: Concise single-line navigation links */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`px-3 py-2 rounded-md transition-colors whitespace-nowrap shrink-0 text-sm ${
                  isActive
                    ? 'text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/40'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onSelectTab('public-landing')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 rounded-lg border border-emerald-200 dark:border-emerald-800 transition-colors cursor-pointer"
            title="Ver Landing Page Pública"
          >
            <Globe className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Ver Vitrine Pública</span>
          </button>

          <button
            onClick={onToggleDarkMode}
            aria-label="Alternar tema"
            className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={onOpenNewOffer}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 active:scale-95 transition-all shadow-sm whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Adicionar Oferta</span>
          </button>

          <button
            onClick={onLogoutAdmin}
            title="Sair do Modo Admin"
            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mobile navigation bar */}
      <div className="md:hidden flex overflow-x-auto px-4 py-2 border-t border-slate-100 dark:border-slate-800 gap-1 bg-slate-50/50 dark:bg-slate-900/50 scrollbar-none">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelectTab(item.id)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap shrink-0 ${
              currentTab === item.id
                ? 'bg-emerald-600 text-white font-semibold'
                : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
};
