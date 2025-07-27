import userStore from "../Redux/Slices/userSlice.js";
import router from "../services/route.js";
import dashboardStyles from "../scss/View/dashboard.scss?inline";

class UserDashboardSection extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    this.render(shadow);
  }

  render(shadowRoot) {
    const user = userStore.state.user;

    const template = document.createElement("template");
    template.innerHTML = `
      <style>
        ${dashboardStyles}
      </style>
      <div class="dashboard">
        <h1>Welcome to your Personalized Dashboard, ${
          user ? user.firstName : "User"
        }!</h1>
        <div class="dashboard-content">
          <p>Customize this dashboard to your liking.</p>
          {/* Future customization options will go here */}
        </div>
        <div class="dashboard-actions">
          <button id="logoutButton" class="logout-button">Logout</button>
        </div>
      </div>
    `;
    shadowRoot.appendChild(template.content.cloneNode(true));

    const logoutButton = shadowRoot.querySelector("#logoutButton");
    if (logoutButton) {
      logoutButton.addEventListener("click", () => {
        window.authStore.logout();
        userStore.setUser(null);
        router("/");
      });
    }
  }

  connectedCallback() {
    console.log("UserDashboardSection connected to DOM.");
  }
}

customElements.define("user-dashboard-section", UserDashboardSection);
export default UserDashboardSection;
