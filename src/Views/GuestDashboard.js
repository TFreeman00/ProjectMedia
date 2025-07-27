import router from "../services/route.js";
import dashboardStyles from "../scss/View/dashboard.scss?inline";

class GuestDashboardSection extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    this.render(shadow);
  }

  render(shadowRoot) {
    const template = document.createElement("template");
    template.innerHTML = `
      <style>
        ${dashboardStyles}
      </style>
      <div class="dashboard">
        <h1>Welcome to the Guest Dashboard!</h1>
        <div class="dashboard-content">
          <p>Explore some of our public features.</p>
          {/* Public features or information can be displayed here */}
        </div>
        <div class="dashboard-actions">
          <button id="loginButton" class="button">Login</button>
        </div>
      </div>
    `;
    shadowRoot.appendChild(template.content.cloneNode(true));

    const loginButton = shadowRoot.querySelector("#loginButton");
    if (loginButton) {
      loginButton.addEventListener("click", () => {
        router("/login");
      });
    }
  }

  connectedCallback() {
    console.log("GuestDashboardSection connected to DOM.");
  }
}

customElements.define("guest-dashboard-section", GuestDashboardSection);
export default GuestDashboardSection;
