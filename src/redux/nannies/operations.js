import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs, query, where, orderBy, limit, startAfter } from "firebase/firestore";
import { db } from "../../config/firebase";

export const fetchNannies = createAsyncThunk(
  "nannies/fetchFiltered",
  async ({ filter, lastVisible }, thunkAPI) => {
    try {
      const nanniesRef = collection(db, "nannies");
      let q;

      switch (filter) {
        case "A to Z":
          q = query(nanniesRef, orderBy("name", "asc"), limit(3));
          break;
        case "Z to A":
          q = query(nanniesRef, orderBy("name", "desc"), limit(3));
          break;
        case "Less than 10$":
          q = query(nanniesRef, where("price_per_hour", "<=", 10), orderBy("price_per_hour"), limit(3));
          break;
        case "Greater than 10$":
          q = query(nanniesRef, where("price_per_hour", ">", 10), orderBy("price_per_hour"), limit(3));
          break;
        case "Popular":
          q = query(nanniesRef, where("rating", ">=", 4.5), orderBy("rating", "desc"), limit(3));
          break;
        case "Not popular":
          q = query(nanniesRef, where("rating", "<", 4.5), orderBy("rating"), limit(3));
          break;
        case "Show all":
        default:
          q = query(nanniesRef, orderBy("name", "asc"), limit(3));
          break;
      }

      if (lastVisible) {
        q = query(q, startAfter(lastVisible));
      }

      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      const newLastVisible = snapshot.docs[snapshot.docs.length - 1] || null;

      return { data, lastVisible: newLastVisible };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
