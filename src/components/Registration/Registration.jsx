import { createUserWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "../Button/Button";
import { useState, useEffect } from "react";
import css from "./Registration.module.css";
import { auth } from "../../config/firebase";

const Registration = ({ onClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success" | "error"

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
    reset,
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      setMessage("Registration successful!");
      setMessageType("success");
      reset(); // formu temizle
      // Opsiyonel: modalı otomatik kapat
      setTimeout(() => {
        if (onClose) onClose();
        setMessage(""); // mesajı temizle
        setMessageType("");
      }, 2000);
    } catch (error) {
      setMessage(error.message);
      setMessageType("error");
    }
  };

  // Modal kapandığında mesajları temizle
  useEffect(() => {
    return () => {
      setMessage("");
      setMessageType("");
    };
  }, []);

  return (
    <div className={css.formContainer}>
      <div className={css.header}>
        <h3 className={css.formTitle}>Registration</h3>
        <p className={css.formSubtitle}>
          Thank you for your interest in our platform! Please provide the following information.
        </p>
      </div>

      {/* Mesaj gösterimi */}
      {message && (
        <div
          className={
            messageType === "success" ? css.successMsg : css.errorMsg
          }
        >
          {message}
        </div>
      )}

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
            className={`${css.input} ${
              errors.password ? css.inputError : ""
            }`}
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
