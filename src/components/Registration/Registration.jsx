import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "../Button/Button";
import { useState } from "react";
import css from "./Registration.module.css";
const Registration = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword((prev) => !prev);
  const loginSchema = yup.object({
    name: yup
      .string()
      .min(3, "Name must be at least 3 characters")
      .required("Name is required"),
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

  const onSubmit = (data) => {
    console.log("Form verisi:", data);
  };
  return (
    <div className={css.formContainer}>
      <div className={css.header}>
        <h3 className={css.formTitle}>Registration</h3>
        <p className={css.formSubtitle}>
          Thank you for your interest in our platform! In order to register, we
          need some information. Please provide us with the following
          information.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className={css.form}>
        <div>
          <input
            type="text"
            {...register("name")}
            placeholder="Name"
            className={css.input}
          />
          {errors.name && (
            <span className={css.error}>{errors.name.message}</span>
          )}
        </div>
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
          Sign Up
        </Button>
      </form>
    </div>
  );
};
export default Registration;
