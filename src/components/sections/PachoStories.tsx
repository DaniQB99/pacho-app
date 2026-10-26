import React, { useState } from 'react';
import { useI18n } from '../../context/I18nContext';
import { ShieldCheck, Sparkles, Bell, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface StorySlide {
  titleKey: string;
  descKey: string;
  quote: string;
  icon: React.ElementType;
  badge: string;
}

const STORY_SLIDES: StorySlide[] = [
  {
    titleKey: 'pachoGuide.pillar1Title',
    descKey: 'pachoGuide.pillar1Desc',
    quote: '«Las cuentas claras y el zurrón a salvo. Nadie tiene por qué saber lo que te gastas en tus caprichos personales.»',
    icon: ShieldCheck,
    badge: 'Privacidad Real',
  },
  {
    titleKey: 'pachoGuide.pillar2Title',
    descKey: 'pachoGuide.pillar2Desc',
    quote: '«Una app de dinero no tiene por qué parecer un Excel aburrido. Si es placentera, da gusto llevar el control al día.»',
    icon: Sparkles,
    badge: 'Experiencia Fluida',
  },
  {
    titleKey: 'pachoGuide.pillar3Title',
    descKey: 'pachoGuide.pillar3Desc',
    quote: '«Pacho te dice con cariño quién debe a quién antes de que el ticket se pierda y empiece el lío.»',
    icon: Bell,
    badge: 'Cero Fricción',
  },
];

export const PachoStories: React.FC = () => {
  const { t } = useI18n();
  const [currentSlide, setCurrentSlide] = useState(0);

  const prevSlide = () => {
    setCurrentSlide(prev => (prev === 0 ? STORY_SLIDES.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide(prev => (prev === 0 ? 1 : (prev + 1) % STORY_SLIDES.length));
  };

  const active = STORY_SLIDES[currentSlide];
  const Icon = active.icon;

  return (
    <section id="pacho-guia" className="py-20 lg:py-28 border-t border-black/[0.06] bg-slate-50 dark:border-white/[0.06] dark:bg-[#090d0b] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual Mascot & Banner */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative group w-full max-w-md rounded-3xl overflow-hidden border border-black/10 dark:border-white/10 shadow-2xl">
              <img
                src="assets/pacho-banner.jpg"
                alt="Pacho Guía"
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                <span className="text-xs font-mono font-bold text-pacho-green uppercase tracking-wider">
                  Guía de boina y zurrón
                </span>
                <p className="text-white font-extrabold text-lg mt-1">
                  Pacho en persona
                </p>
                <p className="text-zinc-300 text-xs italic mt-0.5">
                  {t('pachoGuide.quote')}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Story Carousel */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pacho-green/10 border border-pacho-green/20 text-pacho-green text-xs font-semibold uppercase tracking-wider mb-3 self-start">
              {t('pachoGuide.badge')}
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {t('pachoGuide.title')}
            </h2>
            <p className="mt-4 text-slate-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed">
              {t('pachoGuide.subtitle')}
            </p>

            {/* Carousel Card */}
            <div className="mt-8 p-6 sm:p-8 rounded-3xl pacho-card liquid-glass relative">
              <div className="flex items-center justify-between pb-4 border-b border-black/10 dark:border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-pacho-green/20 border border-pacho-green/30 flex items-center justify-center text-pacho-green">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-pacho-green uppercase">
                      {active.badge}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                      {t(active.titleKey)}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={prevSlide}
                    className="p-2 rounded-xl bg-black/5 border border-black/10 text-slate-700 hover:text-slate-900 hover:bg-black/10 dark:bg-white/5 dark:border-white/10 dark:text-zinc-300 dark:hover:text-white dark:hover:bg-white/10"
                    title="Anterior"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="p-2 rounded-xl bg-black/5 border border-black/10 text-slate-700 hover:text-slate-900 hover:bg-black/10 dark:bg-white/5 dark:border-white/10 dark:text-zinc-300 dark:hover:text-white dark:hover:bg-white/10"
                    title="Siguiente"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <p className="mt-4 text-slate-600 dark:text-zinc-300 text-sm sm:text-base leading-relaxed">
                {t(active.descKey)}
              </p>

              <div className="mt-6 p-4 rounded-2xl bg-black/5 border border-black/10 dark:bg-white/5 dark:border-white/10 flex items-start gap-3">
                <Quote className="w-5 h-5 text-pacho-gold shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-slate-700 dark:text-zinc-200 italic">
                  {active.quote}
                </p>
              </div>

              {/* Dots indicator */}
              <div className="flex items-center gap-1.5 mt-6 justify-center">
                {STORY_SLIDES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    className={`h-1.5 rounded-full transition-all ${
                      i === currentSlide ? 'w-6 bg-pacho-green' : 'w-2 bg-black/20 dark:bg-white/20'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
