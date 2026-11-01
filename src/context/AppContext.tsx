/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * DIMARIA OPPORTUNITY - Global App Context
 * DIMARIA COMPANY
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  AppTab,
  Currency,
  Language,
  OpportunityItem,
  BusinessIdea,
  TrainingCourse,
  UserProfile,
  AppNotification,
  AdMobConfig,
} from '../types';
import {
  INITIAL_OPPORTUNITIES,
  INITIAL_BUSINESS_IDEAS,
  INITIAL_TRAININGS,
  INITIAL_NOTIFICATIONS,
} from '../data/initialData';

interface AppContextType {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  currency: Currency;
  setCurrency: (curr: Currency) => void;
  userProfile: UserProfile | null;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile | null>>;
  opportunities: OpportunityItem[];
  businessIdeas: BusinessIdea[];
  trainings: TrainingCourse[];
  notifications: AppNotification[];
  savedOpportunityIds: string[];
  savedTrainingIds: string[];
  recentlyViewedIds: string[];
  searchHistory: string[];
  admobConfig: AdMobConfig;
  showSplash: boolean;
  setShowSplash: (show: boolean) => void;
  
  // Actions
  toggleSaveOpportunity: (id: string) => void;
  toggleSaveTraining: (id: string) => void;
  recordView: (id: string) => void;
  addSearchQuery: (q: string) => void;
  clearSearchHistory: () => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  addOpportunity: (op: OpportunityItem) => void;
  updateOpportunity: (op: OpportunityItem) => void;
  deleteOpportunity: (id: string) => void;
  addTraining: (t: TrainingCourse) => void;
  broadcastNotification: (title: string, message: string, type: AppNotification['type']) => void;
  upgradeToPremium: () => void;
  updateAdMobConfig: (config: Partial<AdMobConfig>) => void;
  recordLinkClick: (url: string) => void;
}

const defaultUserProfile: UserProfile = {
  id: 'guest-1',
  name: 'Visiteur DIMARIA',
  email: 'visiteur@dimariacompany.com',
  country: "Côte d'Ivoire",
  city: 'Abidjan',
  preferredCurrency: 'XOF',
  preferredCategories: ['micro-tasks', 'freelance', 'business'],
  isPremium: false,
  notificationsEnabled: true,
  avatarSeed: 'dimaria-user',
};

