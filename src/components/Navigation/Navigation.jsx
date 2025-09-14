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
            src="/logo.svg"
            alt="Logo"
            width="32"
            height="32"
            className={css.logoImage}
          />
        </NavLink>
      </div>

      <ul className={css.navList}>
        <li>
          <NavLink to="/" className={css.navLink}>
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
            <Button to="/login" variant="btn--outlined">
              Log In
            </Button>
            <Button to="/register" variant="btn--filled">
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
          
            <Button to="/logout" variant="btn--outlined">
              Log Out
            </Button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
