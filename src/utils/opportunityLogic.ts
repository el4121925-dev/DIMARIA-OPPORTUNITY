/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * DIMARIA OPPORTUNITY - Core Business & Currency Logic
 * DIMARIA COMPANY
 */

export type Currency = 'XOF' | 'EUR' | 'USD';

export interface OpportunityItem {
  id: string;
  title: string;
  description: string;
  platform: string;
  category:
    | 'micro-tasks'
    | 'surveys'
    | 'testing'
    | 'freelance'
    | 'content-creation'
    | 'affiliation'
    | 'online-work'
    | 'beginner-missions'
    | 'jobs'
    | 'business'
    | 'scholarships'
    | 'contests'
    | 'training';
  countries: string[]; // List of country codes or names, or ['WORLDWIDE']
  accessConditions: string;
  paymentMethods: string[]; // e.g. ['Wave', 'Orange Money', 'MTN MoMo', 'PayPal', 'Crypto', 'Bank Transfer']
  indicativeRewardEur: number; // base reward reference in EUR (or 0 if free/variable)
  rewardText: string;
  officialUrl: string;
  isRemote: boolean;
  isFree: boolean;
  isPopular?: boolean;
  isRecommended?: boolean;
  isSponsored?: boolean;
  experienceLevel: 'beginner' | 'intermediate' | 'advanced' | 'all';
  createdAt: string;
}

export interface FilterCriteria {
  query?: string;
  category?: string;
  country?: string;
  isRemote?: boolean;
  isFree?: boolean;
  experienceLevel?: string;
  minRewardEur?: number;
}

// Exchange rates benchmarked to EUR: 1 EUR = 655.957 FCFA (fixed parity), 1 EUR = 1.08 USD
export const EXCHANGE_RATES: Record<Currency, number> = {
  EUR: 1,
  XOF: 655.957,
  USD: 1.08,
};

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  EUR: '€',
  XOF: 'FCFA',
  USD: '$',
};

/**
 * Converts an amount from base EUR to target currency with appropriate formatting
 */
export function convertCurrency(amountInEur: number, target: Currency): number {
  if (amountInEur <= 0 || isNaN(amountInEur)) return 0;
  const rate = EXCHANGE_RATES[target] || 1;
  const converted = amountInEur * rate;
  return target === 'XOF' ? Math.round(converted) : Math.round(converted * 100) / 100;
}

/**
 * Formats monetary reward string depending on user's active currency
 */
export function formatReward(amountInEur: number, target: Currency, suffix = ''): string {
  if (amountInEur <= 0) return 'Gratuit / Variable';
  const val = convertCurrency(amountInEur, target);
  const symbol = CURRENCY_SYMBOLS[target];

  if (target === 'XOF') {
    return `${val.toLocaleString('fr-FR')} ${symbol}${suffix ? ' ' + suffix : ''}`;
  }
  if (target === 'USD') {
    return `${symbol}${val.toLocaleString('en-US')}${suffix ? ' ' + suffix : ''}`;
  }
  return `${val.toLocaleString('fr-FR')} ${symbol}${suffix ? ' ' + suffix : ''}`;
}

/**
 * Checks if an opportunity is available for a given country (e.g. Côte d'Ivoire, CI, Worldwide)
 */
