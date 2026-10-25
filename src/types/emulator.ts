export type ZurronType = 'shared' | 'personal' | 'goal';

export interface Zurron {
  id: string;
  name: string;
  type: ZurronType;
  balance: number;
  myShare: number;
  partnerShare: number;
  currency: string;
  color: 'emerald' | 'blue' | 'gold';
  membersCount: number;
  target?: number;
}

export interface Transaction {
  id: string;
  zurronId: string;
  title: string;
  category: string;
  amount: number;
  paidBy: string;
  split: string;
  myPart: number;
  date: string;
  type: 'expense' | 'income';
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface DebtSummary {
  debtor: string;
  creditor: string;
  amount: number;
  currency: string;
  reason: string;
}

export interface PachoTip {
  id: string;
  pose: string;
  quote: string;
}

export interface MockDataState {
  currentUser: {
    id: string;
    name: string;
    avatar: string;
    monthlyBudget: number;
  };
  partner: {
    id: string;
    name: string;
    avatar: string;
  };
  zurrones: Zurron[];
  debtSummary: DebtSummary;
  categories: Category[];
  transactions: Transaction[];
  pachoTips: PachoTip[];
}
