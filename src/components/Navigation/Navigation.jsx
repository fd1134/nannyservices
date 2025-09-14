import { NavLink } from "react-router-dom";
import{ User } from  "lucide-react";
import css from "./Navigation.module.css";
import Button from "../Button/Button";

const Navigation = () => {
  const isLogin = true;

  return (
    <nav className={css.navbar}>
      <div className={css.logo}>
        <NavLink className={css.logoLink} to="/">
          <img
            src="/logo.png"
            alt="Logo"
            width="32"
            height="32"
            className={css.logoImage}
          />
        </NavLink>
      </div>

      <ul className={css.navList}>
        <li>
          <NavLink to="/" className={({ isActive }) =>
    isActive ? `${css.navLink} ${css.active}` : css.navLink
  }>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/nannies" className={({ isActive }) =>
    isActive ? `${css.navLink} ${css.active}` : css.navLink
  }>
            Nannies
          </NavLink>
        </li>
        {isLogin && (
          <li>
            <NavLink to="/favorites" className={({ isActive }) =>
    isActive ? `${css.navLink} ${css.active}` : css.navLink
  }>
              Favorites
            </NavLink>
          </li>
        )}
      </ul>

      <div className={css.btnContainer}>
        {!isLogin ? (
          <>
            <Button  variant="btn--outlined">
              Log In
            </Button>
            <Button variant="btn--filled">
              Registration
            </Button>
          </>
        ) : (
          <>
          <div className={css.userContainer}>
            <div className={css.userIcon}>
              <User fill="#F03F3B" stroke="none" />{" "}
            </div>
           <span className={css.userName}>John Doe</span>
          </div>
          
            <Button  variant="btn--outlined">
              Log Out
            </Button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