const defaultAdMob: AdMobConfig = {
  enabled: true,
  isTestMode: true,
  bannerUnitId: 'ca-app-pub-3940256099942544/6300978111',
  interstitialUnitId: 'ca-app-pub-3940256099942544/1033173712',
  rewardedUnitId: 'ca-app-pub-3940256099942544/5224354917',
  interstitialFrequencyMinutes: 5,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Check ?autostart=1 in URL for ultra-mode testability
  const hasAutostart = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('autostart') === '1';

  const [showSplash, setShowSplash] = useState<boolean>(!hasAutostart);
  const [activeTab, setActiveTab] = useState<AppTab>('home');
  const [language, setLanguage] = useState<Language>('fr');
  const [currency, setCurrencyState] = useState<Currency>('XOF');

  const [userProfile, setUserProfile] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('dimaria_user');
      return saved ? JSON.parse(saved) : defaultUserProfile;
    } catch {
      return defaultUserProfile;
    }
  });

  const [opportunities, setOpportunities] = useState<OpportunityItem[]>(() => {
    try {
      const saved = localStorage.getItem('dimaria_opportunities');
      return saved ? JSON.parse(saved) : INITIAL_OPPORTUNITIES;
    } catch {
      return INITIAL_OPPORTUNITIES;
    }
  });

  const [businessIdeas] = useState<BusinessIdea[]>(INITIAL_BUSINESS_IDEAS);

  const [trainings, setTrainings] = useState<TrainingCourse[]>(() => {
    try {
      const saved = localStorage.getItem('dimaria_trainings');
      return saved ? JSON.parse(saved) : INITIAL_TRAININGS;
    } catch {
      return INITIAL_TRAININGS;
    }
  });

  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    try {
      const saved = localStorage.getItem('dimaria_notifications');
      return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
    } catch {
      return INITIAL_NOTIFICATIONS;
    }
  });

  const [savedOpportunityIds, setSavedOpportunityIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('dimaria_saved_opps');
      return saved ? JSON.parse(saved) : ['opp-outlier', 'opp-upwork'];
    } catch {
      return ['opp-outlier', 'opp-upwork'];
    }
  });

  const [savedTrainingIds, setSavedTrainingIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('dimaria_saved_trainings');
      return saved ? JSON.parse(saved) : ['trn-google-digital'];
    } catch {
      return ['trn-google-digital'];
    }
  });

  const [recentlyViewedIds, setRecentlyViewedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('dimaria_recent_views');
      return saved ? JSON.parse(saved) : ['opp-outlier', 'opp-fiverr'];
    } catch {
      return ['opp-outlier', 'opp-fiverr'];
    }
  });

  const [searchHistory, setSearchHistory] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('dimaria_search_history');
      return saved ? JSON.parse(saved) : ["Côte d'Ivoire", 'Micro-tâches', 'Bourse d\'études'];
    } catch {
      return ["Côte d'Ivoire", 'Micro-tâches', 'Bourse d\'études'];
    }
  });

  const [admobConfig, setAdmobConfig] = useState<AdMobConfig>(() => {
    try {
      const saved = localStorage.getItem('dimaria_admob');
      return saved ? JSON.parse(saved) : defaultAdMob;
    } catch {
      return defaultAdMob;
    }
  });

  // Sync state to local storage
  useEffect(() => {
    try {
      localStorage.setItem('dimaria_opportunities', JSON.stringify(opportunities));
    } catch (e) {
      console.warn('Storage error:', e);
    }
  }, [opportunities]);

  useEffect(() => {
    try {
      localStorage.setItem('dimaria_trainings', JSON.stringify(trainings));
    } catch (e) {
      console.warn('Storage error:', e);
    }
  }, [trainings]);

  useEffect(() => {
    try {
      localStorage.setItem('dimaria_notifications', JSON.stringify(notifications));
    } catch (e) {
      console.warn('Storage error:', e);
    }
  }, [notifications]);

  useEffect(() => {
    try {
      localStorage.setItem('dimaria_saved_opps', JSON.stringify(savedOpportunityIds));
    } catch (e) {
      console.warn('Storage error:', e);
    }
  }, [savedOpportunityIds]);

  useEffect(() => {
    try {
      localStorage.setItem('dimaria_saved_trainings', JSON.stringify(savedTrainingIds));
    } catch (e) {
      console.warn('Storage error:', e);
    }
  }, [savedTrainingIds]);

  useEffect(() => {
    try {
      localStorage.setItem('dimaria_recent_views', JSON.stringify(recentlyViewedIds));
    } catch (e) {
      console.warn('Storage error:', e);
    }
  }, [recentlyViewedIds]);

  useEffect(() => {
    try {
      localStorage.setItem('dimaria_search_history', JSON.stringify(searchHistory));
    } catch (e) {
      console.warn('Storage error:', e);
    }
  }, [searchHistory]);

  useEffect(() => {
    if (userProfile) {
      try {
        localStorage.setItem('dimaria_user', JSON.stringify(userProfile));
      } catch (e) {
        console.warn('Storage error:', e);
      }
    }
  }, [userProfile]);

  useEffect(() => {
    try {
      localStorage.setItem('dimaria_admob', JSON.stringify(admobConfig));
    } catch (e) {
      console.warn('Storage error:', e);
    }
  }, [admobConfig]);

  // Set currency wrapper
  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    if (userProfile) {
      setUserProfile((prev) => (prev ? { ...prev, preferredCurrency: c } : null));
    }
  };

  const toggleSaveOpportunity = (id: string) => {
    setSavedOpportunityIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleSaveTraining = (id: string) => {
    setSavedTrainingIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const recordView = (id: string) => {
    setRecentlyViewedIds((prev) => {
      const filtered = prev.filter((item) => item !== id);
      return [id, ...filtered].slice(0, 20);
    });
  };

  const addSearchQuery = (q: string) => {
    if (!q || !q.trim()) return;
    setSearchHistory((prev) => {
      const filtered = prev.filter((item) => item.toLowerCase() !== q.toLowerCase().trim());
      return [q.trim(), ...filtered].slice(0, 10);
    });
  };

  const clearSearchHistory = () => {
    setSearchHistory([]);
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const addOpportunity = (op: OpportunityItem) => {
    setOpportunities((prev) => [op, ...prev]);
    broadcastNotification(
      `Nouvelle offre : ${op.title}`,
      `Plateforme : ${op.platform} - Rémunération : ${op.rewardText}`,
      'offer'
    );
  };

  const updateOpportunity = (op: OpportunityItem) => {
    setOpportunities((prev) => prev.map((item) => (item.id === op.id ? op : item)));
  };

  const deleteOpportunity = (id: string) => {
    setOpportunities((prev) => prev.filter((item) => item.id !== id));
  };

  const addTraining = (t: TrainingCourse) => {
    setTrainings((prev) => [t, ...prev]);
    broadcastNotification(
      `Nouvelle formation certifiante : ${t.title}`,
      `Par ${t.provider} - Accès gratuit officiel.`,
      'training'
    );
  };

  const broadcastNotification = (
    title: string,
    message: string,
    type: AppNotification['type']
  ) => {
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      title,
      message,
      date: 'À l\'instant',
      type,
      read: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const upgradeToPremium = () => {
    setUserProfile((prev) =>
      prev
        ? {
            ...prev,
            isPremium: true,
            premiumExpiresAt: '2027-12-31',
          }
        : null
    );
    broadcastNotification(
      'Félicitations ! Vous êtes DIMARIA VIP Gold',
      'Profitez de DIMARIA AI illimité, de l\'expérience sans publicité et des alertes prioritaires.',
      'alert'
    );
  };

  const updateAdMobConfig = (patch: Partial<AdMobConfig>) => {
    setAdmobConfig((prev) => ({ ...prev, ...patch }));
  };

  const recordLinkClick = async (url: string) => {
    try {
      fetch('/api/stats/click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      }).catch(() => {});
    } catch {
      // offline silent pass
    }
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        language,
        setLanguage,
        currency,
        setCurrency,
        userProfile,
        setUserProfile,
        opportunities,
        businessIdeas,
        trainings,
        notifications,
        savedOpportunityIds,
        savedTrainingIds,
        recentlyViewedIds,
        searchHistory,
        admobConfig,
        showSplash,
        setShowSplash,
        toggleSaveOpportunity,
        toggleSaveTraining,
        recordView,
        addSearchQuery,
        clearSearchHistory,
        markNotificationRead,
        markAllNotificationsRead,
        addOpportunity,
        updateOpportunity,
        deleteOpportunity,
        addTraining,
        broadcastNotification,
        upgradeToPremium,
        updateAdMobConfig,
        recordLinkClick,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
