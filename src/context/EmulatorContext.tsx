import React, { createContext, useContext, useState } from 'react';
import initialMockData from '../data/mock-data.json';
import { Zurron, Transaction, DebtSummary, MockDataState } from '../types/emulator';

interface EmulatorContextType {
  data: MockDataState;
  activeZurron: Zurron;
  setActiveZurronId: (id: string) => void;
  addExpense: (title: string, amount: number, categoryId: string, splitType?: string) => void;
  settleDebt: () => void;
  resetEmulator: () => void;
}

const EmulatorContext = createContext<EmulatorContextType | undefined>(undefined);

export const EmulatorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<MockDataState>(() => JSON.parse(JSON.stringify(initialMockData)));
  const [activeZurronId, setActiveZurronId] = useState<string>('z-shared');

  const activeZurron = data.zurrones.find(z => z.id === activeZurronId) || data.zurrones[0];

  const addExpense = (title: string, amount: number, categoryId: string, splitType: string = '50/50') => {
    const isShared = activeZurron.type === 'shared';
    const myPart = isShared ? Number((amount / 2).toFixed(2)) : amount;
    const partnerPart = isShared ? Number((amount - myPart).toFixed(2)) : 0;

    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      zurronId: activeZurron.id,
      title,
      category: categoryId,
      amount,
      paidBy: data.currentUser.name,
      split: splitType,
      myPart,
      date: 'Ahora mismo',
      type: 'expense',
    };

    setData(prev => {
      // Update Zurron balance
      const updatedZurrones = prev.zurrones.map(z => {
        if (z.id === activeZurron.id) {
          return {
            ...z,
            balance: Number((z.balance + amount).toFixed(2)),
            myShare: Number((z.myShare + myPart).toFixed(2)),
            partnerShare: Number((z.partnerShare + partnerPart).toFixed(2)),
          };
        }
        return z;
      });

      // If shared expense paid by current user, partner owes their half!
      let updatedDebt: DebtSummary = { ...prev.debtSummary };
      if (isShared) {
        const newDebtAmount = Number((prev.debtSummary.amount + partnerPart).toFixed(2));
        updatedDebt = {
          debtor: prev.partner.name,
          creditor: prev.currentUser.name,
          amount: newDebtAmount,
          currency: '€',
          reason: `Último gasto: ${title} (${amount} €)`,
        };
      }

      return {
        ...prev,
        zurrones: updatedZurrones,
        transactions: [newTx, ...prev.transactions],
        debtSummary: updatedDebt,
      };
    });
  };

  const settleDebt = () => {
    setData(prev => {
      const settlementTx: Transaction = {
        id: `tx-settle-${Date.now()}`,
        zurronId: activeZurron.id,
        title: `Pago Bizum de ${prev.debtSummary.debtor}`,
        category: 'cat-bills',
        amount: prev.debtSummary.amount,
        paidBy: prev.debtSummary.debtor,
        split: 'Saldado 100%',
        myPart: prev.debtSummary.amount,
        date: 'Recién saldado ✨',
        type: 'income',
      };

      return {
        ...prev,
        transactions: [settlementTx, ...prev.transactions],
        debtSummary: {
          debtor: prev.partner.name,
          creditor: prev.currentUser.name,
          amount: 0,
          currency: '€',
          reason: '¡Cuentas al día! 🤝 Sin deudas pendientes.',
        },
      };
    });
  };

  const resetEmulator = () => {
    setData(JSON.parse(JSON.stringify(initialMockData)));
    setActiveZurronId('z-shared');
  };

  return (
    <EmulatorContext.Provider
      value={{
        data,
        activeZurron,
        setActiveZurronId,
        addExpense,
        settleDebt,
        resetEmulator,
      }}
    >
      {children}
    </EmulatorContext.Provider>
  );
};

export const useEmulator = () => {
  const context = useContext(EmulatorContext);
  if (!context) throw new Error('useEmulator must be used within EmulatorProvider');
  return context;
};
