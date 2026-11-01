/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * DIMARIA OPPORTUNITY - Type Definitions
 * DIMARIA COMPANY
 */

import { Currency, OpportunityItem } from '../utils/opportunityLogic';

export type { Currency, OpportunityItem };

export type AppTab =
  | 'home'
  | 'search'
  | 'earn'
  | 'business'
  | 'ai'
  | 'training'
  | 'favorites'
  | 'admin'
  | 'android-kit';

export type Language = 'fr' | 'en';

export interface BusinessIdea {
  id: string;
  title: string;
  subtitle: string;
  category: 'zero-investment' | 'with-phone' | 'with-ai' | 'ecommerce' | 'digital-marketing' | 'local-biz';
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedCostEur: number;
  costText: string;
  estimatedReturn: string;
  timeToProfit: string;
  description: string;
  steps: string[];
  recommendedTools: string[];
  keySuccessFactor: string;
  isPopular?: boolean;
}

export interface TrainingCourse {
  id: string;
  title: string;
  provider: string;
  domain: 'it-dev' | 'ai' | 'marketing' | 'entrepreneurship' | 'business' | 'digital-skills' | 'languages';
  duration: string;
  language: string;
  hasCertificate: boolean;
  isFree: boolean;
  officialUrl: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'all';
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  country: string;
  city?: string;
  preferredCurrency: Currency;
  preferredCategories: string[];
  isPremium: boolean;
  premiumExpiresAt?: string;
  notificationsEnabled: boolean;
  avatarSeed: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  date: string;
  type: 'offer' | 'mission' | 'training' | 'alert' | 'system';
  targetUrl?: string;
  targetTab?: AppTab;
  read: boolean;
}

export interface AdMobConfig {
  enabled: boolean;
  isTestMode: boolean;
  bannerUnitId: string;
  interstitialUnitId: string;
  rewardedUnitId: string;
  interstitialFrequencyMinutes: number;
}