export function isCountryEligible(opportunityCountries: string[], userCountry: string): boolean {
  if (!userCountry || userCountry.toLowerCase() === 'all' || userCountry.toLowerCase() === 'tous') {
    return true;
  }
  if (!opportunityCountries || opportunityCountries.length === 0) {
    return true;
  }

  const normalizedUser = userCountry.trim().toLowerCase();
  const includesWorldwide = opportunityCountries.some((c) => {
    const norm = c.trim().toLowerCase();
    return norm === 'worldwide' || norm === 'mondial' || norm === 'tous pays' || norm === 'monde';
  });

  if (includesWorldwide) return true;

  return opportunityCountries.some((c) => {
    const norm = c.trim().toLowerCase();
    if (norm === normalizedUser) return true;

    // Mapping common aliases for West/Central Africa and key hubs
    if ((normalizedUser === 'ci' || normalizedUser === "côte d'ivoire" || normalizedUser === 'cote d ivoire') &&
        (norm === 'ci' || norm === "côte d'ivoire" || norm === 'cote d ivoire' || norm === 'afrique de l\'ouest' || norm === 'waemu' || norm === 'uemoa')) {
      return true;
    }
    if ((normalizedUser === 'sn' || normalizedUser === 'sénégal' || normalizedUser === 'senegal') &&
        (norm === 'sn' || norm === 'sénégal' || norm === 'senegal' || norm === 'afrique de l\'ouest')) {
      return true;
    }
    if ((normalizedUser === 'cm' || normalizedUser === 'cameroun' || normalizedUser === 'cameroon') &&
        (norm === 'cm' || norm === 'cameroun' || norm === 'cameroon' || norm === 'afrique centrale' || norm === 'cemac')) {
      return true;
    }
    if ((normalizedUser === 'bj' || normalizedUser === 'bénin' || normalizedUser === 'benin') &&
        (norm === 'bj' || norm === 'bénin' || norm === 'benin' || norm === 'afrique de l\'ouest')) {
      return true;
    }
    if ((normalizedUser === 'tg' || normalizedUser === 'togo') &&
        (norm === 'tg' || norm === 'togo' || norm === 'afrique de l\'ouest')) {
      return true;
    }
    if ((normalizedUser === 'bf' || normalizedUser === 'burkina faso') &&
        (norm === 'bf' || norm === 'burkina faso' || norm === 'afrique de l\'ouest')) {
      return true;
    }
    if ((normalizedUser === 'ml' || normalizedUser === 'mali') &&
        (norm === 'ml' || norm === 'mali' || norm === 'afrique de l\'ouest')) {
      return true;
    }
    if ((normalizedUser === 'fr' || normalizedUser === 'france') && (norm === 'fr' || norm === 'france' || norm === 'europe')) {
      return true;
    }
    if ((normalizedUser === 'ca' || normalizedUser === 'canada') && (norm === 'ca' || norm === 'canada' || norm === 'amérique du nord')) {
      return true;
    }
    if ((normalizedUser === 'us' || normalizedUser === 'états-unis' || normalizedUser === 'usa') && (norm === 'us' || norm === 'usa' || norm === 'united states')) {
      return true;
    }
    return false;
  });
}

/**
 * Filter opportunities according to criteria
 */
export function filterOpportunities(
  list: OpportunityItem[],
  criteria: FilterCriteria
): OpportunityItem[] {
  return list.filter((item) => {
    // Text search in title, description, platform, payment methods
    if (criteria.query && criteria.query.trim().length > 0) {
      const q = criteria.query.toLowerCase().trim();
      const textMatch =
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.platform.toLowerCase().includes(q) ||
        item.accessConditions.toLowerCase().includes(q) ||
        item.paymentMethods.some((pm) => pm.toLowerCase().includes(q));
      if (!textMatch) return false;
    }

    // Category filter
    if (criteria.category && criteria.category !== 'all' && criteria.category !== 'tous') {
      if (item.category !== criteria.category) return false;
    }

    // Country filter
    if (criteria.country && criteria.country !== 'all' && criteria.country !== 'tous') {
      if (!isCountryEligible(item.countries, criteria.country)) return false;
    }

    // Remote filter
    if (criteria.isRemote !== undefined && criteria.isRemote !== false) {
      if (!item.isRemote) return false;
    }

    // Free filter
    if (criteria.isFree !== undefined && criteria.isFree !== false) {
      if (!item.isFree) return false;
    }

    // Experience Level
    if (
      criteria.experienceLevel &&
      criteria.experienceLevel !== 'all' &&
      item.experienceLevel !== 'all' &&
      item.experienceLevel !== criteria.experienceLevel
    ) {
      return false;
    }

    // Min reward
    if (criteria.minRewardEur && criteria.minRewardEur > 0) {
      if (item.indicativeRewardEur < criteria.minRewardEur) return false;
    }

    return true;
  });
}

/**
 * Standard compliance check: DIMARIA Opportunity guarantees no false promises
 */
export const COMPLIANCE_STATEMENT =
  "DIMARIA OPPORTUNITY ne promet jamais de gains miraculeux ni garantis. Tous les montants indiqués sont indicatifs et dépendent de vos compétences, de votre temps et des conditions des plateformes officielles partenaires.";
