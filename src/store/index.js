import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducer/user.reducer';
import uploadReducer from './reducer/upload.reducer';
import historyReducer from './reducer/history.reducer';

const store = configureStore({
  reducer: {
    userReducer,
    uploadReducer,
    historyReducer
  }
})

export default store