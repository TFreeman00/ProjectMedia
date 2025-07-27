import authStore from "../Redux/Slices/authSlice.js";
import router from "../services/route.js";
import createStyles from "../scss/View/create.scss?inline";

class CreateAccountSection extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    this.render(shadow);
  }

  render(shadowRoot) {
    const template = document.createElement("template");
    template.innerHTML = `
      <style>
        ${createStyles}
      </style>
      <div class="create-account-container">
        <h2>Create Account</h2>
        <form id="signupForm" class="create-account-form">
          <div class="form-group">
            <label for="signupUsername">Username:</label>
            <input type="text" id="signupUsername" name="signupUsername" required class="input"/>
          </div>
          <div class="form-group">
            <label for="signupEmail">Email:</label>
            <input type="email" id="signupEmail" name="signupEmail" required class="input"/>
          </div>
          <div class="form-group">
            <label for="signupPassword">Password:</label>
            <input type="password" id="signupPassword" name="signupPassword" required class="input"/>
          </div>
          <button type="submit" class="button button-primary create-button">Sign Up</button>
          <div class="login-link">
            <a href="/login">Back to Login</a>
          </div>
        </form>
      </div>
    `;

    shadowRoot.appendChild(template.content.cloneNode(true));

    const signupForm = shadowRoot.querySelector("#signupForm");
    signupForm.addEventListener("submit", this.handleSignupSubmit.bind(this));

    const loginLink = shadowRoot.querySelector(".login-link a");
    if (loginLink) {
      loginLink.addEventListener("click", (event) => {
        event.preventDefault();
        router("/login");
      });
    }
  }

  handleSignupSubmit = async (event) => {
    event.preventDefault();
    const username = this.shadowRoot.querySelector("#signupUsername").value;
    const email = this.shadowRoot.querySelector("#signupEmail").value;
    const password = this.shadowRoot.querySelector("#signupPassword").value;

    try {
      const success = await authStore.signup(username, password, email);
      if (success) {
        alert("Account created successfully. Please log in.");
        router("/login");
      } else {
        alert("Signup failed. Please check your information.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert(`Signup failed: ${error.message}`);
    }
  };

  connectedCallback() {
    console.log("CreateAccountSection connected to DOM.");
  }
}

customElements.define("create-account-section", CreateAccountSection);
export default CreateAccountSection;
