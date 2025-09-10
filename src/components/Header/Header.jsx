import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className={`${styles.header} ${isHomePage ? styles.home : styles.inner}`}>
      <div className={styles.logo}>Nanny.Services</div>

      <button className={styles.menuToggle} onClick={toggleMenu}>
        ☰
      </button>

      <nav className={`${styles.nav} ${menuOpen ? styles.open : ''}`}>
        <ul className={styles.navList}>
          <li><a className={styles.navLink} href="/">Home</a></li>
          <li><a className={styles.navLink} href="/nannies">Nannies</a></li>
          {isHomePage ? (
            <>
              <li><a className={styles.navLink} href="/login">Log in</a></li>
              <li><a className={`${styles.navLink} ${styles.register}`} href="/register">Registration</a></li>
            </>
          ) : (
            <>
              <li><a className={styles.navLink} href="/favorites">Favorites</a></li>
              <li><a className={styles.navLink} href="/logout">Log out</a></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
