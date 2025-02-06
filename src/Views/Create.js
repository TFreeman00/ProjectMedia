import authStore from "../Redux/Slices/authSlice"; 
class CreateAccountSection extends HTMLElement {
  constructor(onNavigate) {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    const template = document.createElement("template");
    template.innerHTML = `
      <style>
        /* Your CSS styles here */
      </style>
      <div class="create-account-container">
        <h2>Create Account</h2>
        <form id="signupForm">
          <div>
            <label for="signupUsername">Username:</label>
            <input type="text" id="signupUsername" name="signupUsername" required />
          </div>
          <div>
            <label for="signupPassword">Password:</label>
            <input type="password" id="signupPassword" name="signupPassword" required />
          </div>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    `;

    shadow.appendChild(template.content.cloneNode(true));

    const signupForm = shadow.querySelector("#signupForm");
    signupForm.addEventListener("submit", (event) =>
      this.handleSignupSubmit(event, onNavigate)
    );
  }

  handleSignupSubmit = async (event, onNavigate) => {
    event.preventDefault();
    const username = this.shadowRoot.querySelector("#signupUsername").value;
    const password = this.shadowRoot.querySelector("#signupPassword").value;

    try {
      const result = await authStore.signup(username, password); 
      if (result) {
        alert("Account created successfully. Please log in.");
        onNavigate("/login"); 
      } else {
        alert("Signup failed. Please check your information.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Signup failed. Please check your information.");
    }
  };
}

customElements.define("create-account-section", CreateAccountSection);
export default CreateAccountSection;
