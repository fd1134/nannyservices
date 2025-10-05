import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ email, password, name }, { rejectWithValue }) => {
    try {
      // 1️⃣ Kullanıcı oluştur
      await createUserWithEmailAndPassword(auth, email, password);

      // 2️⃣ Firebase’in kullanıcıyı tanımasını bekle
      const currentUser = await new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            unsubscribe();
            resolve(user);
          }
        });
      });

      // 3️⃣ Profil güncelle (artık garanti çalışır)
      await updateProfile(currentUser, { displayName: name });

      // 4️⃣ En güncel kullanıcıyı dön
      return {
        uid: currentUser.uid,
        email: currentUser.email,
        displayName: name, // artık hem redux hem firebase panelinde gözükür
      };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, thunkAPI) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || user.email.split("@")[0],
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, thunkAPI) => {
    try {
      await signOut(auth);
      return null;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
