// userSlice.js
import { getUser, updateUser } from '../Api/userApi';

const userSlice = {
  state: {
    user: null,
    userLoading: false,
    userError: null,
  },
  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.listeners.forEach((listener) => listener(this.state));
  },
  listeners:[],
  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  },
  fetchUser: async (userId) => {
    this.setState({ userLoading: true });
    try {
      const user = await getUser(userId);
      this.setState({ user, userLoading: false });
    } catch (error) {
      this.setState({ userError: error, userLoading: false });
    }
  },
  updateUser: async (userId, updatedData) => {
    this.setState({ userLoading: true });
    try {
      const updatedUser = await updateUser(userId, updatedData);
      this.setState({ user: updatedUser, userLoading: false });
    } catch (error) {
      this.setState({ userError: error, userLoading: false });
    }
  },
  // ... other user actions (createUser, deleteUser to be implimented in the future
};

export default userSlice;