import { NavLink } from "react-router-dom";
import css from "./Button.module.css";
const Button = ({ children, variant = "filled", ...props }) => {
  return (
    <NavLink className={`${css.btn} ${css[variant]}`} {...props}>
      {children}
    </NavLink>
  )
}
export default Button;



