import css from "./NavHome.module.css";
import Button from "../components/Button/Button";
const NavHome = () => {
  const isLogin = true; // Example condition, replace with actual login state
  return (
    <nav className={css.navbar}>
      <div className={css.logo}>Nanny.Services</div>
      <div className={css.spacer}>
      <ul className={css.navList}>
        <li>
          <a className={css.navLink} href="/">
            Home
          </a>
        </li>
        <li>
          <a className={css.navLink} href="/nannies">
            Nannies
          </a>
        </li>
        {isLogin ? (
          <></>
        ) : (
          <>
            <li>
              <a className={css.navLink} href="/favorites">
                Favorites
              </a>
            </li>
            
          </>
        )}
      </ul>
      {isLogin ? (
        <>
          <Button variant="btn--outlined">Log In</Button>
          <Button variant="btn--filled">Registration</Button>
        </>
      ) : (
        <>
          <span className={css.user}>John Doe</span>
          <Button variant="btn--filled">Log Out</Button>
        </>
      )}
      </div>
    </nav>
  );
};

export default NavHome;
