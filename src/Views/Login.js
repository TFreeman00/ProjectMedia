import authStore from "../Redux/Slices/authSlice";
import router from "../app/route.js";

class LoginSection extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    const template = document.createElement("template");
    template.innerHTML = `
      <style>
      </style>
      <div class="login-container">
        <h2>Login</h2>
        <form id="loginForm">
          <div>
            <label for="loginUsername">Username:</label>
            <input type="text" id="loginUsername" name="loginUsername" required />
          </div>
          <div>
            <label for="loginPassword">Password:</label>
            <input type="password" id="loginPassword" name="loginPassword" required />
          </div>
          <button type="submit">Login</button>
        </form>
        <button class="create-account-button" type="button">Create Account</button> </div>
    `;

    shadow.appendChild(template.content.cloneNode(true));

    const loginForm = shadow.querySelector("#loginForm");
    loginForm.addEventListener("submit", (event) =>
      this.handleLoginSubmit(event, onNavigate)
    );

    const createAccountButton = shadow.querySelector(".create-account-button"); 
    createAccountButton.addEventListener("click", () => {
      router("/create-account");
    });
  }

  handleLoginSubmit = async (event, onNavigate) => {
    event.preventDefault();
    const username = this.shadowRoot.querySelector("#loginUsername").value;
    const password = this.shadowRoot.querySelector("#loginPassword").value;

    try {
      const result = await authStore.login(username, password);
      if (result) {
        onNavigate("/dashboard");
      } else {
        alert("Login failed. Please check your username and password.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please check your username and password.");
    }
  };
}

customElements.define("login-section", LoginSection);
export default LoginSection;
