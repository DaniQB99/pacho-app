import React, { useState } from 'react';
import { useI18n } from '../../context/I18nContext';
import { Heart, Home, Users, Sparkles, GraduationCap, CheckCircle2 } from 'lucide-react';

type CaseKey = 'couples' | 'roommates' | 'friends' | 'siblings' | 'family';

interface AudienceOption {
  key: CaseKey;
  icon: React.ElementType;
  mockZurron: {
    name: string;
    members: string[];
    splitRule: string;
    exampleExpense: string;
    amount: string;
  };
}

const AUDIENCE_OPTIONS: AudienceOption[] = [
  {
    key: 'couples',
    icon: Heart,
    mockZurron: {
      name: 'Zurrón Pareja & Nido',
      members: ['Dani', 'Elena'],
      splitRule: '50% / 50% equitativo',
      exampleExpense: 'Compra Carrefour & Cena Viernes',
      amount: '94,50 €',
    },
  },
  {
    key: 'roommates',
    icon: Home,
    mockZurron: {
      name: 'Piso Malasaña 3ºB',
      members: ['Alex', 'Dani', 'Sara', 'Mateo'],
      splitRule: 'Reparto entre 4 compañeros',
      exampleExpense: 'Fibra 1Gb + Limpieza',
      amount: '68,00 €',
    },
  },
  {
    key: 'friends',
    icon: Users,
    mockZurron: {
      name: 'Festival Sonorama 🎸',
      members: ['Javi', 'Dani', 'Carlos', 'Bea'],
      splitRule: 'A pachas según consumo',
      exampleExpense: 'Abonos + Reserva Alojamiento',
      amount: '340,00 €',
    },
  },
  {
    key: 'siblings',
    icon: Sparkles,
    mockZurron: {
      name: 'Bodas de Oro Papás 🥂',
      members: ['Dani', 'Lucía', 'Pablo'],
      splitRule: 'A tercios (1/3 cada uno)',
      exampleExpense: 'Fin de semana en Parador',
      amount: '270,00 €',
    },
  },
  {
    key: 'family',
    icon: GraduationCap,
    mockZurron: {
      name: 'Paga y Extraescolares Hugo',
      members: ['Papá', 'Mamá', 'Hugo (17)'],
      splitRule: 'Asignación mensual y control',
      exampleExpense: 'Libros Bachillerato & Transporte',
      amount: '120,00 €',
    },
  },
];

export const AudienceTabs: React.FC = () => {
  const { t } = useI18n();
  const [activeKey, setActiveKey] = useState<CaseKey>('couples');

  const activeOption = AUDIENCE_OPTIONS.find(o => o.key === activeKey) || AUDIENCE_OPTIONS[0];

  return (
    <section id="audiencia" className="py-20 lg:py-28 border-y border-white/[0.06] bg-[#0b0f0e]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pacho-green/10 border border-pacho-green/20 text-pacho-green text-xs font-semibold uppercase tracking-wider mb-3">
            {t('audience.badge')}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white dark:text-white light:text-zinc-900 tracking-tight">
            {t('audience.title')}
          </h2>
          <p className="mt-4 text-zinc-400 text-sm sm:text-base leading-relaxed">
            {t('audience.subtitle')}
          </p>
        </div>

        {/* Tab Buttons Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {AUDIENCE_OPTIONS.map(opt => {
            const Icon = opt.icon;
            const isSelected = activeKey === opt.key;
            return (
              <button
                key={opt.key}
                onClick={() => setActiveKey(opt.key)}
                className={`flex items-center gap-2.5 px-4 sm:px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                  isSelected
                    ? 'bg-pacho-green text-black shadow-lg shadow-pacho-green/25 scale-105'
                    : 'bg-white/5 dark:bg-white/5 light:bg-black/5 hover:bg-white/10 text-zinc-300 dark:text-zinc-300 light:text-zinc-700 border border-white/10 dark:border-white/10 light:border-black/10'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-black' : 'text-pacho-green'}`} />
                <span>{t(`audience.cases.${opt.key}.title`)}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Showcase Card */}
        <div className="max-w-4xl mx-auto rounded-[32px] p-8 sm:p-12 pacho-card liquid-glass relative overflow-hidden">
          <div className="grid md:grid-cols-12 gap-8 items-center">
            {/* Info */}
            <div className="md:col-span-7 flex flex-col items-start">
              <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-lg bg-emerald-500/10 text-pacho-green border border-emerald-500/20 mb-3">
                {t(`audience.cases.${activeKey}.tag`)}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white dark:text-white light:text-zinc-900 leading-tight">
                {t(`audience.cases.${activeKey}.title`)}
              </h3>
              <p className="mt-4 text-zinc-300 dark:text-zinc-300 light:text-zinc-600 text-sm sm:text-base leading-relaxed">
                {t(`audience.cases.${activeKey}.desc`)}
              </p>

              <div className="mt-6 flex flex-col gap-2.5 text-xs sm:text-sm text-zinc-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-pacho-green shrink-0" />
                  <span>Sin mezclar cuentas personales ni historial privado</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-pacho-green shrink-0" />
                  <span>Saldado inmediato con un click vía Bizum</span>
                </div>
              </div>
            </div>

            {/* Preview Box */}
            <div className="md:col-span-5 w-full">
              <div className="rounded-2xl p-5 bg-[#101513] border border-white/10 dark:border-white/10 shadow-xl flex flex-col gap-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span className="text-xs font-mono text-zinc-400 uppercase">Zurrón Simulado</span>
                  <span className="text-xs font-bold text-pacho-gold">
                    {activeOption.mockZurron.splitRule}
                  </span>
                </div>

                <div>
                  <h4 className="text-base font-bold text-white">
                    {activeOption.mockZurron.name}
                  </h4>
                  <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                    {activeOption.mockZurron.members.map((m, i) => (
                      <span
                        key={i}
                        className="text-[11px] px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-zinc-300"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between mt-1">
                  <div>
                    <p className="text-xs font-medium text-zinc-200">
                      {activeOption.mockZurron.exampleExpense}
                    </p>
                    <p className="text-[10px] text-zinc-400">Gasto compartido registrado</p>
                  </div>
                  <span className="text-sm font-black text-pacho-green">
                    {activeOption.mockZurron.amount}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
