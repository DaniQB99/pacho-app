import React, { useState } from 'react';
import { useI18n } from '../../context/I18nContext';
import { Sparkles, ArrowRight, Smartphone, Eye, EyeOff, ShieldCheck, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export const Hero: React.FC = () => {
  const { t } = useI18n();
  const [showBalance, setShowBalance] = useState(true);

  return (
    <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-32 overflow-hidden">
      {/* Background radial gradient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-pacho-green/15 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pacho-green/10 border border-pacho-green/25 text-pacho-green text-xs font-semibold mb-6"
            >
              <Sparkles className="w-3.5 h-3.5 text-pacho-green" />
              <span>{t('hero.badge')}</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] text-white dark:text-white light:text-zinc-900"
            >
              {t('hero.titleLine1')}{' '}
              <span className="bg-gradient-to-r from-pacho-green via-pacho-greenBright to-emerald-400 bg-clip-text text-transparent">
                {t('hero.titleLine2')}
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 text-base sm:text-lg text-zinc-300 dark:text-zinc-300 light:text-zinc-600 max-w-xl leading-relaxed"
            >
              {t('hero.subtitle')}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
            >
              <a
                href="https://pacho-app.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-3 px-7 py-3.5 rounded-2xl bg-pacho-green hover:bg-pacho-greenBright text-black font-extrabold text-sm sm:text-base shadow-xl shadow-pacho-green/25 hover:shadow-pacho-green/35 transition-all hover:scale-[1.02]"
              >
                <Smartphone className="w-5 h-5" />
                <span>{t('hero.ctaPrimary')}</span>
              </a>

              <a
                href="#emulador"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl border border-white/15 dark:border-white/15 light:border-black/15 bg-white/5 dark:bg-white/5 light:bg-black/5 hover:bg-white/10 text-white dark:text-white light:text-zinc-900 font-semibold text-sm sm:text-base transition-all"
              >
                <span>{t('hero.ctaSecondary')}</span>
                <ArrowRight className="w-4 h-4 text-pacho-green" />
              </a>
            </motion.div>

            {/* Stat Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12 grid grid-cols-3 gap-4 sm:gap-8 pt-8 border-t border-white/10 dark:border-white/10 light:border-black/10 w-full max-w-lg"
            >
              <div>
                <div className="text-xl sm:text-2xl font-black text-pacho-green">
                  {t('hero.stat1Value')}
                </div>
                <div className="text-xs text-zinc-400 mt-0.5">
                  {t('hero.stat1Label')}
                </div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-pacho-gold">
                  {t('hero.stat2Value')}
                </div>
                <div className="text-xs text-zinc-400 mt-0.5">
                  {t('hero.stat2Label')}
                </div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-emerald-400">
                  {t('hero.stat3Value')}
                </div>
                <div className="text-xs text-zinc-400 mt-0.5">
                  {t('hero.stat3Label')}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Interactive Card Preview */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full max-w-sm rounded-[32px] p-6 pacho-card liquid-glass relative shadow-2xl"
            >
              {/* Header card */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 dark:border-white/10 light:border-black/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center font-bold text-pacho-green text-sm">
                    P
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white dark:text-white light:text-zinc-900">
                      Zurrón Pareja & Piso
                    </h3>
                    <p className="text-[11px] text-zinc-400">Dani & Elena · 50/50</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowBalance(!showBalance)}
                  className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                  title="Toggle balance"
                >
                  {showBalance ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Balance Big */}
              <div className="my-6">
                <span className="text-xs uppercase font-mono tracking-wider text-zinc-400">
                  Saldo Compartido
                </span>
                <div className="text-3xl sm:text-4xl font-extrabold text-white dark:text-white light:text-zinc-900 tracking-tight mt-1 flex items-baseline gap-2">
                  <span>{showBalance ? '1.840,50 €' : '•••••• €'}</span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-400">
                    +12% ahorro
                  </span>
                </div>
                <p className="text-xs text-zinc-400 mt-1">
                  Tu parte responsable:{' '}
                  <span className="font-bold text-pacho-green">
                    {showBalance ? '920,25 €' : '•••• €'}
                  </span>
                </p>
              </div>

              {/* Mini Who-owes-who prompt */}
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/20 flex items-center justify-center">
                    <Zap className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-white dark:text-white light:text-zinc-900">
                      Elena te debe 42,80 €
                    </p>
                    <p className="text-[10px] text-zinc-400">Última compra Mercadona</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-pacho-green underline decoration-dashed cursor-pointer">
                  Bizum
                </span>
              </div>

              {/* Privacy badge */}
              <div className="mt-4 flex items-center gap-2 text-[11px] text-zinc-400 justify-center">
                <ShieldCheck className="w-3.5 h-3.5 text-pacho-green" />
                <span>Tus finanzas personales siguen 100% privadas</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
