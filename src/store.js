   
import {configureStore} from '@reduxjs/toolkit';
import userReducer from './components/slice/userSlice';
  
export const store=configureStore({
  reducer:{
    user:userReducer
  }
})