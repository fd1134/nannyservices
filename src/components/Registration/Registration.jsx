import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "../Button/Button";
import { useState } from "react";
import css from "./Registration.module.css";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/auth/operations";
import { toast } from "react-toastify"; // ✅ toast

const Registration = ({ onClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.auth);

  const togglePassword = () => setShowPassword((prev) => !prev);

  const registerSchema = yup.object({
    name: yup.string().min(3, "Name must be at least 3 characters").required("Name is required"),
    email: yup.string().email("Please enter a valid email address").required("Email is required"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      await dispatch(registerUser({ email: data.email, password: data.password })).unwrap();
      reset();
      if (onClose) onClose();
      toast.success("Registration successful 🎉"); 
    } catch (error) {
      toast.error(error || "Registration failed ❌");
    }
  };

  return (
    <div className={css.formContainer}>
      <div className={css.header}>
        <h3 className={css.formTitle}>Registration</h3>
        <p className={css.formSubtitle}>
          Thank you for your interest in our platform! Please provide the following information.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className={css.form}>
        <div>
          <input type="text" {...register("name")} placeholder="Name" className={css.input} />
          {errors.name && <span className={css.error}>{errors.name.message}</span>}
        </div>
        <div>
          <input type="email" {...register("email")} placeholder="Email" className={css.input} />
          {errors.email && <span className={css.error}>{errors.email.message}</span>}
        </div>
        <div className={css.inputWrapper}>
          <input
            type={showPassword ? "text" : "password"}
            {...register("password")}
            placeholder="Password"
            className={`${css.input} ${errors.password ? css.inputError : ""}`}
          />
          <button type="button" className={css.eyeBtn} onClick={togglePassword}>
            {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>
        </div>
        {errors.password && <span className={css.error}>{errors.password.message}</span>}

        <Button type="submit" variant="btn--filled" disabled={status === "loading"}>
          {status === "loading" ? "Signing Up..." : "Sign Up"}
        </Button>
      </form>
    </div>
  );
};

export default Registration;
