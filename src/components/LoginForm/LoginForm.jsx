import { useDispatch} from "react-redux";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import css from "./LoginForm.module.css";
import Button from "../Button/Button";

import { loginUser } from "../../redux/auth/operations";


const LoginForm = ({onClose}) => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword((prev) => !prev);
  const dispatch = useDispatch();

  const loginSchema = yup.object({
    email: yup
      .string()
      .email("Please enter a valid email address")
      .required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

const onSubmit = async (data) => {
  try {
    await dispatch(loginUser(data)).unwrap();
    onClose(); 
     toast.success("Login successful 🎉");

  } catch (error) {
    console.error("Login failed:", error);
    toast.error("Login failed. Please try again.");
  }
};
  return (
    <div className={css.formContainer}>
      <div className={css.header}>
        <h3 className={css.formTitle}>Log In</h3>
        <p className={css.formSubtitle}>
          Welcome back! Please enter your credentials to access your account and
          continue your babysitter search.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className={css.form}>
        <div>
          <input
            type="email"
            {...register("email")}
            placeholder="Email"
            className={css.input}
          />
          {errors.email && (
            <span className={css.error}>{errors.email.message}</span>
          )}
        </div>
        <div className={css.inputWrapper}>
          <input
            type={showPassword ? "text" : "password"}
            {...register("password")}
            placeholder="Password"
            className={`${css.input} ${errors.password ? css.inputError : ""}`}
          />
          <button
            type="button"
            className={css.eyeBtn}
            onClick={togglePassword}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>
        </div>
        {errors.password && (
          <span className={css.error}>{errors.password.message}</span>
        )}
        <Button type="submit" variant="btn--filled">
          Log In
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
