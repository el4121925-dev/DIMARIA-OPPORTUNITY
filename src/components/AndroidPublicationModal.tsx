/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * DIMARIA OPPORTUNITY - Android APK / AAB & Google Play Publication Kit
 * DIMARIA COMPANY
 */

import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import {
  Smartphone,
  Download,
  Copy,
  Check,
  FileCode,
  ShieldCheck,
  Play,
  Sparkles,
  ExternalLink,
  X,
  Layers,
} from 'lucide-react';

interface AndroidPublicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenPrivacy: () => void;
}

export const AndroidPublicationModal: React.FC<AndroidPublicationModalProps> = ({
  isOpen,
  onClose,
  onOpenPrivacy,
}) => {
  const { isInstallable, install, isInstalled } = usePWAInstall();
  const [activeTab, setActiveTab] = useState<'install' | 'manifest' | 'gradle' | 'playstore' | 'cli'>('install');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyText = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const androidManifestXml = `<?xml version="1.0" encoding="utf-8"?>
<!-- DIMARIA OPPORTUNITY Android Manifest - DIMARIA COMPANY -->
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.dimariacompany.opportunity">

    <!-- Permissions requises pour les requêtes réseau et notifications -->
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.POST_NOTIFICATIONS" />

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.DimariaOpportunity"
        android:usesCleartextTraffic="false">

        <!-- Google AdMob App ID (Remplacer par votre ID AdMob officiel) -->
        <meta-data
            android:name="com.google.android.gms.ads.APPLICATION_ID"
            android:value="ca-app-pub-3940256099942544~3347511713"/>

        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:screenOrientation="portrait"
            android:theme="@style/Theme.DimariaOpportunity.NoActionBar">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>

            <!-- Support des Deep Links pour ouvrir l'application -->
            <intent-filter android:autoVerify="true">
                <action android:name="android.intent.action.VIEW" />
                <category android:name="android.intent.category.DEFAULT" />
                <category android:name="android.intent.category.BROWSABLE" />
                <data
                    android:scheme="https"
                    android:host="dimariacompany.com"
                    android:pathPrefix="/opportunity" />
            </intent-filter>
        </activity>
    </application>
</manifest>`;

  const buildGradleKts = `// DIMARIA OPPORTUNITY - build.gradle.kts (Module :app)
plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
}

android {
    namespace = "com.dimariacompany.opportunity"
    compileSdk = 34

    defaultConfig {
        applicationId = "com.dimariacompany.opportunity"
        minSdk = 24
        targetSdk = 34
        versionCode = 1
        versionName = "1.0.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
        vectorDrawables {
            useSupportLibrary = true
        }
    }

    buildTypes {
        release {
            isMinifyEnabled = true
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
            signingConfig = signingConfigs.getByName("release")
        }
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
}

dependencies {
    implementation(libs.androidx.core.ktx)
    implementation(libs.androidx.appcompat)
    implementation(libs.play.services.ads)
    implementation("androidx.browser:browser:1.8.0")
}`;

  const playStoreDescriptionFr = `DIMARIA OPPORTUNITY - Toutes les opportunités du monde à portée de main.
Développé par DIMARIA COMPANY.

Titre Google Play (max 30 caractères) :
DIMARIA OPPORTUNITY

Description courte (max 80 caractères) :
Emplois, télétravail, micro-tâches, business, bourses et assistant IA certifiés.

Description complète :
DIMARIA OPPORTUNITY est la plateforme de référence internationale pour trouver des opportunités professionnelles réelles, vérifiées et adaptées à votre profil et pays de résidence.

Principales fonctionnalités :
• RECHERCHE MONDIALE : Emplois 100% télétravail, missions freelance (Upwork, ComeUp), tests d'applications et bourses universitaires d'excellence (Mastercard Foundation, Eiffel, Chevening).
• ESPACE GAGNER DE L'ARGENT : Micro-tâches rémunérées, entraînement d'IA (Outlier, Clickworker), sondages fiables avec retrait compatible en Afrique (Wave, Orange Money, MTN MoMo, PayPal, Payoneer).
• ESPACE BUSINESS : Plans concrets en 5 étapes pour lancer un business sans investissement, avec smartphone ou assisté par IA.
• ASSISTANT DIMARIA AI : Génération de CV sans expérience, lettres de motivation sur-mesure et plans d'action personnalisés.
• FORMATIONS GRATUITES : Cours certifiants officiels dispensés par Google, Harvard CS50, HubSpot et Y Combinator.

ZÉRO FAUSSE PROMESSE : DIMARIA OPPORTUNITY vérifie rigoureusement chaque source et ne garantit aucun gain sans travail.`;

  const downloadFile = (filename: string, content: string, mime = 'text/plain') => {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-3xl rounded-3xl bg-[#0F0F16] border border-[#D4AF37]/60 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-gray-800 flex items-center justify-between bg-[#14141E]">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-black flex items-center justify-center font-bold shadow-md">
              <Smartphone className="w-6 h-6 text-black" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white font-['Cinzel',serif] tracking-wider">
                  KIT ANDROID APK / AAB & GOOGLE PLAY
                </h2>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                  Ready
                </span>
              </div>
              <p className="text-[11px] text-gray-400">
                Package : com.dimariacompany.opportunity • DIMARIA COMPANY
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Fermer le kit Android"
            className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 px-5 py-3 border-b border-gray-800 bg-[#12121A] overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('install')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              activeTab === 'install' ? 'bg-[#D4AF37] text-black shadow' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Installation Directe</span>
          </button>

          <button
            onClick={() => setActiveTab('playstore')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              activeTab === 'playstore' ? 'bg-[#D4AF37] text-black shadow' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Play className="w-3.5 h-3.5" />
            <span>Fiche Play Store</span>
          </button>

          <button
            onClick={() => setActiveTab('manifest')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              activeTab === 'manifest' ? 'bg-[#D4AF37] text-black shadow' : 'text-gray-400 hover:text-white'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>AndroidManifest.xml</span>
          </button>

          <button
            onClick={() => setActiveTab('gradle')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              activeTab === 'gradle' ? 'bg-[#D4AF37] text-black shadow' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>build.gradle.kts</span>
          </button>

          <button
            onClick={() => setActiveTab('cli')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              activeTab === 'cli' ? 'bg-[#D4AF37] text-black shadow' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Générer APK / AAB</span>
          </button>
        </div>

        {/* Tab Contents */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* TAB 1: INSTALL DIRECT */}
          {activeTab === 'install' && (
            <div className="space-y-4 animate-fade-in">
              <div className="p-5 rounded-2xl bg-[#14141E] border border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-b from-[#181824] to-[#0A0A0E] border-2 border-[#D4AF37] p-2 flex items-center justify-center shrink-0">
                    <img src="/logo-do.svg" alt="DO Logo" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">DIMARIA OPPORTUNITY</h3>
                    <p className="text-xs text-gray-400">
                      Application native Android certifiée PWA & TWA (v1.0.0)
                    </p>
                    <div className="flex items-center gap-2 mt-1 text-[11px] text-emerald-400 font-semibold">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Compatible Android 8.0 à Android 15+</span>
                    </div>
                  </div>
                </div>

                {isInstalled ? (
                  <div className="px-4 py-2 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-1.5">
                    <Check className="w-4 h-4" />
                    <span>Application Déjà Installée</span>
                  </div>
                ) : isInstallable ? (
                  <button
                    onClick={install}
                    className="px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-black font-extrabold text-xs shadow-lg hover:brightness-110 transition flex items-center gap-2 animate-bounce cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Installer l'APK Immédiatement</span>
                  </button>
                ) : (
                  <div className="text-right">
                    <span className="text-xs text-[#E5C07B] block font-semibold">
                      Prêt pour Google Chrome & Navigateur Android
                    </span>
                    <span className="text-[11px] text-gray-400 block">
                      Appuyez sur "Ajouter à l'écran d'accueil" dans le menu de votre navigateur.
                    </span>
                  </div>
                )}
              </div>

              {/* Graphic Assets Generator */}
              <div className="p-5 rounded-2xl bg-[#14141E] border border-gray-800 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#E5C07B] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                  Ressources Graphiques Google Play Requises
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-[#0F0F16] border border-gray-800 flex items-center justify-between">
                    <div>
                      <strong className="text-white block">Icône d'application 512x512 PNG</strong>
                      <span className="text-[11px] text-gray-400">Fond noir profond avec blason DO or</span>
                    </div>
                    <button
                      onClick={() => downloadFile('dimaria-icon-512.svg', `<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><rect width="512" height="512" rx="112" fill="#0A0A0C"/><circle cx="256" cy="256" r="150" fill="none" stroke="#D4AF37" stroke-width="4"/><text x="256" y="275" font-family="Cinzel" font-size="80" font-weight="900" fill="#D4AF37" text-anchor="middle">DO</text><text x="256" y="380" font-family="sans-serif" font-size="22" font-weight="700" fill="#FFF" text-anchor="middle">DIMARIA</text></svg>`, 'image/svg+xml')}
                      className="p-2 rounded-lg bg-gray-800 hover:bg-[#D4AF37] hover:text-black transition"
                      title="Télécharger l'icône"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="p-3 rounded-xl bg-[#0F0F16] border border-gray-800 flex items-center justify-between">
                    <div>
                      <strong className="text-white block">Bannière 1024x500 Feature Graphic</strong>
                      <span className="text-[11px] text-gray-400">Image de présentation Google Play</span>
                    </div>
                    <button
                      onClick={() => downloadFile('dimaria-feature-graphic-1024x500.svg', `<svg viewBox="0 0 1024 500" xmlns="http://www.w3.org/2000/svg"><rect width="1024" height="500" fill="#0A0A0C"/><text x="512" y="220" font-family="Cinzel" font-size="64" font-weight="900" fill="#D4AF37" text-anchor="middle">DIMARIA OPPORTUNITY</text><text x="512" y="280" font-family="sans-serif" font-size="24" font-weight="600" fill="#E5C07B" text-anchor="middle">Toutes les opportunités du monde à portée de main</text><text x="512" y="340" font-family="sans-serif" font-size="16" fill="#888" text-anchor="middle">PAR DIMARIA COMPANY</text></svg>`, 'image/svg+xml')}
                      className="p-2 rounded-lg bg-gray-800 hover:bg-[#D4AF37] hover:text-black transition"
                      title="Télécharger la bannière"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PLAY STORE LISTING */}
          {activeTab === 'playstore' && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex justify-between items-center">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#E5C07B]">
                  Métadonnées Officielles pour Google Play Console
                </h3>
                <button
                  onClick={() => copyText('playstore', playStoreDescriptionFr)}
                  className="flex items-center gap-1 text-xs text-amber-400 hover:underline cursor-pointer"
                >
                  {copiedKey === 'playstore' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'playstore' ? 'Copié !' : 'Copier tout le texte'}</span>
                </button>
              </div>

              <div className="p-4 rounded-xl bg-[#14141E] border border-gray-800 space-y-3 text-xs text-gray-300 whitespace-pre-wrap font-sans leading-relaxed max-h-96 overflow-y-auto">
                {playStoreDescriptionFr}
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-gray-900 border border-gray-800 text-xs">
                <span>Politique de confidentialité obligatoire pour Google Play :</span>
                <button
                  onClick={onOpenPrivacy}
                  className="text-amber-400 font-bold hover:underline"
                >
                  Consulter la Politique
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: ANDROID MANIFEST */}
          {activeTab === 'manifest' && (
            <div className="space-y-3 animate-fade-in">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-400 font-mono">android/app/src/main/AndroidManifest.xml</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => copyText('manifest', androidManifestXml)}
                    className="flex items-center gap-1 text-xs text-amber-400 hover:underline"
                  >
                    {copiedKey === 'manifest' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>Copier</span>
                  </button>
                  <button
                    onClick={() => downloadFile('AndroidManifest.xml', androidManifestXml, 'application/xml')}
                    className="flex items-center gap-1 text-xs text-[#D4AF37] hover:underline"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Télécharger</span>
                  </button>
                </div>
              </div>

              <pre className="p-4 rounded-xl bg-[#0C0C12] border border-gray-800 text-[11px] text-gray-300 font-mono overflow-x-auto">
                {androidManifestXml}
              </pre>
            </div>
          )}

          {/* TAB 4: BUILD GRADLE */}
          {activeTab === 'gradle' && (
            <div className="space-y-3 animate-fade-in">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-400 font-mono">android/app/build.gradle.kts</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => copyText('gradle', buildGradleKts)}
                    className="flex items-center gap-1 text-xs text-amber-400 hover:underline"
                  >
                    {copiedKey === 'gradle' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>Copier</span>
                  </button>
                  <button
                    onClick={() => downloadFile('build.gradle.kts', buildGradleKts, 'text/plain')}
                    className="flex items-center gap-1 text-xs text-[#D4AF37] hover:underline"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Télécharger</span>
                  </button>
                </div>
              </div>

              <pre className="p-4 rounded-xl bg-[#0C0C12] border border-gray-800 text-[11px] text-gray-300 font-mono overflow-x-auto">
                {buildGradleKts}
              </pre>
            </div>
          )}

          {/* TAB 5: CLI COMPILATION GUIDE */}
          {activeTab === 'cli' && (
            <div className="space-y-4 text-xs text-gray-300 leading-relaxed animate-fade-in">
              <h3 className="text-sm font-bold text-white">
                Génération en 3 étapes de l'APK (.apk) et de l'Android App Bundle (.aab)
              </h3>

              <div className="p-4 rounded-xl bg-[#14141E] border border-gray-800 space-y-2">
                <strong className="text-[#E5C07B] block font-mono">Option 1 : Via Bubblewrap CLI (Recommandé par Google pour PWA/TWA)</strong>
                <pre className="p-2.5 rounded bg-[#0A0A0E] text-[11px] font-mono text-amber-300 overflow-x-auto">
                  npm install -g @bubblewrap/cli{'\n'}
                  bubblewrap init --manifest=https://votre-domaine.com/manifest.json{'\n'}
                  bubblewrap build
                </pre>
                <p className="text-[11px] text-gray-400">
                  Génère automatiquement `app-release-signed.apk` (pour distribution directe) et `app-release-bundle.aab` (pour téléversement sur Google Play Console).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#14141E] border border-gray-800 space-y-2">
                <strong className="text-[#E5C07B] block font-mono">Option 2 : Via Capacitor Android</strong>
                <pre className="p-2.5 rounded bg-[#0A0A0E] text-[11px] font-mono text-amber-300 overflow-x-auto">
                  npm install @capacitor/core @capacitor/android{'\n'}
                  npx cap add android{'\n'}
                  npm run build && npx cap copy{'\n'}
                  npx cap open android
                </pre>
                <p className="text-[11px] text-gray-400">
                  Ouvre le projet complet dans Android Studio pour générer votre APK signé avec votre clé de production.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
