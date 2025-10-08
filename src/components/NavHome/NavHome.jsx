import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { User } from 'lucide-react';
import { toast } from "react-toastify"; 
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../config/firebase';
import LoginForm from "../../components/LoginForm/LoginForm";
import Registration from "../../components/Registration/Registration";
import { useState } from "react";
import Modal from "../../components/Modal/Modal";
import css from "./NavHome.module.css";
import Button from "../Button/Button";
import { logoutUser } from "../../redux/auth/operations";

const NavHome = () => {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false);  
  const dispatch = useDispatch();
 
  const [user, isLoading] = useAuthState(auth);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();     
      toast.success("Logout successful 🎉");
    } catch (error) {
      toast.error(error?.message || "Logout failed ❌");
    }
  };

  if (isLoading) return <div>Loading...</div>;

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
            <NavLink to="/" className={css.navLink}>Home</NavLink>
          </li>
          <li>
            <NavLink to="/nannies" className={css.navLink}>Nannies</NavLink>
          </li>
          {user && (
            <li>
              <NavLink to="/favorites" className={css.navLink}>Favorites</NavLink>
            </li>
          )}
        </ul>

        <div className={css.btnContainer}>
          {!user ? (
            <>
              <Button variant="btn--outlined" onClick={() => setLoginOpen(true)}>Log In</Button>
              <Button variant="btn--filled" onClick={() => setRegisterOpen(true)}>Registration</Button>
            </>
          ) : (
            <>
              <div className={css.user}> 
                <div className={css.usericon}>
                  <User color="#F03F3B"  fill="#F03F3B" stroke="none"/>
                </div> 
                <span className={css.username}>{user.displayName || "User"}</span>
              </div>
              <Button variant="btn--filled" onClick={handleLogout}>Log Out</Button>
            </>
          )}
        </div>
      </div>

      <Modal isOpen={isLoginOpen} onClose={() => setLoginOpen(false)}>
        <LoginForm onClose={() => setLoginOpen(false)} />
      </Modal>
      
      <Modal isOpen={isRegisterOpen} onClose={() => setRegisterOpen(false)}>
        <Registration onClose={() => setRegisterOpen(false)} />
      </Modal>
    </nav>
  );
};

export default NavHome;
