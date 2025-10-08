import { configureStore } from '@reduxjs/toolkit';
import storage from "redux-persist/lib/storage";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const favouritesPersistConfig = {
  key: "favourites",
  storage,
};
const authPersistConfig = {
  key: "auth",
  storage,
};





import  favouritesReducer  from './favourites/slice';
import authReducer from "./auth/slice";
import { nanniesReducer } from "./nannies/slice";



export const store = configureStore({
  reducer: {
    favourites: persistReducer(favouritesPersistConfig, favouritesReducer),
    auth: persistReducer(authPersistConfig, authReducer),
    nannies: nanniesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);