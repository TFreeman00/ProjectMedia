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
    this.setState({ authLoading: true, authError: null });
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message || "Login failed.");
      }

      const data = await response.json();
      this.setState({ authToken: data.token, authLoading: false });
      localStorage.setItem("authToken", data.token); // Persist token
      localStorage.setItem("isLoggedIn", "true"); // Persist login status
      return true; // Indicate successful login
    } catch (error) {
      this.setState({ authError: error, authLoading: false });
      return false; // Indicate failed login
    }
  },
  logout: () => {
    this.setState({
      authToken: null,
      authLoading: false,
      authError: null,
    });
    localStorage.removeItem("authToken");
    localStorage.removeItem("isLoggedIn");
  },
  signup: async (username, password) => {
    this.setState({ authLoading: true, authError: null });
    try {
      const response = await fetch("/api/auth/signup", {
        // Assuming a signup endpoint
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message || "Signup failed.");
      }

      this.setState({ authLoading: false });
      return true; // Indicate successful signup
    } catch (error) {
      this.setState({ authError: error, authLoading: false });
      return false; // Indicate failed signup
    }
  },
  verifyAccount: async (inviteCode, verifyCode) => {
    this.setState({ authLoading: true, authError: null });
    try {
      const response = await fetch(
        `/Account/verify?invite=${inviteCode}&code=${verifyCode}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message || "Verification failed.");
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
