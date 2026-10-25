import React, { useState } from 'react';
import { useEmulator } from '../../context/EmulatorContext';
import { useI18n } from '../../context/I18nContext';
import {
  Users,
  Plus,
  Zap,
  CheckCircle,
  ShoppingBag,
  Home,
  Utensils,
  Car,
  RotateCcw
} from 'lucide-react';

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  'cat-super': ShoppingBag,
  'cat-home': Home,
  'cat-dine': Utensils,
  'cat-bills': Zap,
  'cat-trips': Car,
};

export const InteractivePhoneEmulator: React.FC = () => {
  const { t } = useI18n();
  const {
    data,
    activeZurron,
    setActiveZurronId,
    addExpense,
    settleDebt,
    resetEmulator,
  } = useEmulator();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [concept, setConcept] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('cat-super');
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!concept || !amount) return;
    const numAmount = parseFloat(amount.replace(',', '.'));
    if (isNaN(numAmount) || numAmount <= 0) return;

    addExpense(concept, numAmount, category);
    setConcept('');
    setAmount('');
    setIsModalOpen(false);
    showToast(t('emulator.quickSuccess'));
  };

  const handleSettleDebt = () => {
    settleDebt();
    showToast('¡Deuda saldada vía Bizum! 🎉');
  };

  const showToast = (msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 3000);
  };

  return (
    <section id="emulador" className="py-20 lg:py-28 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-pacho-green/10 blur-[150px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pacho-green/10 border border-pacho-green/20 text-pacho-green text-xs font-semibold uppercase tracking-wider mb-3">
            {t('emulator.badge')}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white dark:text-white light:text-zinc-900 tracking-tight">
            {t('emulator.title')}
          </h2>
          <p className="mt-4 text-zinc-400 text-sm sm:text-base leading-relaxed">
            {t('emulator.subtitle')}
          </p>
        </div>

        {/* Emulator Grid: Controls on left / Phone Frame on right */}
        <div className="grid lg:grid-cols-12 gap-10 items-center max-w-5xl mx-auto">
          {/* Guide & Quick Controls Panel */}
          <div className="lg:col-span-5 flex flex-col gap-6 order-2 lg:order-1">
            <div className="p-6 rounded-3xl pacho-card liquid-glass flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-pacho-green font-bold">
                  Acciones en vivo
                </span>
                <button
                  onClick={resetEmulator}
                  className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
                  title="Reiniciar emulador"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reiniciar</span>
                </button>
              </div>

              <p className="text-sm text-zinc-300">
                Probá interactuar como si estuvieras en la app real. Cualquier gasto que agregues recalcula las cuentas y las deudas en tiempo real.
              </p>

              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-pacho-green hover:bg-pacho-greenBright text-black font-extrabold text-sm shadow-lg shadow-pacho-green/25 transition-all hover:scale-[1.02]"
              >
                <Plus className="w-5 h-5" />
                <span>{t('emulator.addExpenseBtn')}</span>
              </button>

              {data.debtSummary.amount > 0 && (
                <button
                  onClick={handleSettleDebt}
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 font-bold text-xs transition-all"
                >
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span>
                    {t('emulator.settleBizum')} ({data.debtSummary.amount.toFixed(2)} €)
                  </span>
                </button>
              )}
            </div>

            {/* Pacho live quote inside phone */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-pacho-green/20 flex items-center justify-center text-pacho-green font-bold shrink-0">
                🪶
              </div>
              <div>
                <span className="text-xs font-bold text-pacho-green uppercase">Pacho dice:</span>
                <p className="text-xs text-zinc-300 italic mt-0.5">
                  «{data.debtSummary.amount > 0 ? data.pachoTips[1].quote : data.pachoTips[0].quote}»
                </p>
              </div>
            </div>

            <p className="text-[11px] text-zinc-500 text-center lg:text-left">
              {t('emulator.resetWarning')}
            </p>
          </div>

          {/* Interactive Mobile Device Mockup */}
          <div className="lg:col-span-7 flex justify-center order-1 lg:order-2">
            <div className="w-full max-w-[340px] h-[670px] bg-[#0c100e] border-[8px] border-[#222a26] rounded-[44px] shadow-[0_25px_80px_rgba(0,0,0,0.85)] flex flex-col relative overflow-hidden">
              {/* Phone Notch & Status bar */}
              <div className="pt-3 px-6 pb-2 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                <span>09:41</span>
                <div className="w-20 h-4 bg-black rounded-full" />
                <span>5G 100%</span>
              </div>

              {/* Toast Feedback */}
              {feedback && (
                <div className="absolute top-12 left-4 right-4 z-30 p-2.5 rounded-xl bg-pacho-green text-black text-xs font-bold shadow-xl flex items-center justify-center gap-2 animate-bounce">
                  <CheckCircle className="w-4 h-4" />
                  <span>{feedback}</span>
                </div>
              )}

              {/* Zurrones Selector Tabs */}
              <div className="px-4 py-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar border-b border-white/5">
                {data.zurrones.map(z => {
                  const isActive = z.id === activeZurron.id;
                  return (
                    <button
                      key={z.id}
                      onClick={() => setActiveZurronId(z.id)}
                      className={`px-3 py-1.5 rounded-xl text-[11px] font-bold whitespace-nowrap transition-all ${
                        isActive
                          ? 'bg-pacho-green text-black shadow-md'
                          : 'bg-white/5 text-zinc-400 hover:text-white'
                      }`}
                    >
                      {z.name}
                    </button>
                  );
                })}
              </div>

              {/* Scrollable Phone Screen Content */}
              <div className="flex-1 px-4 py-3 overflow-y-auto flex flex-col gap-3.5 no-scrollbar">
                {/* Balance Card */}
                <div className="rounded-2xl p-4 bg-gradient-to-br from-[#18221e] to-[#0e1412] border border-white/10 relative overflow-hidden">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                      {activeZurron.name}
                    </span>
                    <span className="text-[10px] font-bold text-pacho-green">
                      {activeZurron.type === 'shared' ? '50/50' : 'Personal'}
                    </span>
                  </div>

                  <div className="text-2xl font-black text-white tracking-tight mt-1">
                    {activeZurron.balance.toFixed(2)} {activeZurron.currency}
                  </div>

                  {activeZurron.type === 'shared' && (
                    <div className="mt-2.5 pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px]">
                      <span className="text-zinc-400">Tu parte:</span>
                      <span className="font-bold text-pacho-green">
                        {activeZurron.myShare.toFixed(2)} €
                      </span>
                    </div>
                  )}
                </div>

                {/* Who owes who banner inside phone */}
                {data.debtSummary.amount > 0 ? (
                  <div className="rounded-xl p-3 bg-amber-500/10 border border-amber-500/25 flex items-center justify-between">
                    <div>
                      <p className="text-[11px] font-bold text-amber-300">
                        {data.debtSummary.debtor} {t('emulator.debtNotice')} {data.debtSummary.creditor}
                      </p>
                      <p className="text-[9px] text-zinc-400 truncate max-w-[160px]">
                        {data.debtSummary.reason}
                      </p>
                    </div>
                    <span className="text-xs font-black text-amber-400">
                      {data.debtSummary.amount.toFixed(2)} €
                    </span>
                  </div>
                ) : (
                  <div className="rounded-xl p-2.5 bg-emerald-500/10 border border-emerald-500/20 text-center">
                    <span className="text-[11px] font-bold text-pacho-green">
                      ✨ ¡Cuentas 100% al día sin deudas!
                    </span>
                  </div>
                )}

                {/* Transactions Timeline */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-zinc-300 uppercase tracking-wider">
                      {t('emulator.recentMovements')}
                    </span>
                    <span className="text-[10px] text-zinc-500 font-mono">
                      {data.transactions.length} registros
                    </span>
                  </div>

                  <div className="flex flex-col gap-2">
                    {data.transactions.slice(0, 5).map(tx => {
                      const Icon = CATEGORY_ICONS[tx.category] || ShoppingBag;
                      const isIncome = tx.type === 'income';
                      return (
                        <div
                          key={tx.id}
                          className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between"
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-pacho-green shrink-0">
                              <Icon className="w-3.5 h-3.5" />
                            </div>
                            <div className="text-left">
                              <p className="text-xs font-semibold text-white leading-tight">
                                {tx.title}
                              </p>
                              <p className="text-[9px] text-zinc-400 mt-0.5">
                                {tx.paidBy} · {tx.split}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <span
                              className={`text-xs font-bold ${
                                isIncome ? 'text-pacho-green' : 'text-zinc-200'
                              }`}
                            >
                              {isIncome ? '+' : '-'}
                              {tx.amount.toFixed(2)} €
                            </span>
                            <p className="text-[9px] text-zinc-500">{tx.date}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Bottom Phone Dock Navigation */}
              <div className="h-14 px-6 border-t border-white/10 bg-[#0e1412] flex items-center justify-around text-zinc-400">
                <button className="flex flex-col items-center gap-0.5 text-pacho-green">
                  <Home className="w-4 h-4" />
                  <span className="text-[9px] font-bold">Inicio</span>
                </button>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-10 h-10 rounded-full bg-pacho-green text-black flex items-center justify-center shadow-lg shadow-pacho-green/30 -mt-4 hover:scale-110 transition-transform"
                >
                  <Plus className="w-5 h-5 font-black" />
                </button>
                <button className="flex flex-col items-center gap-0.5 hover:text-white">
                  <Users className="w-4 h-4" />
                  <span className="text-[9px]">Pachas</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal: Agregar Gasto */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <div className="w-full max-w-sm rounded-3xl p-6 bg-[#111714] border border-white/15 shadow-2xl relative">
              <h3 className="text-lg font-extrabold text-white mb-4">
                {t('emulator.modalTitle')}
              </h3>

              <form onSubmit={handleAddExpense} className="flex flex-col gap-4">
                <div>
                  <label className="text-xs font-semibold text-zinc-400 block mb-1">
                    {t('emulator.fieldConcept')}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Mercadona, Cena, Gasolina..."
                    value={concept}
                    onChange={e => setConcept(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-pacho-green"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-zinc-400 block mb-1">
                    {t('emulator.fieldAmount')}
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="45.50"
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-pacho-green"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-zinc-400 block mb-1">
                    Categoría
                  </label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#161c1a] border border-white/10 text-white text-sm focus:outline-none focus:border-pacho-green"
                  >
                    {data.categories.map(c => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-3 mt-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-2.5 rounded-xl border border-white/10 text-zinc-300 text-xs font-bold hover:bg-white/5"
                  >
                    {t('emulator.btnCancel')}
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-pacho-green hover:bg-pacho-greenBright text-black text-xs font-extrabold shadow-lg shadow-pacho-green/20"
                  >
                    {t('emulator.btnSave')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
