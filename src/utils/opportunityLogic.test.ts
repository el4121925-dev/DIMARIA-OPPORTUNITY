/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  convertCurrency,
  formatReward,
  isCountryEligible,
  filterOpportunities,
  OpportunityItem,
} from './opportunityLogic';

const mockOpportunities: OpportunityItem[] = [
  {
    id: 'op-1',
    title: 'Micro-tâches et entraînement IA',
    description: 'Annotation de données et validation de réponses IA.',
    platform: 'Outlier AI',
    category: 'micro-tasks',
    countries: ['Worldwide', "Côte d'Ivoire", 'Sénégal', 'France'],
    accessConditions: 'Test de français/anglais réussi',
    paymentMethods: ['PayPal', 'Airtm', 'Virement'],
    indicativeRewardEur: 25,
    rewardText: '25€ / heure indicative',
    officialUrl: 'https://outlier.ai',
    isRemote: true,
    isFree: true,
    experienceLevel: 'beginner',
    createdAt: '2026-01-01',
  },
  {
    id: 'op-2',
    title: 'Développement Web Freelance',
    description: 'Missions de développement frontend React / Tailwind.',
    platform: 'Upwork',
    category: 'freelance',
    countries: ['Worldwide'],
    accessConditions: 'Profil vérifié et portfolio',
    paymentMethods: ['Payoneer', 'Virement bancaire direct', 'Wave via intermédiaire'],
    indicativeRewardEur: 450,
    rewardText: '450€ par projet',
    officialUrl: 'https://upwork.com',
    isRemote: true,
    isFree: true,
    experienceLevel: 'intermediate',
    createdAt: '2026-01-10',
  },
  {
    id: 'op-3',
    title: 'Bourse Excellence Mastercard Foundation',
    description: 'Financement complet des études universitaires supérieures.',
    platform: 'Mastercard Foundation',
    category: 'scholarships',
    countries: ["Côte d'Ivoire", 'Sénégal', 'Cameroun', 'Bénin', 'Togo'],
    accessConditions: 'Diplôme avec mention et projet d impact social',
    paymentMethods: ['Allocation mensuelle'],
    indicativeRewardEur: 1200,
    rewardText: 'Prise en charge intégrale',
    officialUrl: 'https://mastercardfdn.org',
    isRemote: false,
    isFree: true,
    experienceLevel: 'all',
    createdAt: '2026-02-01',
  },
];

test('convertCurrency correctly converts EUR to XOF at 655.957', () => {
  const xof = convertCurrency(100, 'XOF');
  assert.equal(xof, 65596); // rounded integer
});

test('convertCurrency correctly converts EUR to USD at 1.08', () => {
  const usd = convertCurrency(100, 'USD');
  assert.equal(usd, 108);
});

test('formatReward formats properly in XOF and USD', () => {
  const xofFormatted = formatReward(10, 'XOF');
  assert.ok(xofFormatted.includes('FCFA'));

  const usdFormatted = formatReward(50, 'USD');
  assert.ok(usdFormatted.includes('$54'));
});

test('isCountryEligible recognizes Côte d Ivoire and Worldwide correctly', () => {
  assert.equal(isCountryEligible(['Worldwide'], "Côte d'Ivoire"), true);
  assert.equal(isCountryEligible(["Côte d'Ivoire", 'France'], 'CI'), true);
  assert.equal(isCountryEligible(['France', 'Belgique'], 'Canada'), false);
  assert.equal(isCountryEligible(['Sénégal'], 'Senegal'), true);
});

test('filterOpportunities filters by query and remote status', () => {
  const queryResult = filterOpportunities(mockOpportunities, { query: 'Upwork' });
  assert.equal(queryResult.length, 1);
  assert.equal(queryResult[0].platform, 'Upwork');

  const remoteOnly = filterOpportunities(mockOpportunities, { isRemote: true });
  assert.equal(remoteOnly.length, 2);

  const beginnerOnly = filterOpportunities(mockOpportunities, { experienceLevel: 'beginner' });
  // 'beginner' items + 'all' levels are accessible to beginners (op-1 and op-3)
  assert.equal(beginnerOnly.length, 2);
  assert.ok(beginnerOnly.some((item) => item.id === 'op-1'));
  assert.ok(beginnerOnly.some((item) => item.id === 'op-3'));
});
