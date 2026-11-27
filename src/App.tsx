import React, { useState, useEffect } from 'react';
import { TopNavbar } from './components/TopNavbar';
import { DashboardView } from './components/DashboardView';
import { DealsRadarView } from './components/DealsRadarView';
import { GroupsManagerView } from './components/GroupsManagerView';
import { QueueSchedulerView } from './components/QueueSchedulerView';
import { AffiliateSettingsView } from './components/AffiliateSettingsView';
import { DispatchLogsView } from './components/DispatchLogsView';
import { BrandingSettingsView } from './components/BrandingSettingsView';
import { PublicLandingView } from './components/PublicLandingView';
import { AdminLoginModal } from './components/AdminLoginModal';
import { WhatsAppPreviewModal } from './components/WhatsAppPreviewModal';
import { ManualOfferModal } from './components/ManualOfferModal';
import { BatchDispatchModal } from './components/BatchDispatchModal';
import { store } from './lib/storage';
import { DealOffer, ScheduledDispatch, DispatchLog, WhatsAppGroup, AffiliateConfig } from './lib/types';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('public-landing');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('autozap_admin_auth') === 'true';
  });
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('autozap_theme') === 'dark' || 
      window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Reactive store state
  const [offers, setOffers] = useState<DealOffer[]>(() => store.getOffers());
  const [groups, setGroups] = useState<WhatsAppGroup[]>(() => store.getGroups());
  const [schedules, setSchedules] = useState<ScheduledDispatch[]>(() => store.getSchedules());
  const [config, setConfig] = useState<AffiliateConfig>(() => store.getConfig());
  const [logs, setLogs] = useState<DispatchLog[]>(() => store.getLogs());

  // Modals state
  const [previewOffer, setPreviewOffer] = useState<DealOffer | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false);
  const [isManualModalOpen, setIsManualModalOpen] = useState<boolean>(false);

  // Batch dispatch execution modal state
  const [batchModalOpen, setBatchModalOpen] = useState<boolean>(false);
  const [activeDispatchOffer, setActiveDispatchOffer] = useState<DealOffer | null>(null);
  const [activeTargetGroupIds, setActiveTargetGroupIds] = useState<string[]>([]);
  const [activeTemplateId, setActiveTemplateId] = useState<string>('tpl-achadinho');
  const [activeCustomMessage, setActiveCustomMessage] = useState<string>('');

  // Subscribe to store updates
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setOffers(store.getOffers());
      setGroups(store.getGroups());
      setSchedules(store.getSchedules());
      setConfig(store.getConfig());
      setLogs(store.getLogs());
    });
    return unsubscribe;
  }, []);

  // Sync dark theme with HTML class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('autozap_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('autozap_theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleOpenAdminLogin = () => {
    if (isAdminAuthenticated) {
      setCurrentTab('dashboard');
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const handleAdminLoginSuccess = () => {
    setIsAdminAuthenticated(true);
    sessionStorage.setItem('autozap_admin_auth', 'true');
    setIsLoginModalOpen(false);
    setCurrentTab('dashboard');
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem('autozap_admin_auth');
    setCurrentTab('public-landing');
  };

  const handleSelectTab = (tab: string) => {
    if (tab === 'public-landing') {
      setCurrentTab('public-landing');
      return;
    }

    if (!isAdminAuthenticated) {
      setIsLoginModalOpen(true);
      return;
    }

    setCurrentTab(tab);
  };

  // Handlers for offers
  const handleOpenPreview = (offer: DealOffer) => {
    setPreviewOffer(offer);
    setIsPreviewOpen(true);
  };

  const handleOpenNewOffer = () => {
    if (!isAdminAuthenticated) {
      setIsLoginModalOpen(true);
      return;
    }
    setIsManualModalOpen(true);
  };

  const handleSaveOffer = (newOffer: DealOffer, andDispatchNow?: boolean) => {
    store.addOffer(newOffer);
    if (andDispatchNow) {
      handleOpenPreview(newOffer);
    }
  };

  const handleDeleteOffer = (id: string) => {
    store.deleteOffer(id);
  };

  // Handlers for dispatch execution
  const handleStartDispatch = (
    offer: DealOffer,
    targetGroupIds: string[],
    templateId: string,
    customMessage: string
  ) => {
    setActiveDispatchOffer(offer);
    setActiveTargetGroupIds(targetGroupIds);
    setActiveTemplateId(templateId);
    setActiveCustomMessage(customMessage);
    setBatchModalOpen(true);
  };

  const handleBatchComplete = () => {
    if (activeDispatchOffer) {
      store.executeDispatch(
        activeDispatchOffer,
        activeTargetGroupIds,
        activeTemplateId,
        activeCustomMessage
      );
    }
  };

  // Handlers for schedules
  const handleScheduleOffer = (
    offer: DealOffer,
    targetGroupIds: string[],
    templateId: string,
    scheduledTime: string,
    customMessage: string
  ) => {
    store.scheduleDispatch({
      offerId: offer.id,
      offer,
      targetGroupIds,
      scheduledTime,
      templateId,
      customMessage,
    });
    setCurrentTab('queue');
  };

  const handleExecuteScheduleNow = (schedule: ScheduledDispatch) => {
    handleStartDispatch(
      schedule.offer,
      schedule.targetGroupIds,
      schedule.templateId,
      schedule.customMessage || ''
    );
    store.cancelSchedule(schedule.id);
  };

  const handleGenerateQuickQueue = () => {
    const activeGroupIds = groups.filter(g => g.active).map(g => g.id);
    if (offers.length === 0 || activeGroupIds.length === 0) return;

    const topOffers = offers.slice(0, 3);
    const times = [
      new Date(Date.now() + 1000 * 60 * 45).toISOString(),
      new Date(Date.now() + 1000 * 60 * 180).toISOString(),
      new Date(Date.now() + 1000 * 60 * 360).toISOString(),
    ];

    topOffers.forEach((offer, idx) => {
      store.scheduleDispatch({
        offerId: offer.id,
        offer,
        targetGroupIds: activeGroupIds,
        scheduledTime: times[idx] || new Date().toISOString(),
        templateId: 'tpl-achadinho',
      });
    });
  };

  const handleToggleGroup = (id: string) => {
    store.toggleGroup(id);
  };

  const handleAddGroup = (grp: WhatsAppGroup) => {
    store.addGroup(grp);
  };

  const handleUpdateGroup = (id: string, updates: Partial<WhatsAppGroup>) => {
    store.updateGroup(id, updates);
  };

  const handleDeleteGroup = (id: string) => {
    store.deleteGroup(id);
  };

  const handleToggleAutoPilot = () => {
    store.updateConfig({ autoPilotEnabled: !config.autoPilotEnabled });
  };

  const handleSaveConfig = (newCfg: Partial<AffiliateConfig>) => {
    store.updateConfig(newCfg);
  };

  const handleResetData = () => {
    if (window.confirm('Deseja restaurar os dados de exemplo padrão?')) {
      store.resetToSample();
    }
  };

  const handleResendLog = (log: DispatchLog) => {
    const matchingOffer = offers.find(o => o.title === log.offerTitle) || offers[0];
    if (matchingOffer) {
      handleOpenPreview(matchingOffer);
    }
  };

  // If public landing page is selected
  if (currentTab === 'public-landing') {
    return (
      <>
        <PublicLandingView
          offers={offers}
          config={config}
          onOpenAdminLogin={handleOpenAdminLogin}
        />
        <AdminLoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
          config={config}
          onLoginSuccess={handleAdminLoginSuccess}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors">
      
      {/* Top Bar */}
      <TopNavbar
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        onOpenNewOffer={handleOpenNewOffer}
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
        autoPilotActive={config.autoPilotEnabled}
        config={config}
        onLogoutAdmin={handleAdminLogout}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {currentTab === 'dashboard' && (
          <DashboardView
            offers={offers}
            groups={groups}
            schedules={schedules}
            logs={logs}
            config={config}
            onOpenPreview={handleOpenPreview}
            onNavigateTab={handleSelectTab}
            onToggleAutoPilot={handleToggleAutoPilot}
          />
        )}

        {currentTab === 'radar' && (
          <DealsRadarView
            offers={offers}
            onOpenPreview={handleOpenPreview}
            onOpenNewOffer={handleOpenNewOffer}
            onDeleteOffer={handleDeleteOffer}
          />
        )}

        {currentTab === 'groups' && (
          <GroupsManagerView
            groups={groups}
            config={config}
            onToggleGroup={handleToggleGroup}
            onAddGroup={handleAddGroup}
            onUpdateGroup={handleUpdateGroup}
            onDeleteGroup={handleDeleteGroup}
            onUpdateConfig={handleSaveConfig}
          />
        )}

        {currentTab === 'queue' && (
          <QueueSchedulerView
            schedules={schedules}
            groups={groups}
            offers={offers}
            onExecuteNow={handleExecuteScheduleNow}
            onCancelSchedule={(id) => store.cancelSchedule(id)}
            onDeleteSchedule={(id) => store.deleteSchedule(id)}
            onGenerateQuickQueue={handleGenerateQuickQueue}
          />
        )}

        {currentTab === 'settings' && (
          <AffiliateSettingsView
            config={config}
            onSaveConfig={handleSaveConfig}
            onResetData={handleResetData}
          />
        )}

        {currentTab === 'branding' && (
          <BrandingSettingsView
            config={config}
            onSaveConfig={handleSaveConfig}
          />
        )}

        {currentTab === 'logs' && (
          <DispatchLogsView
            logs={logs}
            onClearLogs={() => store.clearLogs()}
            onResendLog={handleResendLog}
          />
        )}
      </main>

      {/* WhatsApp Message Preview Modal */}
      {isPreviewOpen && previewOffer && (
        <WhatsAppPreviewModal
          offer={previewOffer}
          groups={groups}
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
          onDispatchNow={handleStartDispatch}
          onScheduleOffer={handleScheduleOffer}
        />
      )}

      {/* Manual Offer Register Modal */}
      {isManualModalOpen && (
        <ManualOfferModal
          isOpen={isManualModalOpen}
          onClose={() => setIsManualModalOpen(false)}
          onSaveOffer={handleSaveOffer}
          affiliateConfig={config}
        />
      )}

      {/* Live Animated Batch Dispatch Progression Modal */}
      {batchModalOpen && activeDispatchOffer && (
        <BatchDispatchModal
          isOpen={batchModalOpen}
          offer={activeDispatchOffer}
          groups={groups}
          targetGroupIds={activeTargetGroupIds}
          templateId={activeTemplateId}
          customMessage={activeCustomMessage}
          onComplete={handleBatchComplete}
          onClose={() => setBatchModalOpen(false)}
        />
      )}

      {/* Admin Login Modal */}
      <AdminLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        config={config}
        onLoginSuccess={handleAdminLoginSuccess}
      />

    </div>
  );
}
