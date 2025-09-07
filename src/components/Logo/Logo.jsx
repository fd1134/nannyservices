import { Home, Heart } from "lucide-react";
import styles from "./Logo.module.css";

const Logo = () => {
  return (
    <div className={styles.logo}>
      <Home size={28} />
      <Heart size={22} className={styles.heart} />
     
    </div>
  );
};

export default Logo;
