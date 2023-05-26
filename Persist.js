import { configureStore } from "@reduxjs/toolkit";
import tollGateReducer from "./components/addTollGate/store/tollGateSlice";
import tollEntryReducer from "./components/addTollEntries/store/tollEntrySlice";


const localStorageMiddleware = ({ getState }) => {
  return next => action => {
    const result = next(action);
    localStorage.setItem('applicationState', JSON.stringify(getState()));
    return result;
  };
};

const reHydrateStore = () => {
  if (localStorage.getItem('applicationState') !== null) {
    return JSON.parse(localStorage.getItem('applicationState'));
  }
};

export default configureStore({
  reducer: {
    tollEntry: tollEntryReducer,
    tollGate: tollGateReducer
    
  },
  preloadedState: reHydrateStore(),
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(localStorageMiddleware),

});
