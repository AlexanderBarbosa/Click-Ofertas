import React, { useState, useMemo } from 'react';
import { DealOffer, AffiliateConfig } from '../lib/types';
import { formatBrl } from '../lib/copyGenerator';
import { 
  Search, 
  ExternalLink, 
  ShieldCheck, 
  Tag, 
  Flame, 
  Smartphone, 
  MessageCircle, 
  Lock, 
  Star, 
  Check, 
  Copy,
  ArrowRight,
  Zap,
  Gift
} from 'lucide-react';

interface PublicLandingViewProps {
  offers: DealOffer[];
  config: AffiliateConfig;
  onOpenAdminLogin: () => void;
}

export const PublicLandingView: React.FC<PublicLandingViewProps> = ({
  offers,
  config,
  onOpenAdminLogin,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMarketplace, setSelectedMarketplace] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const appName = config.appName || 'Click Ofertas';
  const appSubtitle = config.appSubtitle || 'Automação WhatsApp & Radar';
  const logoUrl = config.appLogoUrl || '/public/assets/aistudio/Mascote_Click_Ofertas_0bad9dc5.jpg';
  const groupInvite = config.whatsappGroupInviteLink || 'https://chat.whatsapp.com/invite/clickofertasvip';

  const marketplaces = [
    { id: 'all', label: 'Todas as Lojas' },
    { id: 'amazon', label: 'Amazon Brasil' },
    { id: 'shopee', label: 'Shopee' },
    { id: 'mercadolivre', label: 'Mercado Livre' },
    { id: 'magalu', label: 'Magazine Luiza' },
    { id: 'aliexpress', label: 'AliExpress' },
  ];

  const categories = [
    { id: 'all', label: 'Todos os Nichos' },
    { id: 'eletronicos', label: 'Eletrônicos' },
    { id: 'smartphones', label: 'Smartphones' },
    { id: 'casa', label: 'Casa & Cozinha' },
    { id: 'games', label: 'Games & PC' },
    { id: 'moda', label: 'Moda & Acessórios' },
  ];

  const filteredOffers = useMemo(() => {
    return offers.filter((offer) => {
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = offer.title.toLowerCase().includes(query);
        const matchesCoupon = offer.couponCode?.toLowerCase().includes(query);
        if (!matchesTitle && !matchesCoupon) return false;
      }
      if (selectedMarketplace !== 'all' && offer.marketplace !== selectedMarketplace) {
        return false;
      }
      if (selectedCategory !== 'all' && offer.category !== selectedCategory) {
        return false;
      }
      return true;
    });
  }, [offers, searchQuery, selectedMarketplace, selectedCategory]);

  const handleCopyCoupon = (offerId: string, coupon: string) => {
    navigator.clipboard.writeText(coupon);
    setCopiedId(offerId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleOpenLink = (offer: DealOffer) => {
    const url = offer.shortUrl || offer.affiliateUrl || offer.rawUrl;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      
      {/* Top Navbar / Public Header */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-emerald-500 shadow-lg bg-emerald-950/50 shrink-0">
              <img
                src={logoUrl}
                alt={appName}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/public/assets/aistudio/Mascote_Click_Ofertas_0bad9dc5.jpg';
                }}
              />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-white flex items-center gap-2">
                {appName} <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">VIP</span>
              </span>
              <span className="text-xs text-slate-400 font-medium">
                {appSubtitle}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={groupInvite}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-lg shadow-emerald-900/40 transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
              <span>Entrar no Grupo WhatsApp</span>
            </a>

            <button
              onClick={onOpenAdminLogin}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-colors cursor-pointer"
              title="Acesso Restrito para Administração"
            >
              <Lock className="w-3.5 h-3.5 text-orange-400" />
              <span className="hidden md:inline">Painel Admin</span>
            </button>
          </div>

        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-12 md:py-20 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-b border-slate-800/80">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-bold animate-pulse">
            <Flame className="w-4 h-4 text-orange-400 fill-orange-400" />
            <span>As Melhores Ofertas do WhatsApp em Tempo Real</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight">
            Economize de Verdade com <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">{appName}</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Monitoramos 24h as principais lojas online (Amazon, Shopee, Mercado Livre e Magalu) para trazer cupons relâmpago e descontos absurdos direto para você.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <a
              href={groupInvite}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-2xl shadow-xl shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
              <span>Participar do Grupo VIP de Ofertas</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

        </div>
      </section>

      {/* Search & Filters Bar */}
      <section className="sticky top-20 z-30 bg-slate-950/95 backdrop-blur border-b border-slate-800 py-4 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          
          <div className="flex flex-col md:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar produto, marca ou cupom..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Marketplace selector */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
              {marketplaces.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setSelectedMarketplace(m.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedMarketplace === m.id
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-800'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="flex items-center gap-2 overflow-x-auto pt-1 pb-1 scrollbar-none text-xs">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-slate-800 text-emerald-400 font-bold border border-emerald-500/30'
                    : 'text-slate-400 hover:text-white bg-slate-900/50 border border-slate-800/60'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* Main Content: Offers Grid */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-emerald-400" />
            <span>Ofertas em Destaque ({filteredOffers.length})</span>
          </h2>
          <span className="text-xs text-slate-400 font-mono">
            Atualizado em tempo real via WhatsApp
          </span>
        </div>

        {filteredOffers.length === 0 ? (
          <div className="text-center py-20 space-y-3 bg-slate-950 rounded-2xl border border-slate-800">
            <Gift className="w-12 h-12 text-slate-600 mx-auto" />
            <h3 className="text-base font-bold text-white">Nenhuma oferta encontrada</h3>
            <p className="text-xs text-slate-400">Tente ajustar seus termos de busca ou filtros.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredOffers.map((offer) => {
              return (
                <div 
                  key={offer.id}
                  className="bg-slate-950 rounded-2xl border border-slate-800 hover:border-emerald-500/50 shadow-xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 group"
                >
                  {/* Image container with badges */}
                  <div className="relative aspect-square bg-slate-900 overflow-hidden flex items-center justify-center p-4">
                    <img
                      src={offer.imageUrl || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=80'}
                      alt={offer.title}
                      className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Discount Badge */}
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-orange-500 text-white font-extrabold text-xs shadow-lg flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5 fill-white" />
                      <span>{offer.discountPercentage}% OFF</span>
                    </div>

                    {/* Marketplace badge */}
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-slate-900/90 backdrop-blur text-slate-200 font-bold text-[11px] uppercase tracking-wider border border-slate-700">
                      {offer.marketplace}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                    
                    <div className="space-y-2">
                      <span className="text-[11px] uppercase font-bold text-emerald-400 tracking-wider">
                        {offer.category}
                      </span>
                      <h3 className="text-sm font-bold text-white line-clamp-2 leading-snug group-hover:text-emerald-300 transition-colors">
                        {offer.title}
                      </h3>
                    </div>

                    <div className="space-y-3">
                      {/* Pricing */}
                      <div className="flex items-baseline gap-2">
                        {offer.originalPrice && offer.originalPrice > offer.currentPrice && (
                          <span className="text-xs text-slate-500 line-through">
                            {formatBrl(offer.originalPrice)}
                          </span>
                        )}
                        <span className="text-lg font-black text-emerald-400">
                          {formatBrl(offer.currentPrice)}
                        </span>
                      </div>

                      {/* Coupon box if available */}
                      {offer.couponCode && (
                        <div className="flex items-center justify-between p-2 bg-slate-900 rounded-xl border border-slate-800 text-xs">
                          <span className="font-mono text-emerald-300 font-bold">
                            🎟️ {offer.couponCode}
                          </span>
                          <button
                            onClick={() => handleCopyCoupon(offer.id, offer.couponCode!)}
                            className="px-2 py-1 bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-300 rounded-lg text-[11px] font-bold transition-colors flex items-center gap-1"
                          >
                            {copiedId === offer.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                            <span>{copiedId === offer.id ? 'Copiado' : 'Cupom'}</span>
                          </button>
                        </div>
                      )}

                      {/* Action Button */}
                      <button
                        onClick={() => handleOpenLink(offer)}
                        className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-900/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Ver Oferta na Loja</span>
                      </button>
                    </div>

                  </div>

                </div>
              );
            })}
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 py-10 mt-16 text-center text-xs text-slate-500 space-y-3">
        <div className="flex items-center justify-center gap-2 font-bold text-slate-300">
          <img src={logoUrl} alt={appName} className="w-6 h-6 rounded-lg object-cover" />
          <span>{appName}</span>
        </div>
        <p>Todos os direitos reservados. As ofertas contêm links de afiliado comissionados.</p>
        <div className="pt-2">
          <button
            onClick={onOpenAdminLogin}
            className="text-slate-400 hover:text-white underline transition-colors"
          >
            Acesso Restrito (Administração)
          </button>
        </div>
      </footer>

    </div>
  );
};
