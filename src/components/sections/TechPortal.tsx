import React, { useState } from 'react';
import { useI18n } from '../../context/I18nContext';
import {
  Code2,
  Layers,
  Database,
  Smartphone,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Cpu
} from 'lucide-react';
import { GithubIcon } from '../ui/GithubIcon';

export const TechPortal: React.FC = () => {
  const { t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section id="arquitectura" className="py-20 lg:py-24 border-t border-white/[0.06] bg-[#080b0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with expand button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-8 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <Cpu className="w-3.5 h-3.5" />
              <span>{t('techPortal.badge')}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white dark:text-white light:text-zinc-900">
              {t('techPortal.title')}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-xl">
              {t('techPortal.subtitle')}
            </p>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white/5 border border-white/15 text-zinc-200 hover:text-white hover:bg-white/10 text-xs sm:text-sm font-bold transition-all shrink-0"
          >
            <span>{isOpen ? t('techPortal.toggleClose') : t('techPortal.toggleOpen')}</span>
            {isOpen ? <ChevronUp className="w-4 h-4 text-pacho-green" /> : <ChevronDown className="w-4 h-4 text-pacho-green" />}
          </button>
        </div>

        {/* Collapsible Architecture Specs */}
        {isOpen && (
          <div className="pt-10 flex flex-col gap-10 animate-fadeIn">
            {/* 4 Architecture Pillar Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-5 rounded-2xl pacho-card liquid-glass flex flex-col gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400">
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm text-white">{t('techPortal.card1Title')}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">{t('techPortal.card1Desc')}</p>
              </div>

              <div className="p-5 rounded-2xl pacho-card liquid-glass flex flex-col gap-3">
                <div className="w-10 h-10 rounded-xl bg-pacho-green/15 border border-pacho-green/30 flex items-center justify-center text-pacho-green">
                  <Code2 className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm text-white">{t('techPortal.card2Title')}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">{t('techPortal.card2Desc')}</p>
              </div>

              <div className="p-5 rounded-2xl pacho-card liquid-glass flex flex-col gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Database className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm text-white">{t('techPortal.card3Title')}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">{t('techPortal.card3Desc')}</p>
              </div>

              <div className="p-5 rounded-2xl pacho-card liquid-glass flex flex-col gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Smartphone className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm text-white">{t('techPortal.card4Title')}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">{t('techPortal.card4Desc')}</p>
              </div>
            </div>

            {/* Architecture Diagram Preview */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#101513] border border-white/10 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-white">Topología del Sistema & Flujo de Datos</h4>
                  <p className="text-xs text-zinc-400">Desacoplamiento entre la PWA React 19, Flutter Mobile y Supabase Cloud.</p>
                </div>
                <a
                  href="https://github.com/DaniQB99/pacho"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-pacho-green hover:bg-white/10"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>{t('techPortal.btnGithub')}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="w-full rounded-2xl overflow-hidden bg-black/40 border border-white/5 p-4 flex justify-center">
                <img
                  src="assets/diagrams/architecture-diagram.svg"
                  alt="Architecture Diagram"
                  className="w-full max-h-[380px] object-contain rounded-lg"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
