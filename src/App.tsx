/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * DIMARIA OPPORTUNITY - Main Application Root
 * Developed by DIMARIA COMPANY
 */

import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { SplashView } from './components/SplashView';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { HomeView } from './components/HomeView';
import { SearchView } from './components/SearchView';
import { EarnMoneyView } from './components/EarnMoneyView';
import { BusinessView } from './components/BusinessView';
import { AIAssistantView } from './components/AIAssistantView';
import { TrainingView } from './components/TrainingView';
import { FavoritesView } from './components/FavoritesView';
import { OpportunityDetailModal } from './components/OpportunityDetailModal';
import { UserProfileModal } from './components/UserProfileModal';
import { AdminDashboard } from './components/AdminDashboard';
import { AndroidPublicationModal } from './components/AndroidPublicationModal';
import { VIPSubscriptionModal } from './components/VIPSubscriptionModal';
import { NotificationCenterModal } from './components/NotificationCenterModal';
import { PrivacyPolicyModal } from './components/PrivacyPolicyModal';
import { AdMobSimulatorModal } from './components/AdMobSimulatorModal';
import { OpportunityItem } from './types';
import { ShieldCheck, Smartphone, Sparkles } from 'lucide-react';

function AppContent() {
  const { showSplash, setShowSplash, activeTab, setActiveTab } = useApp();

  // Selected opportunity for detail modal
  const [selectedOpportunity, setSelectedOpportunity] = useState<OpportunityItem | null>(null);

  // Modals state
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAndroidKitOpen, setIsAndroidKitOpen] = useState(false);
  const [isVIPOpen, setIsVIPOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  // AdMob simulator modal state
  const [admobSimType, setAdmobSimType] = useState<'interstitial' | 'rewarded' | null>(null);

  if (showSplash) {
    return <SplashView onFinish={() => setShowSplash(false)} />;
  }

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-[#F3F4F6] flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Navbar */}
      <Navbar
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenAndroidKit={() => setIsAndroidKitOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenVIP={() => setIsVIPOpen(true)}
      />

      {/* Main Tab Content */}
      <main className="flex-1 w-full">
        {activeTab === 'home' && (
          <HomeView onSelectOpportunity={(item) => setSelectedOpportunity(item)} />
        )}
        {activeTab === 'search' && (
          <SearchView onSelectOpportunity={(item) => setSelectedOpportunity(item)} />
        )}
        {activeTab === 'earn' && (
          <EarnMoneyView onSelectOpportunity={(item) => setSelectedOpportunity(item)} />
        )}
        {activeTab === 'business' && <BusinessView />}
        {activeTab === 'ai' && <AIAssistantView />}
        {activeTab === 'training' && <TrainingView />}
        {activeTab === 'favorites' && (
          <FavoritesView onSelectOpportunity={(item) => setSelectedOpportunity(item)} />
        )}
        {activeTab === 'admin' && (
          <div className="p-8 text-center">
            <button
              onClick={() => setIsAdminOpen(true)}
              className="px-6 py-3 rounded-2xl bg-[#D4AF37] text-black font-bold text-sm shadow"
            >
              Ouvrir le Tableau de Bord Administrateur
            </button>
          </div>
        )}
        {activeTab === 'android-kit' && (
          <div className="p-8 text-center">
            <button
              onClick={() => setIsAndroidKitOpen(true)}
              className="px-6 py-3 rounded-2xl bg-[#D4AF37] text-black font-bold text-sm shadow"
            >
              Ouvrir le Kit Android & Google Play
            </button>
          </div>
        )}
      </main>

      {/* Global Footer (Desktop & Web) */}
      {activeTab !== 'ai' && (
        <footer className="border-t border-gray-900 bg-[#07070A] py-8 px-4 text-xs text-gray-500 mb-16 sm:mb-0">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-[#181822] border border-[#D4AF37]/50 p-0.5 flex items-center justify-center">
                <img src="/logo-do.svg" alt="DO Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <span className="font-['Cinzel'] font-bold text-gray-300">DIMARIA OPPORTUNITY</span>
                <span className="mx-1">•</span>
                <span>DIMARIA COMPANY</span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-gray-400">
              <button
                onClick={() => setIsPrivacyOpen(true)}
                className="hover:text-[#D4AF37] transition cursor-pointer"
              >
                Politique de Confidentialité
              </button>
              <span>•</span>
              <button
                onClick={() => setIsAndroidKitOpen(true)}
                className="hover:text-[#D4AF37] transition cursor-pointer flex items-center gap-1"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Google Play APK</span>
              </button>
              <span>•</span>
              <button
                onClick={() => setIsAdminOpen(true)}
                className="hover:text-[#D4AF37] transition cursor-pointer flex items-center gap-1"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin</span>
              </button>
            </div>

            <div className="text-[11px] text-gray-400 text-center sm:text-right">
              « Toutes les opportunités du monde à portée de main. »
            </div>
          </div>
        </footer>
      )}

      {/* Android Bottom Navigation */}
      <BottomNav />

      {/* Detail Modal */}
      <OpportunityDetailModal
        item={selectedOpportunity}
        onClose={() => setSelectedOpportunity(null)}
      />

      {/* Profile Modal */}
      <UserProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        onOpenVIP={() => setIsVIPOpen(true)}
      />

      {/* Admin Modal */}
      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />

      {/* Android Publication Kit Modal */}
      <AndroidPublicationModal
        isOpen={isAndroidKitOpen}
        onClose={() => setIsAndroidKitOpen(false)}
        onOpenPrivacy={() => setIsPrivacyOpen(true)}
      />

      {/* VIP Premium Modal */}
      <VIPSubscriptionModal
        isOpen={isVIPOpen}
        onClose={() => setIsVIPOpen(false)}
        onWatchRewardedAd={() => setAdmobSimType('rewarded')}
      />

      {/* Notifications Modal */}
      <NotificationCenterModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />

      {/* Privacy Policy Modal */}
      <PrivacyPolicyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />

      {/* AdMob Interstitial / Rewarded Simulator */}
      {admobSimType && (
        <AdMobSimulatorModal
          type={admobSimType}
          isOpen={true}
          onClose={() => setAdmobSimType(null)}
          onRewardGranted={() => {
            // Reward user with VIP access
          }}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
