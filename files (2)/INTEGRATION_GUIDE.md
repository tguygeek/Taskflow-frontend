# 📱 Guide d'intégration — Responsive Phase 4

## Fichiers livrés

| Fichier | Remplace |
|---|---|
| `global.css` | `src/index.css` ou `src/App.css` |
| `Header.jsx` | `src/components/header/Header.jsx` |
| `Header.module.css` | `src/components/header/Header.module.css` |
| `Sidebar.jsx` | `src/components/sidebar/Sidebar.jsx` |
| `sidebar.module.css` | `src/components/sidebar/sidebar.module.css` |
| `TaskContainer.module.css` | `src/TaskContainer.module.css` |
| `taskInput.module.css` | `src/components/taskInput/taskInput.module.css` |
| `taskList.module.css` | `src/components/taskList/taskList.module.css` |
| `taskItem.module.css` | `src/components/taskItem/taskItem.module.css` |
| `KanbanBoard.module.css` | `src/components/kanban/KanbanBoard.module.css` |
| `Dashboard.module.css` | `src/components/dashboard/Dashboard.module.css` |
| `auth.module.css` | `src/pages/Login.module.css` + `src/pages/Register.module.css` |
| `panels.module.css` | `src/components/search/SearchBar.module.css` + `src/components/history/HistoryPanel.module.css` + `src/components/workspace/WorkspaceManager.module.css` |

---

## Étape 1 — Importer le CSS global

Dans `src/main.jsx` ou `src/App.jsx`, assure-toi d'importer le CSS global :

```jsx
import './index.css' // remplace par le contenu de global.css
```

Ou copie le contenu de `global.css` dans ton fichier CSS global existant.

---

## Étape 2 — Mettre à jour Header.jsx

Le nouveau Header gère :
- ✅ Menu hamburger sur mobile
- ✅ Barre de recherche déplacée sous le header sur mobile
- ✅ Navigation cachée sur mobile → dans le menu drawer

Remplace `src/components/header/Header.jsx` et son CSS.

---

## Étape 3 — Mettre à jour Sidebar.jsx

La nouvelle Sidebar gère :
- ✅ Drawer glissant sur mobile (bouton 🏷️ en bas à gauche)
- ✅ Overlay pour fermer
- ✅ Bouton × pour fermer depuis l'intérieur

Remplace `src/components/sidebar/Sidebar.jsx` et son CSS.

---

## Étape 4 — Remplacer uniquement les CSS (pas les JSX)

Pour les composants suivants, tu n'as besoin de remplacer **que le fichier CSS** :

- `taskInput.module.css`
- `taskList.module.css`
- `taskItem.module.css`
- `KanbanBoard.module.css`
- `Dashboard.module.css`
- `auth.module.css`

⚠️ Vérifie que les noms de classes dans ton JSX correspondent aux noms dans les CSS livrés.

---

## Étape 5 — Panels (SearchBar, History, Workspace)

Le fichier `panels.module.css` contient les styles pour 3 composants séparés.

**Option A** — Couper en 3 fichiers séparés :
```bash
# Copie la section SearchBar dans SearchBar.module.css
# Copie la section HistoryPanel dans HistoryPanel.module.css
# Copie la section WorkspaceManager dans WorkspaceManager.module.css
```

**Option B** — Importer panels.module.css dans chaque composant :
```jsx
// SearchBar.jsx
import styles from '../panels.module.css'; // ajuste le chemin

// HistoryPanel.jsx
import styles from '../panels.module.css';

// WorkspaceManager.jsx
import styles from '../panels.module.css';
```

---

## Breakpoints utilisés

```css
/* Mobile */
@media (max-width: 480px) { ... }

/* Tablette */
@media (max-width: 768px) { ... }

/* Desktop : styles par défaut (mobile-first) */
```

---

## Comportements sur mobile

| Composant | Comportement mobile |
|---|---|
| **Header** | Hamburger → menu drawer |
| **Sidebar** | Cachée → bouton 🏷️ flottant → drawer |
| **Kanban** | Colonnes empilées verticalement |
| **Dashboard** | Stats grid 2 colonnes, charts full width |
| **History/Workspace** | Panel plein écran |
| **SearchBar** | Déplacée sous le header |

---

## Test rapide

Après intégration, teste ces tailles dans les DevTools (F12 → Toggle device) :

- **375px** (iPhone SE) — le plus petit cas
- **390px** (iPhone 14)
- **768px** (iPad)
- **1280px** (Desktop)

---

## Push sur GitHub

```bash
cd taskflow-frontend-temp
git add .
git commit -m "Phase 4 - Responsive mobile-first"
git push
```

Vercel redéploiera automatiquement. ✅
