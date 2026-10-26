export type AccountScope = 'shared' | 'personal';

export type EmulatorTab = 'home' | 'transactions' | 'goals' | 'analytics' | 'settings';

export interface Account {
  id: string;
  name: string;
  balance: number;
  currency: string;
  color: string;
  gradient: string;
  icon: string;
  scope: AccountScope;
  position: number;
  cardIdentifier: string;
}

export type TransactionType = 'expense' | 'income' | 'transfer';

export interface Transaction {
  id: string;
  accountId: string;
  title: string;
  amount: number;
  type: TransactionType;
  category: string;
  date: string;
  dayGroup?: string;
  paidBy: string;
  scope: AccountScope;
  isRecurring?: boolean;
}

export interface UpcomingPayment {
  id: string;
  accountId: string;
  title: string;
  amount: number;
  dueDate: string;
  periodicity: string;
  icon: string;
}

export interface Goal {
  id: string;
  title: string;
  currentAmount: number;
  targetAmount: number;
  startDate: string;
  endDate: string;
  tag: string;
  scope: AccountScope;
}

export interface AnalyticsCategory {
  name: string;
  amount: number;
  count: number;
  color: string;
}

export interface AnalyticsData {
  year: string;
  netBalance: number;
  totalIncome: number;
  totalExpense: number;
  categories: AnalyticsCategory[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface SafeToSpend {
  dailyAmount: number;
  monthlyRemaining: number;
  daysRemaining: number;
  status: 'healthy' | 'caution' | 'critical';
  subtitle: string;
  badge: string;
}

export interface CoupleLink {
  partnerName: string;
  partnerAvatar: string;
  syncCode: string;
  linkedAt: string;
  isLinked: boolean;
}

export interface MockDataState {
  currentUser: {
    id: string;
    name: string;
    email: string;
    avatar: string;
  };
  couple: CoupleLink;
  accounts: Account[];
  safeToSpend: SafeToSpend;
  categories: Category[];
  transactions: Transaction[];
  upcomingPayments: UpcomingPayment[];
  goals: Goal[];
  analytics: AnalyticsData;
}
