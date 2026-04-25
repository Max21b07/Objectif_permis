# Drive France Guide

Mini-site pédagogique multilingue pour aider une apprenante vietnamienne à comprendre les bases de la conduite en France avant toute pratique réelle dans un cadre légal.

Langues disponibles :

- 🇻🇳 Tiếng Việt, langue par défaut
- 🇬🇧 English
- 🇫🇷 Français

## Objectif pédagogique

Le site sert à préparer des séances légales et assurées avec une auto-école, un véhicule à double commande ou un autre cadre officiellement autorisé. Il couvre les règles pratiques françaises, les différences Vietnam/France, le vocabulaire utile, la boîte automatique, un plan de formation progressif, des quiz et des fiches imprimables.

## Avertissement légal

Ne pas conduire en France sur route ouverte sans permis valide ou sans cadre légal adapté. La pratique doit toujours être faite dans un contexte légal et assuré.

Ce site est un support pédagogique simplifié. Les règles officielles doivent toujours être vérifiées sur les sources gouvernementales françaises, car elles peuvent évoluer.

## Technologies

- React
- TypeScript
- Vite
- Tailwind CSS
- Données pédagogiques dans `src/data`
- Traductions UI dans `src/locales`
- Pas de backend

## Installation

```bash
npm install
```

Si le cache npm global de la machine pose problème, utiliser un cache local :

```bash
npm install --cache .npm-cache
```

## Lancement local

```bash
npm run dev
```

Avec la configuration GitHub Pages, Vite affiche l'application sous :

```text
http://localhost:5173/Objectif_permis/
```

## Build

```bash
npm run build
```

## Lint

```bash
npm run lint
```

## Structure

```text
src/
  components/   Composants réutilisables
  data/         Modules pédagogiques, quiz, vocabulaire, sources
  locales/      Types et textes UI multilingues
  styles/       Tailwind et styles print
  utils/        Détection et persistance de langue
```

## Gestion des langues

La langue initiale est choisie par `getInitialLanguage()` :

1. Lit `localStorage.preferredLanguage`.
2. Sinon lit `navigator.language`.
3. Utilise `vi`, `fr` ou `en` si reconnu.
4. Sinon revient au vietnamien.

Quand l’utilisateur change de langue, `setLanguage(lang)` sauvegarde la préférence dans `localStorage` et met à jour l’attribut `lang` du document HTML.

Aucune API IP, géolocalisation GPS ou cookie tiers n’est utilisé.

## Installation iPhone

Le site contient un manifest PWA et un service worker simple pour permettre l'ajout à l'écran d'accueil et une consultation partielle hors ligne.

Sur iPhone :

1. Ouvrir `https://max21b07.github.io/Objectif_permis/` dans Safari.
2. Appuyer sur Partager.
3. Choisir Ajouter à l'écran d'accueil.
4. Appuyer sur Ajouter.

## Sources officielles

- Service-public.fr - Permis B en candidat libre : https://www.service-public.fr/particuliers/vosdroits/F2825
- Service-public.fr - Formules permis B : https://www.service-public.fr/particuliers/vosdroits/F31901
- Service-public.fr - Conduite supervisée : https://www.service-public.fr/particuliers/vosdroits/F21012
- Sécurité routière / ONISR - Code de la route : https://www.onisr.securite-routiere.gouv.fr/politique-de-securite-routiere/code-de-la-route
- Sécurité routière / ONISR - Vitesses : https://www.onisr.securite-routiere.gouv.fr/en/knowledge-centre/behaviour-risk-factors/speed-traffic-regulations/traffic-speeds
- Légifrance - Code de la route, apprentissage de la conduite R211-3 à R211-7 : https://www.legifrance.gouv.fr/codes/id/LEGISCTA000006177075/

## Améliorations possibles

- Ajouter des illustrations de panneaux.
- Ajouter un mode audio pour la prononciation.
- Ajouter des tests unitaires pour les filtres et la sélection de langue.
- Ajouter une version PWA utilisable hors ligne.
- Ajouter une page dédiée aux démarches administratives selon le statut exact du permis vietnamien et du visa, après vérification officielle.
