import css from "./Button.module.css";
const Button = ({ children, variant = "filled", ...props }) => {
  return (
    <button className={`${css.btn} ${css[variant]}`} {...props}>
      {children}
    </button>
  )
}
export default Button;



