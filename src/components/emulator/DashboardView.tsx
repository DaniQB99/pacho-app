import React from 'react';
import { useEmulator } from '../../context/EmulatorContext';
import { useI18n } from '../../context/I18nContext';
import {
  Landmark,
  ArrowUpDown,
  Eye,
  EyeOff,
  Settings,
  ChevronRight,
  ChevronLeft,
  Calendar,
  RefreshCw,
  User,
  ShoppingBag,
  Home,
  Utensils,
  Zap,
  Target,
  Banknote,
  Car,
  Smartphone,
  ShieldCheck
} from 'lucide-react';

const CATEGORY_CONFIG: Record<string, { icon: React.ElementType; color: string }> = {
  'cat-super': { icon: ShoppingBag, color: 'text-emerald-400' },
  'cat-home': { icon: Home, color: 'text-indigo-400' },
  'cat-dine': { icon: Utensils, color: 'text-amber-400' },
  'cat-transport': { icon: Car, color: 'text-blue-400' },
  'cat-subs': { icon: Smartphone, color: 'text-purple-400' },
  'cat-bills': { icon: Zap, color: 'text-pink-400' },
  'cat-savings': { icon: Target, color: 'text-cyan-400' },
  'cat-income': { icon: Banknote, color: 'text-[#00DF89]' },
};

const UPCOMING_ICONS: Record<string, { icon: React.ElementType; color: string }> = {
  home: { icon: Home, color: 'text-indigo-400' },
  zap: { icon: Zap, color: 'text-amber-400' },
  car: { icon: Car, color: 'text-blue-400' },
  shield: { icon: ShieldCheck, color: 'text-emerald-400' },
};

