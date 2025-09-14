import { NavLink } from "react-router-dom";
import css from "./NavHome.module.css";
import Button from "../Button/Button";

const NavHome = () => {
  const isLogin = false; 

  return (
    <nav className={css.navbar}>
      <div className={css.logo}>
        <NavLink className={css.logoLink} to="/">
          <img
            src="/logo.svg"
            alt="Logo"
            width="32"
            height="32"
            className={css.logoImage}
          />
        </NavLink>
      </div>

      <div className={css.spacer}>
        <ul className={css.navList}>
          <li>
            <NavLink to="/" className={css.navLink} >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/nannies" className={css.navLink}>
              Nannies
            </NavLink>
          </li>
          {isLogin && (
            <li>
              <NavLink to="/favorites" className={css.navLink}>
                Favorites
              </NavLink>
            </li>
          )}
        </ul>

        <div className={css.btnContainer}>
          {!isLogin ? (
            <>
              <Button to="/login" variant="btn--outlined">Log In</Button>
              <Button to="/register" variant="btn--filled">Registration</Button>
            </>
          ) : (
            <>
              <span className={css.user}>John Doe</span>
              <Button to="/logout" variant="btn--filled">Log Out</Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavHome;
