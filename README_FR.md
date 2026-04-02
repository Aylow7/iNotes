# iNotes

Une application de prise de notes légère créée avec React + TypeScript + Vite.

## 🚀 Présentation

`iNotes` est conçu pour une création et une gestion de notes locales ultra-rapide dans le navigateur.

Fonctionnalités principales :

- Créer, modifier et supprimer des notes
- Stockage persistant via localStorage
- Raccourcis clavier pour gagner en efficacité
- Interface propre et responsive

## 🧩 Fonctionnalités

- Ajout instantané de nouvelles notes
- Sélection et édition des notes existantes
- Sauvegarde automatique dans le navigateur
- Recherche et filtre de notes (à implémenter)
- Structure de projet simple et facile à personnaliser

## 🛠️ Stack technique

- React
- TypeScript
- Vite
- Zustand (ou autre gestion d'état dans `src/store`)

## ▶️ Exécution locale

```bash
pnpm install
pnpm dev
```

Ouvrez `http://localhost:5173` dans votre navigateur.

## ✔️ Build

```bash
pnpm build
```

## 🧪 Tests

Ajoutez des tests si nécessaire. Exemple avec Jest/React Testing Library :

```bash
pnpm test
```

## 📁 Structure du projet

- `src/` - source de l'application
  - `components/` - composants UI
  - `hooks/` - hooks personnalisés
  - `store/` - gestion d'état (Zustand)

## 🛡️ Notes

- Ce projet stocke les notes localement.
- Pour synchronisation multi-appareils, ajoutez un backend ou une solution cloud.

## 🏷️ Licence

voir le fiché [LICENSE](https://github.com/Aylow7/iNotes?tab=GPL-3.0-1-ov-file)