export const DashboardView: React.FC = () => {
  const { t } = useI18n();
  const {
    data,
    activeAccount,
    activeAccountIndex,
    setActiveAccountId,
    selectNextAccount,
    selectPrevAccount,
    isBalanceHidden,
    toggleBalanceVisibility,
    openSettings,
    setActiveTab,
  } = useEmulator();

  const formatEuro = (val: number) => {
    return val.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return (
    <div className="flex flex-col gap-3">
      {/* 1. Main Bank Card (Carrusel Liquid Glass 3D) */}
      <div className="relative">
        <div
          className="w-full rounded-[24px] p-5 relative overflow-hidden border border-white/15 shadow-2xl transition-all duration-300"
          style={{ background: activeAccount.gradient }}
        >
          {/* Liquid Glass Specular Reflections */}
          <div className="absolute -top-12 -right-12 w-44 h-44 rounded-full bg-white/10 blur-xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-36 h-36 rounded-full bg-black/20 blur-lg pointer-events-none" />

          {/* Fila Superior de la Tarjeta */}
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-white/15 backdrop-blur flex items-center justify-center">
                <Landmark className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-bold text-white tracking-tight">
                {activeAccount.name}
              </span>
            </div>

            {/* 3 Botones píldora de la tarjeta */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={selectNextAccount}
                className="w-7 h-7 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur border border-white/20 flex items-center justify-center text-white transition-all shadow-sm"
                title={t('emulator.reorderCards')}
              >
                <ArrowUpDown className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={toggleBalanceVisibility}
                className="w-7 h-7 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur border border-white/20 flex items-center justify-center text-white transition-all shadow-sm"
                title={isBalanceHidden ? t('emulator.showBalance') : t('emulator.hideBalance')}
              >
                {isBalanceHidden ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={openSettings}
                className="w-7 h-7 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur border border-white/20 flex items-center justify-center text-white transition-all shadow-sm"
                title={t('emulator.tabSettings')}
              >
                <Settings className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Fila Central: Saldo disponible protagonista */}
          <div className="mt-3.5 mb-2 relative z-10">
            <span className="text-[10px] font-semibold text-white/70 uppercase tracking-widest block">
              {t('emulator.available')}
            </span>
            <div className="text-[28px] font-black text-white tracking-tight leading-tight mt-0.5">
              {isBalanceHidden ? '••••••' : `${formatEuro(activeAccount.balance)} €`}
            </div>
          </div>

          {/* Fila Inferior: Badge Personal / Compartida */}
          <div className="flex items-center justify-end relative z-10 pt-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/25 backdrop-blur border border-white/15 text-xs text-white/90 font-medium">
              {activeAccount.scope === 'shared' ? (
                <>
                  <img
                    src="/pacho/poses/13_companero.png"
                    alt="A pachas"
                    className="w-4 h-4 object-contain"
                  />
                  <span>{t('emulator.screenShared')}</span>
                </>
              ) : (
                <>
                  <User className="w-3.5 h-3.5 text-[#86efac]" />
                  <span>{t('emulator.screenPersonal')}</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Flecha derecha para avanzar de tarjeta en el carrusel */}
        <button
          onClick={selectNextAccount}
          className="absolute right-[-10px] top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-[#181D29]/90 border border-white/20 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform z-20"
          title="Siguiente tarjeta"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Flecha izquierda si no es la primera */}
        {activeAccountIndex > 0 && (
          <button
            onClick={selectPrevAccount}
            className="absolute left-[-10px] top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-[#181D29]/90 border border-white/20 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform z-20"
            title="Tarjeta anterior"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Dots de paginación interactivos */}
      <div className="flex items-center justify-center gap-1.5 pt-0.5 pb-0.5">
        {data.accounts.map((acc, idx) => {
          const isActive = idx === activeAccountIndex;
          return (
            <button
              key={acc.id}
              onClick={() => setActiveAccountId(acc.id)}
              className={`h-1.5 transition-all rounded-full ${
                isActive
                  ? 'w-6 bg-rose-500 shadow-sm'
                  : 'w-1.5 bg-zinc-600 hover:bg-zinc-500'
              }`}
              title={acc.name}
            />
          );
        })}
      </div>

      {/* 2. Seguro para Gastar Hoy (Pill con Avatar 3D de Pacho) */}
      <div className="rounded-2xl p-3 bg-[#061A12] border border-[#00DF89]/40 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <img
            src="/pacho/poses/04_ok.png"
            alt="Pacho"
            className="w-10 h-10 object-contain drop-shadow shrink-0"
          />
          <div className="overflow-hidden">
            <span className="text-[9px] font-bold text-[#00DF89] uppercase tracking-wider block">
              {t('emulator.safeToSpend')}
            </span>
            <span className="text-xs font-bold text-white tracking-tight truncate block mt-0.5">
              {isBalanceHidden
                ? '•••• € disponibles sin estrés'
                : `${formatEuro(data.safeToSpend.dailyAmount)} € disponibles sin es...`}
            </span>
          </div>
        </div>
        <span className="text-xs font-bold text-[#00DF89] shrink-0 ml-2">
          {data.safeToSpend.badge}
        </span>
      </div>

      {/* 3. Recuadro 1: ÚLTIMOS MOVIMIENTOS */}
      <div className="rounded-2xl bg-[#13151c] border border-white/[0.08] p-3 flex flex-col gap-2.5 shadow">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-zinc-400 tracking-wider uppercase">
            {t('emulator.latestMovements')}
          </span>
          <button
            onClick={() => setActiveTab('transactions')}
            className="text-[11px] font-semibold text-[#00DF89] hover:underline flex items-center gap-0.5"
          >
            <span>{t('emulator.viewAll')}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex flex-col gap-2">
          {data.transactions
            .filter(tx => tx.accountId === activeAccount.id)
            .slice(0, 3)
            .map(tx => {
              const catCfg = CATEGORY_CONFIG[tx.category] || { icon: ShoppingBag, color: 'text-[#00DF89]' };
              const Icon = catCfg.icon;
              const isIncome = tx.amount > 0;
              return (
                <div
                  key={tx.id}
                  className="flex items-center justify-between py-1 border-b border-white/[0.04] last:border-b-0"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-zinc-800/80 border border-white/10 flex items-center justify-center shrink-0">
                      <Icon className={`w-4 h-4 ${catCfg.color}`} />
                    </div>
                    <div className="text-left">
                      <div className="flex items-center gap-1.5">
                        <p className="text-xs font-bold text-white leading-tight">
                          {tx.title}
                        </p>
                        {tx.isRecurring && (
                          <RefreshCw className="w-3 h-3 text-[#00DF89]" />
                        )}
                      </div>
                      <p className="text-[10px] text-zinc-400 mt-0.5">{tx.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span
                      className={`text-xs font-bold ${
                        isIncome ? 'text-[#00DF89]' : 'text-white'
                      }`}
                    >
                      {isBalanceHidden
                        ? '••••'
                        : `${isIncome ? '+' : ''}${formatEuro(tx.amount)} €`}
                    </span>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* 4. Recuadro 2: PRÓXIMOS PAGOS */}
      <div className="rounded-2xl bg-[#13151c] border border-white/[0.08] p-3 flex flex-col gap-2.5 shadow">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-zinc-400 tracking-wider uppercase">
            {t('emulator.upcomingPayments')}
          </span>
          <button
            onClick={() => setActiveTab('transactions')}
            className="text-[11px] font-semibold text-[#00DF89] hover:underline flex items-center gap-0.5"
          >
            <span>{t('emulator.viewAll')}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex flex-col gap-2">
          {data.upcomingPayments.map(payment => {
            const payCfg = UPCOMING_ICONS[payment.icon] || { icon: Home, color: 'text-indigo-400' };
            const PaymentIcon = payCfg.icon;
            return (
              <div
                key={payment.id}
                className="flex items-center justify-between py-1"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-zinc-800/80 border border-white/10 flex items-center justify-center shrink-0">
                    <PaymentIcon className={`w-4 h-4 ${payCfg.color}`} />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-white leading-tight">
                      {payment.title}
                    </p>
                    <p className="text-[10px] text-zinc-400 mt-0.5 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-zinc-500" />
                      <span>{payment.dueDate} · {payment.periodicity}</span>
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-white">
                    {isBalanceHidden ? '••••' : `${formatEuro(payment.amount)} €`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
