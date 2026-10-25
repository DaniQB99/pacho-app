import React from 'react';
import { useI18n } from '../../context/I18nContext';
import { Heart, Sparkles } from 'lucide-react';
import { GithubIcon } from '../ui/GithubIcon';

export const Footer: React.FC = () => {
  const { t } = useI18n();

  return (
    <footer className="w-full border-t border-white/[0.08] dark:border-white/[0.08] light:border-black/[0.08] bg-[#070908] dark:bg-[#070908] light:bg-zinc-100 py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Brand & Tagline */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-pacho-green flex items-center justify-center font-bold text-black text-sm">
              P
            </div>
            <span className="font-extrabold text-lg text-white dark:text-white light:text-zinc-900">
              Pacho
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-pacho-green/10 text-pacho-green border border-pacho-green/20 font-mono">
              v1.0 Showcase
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-sm">
            {t('footer.tagline')}
          </p>
          <p className="text-[11px] text-zinc-500 max-w-md">
            {t('footer.disclaimer')}
          </p>
        </div>

        {/* Links & Attribution */}
        <div className="flex flex-col items-center md:items-end gap-3 text-center md:text-right">
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/DaniQB99/pacho"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-pacho-green transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GitHub App</span>
            </a>
            <a
              href="https://github.com/DaniQB99/pacho-app"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-pacho-green transition-colors"
            >
              <Sparkles className="w-4 h-4 text-pacho-gold" />
              <span>GitHub Web</span>
            </a>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-zinc-400">
            <span>{t('footer.madeWith')}</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" />
          </div>

          <p className="text-[11px] text-zinc-600 dark:text-zinc-500">
            © {new Date().getFullYear()} Pacho. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
};
