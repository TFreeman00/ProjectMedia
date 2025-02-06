import router from "../app/route.js";

class LoginSection extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });

    const template = document.createElement("template");
    template.innerHTML = `
      <style>
        /* Your CSS styles here */
      </style>
      <section class="login">
        <h1>Login</h1>
        <form id="loginForm">
          <div>
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" required />
          </div>
          <div>
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required />
          </div>
          <button type="submit">Login</button>
        </form>
      </section>
    `;

    shadow.appendChild(template.content.cloneNode(true)); 

    const form = shadow.querySelector("#loginForm"); 

    form.addEventListener("submit", this.handleSubmit.bind(this)); 
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const username = this.shadowRoot.querySelector("#username").value; 
    const password = this.shadowRoot.querySelector("#password").value; 

    try {
      await window.authStore.login(username, password);
      router("dashboard"); 
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please check your username and password.");
    }
  };
}

customElements.define("login-section", LoginSection); 

export default LoginSection;
