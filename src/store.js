import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './Dataslicer.js';

const store = configureStore({
  reducer: {
    data: dataReducer,
  },
});

export default store;