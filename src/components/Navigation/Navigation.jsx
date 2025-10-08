import { NavLink } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../config/firebase';
import { User } from "lucide-react";
import css from "./Navigation.module.css";
import Button from "../Button/Button";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { useState } from "react";
import LoginForm from "../LoginForm/LoginForm";
import Registration from "../Registration/Registration";
import Modal from "../Modal/Modal";


const Navigation = () => {
  const [user, isLoading] = useAuthState(auth);
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false);


  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logout successful 🎉");
    } catch (error) {
      toast.error(error.message || "Logout failed ❌");
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <nav className={css.navbar}>
      <div className={css.logo}>
        <NavLink className={css.logoLink} to="/">
          <img src="/logo.png" alt="Logo" width="32" height="32" className={css.logoImage} />
        </NavLink>
      </div>

      <ul className={css.navList}>
        <li>
          <NavLink to="/" className={({ isActive }) => isActive ? `${css.navLink} ${css.active}` : css.navLink}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/nannies" className={({ isActive }) => isActive ? `${css.navLink} ${css.active}` : css.navLink}>
            Nannies
          </NavLink>
        </li>
        {user && (
          <li>
            <NavLink to="/favorites" className={({ isActive }) => isActive ? `${css.navLink} ${css.active}` : css.navLink}>
              Favorites
            </NavLink>
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
            <Button variant="btn--outlined" onClick={handleLogout}>
              Log Out
            </Button>
          </>
        )}
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

export default Navigation;
