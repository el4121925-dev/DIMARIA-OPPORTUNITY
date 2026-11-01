/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * DIMARIA OPPORTUNITY - Notification Center Modal
 * DIMARIA COMPANY
 */

import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Bell,
  CheckCircle,
  X,
  ExternalLink,
  Sparkles,
  GraduationCap,
  Briefcase,
  AlertCircle,
  CheckCheck,
} from 'lucide-react';

interface NotificationCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationCenterModal: React.FC<NotificationCenterModalProps> = ({
  isOpen,
  onClose,
}) => {
  const {
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    setActiveTab,
    userProfile,
    setUserProfile,
  } = useApp();

  if (!isOpen) return null;

  const toggleNotificationsSetting = () => {
    if (userProfile) {
      setUserProfile({
        ...userProfile,
        notificationsEnabled: !userProfile.notificationsEnabled,
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg rounded-2xl bg-[#0F0F16] border border-[#D4AF37]/50 shadow-2xl overflow-hidden max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-gray-800 flex items-center justify-between bg-[#14141E]">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-[#D4AF37]" />
            <h2 className="text-base font-bold text-white font-['Cinzel',serif] tracking-wider">
              CENTRE DE NOTIFICATIONS
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={markAllNotificationsRead}
              className="text-xs text-[#E5C07B] hover:underline flex items-center gap-1 cursor-pointer"
              title="Tout marquer comme lu"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Tout marquer lu</span>
            </button>

            <button
              onClick={onClose}
              aria-label="Fermer les notifications"
              className="p-1.5 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Setting Toggle: Enable / Disable push notifications */}
        <div className="p-3 bg-[#12121A] border-b border-gray-800/80 flex items-center justify-between text-xs">
          <span className="text-gray-300">Recevoir les alertes de nouvelles offres</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={userProfile?.notificationsEnabled ?? true}
              onChange={toggleNotificationsSetting}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#D4AF37]"></div>
          </label>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {notifications.length > 0 ? (
            notifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => {
                  markNotificationRead(notif.id);
                  if (notif.targetTab) {
                    setActiveTab(notif.targetTab);
                    onClose();
                  }
                }}
                className={`p-3.5 rounded-xl border transition cursor-pointer flex items-start gap-3 ${
                  notif.read
                    ? 'bg-[#12121A] border-gray-800/80 opacity-75'
                    : 'bg-[#181824] border-[#D4AF37]/40 shadow-sm'
                }`}
              >
                <div className="p-2 rounded-lg bg-[#1F1F2C] shrink-0 mt-0.5">
                  {notif.type === 'offer' && <Briefcase className="w-4 h-4 text-amber-400" />}
                  {notif.type === 'training' && <GraduationCap className="w-4 h-4 text-emerald-400" />}
                  {notif.type === 'alert' && <Sparkles className="w-4 h-4 text-[#D4AF37]" />}
                  {notif.type === 'system' && <AlertCircle className="w-4 h-4 text-blue-400" />}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <h4 className="text-xs font-bold text-white truncate">{notif.title}</h4>
                    <span className="text-[10px] text-gray-400 shrink-0">{notif.date}</span>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">{notif.message}</p>
                </div>

                {!notif.read && (
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37] shrink-0 mt-1" />
                )}
              </div>
            ))
          ) : (
            <div className="py-12 text-center text-xs text-gray-400">
              Aucune notification pour le moment.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
