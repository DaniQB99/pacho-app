import React from 'react';
import { useEmulator } from '../../context/EmulatorContext';
import { useI18n } from '../../context/I18nContext';
import { useTheme } from '../../context/ThemeContext';
import {
  ChevronLeft,
  ChevronRight,
  Bell,
  Wallet,
  Tag,
  RefreshCw,
  Sun,
  Moon
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { t } = useI18n();
  const { data, closeSettings } = useEmulator();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex flex-col gap-4">
      {/* 1. Header con botón volver */}
      <div className="flex items-center justify-between pt-1 pb-1">
        <div className="flex items-center gap-2">
          <button
            onClick={closeSettings}
            className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            title="Volver"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <h2 className="text-xl font-black text-white tracking-tight">
            {t('emulator.tabSettings')}
          </h2>
        </div>
        <button
          className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white transition-colors"
        >
          <Bell className="w-4 h-4" />
        </button>
      </div>

      {/* 2. Tarjeta de Perfil Ficticio (Pacho) */}
      <div className="p-4 rounded-3xl bg-[#13151c] border border-white/[0.08] flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full border-2 border-white/15 overflow-hidden bg-zinc-800 shrink-0">
            <img
              src="/pacho/poses/04_ok.png"
              alt="Pacho"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="text-left">
            <h3 className="text-base font-bold text-white leading-tight">
              {data.currentUser.name}
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              {data.currentUser.email}
            </p>
          </div>
        </div>

        <button className="px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-white hover:bg-white/10 transition-colors flex items-center gap-1">
          <span>{t('emulator.edit')}</span>
          <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
        </button>
      </div>

      {/* 3. Sección: GESTIÓN DE DATOS */}
      <div>
        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-2 px-1">
          {t('emulator.dataManagement')}
        </span>
        <div className="rounded-2xl bg-[#13151c] border border-white/[0.08] divide-y divide-white/[0.05] shadow">
          {/* Cuentas y Tarjetas */}
          <div className="p-3.5 flex items-center justify-between cursor-pointer hover:bg-white/[0.02] transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#00DF89]/15 text-[#00DF89] flex items-center justify-center shrink-0">
                <Wallet className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="text-xs font-bold text-white block">
                  {t('emulator.manageAccounts')}
                </span>
                <span className="text-[10px] text-zinc-400 block mt-0.5">
                  {t('emulator.manageAccountsDesc')}
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-zinc-500" />
          </div>

          {/* Categorías */}
          <div className="p-3.5 flex items-center justify-between cursor-pointer hover:bg-white/[0.02] transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0">
                <Tag className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="text-xs font-bold text-white block">
                  {t('emulator.manageCategories')}
                </span>
                <span className="text-[10px] text-zinc-400 block mt-0.5">
                  {t('emulator.manageCategoriesDesc')}
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-zinc-500" />
          </div>

          {/* Transacciones recurrentes */}
          <div className="p-3.5 flex items-center justify-between cursor-pointer hover:bg-white/[0.02] transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-teal-500/15 text-teal-400 flex items-center justify-center shrink-0">
                <RefreshCw className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="text-xs font-bold text-white block">
                  {t('emulator.manageRecurring')}
                </span>
                <span className="text-[10px] text-zinc-400 block mt-0.5">
                  {t('emulator.manageRecurringDesc')}
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-zinc-500" />
          </div>
        </div>
      </div>

      {/* 4. Sección: COMPAÑERO/A */}
      <div>
        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-2 px-1">
          {t('emulator.partnerSection')}
        </span>
        <div className="p-3.5 rounded-2xl bg-[#13151c] border border-white/[0.08] flex items-center justify-between shadow cursor-pointer hover:bg-white/[0.02] transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
              <img
                src="/pacho/poses/13_companero.png"
                alt="Compañero"
                className="w-5 h-5 object-contain"
              />
            </div>
            <div className="text-left">
              <span className="text-xs font-bold text-white block">
                {t('emulator.partnerLinked')}
              </span>
              <span className="text-[10px] text-zinc-400 block mt-0.5 line-clamp-2 max-w-[210px]">
                {t('emulator.partnerLinkedDesc')}
              </span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-zinc-500" />
        </div>
      </div>

      {/* 5. Sección: APARIENCIA */}
      <div>
        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-2 px-1">
          {t('emulator.appearance')}
        </span>
        <div
          onClick={toggleTheme}
          className="p-3.5 rounded-2xl bg-[#13151c] border border-white/[0.08] flex items-center justify-between shadow cursor-pointer hover:bg-white/[0.02] transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#00DF89] shrink-0">
              {theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </div>
            <div className="text-left">
              <span className="text-xs font-bold text-white block">
                {theme === 'dark' ? 'Modo Oscuro' : 'Modo Claro'}
              </span>
              <span className="text-[10px] text-zinc-400 block mt-0.5">
                {t('emulator.appearance')}
              </span>
            </div>
          </div>
          <div className="w-10 h-5 rounded-full bg-[#00DF89] flex items-center justify-end px-1">
            <div className="w-3.5 h-3.5 rounded-full bg-black shadow" />
          </div>
        </div>
      </div>
    </div>
  );
};
