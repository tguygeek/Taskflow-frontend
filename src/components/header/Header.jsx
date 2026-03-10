import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import instance from '../axios';
import { SearchBar } from '../search/SearchBar';
import styles from './Header.module.css';
import toast from 'react-hot-toast';

export const Header = ({
  view, setView, onRequestPush, onToggleHistory, onToggleWorkspaces,
  activeWorkspace, historyCount, searchBar,
}) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try { await instance.post('/api/logout'); } catch {}
    localStorage.removeItem('access_token');
    navigate('/login');
  };

  const handleEnablePush = async () => {
    const granted = await onRequestPush();
    if (granted) toast.success('Notifications activées !');
  };

  const handleViewChange = (v) => {
    setView(v);
    setMenuOpen(false);
  };

  return (
    <>
      <header className={styles.header}>
        {/* Logo */}
        <div className={styles.brand}>
          <span className={styles.logo}>⚡</span>
          <div className={styles.brandText}>
            <span className={styles.appName}>Taskflow</span>
            {activeWorkspace && (
              <span className={styles.wsIndicator} style={{ color: activeWorkspace.color }}>
                {activeWorkspace.icon} {activeWorkspace.name}
              </span>
            )}
          </div>
        </div>

        {/* Barre de recherche — cachée sur mobile */}
        <div className={`${styles.center} ${styles.hideMobile}`}>
          {searchBar}
        </div>

        {/* Navigation vues — cachée sur mobile */}
        <nav className={`${styles.viewSwitcher} ${styles.hideMobile}`}>
          {[
            { id: 'list',      label: '☰ Liste'  },
            { id: 'kanban',    label: '⬛ Kanban' },
            { id: 'dashboard', label: '📊 Stats'  },
          ].map(({ id, label }) => (
            <button key={id}
              className={`${styles.viewBtn} ${view === id ? styles.viewActive : ''}`}
              onClick={() => handleViewChange(id)}
            >{label}</button>
          ))}
        </nav>

        {/* Actions desktop */}
        <div className={`${styles.actions} ${styles.hideMobile}`}>
          <button className={styles.iconBtn} onClick={onToggleWorkspaces} title="Workspaces">🗂️</button>
          <button className={styles.iconBtn} onClick={onToggleHistory} title="Historique">
            🗑️{historyCount > 0 && <span className={styles.dot}>{historyCount}</span>}
          </button>
          <button className={styles.iconBtn} onClick={handleEnablePush} title="Notifications">🔔</button>
          <button className={styles.logoutBtn} onClick={handleLogout}>Déconnexion</button>
        </div>

        {/* Bouton hamburger — visible sur mobile uniquement */}
        <button
          className={`${styles.hamburger} ${styles.showMobile} ${menuOpen ? styles.hamburgerOpen : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span /><span /><span />
        </button>
      </header>

      {/* Barre de recherche mobile — sous le header */}
      <div className={`${styles.mobileSearch} ${styles.showMobile}`}>
        {searchBar}
      </div>

      {/* Menu mobile overlay */}
      {menuOpen && (
        <div className={styles.mobileMenu}>
          {/* Vues */}
          <div className={styles.mobileSection}>
            <p className={styles.mobileSectionTitle}>Vue</p>
            {[
              { id: 'list',      label: '☰ Liste'  },
              { id: 'kanban',    label: '⬛ Kanban' },
              { id: 'dashboard', label: '📊 Stats'  },
            ].map(({ id, label }) => (
              <button key={id}
                className={`${styles.mobileItem} ${view === id ? styles.mobileItemActive : ''}`}
                onClick={() => handleViewChange(id)}
              >{label}</button>
            ))}
          </div>

          {/* Actions */}
          <div className={styles.mobileSection}>
            <p className={styles.mobileSectionTitle}>Actions</p>
            <button className={styles.mobileItem} onClick={() => { onToggleWorkspaces(); setMenuOpen(false); }}>
              🗂️ Workspaces
            </button>
            <button className={styles.mobileItem} onClick={() => { onToggleHistory(); setMenuOpen(false); }}>
              🗑️ Historique {historyCount > 0 && <span className={styles.mobileBadge}>{historyCount}</span>}
            </button>
            <button className={styles.mobileItem} onClick={() => { handleEnablePush(); setMenuOpen(false); }}>
              🔔 Activer notifications
            </button>
          </div>

          <button className={styles.mobileLogout} onClick={handleLogout}>
            Déconnexion
          </button>
        </div>
      )}

      {/* Overlay pour fermer le menu */}
      {menuOpen && <div className={styles.overlay} onClick={() => setMenuOpen(false)} />}
    </>
  );
};
