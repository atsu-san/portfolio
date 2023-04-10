import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";
import { featureReducers } from "../features/featuresReducers";
import { atomReducers } from "../atomic/atoms/atomReducers";

const rootReducer = combineReducers({
  ...atomReducers,
  ...featureReducers,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
