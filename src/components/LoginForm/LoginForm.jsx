import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import css from "./LoginForm.module.css";
import Button from "../Button/Button";

const LoginForm = () => {
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

  const onSubmit = (data) => {
    console.log("Form verisi:", data);
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
          <input type="email" {...register("email")} placeholder="Email" className={css.input} />
          {errors.email && <span className={css.error}>{errors.email.message}</span>}
        </div>

        <div>
          <input
            type="password"
            {...register("password")}
            placeholder="Password"
            className={css.input}
          />
          {errors.password && <span className={css.error}>{errors.password.message}</span>}
        </div>
        <Button type="submit" variant="btn--filled">Log In</Button>
       
      </form>
    </div>
  );
};

export default LoginForm;
