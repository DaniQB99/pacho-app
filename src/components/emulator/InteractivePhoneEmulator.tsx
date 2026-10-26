import React, { useState } from 'react';
import { useEmulator } from '../../context/EmulatorContext';
import { useI18n } from '../../context/I18nContext';
import { DashboardView } from './DashboardView';
import { TransactionsView } from './TransactionsView';
import { GoalsView } from './GoalsView';
import { AnalyticsView } from './AnalyticsView';
import { SettingsView } from './SettingsView';
import { TransactionModal } from './TransactionModal';
import {
  Plus,
  CheckCircle,
  RotateCcw,
  ShieldCheck,
  LayoutGrid,
  Settings,
  Bell,
  Target,
  PieChart,
  ArrowLeftRight,
  HelpCircle
} from 'lucide-react';

export const InteractivePhoneEmulator: React.FC = () => {
  const { t } = useI18n();
  const {
    data,
    activeTab,
    setActiveTab,
    openSettings,
    resetEmulator,
  } = useEmulator();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 3000);
  };

  return (
    <section id="emulador" className="py-20 lg:py-28 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-pacho-green/10 blur-[150px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pacho-green/10 border border-pacho-green/20 text-pacho-green text-xs font-semibold uppercase tracking-wider mb-3">
            {t('emulator.badge')}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t('emulator.title')}
          </h2>
          <p className="mt-4 text-slate-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed">
            {t('emulator.subtitle')}
          </p>
        </div>

        {/* Emulator Grid: Controls on left / Phone Frame on right */}
        <div className="grid lg:grid-cols-12 gap-10 items-center max-w-5xl mx-auto">
          {/* Guide & Quick Controls Panel */}
          <div className="lg:col-span-5 flex flex-col gap-6 order-2 lg:order-1">
            <div className="p-6 rounded-3xl pacho-card liquid-glass flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-pacho-green font-bold">
                  {t('emulator.liveActions')}
                </span>
                <button
                  onClick={resetEmulator}
                  className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
                  title={t('emulator.reset')}
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{t('emulator.reset')}</span>
                </button>
              </div>

              <p className="text-sm text-slate-600 dark:text-zinc-300">
                {t('emulator.liveTip')}
              </p>

              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-pacho-green hover:bg-pacho-greenBright text-black font-extrabold text-sm shadow-lg shadow-pacho-green/25 transition-all hover:scale-[1.02]"
              >
                <Plus className="w-5 h-5" />
                <span>{t('emulator.addExpenseBtn')}</span>
              </button>

              {/* Status Pill Indicator */}
              <div className="p-4 rounded-2xl bg-black/5 border border-black/10 dark:bg-white/5 dark:border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-pacho-green/15 flex items-center justify-center text-pacho-green">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">
                      {t('emulator.safeToSpend')}
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-zinc-400">
                      {data.safeToSpend.dailyAmount.toFixed(2)} € {t('emulator.safeToSpendDaily')}
                    </span>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-pacho-green">
                  {data.safeToSpend.badge}
                </span>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 dark:text-zinc-500 text-center lg:text-left">
              {t('emulator.resetWarning')}
            </p>
          </div>

          {/* Interactive Mobile Device Mockup */}
          <div className="lg:col-span-7 flex justify-center order-1 lg:order-2">
            <div className="w-full max-w-[340px] h-[690px] bg-[#0c100e] border-[8px] border-[#222a26] rounded-[48px] shadow-[0_25px_80px_rgba(0,0,0,0.85)] flex flex-col relative overflow-hidden">
              {/* Phone Notch & Status bar */}
              <div className="pt-3 px-6 pb-1.5 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                <span>09:41</span>
                <div className="w-20 h-4 bg-black rounded-full" />
                <span>5G 100%</span>
              </div>

              {/* Toast Feedback */}
              {feedback && (
                <div className="absolute top-12 left-4 right-4 z-40 p-2.5 rounded-xl bg-pacho-green text-black text-xs font-bold shadow-xl flex items-center justify-center gap-2 animate-bounce">
                  <CheckCircle className="w-4 h-4" />
                  <span>{feedback}</span>
                </div>
              )}

              {/* Scrollable Phone Screen Content */}
              <div className="flex-1 px-4 py-2 overflow-y-auto flex flex-col gap-3 no-scrollbar pb-24">
                {/* Header Dinámico (según pantalla activa, salvo en Ajustes que tiene el suyo) */}
                {activeTab !== 'settings' && (
                  <div className="flex items-center justify-between pt-1 pb-1">
                    <div className="flex items-center gap-3">
                      <div className="relative inline-block">
                        <img
                          src={data.currentUser.avatar}
                          alt={data.currentUser.name}
                          className="w-10 h-10 rounded-full border-2 border-white/20 object-contain bg-zinc-800 shadow"
                        />
                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#00DF89] border-2 border-[#0c100e]" />
                      </div>
                      <h1 className="text-xl font-black text-white tracking-tight">
                        {activeTab === 'home' && `¡Hola ${data.currentUser.name}!`}
                        {activeTab === 'transactions' && t('emulator.tabMovements')}
                        {activeTab === 'goals' && t('emulator.tabGoals')}
                        {activeTab === 'analytics' && t('emulator.tabAnalytics')}
                      </h1>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {activeTab === 'goals' && (
                        <button
                          className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white transition-colors"
                          title="Ayuda"
                        >
                          <HelpCircle className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white transition-colors"
                        title="Notificaciones"
                      >
                        <Bell className="w-4 h-4" />
                      </button>
                      <button
                        onClick={openSettings}
                        className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white transition-colors"
                        title={t('emulator.tabSettings')}
                      >
                        <Settings className="w-4 h-4" />
                      </button>
                      {(activeTab === 'transactions' || activeTab === 'goals') && (
                        <button
                          onClick={() => setIsModalOpen(true)}
                          className="w-8 h-8 rounded-full bg-[#00DF89] text-black flex items-center justify-center hover:scale-105 transition-transform"
                          title="Nuevo"
                        >
                          <Plus className="w-4 h-4 stroke-[3]" />
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* Vista Activa */}
                {activeTab === 'home' && <DashboardView />}
                {activeTab === 'transactions' && <TransactionsView />}
                {activeTab === 'goals' && <GoalsView onOpenNewModal={() => setIsModalOpen(true)} />}
                {activeTab === 'analytics' && <AnalyticsView />}
                {activeTab === 'settings' && <SettingsView />}
              </div>

              {/* Barra Flotante de Navegación Inferior (5 ranuras con botón central esmeralda) */}
              <div className="absolute bottom-2 left-2 right-2 h-14 rounded-full bg-[#121622]/95 backdrop-blur-xl border border-white/10 px-3 flex items-center justify-between text-zinc-400 shadow-2xl z-30">
                {/* Ranura 1: Inicio */}
                <button
                  onClick={() => setActiveTab('home')}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                    activeTab === 'home'
                      ? 'border border-[#00DF89]/30 bg-[#00DF89]/10 text-[#00DF89]'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                  title={t('emulator.tabHome')}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>

                {/* Ranura 2: Movimientos */}
                <button
                  onClick={() => setActiveTab('transactions')}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                    activeTab === 'transactions'
                      ? 'border border-[#00DF89]/30 bg-[#00DF89]/10 text-[#00DF89]'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                  title={t('emulator.tabMovements')}
                >
                  <ArrowLeftRight className="w-4 h-4" />
                </button>

                {/* Ranura 3: Botón circular central Esmeralda (+) */}
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-11 h-11 rounded-full bg-[#00DF89] text-black flex items-center justify-center shadow-[0_0_20px_rgba(0,223,137,0.5)] hover:scale-105 transition-transform"
                  title={t('emulator.addExpenseBtn')}
                >
                  <Plus className="w-6 h-6 stroke-[3]" />
                </button>

                {/* Ranura 4: Metas */}
                <button
                  onClick={() => setActiveTab('goals')}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                    activeTab === 'goals'
                      ? 'border border-[#00DF89]/30 bg-[#00DF89]/10 text-[#00DF89]'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                  title={t('emulator.tabGoals')}
                >
                  <Target className="w-4 h-4" />
                </button>

                {/* Ranura 5: Analítica */}
                <button
                  onClick={() => setActiveTab('analytics')}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                    activeTab === 'analytics'
                      ? 'border border-[#00DF89]/30 bg-[#00DF89]/10 text-[#00DF89]'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                  title={t('emulator.tabAnalytics')}
                >
                  <PieChart className="w-4 h-4" />
                </button>
              </div>

              {/* Bottom Sheet Modal de Nueva Transacción / Gasto / Ingreso / Transferencia */}
              <TransactionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={showToast}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
