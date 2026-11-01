/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * DIMARIA OPPORTUNITY - Assistant Intelligent DIMARIA AI
 * Powered by Gemini 3.8 Flash via Secure Server-Side Proxy
 * DIMARIA COMPANY
 */

import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Bot,
  Send,
  Sparkles,
  FileText,
  Mail,
  GraduationCap,
  Briefcase,
  Copy,
  Check,
  RefreshCw,
  HelpCircle,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export const AIAssistantView: React.FC = () => {
  const { userProfile, currency } = useApp();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'assistant',
      text: `Bonjour ! Je suis **DIMARIA AI**, votre conseiller stratégique officiel de **DIMARIA OPPORTUNITY** (développé par DIMARIA COMPANY).\n\nMon rôle est de vous guider concrètement pour développer vos revenus :
- 🎯 **Rechercher des opportunités** adaptées à vos compétences et à votre pays (${userProfile?.country || "Côte d'Ivoire"})
- 📄 **Rédiger un CV percutant** ou une **lettre de motivation personnalisée**
- 🚀 **Bâtir un plan d'action business** en 5 étapes sans fausse promesse
- 🎓 **Trouver des bourses d'études** internationales ou des formations certifiantes gratuites

Comment puis-je vous aider aujourd'hui ?`,
      timestamp: 'À l\'instant',
    },
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const promptStarters = [
    {
      label: 'Rédiger une lettre de motivation',
      icon: <Mail className="w-3.5 h-3.5 text-amber-400" />,
      prompt: "Rédige-moi une lettre de motivation percutante pour postuler à des missions freelance de rédaction web et support client sur Upwork et ComeUp.",
    },
    {
      label: 'Gagner 50 000 FCFA avec un smartphone',
      icon: <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />,
      prompt: `Donne-moi un plan d'action réaliste pour débuter et générer 50 000 FCFA par mois en télétravail avec un smartphone en ${userProfile?.country || "Côte d'Ivoire"}.`,
    },
    {
      label: 'Modèle de CV sans expérience',
      icon: <FileText className="w-3.5 h-3.5 text-blue-400" />,
      prompt: "Aide-moi à créer un CV moderne orienté compétences pour un jeune diplômé sans expérience professionnelle préalable.",
    },
    {
      label: 'Bourses d\'études pour Africains',
      icon: <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />,
      prompt: "Quelles sont les bourses d'études internationales entièrement financées (Mastercard Foundation, Eiffel, Chevening) accessibles aux étudiants francophones ?",
    },
  ];

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (textToSend?: string) => {
    const messageText = textToSend || input;
    if (!messageText.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: messageText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: userMsg.text,
          history: messages.map((m) => ({ sender: m.sender, text: m.text })),
          userProfile: {
            country: userProfile?.country,
            city: userProfile?.city,
            preferredCurrency: currency,
          },
        }),
      });

      const data = await response.json();
      const replyText =
        data.reply ||
        "Je suis à votre disposition pour analyser et dénicher les opportunités les plus fiables pour votre profil.";

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        text: "Une micro-latence de connexion est survenue. Veuillez vérifier votre connexion internet et réessayer.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="pb-20 pt-2 px-3 sm:px-4 max-w-4xl mx-auto flex flex-col h-[calc(100dvh-8rem)] sm:h-[calc(100vh-8.5rem)] animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-800 pb-3 mb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#D4AF37] to-amber-200 text-black flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.4)]">
            <Bot className="w-6 h-6 fill-current" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-base font-bold text-white font-['Cinzel',serif] tracking-wider">
                DIMARIA AI
              </h1>
              <span className="px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/20">
                En ligne
              </span>
            </div>
            <p className="text-[11px] text-gray-400">
              Conseiller officiel bilingue (FR / EN) • Propulsé par Gemini
            </p>
          </div>
        </div>

        <button
          onClick={() =>
            setMessages([
              {
                id: `reset-${Date.now()}`,
                sender: 'assistant',
                text: "Nouvelle session démarrée. De quoi avez-vous besoin pour vos opportunités aujourd'hui ?",
                timestamp: 'À l\'instant',
              },
            ])
          }
          aria-label="Nouvelle conversation"
          className="p-2 rounded-xl bg-[#14141E] hover:bg-[#1C1C28] text-gray-400 hover:text-white border border-gray-800 transition"
          title="Effacer l'historique"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${
              msg.sender === 'user' ? 'items-end' : 'items-start'
            }`}
          >
            <div className="flex items-center gap-1.5 mb-1 px-1">
              <span className="text-[10px] font-bold text-gray-400">
                {msg.sender === 'user' ? (userProfile?.name || 'Vous') : 'DIMARIA AI'}
              </span>
              <span className="text-[9px] text-gray-400">{msg.timestamp}</span>
            </div>

            <div
              className={`max-w-[90%] sm:max-w-[80%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-md relative group ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-black font-medium'
                  : 'bg-[#12121A] border border-gray-800 text-gray-200'
              }`}
            >
              <div className="whitespace-pre-wrap">{msg.text}</div>

              {msg.sender === 'assistant' && (
                <div className="mt-2 pt-2 border-t border-gray-800/60 flex items-center justify-end">
                  <button
                    onClick={() => copyToClipboard(msg.id, msg.text)}
                    aria-label="Copier la réponse"
                    className="flex items-center gap-1 text-[10px] text-gray-400 hover:text-white transition cursor-pointer"
                  >
                    {copiedId === msg.id ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">Copié</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copier</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 p-3 rounded-2xl bg-[#12121A] border border-[#D4AF37]/30 w-fit text-xs text-[#E5C07B] animate-pulse">
            <Sparkles className="w-4 h-4 animate-spin text-[#D4AF37]" />
            <span>DIMARIA AI analyse les opportunités pour vous...</span>
          </div>
        )}

        <div ref={chatBottomRef} />
      </div>

      {/* Suggested Prompt Starters */}
      {messages.length <= 2 && (
        <div className="py-2 flex items-center gap-2 overflow-x-auto scrollbar-none">
          {promptStarters.map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(item.prompt)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#151522] hover:bg-[#1E1E30] border border-gray-800 text-xs text-gray-300 hover:text-white whitespace-nowrap transition cursor-pointer shrink-0"
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Input Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="mt-2 flex items-center gap-2 bg-[#12121A] border border-gray-700 focus-within:border-[#D4AF37] rounded-2xl p-1.5 transition shadow-lg"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Posez votre question à DIMARIA AI (CV, business, bourses, gains)..."
          aria-label="Message pour DIMARIA AI"
          disabled={isLoading}
          className="flex-1 bg-transparent px-3 py-2 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none"
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          aria-label="Envoyer le message"
          className={`p-2.5 rounded-xl transition cursor-pointer ${
            input.trim() && !isLoading
              ? 'bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-black shadow-md hover:brightness-110'
              : 'bg-gray-800 text-gray-500 cursor-not-allowed'
          }`}
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
