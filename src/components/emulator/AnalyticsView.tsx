import React, { useState } from 'react';
import { useI18n } from '../../context/I18nContext';
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  CreditCard,
  Car,
  Home
} from 'lucide-react';

export const AnalyticsView: React.FC = () => {
  const { t } = useI18n();
  const [metricTab, setMetricTab] = useState<'expenses' | 'incomes'>('expenses');

  return (
    <div className="flex flex-col gap-3.5">
      {/* 1. Selector de Año */}
      <div className="flex items-center justify-center gap-4 py-0.5">
        <button className="text-zinc-400 hover:text-white transition-colors">
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-1.5 cursor-pointer">
          <span className="text-sm font-bold text-white">2026</span>
          <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
        </div>
        <button className="text-zinc-400 hover:text-white transition-colors">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* 2. Gran Saldo Neto */}
      <div className="text-center py-1">
        <h2 className="text-4xl font-black text-white tracking-tight">
          -232,00 €
        </h2>
      </div>

      {/* 3. Selector de Cuenta */}
      <div>
        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-1.5">
          CUENTA
        </span>
        <div className="p-3 rounded-2xl bg-[#13151c] border border-white/[0.08] flex items-center justify-between cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
              <CreditCard className="w-4 h-4" />
            </div>
            <div className="text-left">
              <span className="text-xs font-bold text-white block">
                {t('emulator.allAccounts')}
              </span>
              <span className="text-[10px] text-zinc-400 block">
                Balance: 3904,77 €
              </span>
            </div>
          </div>
          <ChevronDown className="w-4 h-4 text-zinc-400" />
        </div>
      </div>

      {/* 4. Selector Dual: Gastos / Ingresos */}
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => setMetricTab('expenses')}
          className={`p-3 rounded-2xl text-center transition-all ${
            metricTab === 'expenses'
              ? 'bg-[#181a24] border-2 border-rose-500/80 shadow-lg'
              : 'bg-[#13151c] border border-white/[0.08]'
          }`}
        >
          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
            {t('emulator.expenses')}
          </span>
          <span className="text-sm font-black text-[#ef4444] block mt-1">
            252,00 €
          </span>
        </button>

        <button
          onClick={() => setMetricTab('incomes')}
          className={`p-3 rounded-2xl text-center transition-all ${
            metricTab === 'incomes'
              ? 'bg-[#181a24] border-2 border-[#00DF89]/80 shadow-lg'
              : 'bg-[#13151c] border border-white/[0.08]'
          }`}
        >
          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
            {t('emulator.incomes')}
          </span>
          <span className="text-sm font-black text-[#00DF89] block mt-1">
            20,00 €
          </span>
        </button>
      </div>

      {/* 5. Donut Chart Circular */}
      <div className="flex flex-col items-center justify-center py-2 relative">
        <div className="relative w-40 h-40 flex items-center justify-center">
          <svg className="w-40 h-40 -rotate-90">
            {/* Base Arc */}
            <circle
              cx="80"
              cy="80"
              r="62"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="14"
              fill="none"
            />
            {/* Coche / Violet Arc */}
            <circle
              cx="80"
              cy="80"
              r="62"
              stroke="#6366f1"
              strokeWidth="14"
              strokeDasharray="389"
              strokeDashoffset="180"
              strokeLinecap="round"
              fill="none"
            />
            {/* Piso / Emerald Arc */}
            <circle
              cx="80"
              cy="80"
              r="62"
              stroke="#00DF89"
              strokeWidth="14"
              strokeDasharray="389"
              strokeDashoffset="340"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-base font-black text-white">252,00 €</span>
            <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest mt-0.5">
              GASTOS
            </span>
          </div>
        </div>
      </div>

      {/* 6. Desglose de Categorías */}
      <div className="rounded-2xl bg-[#13151c] border border-white/[0.08] p-3 flex flex-col gap-2.5 shadow">
        <div className="flex items-center justify-between py-1 border-b border-white/[0.04]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/15 text-indigo-400 flex items-center justify-center shrink-0">
              <Car className="w-4 h-4" />
            </div>
            <div className="text-left">
              <span className="text-xs font-bold text-white block">Coche</span>
              <span className="text-[10px] text-zinc-400 block">2 transacciones</span>
            </div>
          </div>
          <span className="text-xs font-bold text-white">102,00 €</span>
        </div>

        <div className="flex items-center justify-between py-1">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center shrink-0">
              <Home className="w-4 h-4" />
            </div>
            <div className="text-left">
              <span className="text-xs font-bold text-white block">Piso</span>
              <span className="text-[10px] text-zinc-400 block">1 transacción</span>
            </div>
          </div>
          <span className="text-xs font-bold text-white">100,00 €</span>
        </div>
      </div>
    </div>
  );
};
