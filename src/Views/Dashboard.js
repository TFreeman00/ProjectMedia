// Views/DashboardSection.js
import userStore from "../Redux/Slices/userSlice.js";
import UserDashboard from "./UserDashboard.js";
import GuestDashboard from "./GuestDashboard.js";

class DashboardSection extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render();
  }

  render() {
    const shadowRoot = this.shadowRoot;
    shadowRoot.innerHTML = "";

    const user = userStore.state.user;

    if (user && !user.isGuest) {
      const userDashboard = document.createElement("user-dashboard-section");
      shadowRoot.appendChild(userDashboard);
    } else {
      const guestDashboard = document.createElement("guest-dashboard-section");
      shadowRoot.appendChild(guestDashboard);
    }
  }

  connectedCallback() {
    this.unsubscribe = userStore.subscribe(() => this.render());
    this.render();
    console.log("DashboardSection connected to DOM.");
  }

  disconnectedCallback() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
    console.log("DashboardSection disconnected from DOM.");
  }
}

customElements.define("dashboard-section", DashboardSection);
export default DashboardSection;
