import React, { useState, useMemo } from 'react';
import { useEmulator } from '../../context/EmulatorContext';
import { useI18n } from '../../context/I18nContext';
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  RotateCcw,
  CheckSquare,
  Search,
  RefreshCw,
  ShoppingBag,
  Home,
  Utensils,
  Car,
  Smartphone,
  Zap,
  Banknote,
  Target
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

export const TransactionsView: React.FC = () => {
  const { t } = useI18n();
  const { data } = useEmulator();
  const [filterScope, setFilterScope] = useState<'all' | 'personal' | 'shared'>('all');

  const formatEuro = (val: number) => {
    return val.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const filteredTxs = useMemo(() => {
    return data.transactions.filter(tx => {
      if (filterScope === 'personal') return tx.scope === 'personal';
      if (filterScope === 'shared') return tx.scope === 'shared';
      return true;
    });
  }, [data.transactions, filterScope]);

  const totalIncome = useMemo(() => {
    return data.transactions
      .filter(tx => tx.amount > 0)
      .reduce((sum, tx) => sum + tx.amount, 0);
  }, [data.transactions]);

  const totalExpense = useMemo(() => {
    return data.transactions
      .filter(tx => tx.amount < 0)
      .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);
  }, [data.transactions]);

  const totalToPay = useMemo(() => {
    return data.transactions
      .filter(tx => tx.scope === 'shared' && tx.paidBy !== data.currentUser.name)
      .reduce((sum, tx) => sum + Math.abs(tx.amount) / 2, 0);
  }, [data.transactions, data.currentUser.name]);

  return (
    <div className="flex flex-col gap-3">
      {/* 1. Selector de Fecha */}
      <div className="flex items-center justify-center gap-4 py-1">
        <button className="text-zinc-400 hover:text-white transition-colors">
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-1.5 cursor-pointer">
          <span className="text-sm font-bold text-white">Octubre de 2026</span>
          <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
        </div>
        <button className="text-zinc-400 hover:text-white transition-colors">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* 2. Resumen 3 Tarjetas (Ingresado, Gastado, Por Pagar) */}
      <div className="grid grid-cols-3 gap-2">
        <div className="p-3 rounded-2xl bg-[#13151c] border border-white/[0.08] flex flex-col justify-between">
          <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider">
            {t('emulator.incomeTotal')}
          </span>
          <span className="text-sm font-black text-[#00DF89] mt-1">
            {formatEuro(totalIncome)} €
          </span>
        </div>

        <div className="p-3 rounded-2xl bg-[#13151c] border border-white/[0.08] flex flex-col justify-between">
          <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider">
            {t('emulator.spentTotal')}
          </span>
          <span className="text-sm font-black text-[#ef4444] mt-1">
            {formatEuro(totalExpense)} €
          </span>
        </div>

        <div className="p-3 rounded-2xl bg-white text-zinc-900 flex flex-col justify-between shadow-lg">
          <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider">
            {t('emulator.toPayTotal')}
          </span>
          <span className="text-sm font-black text-black mt-1">
            {formatEuro(totalToPay)} €
          </span>
        </div>
      </div>

      {/* 3. Filtros Dropdowns y Refresh */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
        <button className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white font-medium flex items-center gap-1 shrink-0">
          <span>Cuenta</span>
          <ChevronDown className="w-3 h-3 text-zinc-400" />
        </button>
        <button className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white font-medium flex items-center gap-1 shrink-0">
          <span>Categoría</span>
          <ChevronDown className="w-3 h-3 text-zinc-400" />
        </button>
        <button className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white font-medium flex items-center gap-1 shrink-0">
          <span>Tipo</span>
          <ChevronDown className="w-3 h-3 text-zinc-400" />
        </button>
        <button className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#00DF89] shrink-0">
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 4. Barra de Selección y Búsqueda */}
      <div className="flex items-center gap-2">
        <button className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white font-bold flex items-center gap-1.5 shrink-0">
          <CheckSquare className="w-3.5 h-3.5 text-zinc-400" />
          <span>{t('emulator.selectBtn')}</span>
        </button>
        <div className="flex-1 relative">
          <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            readOnly
            placeholder={t('emulator.searchPlaceholder')}
            className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none"
          />
        </div>
      </div>

      {/* 5. Selector Ámbito: Todo / Personal / Compartido */}
      <div className="grid grid-cols-3 gap-1 p-1 rounded-2xl bg-white/5 border border-white/10">
        <button
          onClick={() => setFilterScope('all')}
          className={`py-1.5 text-xs font-bold rounded-xl transition-all ${
            filterScope === 'all'
              ? 'bg-[#00DF89] text-black shadow-md'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          {t('emulator.filterAll')}
        </button>
        <button
          onClick={() => setFilterScope('personal')}
          className={`py-1.5 text-xs font-bold rounded-xl transition-all ${
            filterScope === 'personal'
              ? 'bg-[#00DF89] text-black shadow-md'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          {t('emulator.filterPersonal')}
        </button>
        <button
          onClick={() => setFilterScope('shared')}
          className={`py-1.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1 ${
            filterScope === 'shared'
              ? 'bg-[#00DF89] text-black shadow-md'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <img
            src="/pacho/poses/13_companero.png"
            alt="Compartido"
            className="w-3.5 h-3.5 object-contain"
          />
          <span>{t('emulator.filterShared')}</span>
        </button>
      </div>

      {/* 6. Listado Dinámico */}
      <div className="flex flex-col gap-3 mt-1">
        {filteredTxs.map(tx => {
          const isIncome = tx.amount > 0;
          return (
            <div key={tx.id}>
              <div className="flex items-center justify-between text-xs font-bold mb-1.5 px-0.5">
                <span className="text-zinc-400">{tx.dayGroup || tx.date}</span>
                <span className={isIncome ? 'text-[#00DF89]' : 'text-[#ef4444]'}>
                  {isIncome ? '+' : ''}{formatEuro(tx.amount)} €
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-[#13151c] border border-white/[0.08] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-zinc-800/80 border border-white/10 flex items-center justify-center shrink-0">
                    {(() => {
                      const catCfg = CATEGORY_CONFIG[tx.category] || { icon: ShoppingBag, color: 'text-[#00DF89]' };
                      const CategoryIcon = catCfg.icon;
                      return <CategoryIcon className={`w-5 h-5 ${catCfg.color}`} />;
                    })()}
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-bold text-white">{tx.title}</span>
                      {tx.isRecurring && <RefreshCw className="w-3 h-3 text-[#00DF89]" />}
                    </div>
                    <p className="text-[10px] text-zinc-400 mt-0.5 flex items-center gap-1">
                      <span className="w-3.5 h-3.5 rounded-full bg-[#00DF89]/20 text-[#00DF89] font-bold text-[8px] flex items-center justify-center">
                        {tx.paidBy[0]}
                      </span>
                      <span>{tx.scope === 'shared' ? 'Nuestra' : 'Personal'} · 👤 {tx.paidBy}</span>
                    </p>
                  </div>
                </div>
                <div className="text-right flex items-center gap-1.5">
                  <div>
                    <span className={`text-sm font-bold ${isIncome ? 'text-[#00DF89]' : 'text-[#ef4444]'}`}>
                      {isIncome ? '+' : ''}{formatEuro(tx.amount)} €
                    </span>
                    <p className="text-[10px] text-zinc-500">{tx.date}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-zinc-500" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
