import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage/session";

import chatReducer from "./chatSlice";
import userReducer from "./userSlice";
import recipeReducer from "./recipeSlice";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";

const chatPersistConfig = {
  key: "chat",
  storage,
  whitelist: ["rooms", "messages", "visitedRooms", "currentUser"],
};

const userPersistConfig = {
  key: "user",
  storage,
  whitelist: ["id", "name"],
};

const recipePersistConfig = {
  key: "recipe",
  storage,
  whitelist: ["ingredients", "suggestions", "selectRecipe", "modal"],
};

const persistedChatReducer = persistReducer(chatPersistConfig, chatReducer);
const persistUserReducer = persistReducer(userPersistConfig, userReducer);
const persistRecipeReducer = persistReducer(recipePersistConfig, recipeReducer);

export const store = configureStore({
  reducer: {
    chat: persistedChatReducer,
    user: persistUserReducer,
    recipe: persistRecipeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
  devTools: import.meta.env.DEV,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
