import router from "../services/route.js";
import loginStyles from "../scss/View/login.scss?inline";
import userStore from "../Redux/Slices/userSlice.js";

class LoginSection extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    this.render(shadow);
  }

  render(shadowRoot) {
    const template = document.createElement("template");
    template.innerHTML = `
      <style>
        ${loginStyles}
      </style>
      <div class="login-container">
        <h1>Welcome</h1>
        <form class="login-form" id="loginForm">
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>
          </div>
          <div class="form-group">
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required>
          </div>
          <button type="submit" class="login-submit-button">Login</button>
        </form>
        <div class="auth-options">
          <button id="createAccountButton" class="button auth-option-button">Create Account</button>
          <button id="guestLoginButton" class="button auth-option-button">Continue as Guest</button>
          <button id="forgotPasswordButton" class="button auth-option-button">Forgot Password?</button>
        </div>
      </div>
    `;
    shadowRoot.appendChild(template.content.cloneNode(true));

    this.handleLogin = this.handleLogin.bind(this);
    this.handleGuestLogin = this.handleGuestLogin.bind(this);
    this.handleCreateAccount = this.handleCreateAccount.bind(this);
    this.handleForgotPassword = this.handleForgotPassword.bind(this);

    const loginForm = shadowRoot.querySelector("#loginForm");
    if (loginForm) {
      loginForm.addEventListener("submit", this.handleLogin);
    } else {
      console.error("Login form not found in LoginSection shadow DOM");
    }

    const guestLoginButton = shadowRoot.querySelector("#guestLoginButton");
    if (guestLoginButton) {
      guestLoginButton.addEventListener("click", this.handleGuestLogin);
    }

    const createAccountButton = shadowRoot.querySelector(
      "#createAccountButton"
    );
    if (createAccountButton) {
      createAccountButton.addEventListener("click", this.handleCreateAccount);
    }

    const forgotPasswordButton = shadowRoot.querySelector(
      "#forgotPasswordButton"
    );
    if (forgotPasswordButton) {
      forgotPasswordButton.addEventListener("click", this.handleForgotPassword);
    }

    console.log("LoginSection constructor finished.");
  }

  handleLogin(event) {
    event.preventDefault();
    const form = event.target;
    const email = form.elements.email.value;
    const password = form.elements.password.value;
    console.log("Login attempt:", { email, password });
    window.authStore.login(email, password).then((success) => {
      if (success) {
        router("/");
      } else {
        alert("Login failed. Please check your credentials.");
      }
    });
  }

  handleGuestLogin() {
    userStore.setUser({ firstName: "Guest", isGuest: true });
    router("/");
  }

  handleCreateAccount() {
    router("/create-account");
  }

  handleForgotPassword() {
    router("/forgot-password");
  }

  connectedCallback() {
    console.log("LoginSection connected to DOM.");
  }

  disconnectedCallback() {
    const loginForm = this.shadowRoot?.querySelector("#loginForm");
    if (loginForm) {
      loginForm.removeEventListener("submit", this.handleLogin);
    }
    const guestLoginButton =
      this.shadowRoot?.querySelector("#guestLoginButton");
    if (guestLoginButton) {
      guestLoginButton.removeEventListener("click", this.handleGuestLogin);
    }
    const createAccountButton = this.shadowRoot?.querySelector(
      "#createAccountButton"
    );
    if (createAccountButton) {
      createAccountButton.removeEventListener(
        "click",
        this.handleCreateAccount
      );
    }
    const forgotPasswordButton = this.shadowRoot?.querySelector(
      "#forgotPasswordButton"
    );
    if (forgotPasswordButton) {
      forgotPasswordButton.removeEventListener(
        "click",
        this.handleForgotPassword
      );
    }
    console.log("LoginSection disconnected.");
  }
}

customElements.define("login-section", LoginSection);
export default LoginSection;
