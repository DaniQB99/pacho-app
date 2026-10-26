import React, { useState } from 'react';
import { useI18n } from '../../context/I18nContext';
import { Target, Calendar } from 'lucide-react';

interface GoalsViewProps {
  onOpenNewModal: () => void;
}

export const GoalsView: React.FC<GoalsViewProps> = ({ onOpenNewModal }) => {
  const { t } = useI18n();
  const [scope, setScope] = useState<'personal' | 'shared'>('personal');

  return (
    <div className="flex flex-col gap-3">
      {/* 1. Botón Principal: Nueva Meta */}
      <button
        onClick={onOpenNewModal}
        className="w-full py-3 rounded-2xl bg-[#00DF89] hover:bg-[#00c77a] text-black font-extrabold text-sm shadow-lg shadow-[#00DF89]/20 transition-all hover:scale-[1.01]"
      >
        {t('emulator.newGoal')}
      </button>

      {/* 2. Selector de Ámbito: Personales / Compartidas */}
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => setScope('personal')}
          className={`py-2 px-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
            scope === 'personal'
              ? 'bg-[#00DF89] text-black shadow-md'
              : 'bg-white/5 text-zinc-400 hover:text-white border border-white/5'
          }`}
        >
          <img
            src="/pacho/poses/01_busqueda.png"
            alt="Personales"
            className="w-4 h-4 object-contain"
          />
          <span>{t('emulator.goalsPersonal')}</span>
        </button>

        <button
          onClick={() => setScope('shared')}
          className={`py-2 px-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
            scope === 'shared'
              ? 'bg-[#00DF89] text-black shadow-md'
              : 'bg-white/5 text-zinc-400 hover:text-white border border-white/5'
          }`}
        >
          <img
            src="/pacho/poses/13_companero.png"
            alt="Compartidas"
            className="w-4 h-4 object-contain"
          />
          <span>{t('emulator.goalsShared')}</span>
        </button>
      </div>

      {/* 3. Tarjeta de Meta (Vacaciones) */}
      <div className="p-4 rounded-3xl bg-[#13151c] border border-white/[0.08] shadow-lg flex items-center justify-between">
        <div className="flex items-center gap-3.5">
          {/* Anillo de Progreso */}
          <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
            <svg className="w-12 h-12 -rotate-90">
              <circle
                cx="24"
                cy="24"
                r="20"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="4"
                fill="none"
              />
              <circle
                cx="24"
                cy="24"
                r="20"
                stroke="#f43f5e"
                strokeWidth="4"
                strokeDasharray="125.6"
                strokeDashoffset="100"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <Target className="w-4 h-4 text-rose-400" />
            </div>
          </div>

          {/* Info de la Meta */}
          <div className="text-left">
            <h3 className="text-sm font-bold text-white capitalize leading-tight">
              vacaciones
            </h3>
            <p className="text-[10px] text-zinc-400 mt-0.5 flex items-center gap-1">
              <Calendar className="w-3 h-3 text-zinc-500" />
              <span>19 oct - 19 nov 2026</span>
            </p>
            <span className="inline-block mt-1.5 px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[9px] text-zinc-300 font-medium">
              • Extras
            </span>
          </div>
        </div>

        {/* Cifras de Progreso */}
        <div className="text-right">
          <div className="text-sm font-black text-white">
            40 € <span className="text-xs font-normal text-zinc-400">{t('emulator.remaining')}</span>
          </div>
          <p className="text-[11px] text-zinc-400 mt-0.5">
            10 € {t('emulator.of')} 50 €
          </p>
        </div>
      </div>
    </div>
  );
};
