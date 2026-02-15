
import React from 'react';
import { Farmer, Cooperative, FarmEvent, InputVoucher, LoanOffer, FieldFeedback } from './types';
import { Sprout, Bug, Droplets, Scissors, Tractor } from 'lucide-react';

export const MOCK_FARMER: Farmer = {
  id: 'f-001',
  name: 'Samuel Okoro',
  location: 'Oyo State, Nigeria',
  cropType: 'Maize & Cassava',
  farmSize: 4.5,
  cashCreditScore: 710,
  inputTrustScore: 845,
  joiningDate: '2023-05-12'
};

export const MOCK_COOPERATIVES: Cooperative[] = [
  {
    id: 'c-001',
    name: 'Unity Farmers Alliance',
    memberCount: 154,
    rating: 4.8,
    location: 'Ibadan North',
    specialization: 'Grains & Tubers',
    description: 'A community-driven cooperative focused on bulk purchasing and shared processing facilities.',
    minTrustScore: 600,
    bulkDiscount: true,
    preferences: ['Organic Fertilizers', 'Late Season Planting']
  }
];

export const MOCK_MINISTRY_FEEDBACK: FieldFeedback[] = [
  {
    id: 'ff-1',
    sender: 'Ibrahim K.',
    location: 'Kano North',
    category: 'subsidy_issue',
    message: 'Agro-dealer in Sector 4 is charging unauthorized handling fees for fertilizer vouchers.',
    timestamp: '10 mins ago',
    priority: 'high'
  },
  {
    id: 'ff-2',
    sender: 'Alice M.',
    location: 'Enugu West',
    category: 'pest_outbreak',
    message: 'Rapid spread of Fall Armyworm detected in 15 verified clusters. Immediate intervention required.',
    timestamp: '2 hours ago',
    priority: 'high'
  },
  {
    id: 'ff-3',
    sender: 'Directorate B',
    location: 'Lagos Hub',
    category: 'market_access',
    message: 'Maize prices stabilized following the direct-to-coop linkage program launch.',
    timestamp: '5 hours ago',
    priority: 'low'
  }
];

// Enhanced: Added target and previous year data for comparison
export const MOCK_PERFORMANCE_DATA = {
  'All Crops': [
    { month: 'Jul', yield: 45, investment: 30, target: 50, prev: 40 },
    { month: 'Aug', yield: 52, investment: 35, target: 55, prev: 42 },
    { month: 'Sep', yield: 48, investment: 40, target: 60, prev: 45 },
    { month: 'Oct', yield: 61, investment: 42, target: 65, prev: 50 },
    { month: 'Nov', yield: 75, investment: 45, target: 70, prev: 55 },
    { month: 'Dec', yield: 89, investment: 50, target: 80, prev: 65 },
  ],
  'Maize': [
    { month: 'Jul', yield: 30, investment: 20, target: 40, prev: 25 },
    { month: 'Aug', yield: 35, investment: 25, target: 45, prev: 28 },
    { month: 'Sep', yield: 40, investment: 30, target: 50, prev: 32 },
    { month: 'Oct', yield: 55, investment: 35, target: 55, prev: 35 },
    { month: 'Nov', yield: 65, investment: 40, target: 60, prev: 40 },
    { month: 'Dec', yield: 75, investment: 45, target: 70, prev: 45 },
  ],
  'Rice': [
    { month: 'Jul', yield: 50, investment: 40, target: 60, prev: 45 },
    { month: 'Aug', yield: 60, investment: 45, target: 70, prev: 50 },
    { month: 'Sep', yield: 55, investment: 50, target: 75, prev: 55 },
    { month: 'Oct', yield: 70, investment: 55, target: 80, prev: 60 },
    { month: 'Nov', yield: 85, investment: 60, target: 90, prev: 70 },
    { month: 'Dec', yield: 95, investment: 70, target: 100, prev: 80 },
  ],
  'Cassava': [
    { month: 'Jul', yield: 40, investment: 35, target: 45, prev: 38 },
    { month: 'Aug', yield: 42, investment: 38, target: 50, prev: 40 },
    { month: 'Sep', yield: 45, investment: 40, target: 55, prev: 42 },
    { month: 'Oct', yield: 50, investment: 45, target: 60, prev: 45 },
    { month: 'Nov', yield: 55, investment: 48, target: 65, prev: 50 },
    { month: 'Dec', yield: 65, investment: 52, target: 75, prev: 55 },
  ],
};

export const MOCK_SUBSIDY_DETAILS = [
  { type: 'Urea Fertilizer', total: '₦12.4B', redeemed: '₦11.8B', growth: '+12%', color: '#10b981', efficiency: 95 },
  { type: 'Hybrid Seeds', total: '₦4.8B', redeemed: '₦4.2B', growth: '+5%', color: '#3b82f6', efficiency: 87 },
  { type: 'Tractor Hours', total: '₦2.1B', redeemed: '₦1.9B', growth: '+25%', color: '#f59e0b', efficiency: 90 },
  { type: 'Crop Insurance', total: '₦1.5B', redeemed: '₦1.5B', growth: '0%', color: '#8b5cf6', efficiency: 100 },
];

export const MOCK_MINISTRY_STATS = {
  totalFarmers: 1240500,
  verifiedLandHectares: 4200000,
  subsidyUtilizationRate: 94.2,
  leakagePrevented: "₦4.2B",
  extensionReach: "8.5M Interactions",
  topCrops: [
    { name: 'Maize', value: 45 },
    { name: 'Rice', value: 30 },
    { name: 'Cassava', value: 15 },
    { name: 'Sorghum', value: 10 },
  ],
  subsidyData: [
    { month: 'Jan', issued: 100, redeemed: 92 },
    { month: 'Feb', issued: 120, redeemed: 115 },
    { month: 'Mar', issued: 150, redeemed: 148 },
    { month: 'Apr', issued: 180, redeemed: 176 },
    { month: 'May', issued: 200, redeemed: 198 },
  ]
};

export const MOCK_EVENTS: FarmEvent[] = [
  { id: 'e-1', type: 'planting', date: '2023-11-05', description: 'Dry season maize planting.', status: 'completed', scoreImpact: 15 },
  { id: 'e-2', type: 'pest', date: '2023-11-20', description: 'Early sign of aphids detected.', status: 'alert', scoreImpact: -5 }
];

export const MOCK_VOUCHERS: InputVoucher[] = [
  { id: 'v-1', provider: 'Agro-Chem Global', amount: 25000, expiry: '2024-03-30', type: 'fertilizer', status: 'active' },
  { id: 'v-2', provider: 'SeedCo Nigeria', amount: 12000, expiry: '2024-04-15', type: 'seed', status: 'active' }
];

export const MOCK_LOANS: LoanOffer[] = [
  { id: 'l-1', lender: 'First Bank Agribusiness', amount: 500000, interestRate: 9, termMonths: 12, minScore: 650 },
  { id: 'l-2', lender: 'Sterling Bank', amount: 750000, interestRate: 8.5, termMonths: 18, minScore: 700 }
];

export const getEventIcon = (type: FarmEvent['type']) => {
  switch (type) {
    case 'pest': return <Bug className="text-red-500" />;
    case 'spray': return <Droplets className="text-blue-500" />;
    case 'irrigation': return <Droplets className="text-cyan-500" />;
    case 'harvest': return <Scissors className="text-amber-500" />;
    case 'planting': return <Sprout className="text-emerald-500" />;
    default: return <Tractor className="text-gray-500" />;
  }
};
