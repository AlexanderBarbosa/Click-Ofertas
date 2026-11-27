import React, { useState } from 'react';
import { AffiliateConfig } from '../lib/types';
import { Image, Sparkles, CheckCircle2, RefreshCcw, ShieldCheck, Palette, Type } from 'lucide-react';
import confetti from 'canvas-confetti';

interface BrandingSettingsViewProps {
  config: AffiliateConfig;
  onSaveConfig: (newConfig: Partial<AffiliateConfig>) => void;
}

export const BrandingSettingsView: React.FC<BrandingSettingsViewProps> = ({
  config,
  onSaveConfig,
}) => {
  const [appName, setAppName] = useState<string>(config.appName || 'Click Ofertas');
  const [appSubtitle, setAppSubtitle] = useState<string>(config.appSubtitle || 'Automação WhatsApp & Radar');
  const [appLogoUrl, setAppLogoUrl] = useState<string>(config.appLogoUrl || '/public/assets/aistudio/Mascote_Click_Ofertas_0bad9dc5.jpg');
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  const presets = [
    { name: 'Mascote Raposa Oficial', url: '/public/assets/aistudio/Mascote_Click_Ofertas_0bad9dc5.jpg' },
    { name: 'Ícone de Compras 3D', url: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=300&auto=format&fit=crop&q=80' },
    { name: 'Selo VIP Dourado', url: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=300&auto=format&fit=crop&q=80' },
    { name: 'Robô de Automação', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&auto=format&fit=crop&q=80' },
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveConfig({
      appName: appName.trim() || 'Click Ofertas',
      appSubtitle: appSubtitle.trim() || 'Automação WhatsApp & Radar',
      appLogoUrl: appLogoUrl.trim() || '/public/assets/aistudio/Mascote_Click_Ofertas_0bad9dc5.jpg',
    });

    setSavedSuccess(true);
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
    });

    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleResetDefault = () => {
    setAppName('Click Ofertas');
    setAppSubtitle('Automação WhatsApp & Radar');
    setAppLogoUrl('/public/assets/aistudio/Mascote_Click_Ofertas_0bad9dc5.jpg');
    onSaveConfig({
      appName: 'Click Ofertas',
      appSubtitle: 'Automação WhatsApp & Radar',
      appLogoUrl: '/public/assets/aistudio/Mascote_Click_Ofertas_0bad9dc5.jpg',
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm transition-colors">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-orange-950/60 border border-orange-200 dark:border-orange-800 flex items-center justify-center shrink-0 text-orange-600">
            <Palette className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              Configuração de Marca, Nome e Logotipo
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Personalize o nome da plataforma, subtítulo e imagem da logo exibida no topo, painel e modais.
            </p>
          </div>
        </div>
      </div>

      {/* Main Settings Form */}
      <form onSubmit={handleSave} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
        
        {/* Live Preview Card */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl overflow-hidden border border-orange-200 bg-orange-50 shrink-0 shadow-sm">
              <img
                src={appLogoUrl || '/public/assets/aistudio/Mascote_Click_Ofertas_0bad9dc5.jpg'}
                alt="Logo Preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/public/assets/aistudio/Mascote_Click_Ofertas_0bad9dc5.jpg';
                }}
              />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                {appName || 'Click Ofertas'}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                {appSubtitle || 'Automação WhatsApp & Radar'}
              </div>
            </div>
          </div>

          <div className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 px-3 py-1 bg-emerald-50 dark:bg-emerald-950/60 rounded-full border border-emerald-200 dark:border-emerald-800">
            Pré-visualização em Tempo Real
          </div>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Nome do Aplicativo
            </label>
            <div className="relative">
              <Type className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={appName}
                onChange={(e) => setAppName(e.target.value)}
                placeholder="Ex: Click Ofertas VIP"
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <span className="text-[11px] text-slate-400">Exibido na barra superior, títulos e guias do navegador.</span>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Subtítulo / Descrição Curta
            </label>
            <input
              type="text"
              value={appSubtitle}
              onChange={(e) => setAppSubtitle(e.target.value)}
              placeholder="Ex: Automação WhatsApp & Radar"
              className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
            />
            <span className="text-[11px] text-slate-400">Exibido abaixo do nome na barra de navegação e painel.</span>
          </div>

        </div>

        {/* Logo URL */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
            URL da Imagem / Logotipo (Mascote ou Ícone)
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Image className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <input
                type="url"
                value={appLogoUrl}
                onChange={(e) => setAppLogoUrl(e.target.value)}
                placeholder="/public/assets/aistudio/Mascote_Click_Ofertas_0bad9dc5.jpg ou URL externa"
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-mono text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>
          <span className="text-[11px] text-slate-400 block">Insira o caminho local do arquivo ou o link direto de uma imagem (JPEG/PNG).</span>
        </div>

        {/* Presets Grid */}
        <div className="space-y-2 pt-2">
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
            Sugestões Rápidas de Logotipo / Mascote:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {presets.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setAppLogoUrl(preset.url)}
                className={`p-3 rounded-xl border flex flex-col items-center gap-2 text-center transition-all cursor-pointer ${
                  appLogoUrl === preset.url
                    ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/40 shadow-sm'
                    : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                }`}
              >
                <div className="w-10 h-10 rounded-lg overflow-hidden border border-slate-200 bg-white">
                  <img src={preset.url} alt={preset.name} className="w-full h-full object-cover" />
                </div>
                <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 line-clamp-1">
                  {preset.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={handleResetDefault}
            className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 rounded-xl transition-colors cursor-pointer"
          >
            <RefreshCcw className="w-3.5 h-3.5" />
            <span>Restaurar Padrão</span>
          </button>

          <div className="flex items-center gap-3">
            {savedSuccess && (
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>Salvo com sucesso!</span>
              </span>
            )}
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-95 rounded-xl shadow-sm transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Salvar Alterações de Marca</span>
            </button>
          </div>
        </div>

      </form>

    </div>
  );
};
