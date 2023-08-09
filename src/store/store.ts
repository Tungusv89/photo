import { configureStore } from "@reduxjs/toolkit";
import photoSlice from "./slice/photoSlice";

export const store = configureStore({
	reducer: {
		photo: photoSlice
	}
  })

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch