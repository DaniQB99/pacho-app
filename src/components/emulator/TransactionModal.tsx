import React, { useState } from 'react';
import { useEmulator } from '../../context/EmulatorContext';
import { useI18n } from '../../context/I18nContext';
import { TransactionType } from '../../types/emulator';
import {
  X,
  Wallet,
  ArrowDownCircle,
  ArrowLeftRight,
  Landmark,
  Tag,
  Package,
  Calendar,
  RefreshCw,
  ChevronDown,
  ChevronRight,
  Check
} from 'lucide-react';

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (msg: string) => void;
}

export const TransactionModal: React.FC<TransactionModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const { t } = useI18n();
  const { data, activeAccount, addTransaction } = useEmulator();

  const [txType, setTxType] = useState<TransactionType>('expense');
  const [amountStr, setAmountStr] = useState<string>('0');
  const [description, setDescription] = useState<string>('');
  const [sourceAccountId, setSourceAccountId] = useState<string>(activeAccount.id);
  const [targetAccountId, setTargetAccountId] = useState<string>('acc-shared');
  const [selectedCategory, setSelectedCategory] = useState<string>('Supermercado');

  const availableCategories = ['Supermercado', 'Restaurantes', 'Transporte', 'Suscripciones', 'Hogar', 'Luz y Fibra'];
  const handleCategoryCycle = () => {
    const idx = availableCategories.indexOf(selectedCategory);
    const next = availableCategories[(idx + 1) % availableCategories.length];
    setSelectedCategory(next);
  };

  if (!isOpen) return null;

  const currentAccount = data.accounts.find(a => a.id === sourceAccountId) || activeAccount;

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9.,]/g, '');
    setAmountStr(val || '0');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanNum = parseFloat(amountStr.replace(',', '.'));
    if (isNaN(cleanNum) || cleanNum <= 0) return;

    const categoryMapping: Record<string, string> = {
      'Supermercado': 'cat-super',
      'Restaurantes': 'cat-dine',
      'Transporte': 'cat-transport',
      'Suscripciones': 'cat-subs',
      'Hogar': 'cat-home',
      'Luz y Fibra': 'cat-bills',
    };

    addTransaction({
      title: description || (txType === 'expense' ? selectedCategory : txType === 'income' ? 'Nómina / Ingreso' : 'Transferencia'),
      amount: cleanNum,
      type: txType,
      accountId: sourceAccountId,
      categoryId: txType === 'expense' ? (categoryMapping[selectedCategory] || 'cat-super') : 'cat-income',
    });

    onClose();
    onSuccess(t('emulator.quickSuccess'));
  };

  return (
    <div className="absolute inset-0 z-50 flex flex-col justify-end bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-h-[92%] rounded-t-[32px] bg-[#0d121c] border-t border-x border-white/10 p-5 flex flex-col overflow-y-auto no-scrollbar shadow-2xl">
        {/* Handle Bar Superior */}
        <div className="w-10 h-1 rounded-full bg-zinc-600 mb-3 mx-auto shrink-0" />

        {/* Cabecera del Modal */}
        <div className="flex items-center justify-between mb-3 relative">
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          <h2 className="text-base font-bold text-white text-center flex-1 pr-7">
            {txType === 'expense' && t('emulator.newExpense')}
            {txType === 'income' && t('emulator.newIncome')}
            {txType === 'transfer' && t('emulator.newTransfer')}
          </h2>
        </div>

        {/* 1. Selector de Tipo (Gasto, Ingreso, Transfer.) */}
        <div className="grid grid-cols-3 gap-2 mb-2">
          {/* Gasto */}
          <button
            type="button"
            onClick={() => setTxType('expense')}
            className={`py-2 px-2 rounded-2xl flex items-center justify-center gap-1.5 text-xs font-bold transition-all ${
              txType === 'expense'
                ? 'border border-rose-500/60 bg-rose-500/15 text-rose-400 shadow-md'
                : 'bg-white/5 text-zinc-400 hover:text-white border border-white/5'
            }`}
          >
            <Wallet className="w-3.5 h-3.5" />
            <span>{t('emulator.tabExpense')}</span>
          </button>

          {/* Ingreso */}
          <button
            type="button"
            onClick={() => setTxType('income')}
            className={`py-2 px-2 rounded-2xl flex items-center justify-center gap-1.5 text-xs font-bold transition-all ${
              txType === 'income'
                ? 'border border-[#00DF89]/60 bg-[#00DF89]/15 text-[#00DF89] shadow-md'
                : 'bg-white/5 text-zinc-400 hover:text-white border border-white/5'
            }`}
          >
            <ArrowDownCircle className="w-3.5 h-3.5" />
            <span>{t('emulator.tabIncome')}</span>
          </button>

          {/* Transfer */}
          <button
            type="button"
            onClick={() => setTxType('transfer')}
            className={`py-2 px-2 rounded-2xl flex items-center justify-center gap-1.5 text-xs font-bold transition-all ${
              txType === 'transfer'
                ? 'border border-indigo-500/60 bg-indigo-500/15 text-indigo-400 shadow-md'
                : 'bg-white/5 text-zinc-400 hover:text-white border border-white/5'
            }`}
          >
            <ArrowLeftRight className="w-3.5 h-3.5" />
            <span>{t('emulator.tabTransfer')}</span>
          </button>
        </div>

        {/* 2. Gran Monto Central Interactivo */}
        <div className="py-2 flex flex-col items-center justify-center relative">
          <div className="flex items-baseline justify-center gap-1 text-center">
            <input
              type="text"
              value={amountStr === '0' ? '' : amountStr}
              placeholder="0"
              onChange={handleAmountChange}
              autoFocus
              className="text-5xl font-black text-white bg-transparent text-right w-44 focus:outline-none placeholder-white tracking-tight"
            />
            <span className="text-4xl font-black text-white">€</span>
          </div>
        </div>

        {/* 3. Formulario de Campos */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-1">
          {/* CUENTA o CUENTA ORIGEN */}
          <div>
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">
              {txType === 'transfer' ? t('emulator.accountSource') : 'CUENTA'}
            </span>
            <div
              onClick={() => {
                const nextIdx = (data.accounts.findIndex(a => a.id === sourceAccountId) + 1) % data.accounts.length;
                setSourceAccountId(data.accounts[nextIdx].id);
              }}
              className="p-3 rounded-2xl bg-[#141824] border border-white/10 flex items-center justify-between cursor-pointer hover:bg-white/[0.04] transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white shrink-0">
                  <Landmark className="w-4 h-4 text-zinc-300" />
                </div>
                <div className="text-left">
                  <span className="text-xs font-bold text-white block">
                    {currentAccount.name}
                  </span>
                  <span className="text-[10px] text-zinc-400 block mt-0.5">
                    Balance: {currentAccount.balance.toFixed(2)} €
                  </span>
                </div>
              </div>
              <ChevronDown className="w-4 h-4 text-zinc-400" />
            </div>
          </div>

          {/* CUENTA DESTINO (Solo en Transferencia) */}
          {txType === 'transfer' && (
            <div>
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">
                {t('emulator.accountTarget')}
              </span>
              <div
                onClick={() => setTargetAccountId(targetAccountId === 'acc-shared' ? 'acc-savings' : 'acc-shared')}
                className="p-3 rounded-2xl bg-[#141824] border border-white/10 flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white shrink-0">
                    <Landmark className="w-4 h-4 text-indigo-400" />
                  </div>
                  <div className="text-left">
                    <span className="text-xs font-bold text-white block">
                      {targetAccountId === 'acc-shared' ? 'Cuenta Compartida' : 'Ahorro Vacaciones'}
                    </span>
                    <span className="text-[10px] text-zinc-400 block mt-0.5">
                      Balance: {targetAccountId === 'acc-shared' ? '1840,50 €' : '620,00 €'}
                    </span>
                  </div>
                </div>
                <ChevronDown className="w-4 h-4 text-zinc-400" />
              </div>
            </div>
          )}

          {/* DESCRIPCIÓN */}
          <div>
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">
              {t('emulator.descriptionLabel')}
            </span>
            <div className="px-3.5 py-3 rounded-2xl bg-[#141824] border border-white/10 flex items-center gap-2.5">
              <Tag className="w-4 h-4 text-zinc-500 shrink-0" />
              <input
                type="text"
                placeholder={t('emulator.descriptionPlaceholder')}
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="bg-transparent text-xs text-white placeholder-zinc-500 w-full focus:outline-none"
              />
            </div>
          </div>

          {/* CATEGORÍA (Para Gasto e Ingreso) */}
          {txType !== 'transfer' && (
            <div>
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">
                {t('emulator.categoryLabel')}
              </span>
              <div
                onClick={handleCategoryCycle}
                className="p-3 rounded-2xl bg-[#141824] border border-white/10 flex items-center justify-between cursor-pointer hover:bg-white/[0.04] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                    <Package className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-white">
                    {selectedCategory}
                  </span>
                </div>
                <ChevronDown className="w-4 h-4 text-zinc-400" />
              </div>
            </div>
          )}

          {/* FECHA: Doble Fila (Lun, 26 oct / Nunca) */}
          <div>
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">
              {t('emulator.dateLabel')}
            </span>
            <div className="grid grid-cols-2 gap-2">
              <div className="p-3 rounded-2xl bg-[#141824] border border-white/10 flex items-center justify-between text-xs text-white font-medium">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Lun, 26 oct</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-zinc-500" />
              </div>

              <div className="p-3 rounded-2xl bg-[#141824] border border-white/10 flex items-center justify-between text-xs text-white font-medium">
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-3.5 h-3.5 text-zinc-400" />
                  <span>{t('emulator.frequencyNever')}</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-zinc-500" />
              </div>
            </div>
          </div>

          {/* Botón Guardar / Realizar */}
          <button
            type="submit"
            className={`w-full py-3.5 rounded-2xl font-bold text-sm text-white flex items-center justify-center gap-2 shadow-xl transition-all hover:scale-[1.01] mt-2 ${
              txType === 'expense'
                ? 'bg-[#8b2228] hover:bg-[#a0272e]'
                : txType === 'income'
                ? 'bg-[#0b6343] hover:bg-[#0d754f]'
                : 'bg-[#2f357f] hover:bg-[#383f98]'
            }`}
          >
            <Check className="w-4 h-4 stroke-[3]" />
            <span>
              {txType === 'expense' && t('emulator.saveExpense')}
              {txType === 'income' && t('emulator.saveIncome')}
              {txType === 'transfer' && t('emulator.executeTransfer')}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};
