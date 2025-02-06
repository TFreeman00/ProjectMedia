const authSlice = {
  state: {
    authToken: null,
    authLoading: false,
    authError: null,
  },
  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.listeners.forEach((listener) => listener(this.state));
  },
  listeners: [],
  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  },
  login: async (username, password) => {
    this.setState({ authLoading: true });
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed.");
      }

      const data = await response.json();
      this.setState({ authToken: data.token, authLoading: false });
    } catch (error) {
      this.setState({ authError: error, authLoading: false });
    }
  },
  logout: () => {
    this.setState({
      authToken: null,
      authLoading: false,
      authError: null,
      
    });
  },
  verifyAccount: async (inviteCode, verifyCode) => {
    this.setState({ authLoading: true });
    try {
      const response = await fetch(`/Account/verify?invite=${inviteCode}&code=${verifyCode}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Verification failed.");
      }

      const result = await response.json();
      
      this.setState({ authLoading: false });
      return result;
    } catch (error) {
      this.setState({ authError: error, authLoading: false });
      throw error; 
    }
  },
};

export default authSlice;

