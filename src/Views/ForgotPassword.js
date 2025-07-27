import router from "../services/route.js";
import forgotPasswordStyles from "../scss/View/forgot.scss?inline";

class ForgotPasswordSection extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    this.render(shadow);
  }

  render(shadowRoot) {
    const template = document.createElement("template");
    template.innerHTML = `
      <style>
        ${forgotPasswordStyles}
      </style>
      <div class="forgot-password-container">
        <h2>Forgot Password?</h2>
        <p>Enter your email address to receive a password reset link.</p>
        <form id="forgotPasswordForm" class="forgot-password-form">
          <div class="form-group">
            <label for="email">Email Address:</label>
            <input type="email" id="email" name="email" required class="input">
          </div>
          <button type="submit" class="button button-primary forgot-password-button">Send Reset Link</button>
        </form>
        <div class="login-link">
          <a href="/login">Back to Login</a>
        </div>
      </div>
    `;
    shadowRoot.appendChild(template.content.cloneNode(true));

    const forgotPasswordForm = shadowRoot.querySelector("#forgotPasswordForm");
    if (forgotPasswordForm) {
      forgotPasswordForm.addEventListener(
        "submit",
        this.handleForgotPasswordSubmit.bind(this)
      );
    }

    const loginLink = shadowRoot.querySelector(".login-link a");
    if (loginLink) {
      loginLink.addEventListener("click", (event) => {
        event.preventDefault();
        router("/login");
      });
    }
  }

  handleForgotPasswordSubmit(event) {
    event.preventDefault();
    const email = this.shadowRoot.querySelector("#email").value;
    console.log("Forgot password request for:", email);
    // In a real application, you would send this email to your backend
    // to initiate the password reset process.
    alert(
      `A password reset link has been sent to ${email} (not actually implemented yet).`
    );
    router("/login");
  }

  connectedCallback() {
    console.log("ForgotPasswordSection connected to DOM.");
  }
}

customElements.define("forgot-password-section", ForgotPasswordSection);
export default ForgotPasswordSection;
