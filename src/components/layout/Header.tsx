import React, { useState } from 'react';
import { useI18n } from '../../context/I18nContext';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon, Globe, Menu, X, ArrowUpRight } from 'lucide-react';

export const Header: React.FC = () => {
  const { t, locale, setLocale } = useI18n();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleLanguage = () => {
    setLocale(locale === 'es' ? 'en' : 'es');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] dark:border-white/[0.08] light:border-black/[0.08] liquid-glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pacho-greenDark to-pacho-green flex items-center justify-center shadow-lg shadow-pacho-green/20 group-hover:scale-105 transition-transform">
            <span className="text-xl font-black text-black">P</span>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-xl tracking-tight text-white dark:text-white light:text-zinc-900 group-hover:text-pacho-green transition-colors">
              Pacho
            </span>
            <span className="text-[10px] font-mono uppercase tracking-wider text-pacho-green -mt-1 font-bold">
              Finanzas a pachas
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#audiencia"
            className="text-sm font-medium text-zinc-400 hover:text-pacho-green dark:hover:text-pacho-green light:text-zinc-600 transition-colors"
          >
            {t('nav.useCases')}
          </a>
          <a
            href="#emulador"
            className="text-sm font-medium text-zinc-400 hover:text-pacho-green dark:hover:text-pacho-green light:text-zinc-600 transition-colors"
          >
            {t('nav.emulator')}
          </a>
          <a
            href="#pacho-guia"
            className="text-sm font-medium text-zinc-400 hover:text-pacho-green dark:hover:text-pacho-green light:text-zinc-600 transition-colors"
          >
            {t('nav.pachoGuide')}
          </a>
          <a
            href="#arquitectura"
            className="text-sm font-medium text-zinc-400 hover:text-pacho-green dark:hover:text-pacho-green light:text-zinc-600 transition-colors"
          >
            {t('nav.architecture')}
          </a>
        </nav>

        {/* Controls & CTA */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border border-white/10 dark:border-white/10 light:border-black/10 hover:border-pacho-green text-zinc-300 dark:text-zinc-300 light:text-zinc-700 hover:text-pacho-green transition-all"
            title={locale === 'es' ? t('nav.langEn') : t('nav.langEs')}
          >
            <Globe className="w-3.5 h-3.5 text-pacho-green" />
            <span className="uppercase">{locale}</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-zinc-400 dark:text-zinc-400 light:text-zinc-600 hover:text-pacho-green border border-white/10 dark:border-white/10 light:border-black/10 hover:border-pacho-green transition-all"
            title={theme === 'dark' ? t('nav.themeLight') : t('nav.themeDark')}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-pacho-gold" /> : <Moon className="w-4 h-4 text-zinc-700" />}
          </button>

          {/* Open App CTA */}
          <a
            href="https://pacho-app.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-pacho-green hover:bg-pacho-greenBright text-black font-bold text-xs sm:text-sm shadow-lg shadow-pacho-green/20 hover:shadow-pacho-green/30 transition-all hover:scale-[1.02]"
          >
            <span>{t('nav.openApp')}</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={toggleLanguage}
            className="px-2.5 py-1 rounded-lg text-xs font-bold border border-white/10 text-pacho-green"
          >
            {locale.toUpperCase()}
          </button>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-zinc-400 border border-white/10"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-pacho-gold" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-zinc-400 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden px-4 pt-3 pb-6 border-t border-white/[0.08] bg-[#0c100e] flex flex-col gap-4">
          <a
            href="#audiencia"
            onClick={() => setMobileMenuOpen(false)}
            className="text-base font-medium text-zinc-300 py-2 border-b border-white/5"
          >
            {t('nav.useCases')}
          </a>
          <a
            href="#emulador"
            onClick={() => setMobileMenuOpen(false)}
            className="text-base font-medium text-zinc-300 py-2 border-b border-white/5"
          >
            {t('nav.emulator')}
          </a>
          <a
            href="#pacho-guia"
            onClick={() => setMobileMenuOpen(false)}
            className="text-base font-medium text-zinc-300 py-2 border-b border-white/5"
          >
            {t('nav.pachoGuide')}
          </a>
          <a
            href="#arquitectura"
            onClick={() => setMobileMenuOpen(false)}
            className="text-base font-medium text-zinc-300 py-2 border-b border-white/5"
          >
            {t('nav.architecture')}
          </a>
          <a
            href="https://pacho-app.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full text-center py-3 rounded-xl bg-pacho-green text-black font-bold text-sm mt-2"
          >
            {t('nav.openApp')}
          </a>
        </div>
      )}
    </header>
  );
};
