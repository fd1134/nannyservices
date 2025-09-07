import Logo from "../Logo/Logo";
import Button from "../Button/Button";
import styles from "./Header.module.css";

const Header = () => {
  const isLogin=true;
  return (
    <header className={styles.header}>
      <a href="/" className={styles.logoLink}>
        <Logo />
      </a>
      <nav>
        <ul className={styles.navList}>
          <li><a href="/">Home</a></li>
          <li><a href="/about">Nannies</a></li>
          {!isLogin && (
            <>
              <Button variant="btn--outlined">
                Log In
              </Button>
              <Button variant="btn--outlined">
                Registration
              </Button>
            </>
          )}
          {isLogin && (
            <>
            <li><a href="/about">Favorites</a></li>
              <p>Username</p><p>icon</p>
              <Button variant="btn--outlined">
                Log out
              </Button>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
