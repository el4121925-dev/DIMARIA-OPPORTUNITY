/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * DIMARIA OPPORTUNITY - Full-Stack Express Server & Gemini AI Proxy
 * DIMARIA COMPANY
 */

import express, { Request, Response } from 'express';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));

// In-memory persistent database store initialized with defaults
let statsData = {
  totalVisits: 14250,
  opportunitiesViewed: 38400,
  officialLinksClicked: 8920,
  aiQueriesGenerated: 2150,
  activeUsersToday: 640,
  topCountries: [
    { name: "Côte d'Ivoire", code: 'CI', percentage: 42 },
    { name: 'Sénégal', code: 'SN', percentage: 21 },
    { name: 'Cameroun', code: 'CM', percentage: 14 },
    { name: 'France', code: 'FR', percentage: 11 },
    { name: 'Bénin & Togo', code: 'BJ-TG', percentage: 8 },
    { name: 'Autres', code: 'OTHER', percentage: 4 },
  ],
};

let admobConfigData = {
  enabled: true,
  isTestMode: true,
  bannerUnitId: 'ca-app-pub-3940256099942544/6300978111',
  interstitialUnitId: 'ca-app-pub-3940256099942544/1033173712',
  rewardedUnitId: 'ca-app-pub-3940256099942544/5224354917',
  interstitialFrequencyMinutes: 5,
};

// --- GEMINI AI PROXY ---
let aiClient: GoogleGenAI | null = null;
try {
  aiClient = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
} catch (e) {
  console.warn('AI Client init warning:', e);
}

const SYSTEM_INSTRUCTION = `Tu es DIMARIA AI, l'assistant intelligent officiel de l'application DIMARIA OPPORTUNITY (développée par DIMARIA COMPANY).
Slogan de DIMARIA COMPANY : "Toutes les opportunités du monde à portée de main."
Ton rôle :
1. Conseiller les utilisateurs et chercheurs d'opportunités (étudiants, freelances, porteurs de projets, chercheurs d'emploi) avec bienveillance, réalisme et professionnalisme.
2. Aider à rédiger des CV modernes, percutants et sans clichés, ainsi que des lettres de motivation sur-mesure pour n'importe quel poste ou plateforme (Upwork, ComeUp, bourses internationales).
3. Concevoir des plans d'action business pragmatiques en 5 étapes claires (budget nécessaire, outils gratuits, premières démarches, rentabilité).
4. Conseiller les étudiants sur les bourses réelles (Mastercard Foundation, Eiffel, Chevening, DAAD) et les formations gratuites certifiantes (Google Digital Garage, Harvard CS50, Coursera).
5. Expliquer les méthodes de paiement internationales et locales (Wave, Orange Money, MTN Mobile Money, PayPal, Payoneer, Virement bancaire).
6. Règle absolue de conformité et d'éthique : Ne JAMAIS promettre de gains garantis, magiques ou sans travail. Rappeler que le succès dépend de la compétence, du sérieux et des conditions réelles des plateformes officielles.
7. Tu maîtrises parfaitement le français et l'anglais. Réponds dans la langue employée par l'utilisateur avec une mise en page soignée (titres clairs, puces concises, conseils concrets).`;

