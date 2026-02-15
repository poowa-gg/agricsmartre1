
export enum UserRole {
  FARMER = 'FARMER',
  COOP_ADMIN = 'COOP_ADMIN',
  LENDER = 'LENDER',
  MINISTRY_ADMIN = 'MINISTRY_ADMIN'
}

export type MinistrySubRole = 'POLICY_MAKER' | 'AUDIT_LEAD' | 'EXTENSION_COORD';

export interface FieldFeedback {
  id: string;
  sender: string;
  location: string;
  category: 'subsidy_issue' | 'pest_outbreak' | 'weather_damage' | 'market_access';
  message: string;
  timestamp: string;
  priority: 'low' | 'medium' | 'high';
}

export interface Farmer {
  id: string;
  name: string;
  location: string;
  cropType: string;
  farmSize: number;
  cashCreditScore: number;
  inputTrustScore: number;
  joiningDate: string;
}

export interface Cooperative {
  id: string;
  name: string;
  memberCount: number;
  rating: number;
  location: string;
  specialization: string;
  description: string;
  minTrustScore: number;
  bulkDiscount: boolean;
  preferences: string[];
}

export interface FarmEvent {
  id: string;
  type: 'pest' | 'spray' | 'irrigation' | 'harvest' | 'planting';
  date: string;
  description: string;
  status: 'completed' | 'pending' | 'alert';
  scoreImpact: number;
}

export interface InputVoucher {
  id: string;
  provider: string;
  amount: number;
  expiry: string;
  type: 'fertilizer' | 'seed' | 'pesticide';
  status: 'active' | 'used' | 'expired';
}

export interface LoanOffer {
  id: string;
  lender: string;
  amount: number;
  interestRate: number;
  termMonths: number;
  minScore: number;
}
