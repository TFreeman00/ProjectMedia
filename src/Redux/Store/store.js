// store.js
import authSlice from '../Slices/authSlice';
import userSlice from '../Slices/userSlice';

const store = {
  auth: authSlice,
  user: userSlice,
};

export default store;