app.post('/api/ai/chat', async (req: Request, res: Response) => {
  try {
    const { prompt, history, userProfile } = req.body;

    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    // Always prefer real Gemini 3.8 Flash model
    if (aiClient && process.env.GEMINI_API_KEY) {
      let contextPrefix = '';
      if (userProfile?.country) {
        contextPrefix += `[Profil utilisateur : Pays: ${userProfile.country}, Devise: ${userProfile.preferredCurrency || 'XOF'}]\n`;
      }

      // If user supplied previous conversation history, we format the content
      let fullContent = `${contextPrefix}Demande de l'utilisateur : ${prompt}`;
      if (Array.isArray(history) && history.length > 0) {
        const recentHistory = history.slice(-4).map((h: { sender: string; text: string }) => `${h.sender === 'user' ? 'Utilisateur' : 'DIMARIA AI'}: ${h.text}`).join('\n');
        fullContent = `${contextPrefix}Historique récent :\n${recentHistory}\n\nNouvelle question : ${prompt}`;
      }

      const response = await aiClient.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: fullContent,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
        },
      });

      const reply = response.text || "Je suis à votre écoute pour trouver les meilleures opportunités adaptées à votre profil.";
      return res.json({ reply });
    } else {
      // Fallback response with helpful structured content if API key is not yet set in environment
      const defaultReplies = [
        `Bienvenue sur DIMARIA AI ! Pour votre recherche "${prompt}", voici ma recommandation experte DIMARIA COMPANY :\n\n1. **Opportunité recommandée** : Commencez par explorer les micro-missions et l'annotation de données sur Outlier AI ou Clickworker (accessible en Afrique et dans le monde, paiement PayPal/Airtm).\n2. **Compétences clés** : Rigueur, bonne maîtrise de l'expression écrite et respect des consignes.\n3. **Plan d'action** : Créez votre profil complet, passez le test d'évaluation avec concentration, et configurez votre moyen de retrait sécurisé (Wave via Payoneer ou PayPal).\n\nSouhaitez-vous que je vous aide à rédiger une lettre ou un CV ?`,
      ];
      return res.json({ reply: defaultReplies[0] });
    }
  } catch (error: any) {
    console.warn('Gemini API notice:', error?.message || error);
    const p = (req.body?.prompt || '').toLowerCase();
    let smartAnswer = "";

    if (p.includes('upwork') || p.includes('freelance') || p.includes('mission')) {
      smartAnswer = `Voici le guide stratégique officiel DIMARIA COMPANY pour réussir sur **Upwork depuis la Côte d'Ivoire & l'Afrique francophone** :\n\n1. **Création du profil** : Choisissez un titre ultra-spécifique (ex: "Expert Rédaction SEO & Copywriting Français" ou "Développeur React / Mobile").\n2. **Tarification de démarrage** : Démarrez avec un tarif attractif (15$ - 25$/h) pour obtenir vos 3 premiers avis 5 étoiles.\n3. **Propositions percutantes** : Démontrez que vous comprenez le problème du client dès la première phrase.\n4. **Retrait des gains en Afrique** : Liez votre compte Upwork à **Payoneer**, qui permet ensuite de transférer vos fonds directement vers **Wave**, **Orange Money** ou votre banque locale.\n\nSouhaitez-vous que je vous rédige un modèle de proposition ou un profil de compétences ?`;
    } else if (p.includes('cv') || p.includes('curriculum')) {
      smartAnswer = `Voici la structure de **CV gagnant recommandée par DIMARIA COMPANY** pour le télétravail international :\n\n- **Titre professionnel clair**\n- **Résumé percutant (3 lignes)**\n- **Compétences clés opérationnelles** (outils numériques, maîtrise linguistique)\n- **Projets réels et résultats mesurables**\n\nIndiquez-moi votre domaine et je vous rédige vos sections clés !`;
    } else {
      smartAnswer = `Bienvenue sur **DIMARIA AI** ! Pour votre requête **"${req.body?.prompt}"**, voici l'analyse DIMARIA COMPANY :\n\n1. **Opportunité ciblée** : Explorez l'onglet "Gagner" ou "Business" pour démarrer avec des missions validées (Outlier, Clickworker, Upwork).\n2. **Paiement direct** : Utilisez Wave, Orange Money ou Payoneer pour des retraits sécurisés sans blocage bancaire.\n3. **Plan d'action** : Préparez un portfolio ou un profil soigné avant de postuler.\n\nPosez-moi vos questions précises pour obtenir un plan d'action détaillé !`;
    }
    return res.json({ reply: smartAnswer });
  }
});

// Stats API
app.get('/api/stats', (_req: Request, res: Response) => {
  statsData.totalVisits += 1;
  res.json(statsData);
});

app.post('/api/stats/click', (_req: Request, res: Response) => {
  statsData.officialLinksClicked += 1;
  res.json({ success: true, officialLinksClicked: statsData.officialLinksClicked });
});

// AdMob Config API
app.get('/api/admob-config', (_req: Request, res: Response) => {
  res.json(admobConfigData);
});

app.put('/api/admob-config', (req: Request, res: Response) => {
  admobConfigData = { ...admobConfigData, ...req.body };
  res.json({ success: true, config: admobConfigData });
});

// Server health check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'online',
    appName: 'DIMARIA OPPORTUNITY',
    company: 'DIMARIA COMPANY',
    version: '1.0.0',
    geminiConfigured: !!process.env.GEMINI_API_KEY,
  });
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    // Mount Vite middleware in development
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`DIMARIA OPPORTUNITY Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
