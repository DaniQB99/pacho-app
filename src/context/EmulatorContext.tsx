import React, { createContext, useContext, useState } from 'react';
import initialMockData from '../data/mock-data.json';
import { Account, Transaction, TransactionType, EmulatorTab, MockDataState } from '../types/emulator';

interface AddTransactionParams {
  title: string;
  amount: number;
  type: TransactionType;
  accountId?: string;
  categoryId: string;
}

interface EmulatorContextType {
  data: MockDataState;
  activeAccount: Account;
  activeAccountId: string;
  activeAccountIndex: number;
  activeTab: EmulatorTab;
  setActiveTab: (tab: EmulatorTab) => void;
  openSettings: () => void;
  closeSettings: () => void;
  setActiveAccountId: (id: string) => void;
  selectNextAccount: () => void;
  selectPrevAccount: () => void;
  isBalanceHidden: boolean;
  toggleBalanceVisibility: () => void;
  addTransaction: (params: AddTransactionParams) => void;
  resetEmulator: () => void;
}

const EmulatorContext = createContext<EmulatorContextType | undefined>(undefined);

export const EmulatorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<MockDataState>(() => JSON.parse(JSON.stringify(initialMockData)));
  const [activeAccountId, setActiveAccountId] = useState<string>('acc-principal');
  const [isBalanceHidden, setIsBalanceHidden] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<EmulatorTab>('home');
  const [previousTab, setPreviousTab] = useState<EmulatorTab>('home');

  const activeAccountIndex = Math.max(
    0,
    data.accounts.findIndex(a => a.id === activeAccountId)
  );
  const activeAccount = data.accounts[activeAccountIndex] || data.accounts[0];

  const selectNextAccount = () => {
    const nextIndex = (activeAccountIndex + 1) % data.accounts.length;
    setActiveAccountId(data.accounts[nextIndex].id);
  };

  const selectPrevAccount = () => {
    const prevIndex = (activeAccountIndex - 1 + data.accounts.length) % data.accounts.length;
    setActiveAccountId(data.accounts[prevIndex].id);
  };

  const toggleBalanceVisibility = () => {
    setIsBalanceHidden(prev => !prev);
  };

  const openSettings = () => {
    if (activeTab !== 'settings') {
      setPreviousTab(activeTab);
    }
    setActiveTab('settings');
  };

  const closeSettings = () => {
    setActiveTab(previousTab || 'home');
  };

  const addTransaction = ({
    title,
    amount,
    type,
    accountId,
    categoryId,
  }: AddTransactionParams) => {
    const targetAccountId = accountId || activeAccount.id;
    const targetAcc = data.accounts.find(a => a.id === targetAccountId) || activeAccount;

    const absAmount = Math.abs(amount);
    const signedAmount = type === 'expense' ? -absAmount : absAmount;

    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      accountId: targetAcc.id,
      title,
      amount: signedAmount,
      type,
      category: categoryId,
      date: 'Hoy',
      dayGroup: 'Hoy, 26 de octubre',
      paidBy: data.currentUser.name,
      scope: targetAcc.scope,
    };

    setData(prev => {
      const updatedAccounts = prev.accounts.map(acc => {
        if (acc.id === targetAcc.id) {
          const newBalance = Number((acc.balance + signedAmount).toFixed(2));
          return {
            ...acc,
            balance: newBalance,
          };
        }
        return acc;
      });

      let updatedSafeToSpend = { ...prev.safeToSpend };
      if (type === 'expense') {
        const newDaily = Math.max(0, Number((prev.safeToSpend.dailyAmount - absAmount).toFixed(2)));
        updatedSafeToSpend = {
          ...prev.safeToSpend,
          dailyAmount: newDaily,
          subtitle: `${newDaily.toFixed(2)} € disponibles sin estrés`,
        };
      }

      return {
        ...prev,
        accounts: updatedAccounts,
        safeToSpend: updatedSafeToSpend,
        transactions: [newTx, ...prev.transactions],
      };
    });
  };

  const resetEmulator = () => {
    setData(JSON.parse(JSON.stringify(initialMockData)));
    setActiveAccountId('acc-principal');
    setActiveTab('home');
    setPreviousTab('home');
    setIsBalanceHidden(false);
  };

  return (
    <EmulatorContext.Provider
      value={{
        data,
        activeAccount,
        activeAccountId,
        activeAccountIndex,
        activeTab,
        setActiveTab,
        openSettings,
        closeSettings,
        setActiveAccountId,
        selectNextAccount,
        selectPrevAccount,
        isBalanceHidden,
        toggleBalanceVisibility,
        addTransaction,
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
