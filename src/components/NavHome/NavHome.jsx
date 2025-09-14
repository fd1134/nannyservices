import { NavLink } from "react-router-dom";
import LoginForm from "../../components/LoginForm/LoginForm";
import  { useState } from "react";
import Modal from "../../components/Modal/Modal";
import css from "./NavHome.module.css";
import Button from "../Button/Button";

const NavHome = () => {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const isLogin = false; 

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
              <Button variant="btn--outlined" onClick={() => setLoginOpen(true)}>Log In</Button>
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
       <Modal isOpen={isLoginOpen} onClose={() => setLoginOpen(false)}>
        <LoginForm />
      </Modal>
    </nav>
     

     
  );
};

export default NavHome;
