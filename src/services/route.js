import ForgotPasswordSection from "../Views/ForgotPassword.js"; // Added import

// Import the main app layout
import AppLayout from "../Views/Layout.js";
import DashboardSection from "../Views/Dashboard.js";
import HeroSection from "../Views/Hero.js";
import LoginSection from "../Views/Login.js";
import CreateAccountSection from "../Views/Create.js";
import BrowseSection from "../Views/Browse.js";
import LiveSection from "../Views/Live.js";

const routes = {
  "/": { component: DashboardSection, requiresLayout: true },
  "/hero": { component: HeroSection, requiresLayout: false },
  "/login": { component: LoginSection, requiresLayout: false },
  "/create-account": { component: CreateAccountSection, requiresLayout: false },
  "/forgot-password": {
    component: ForgotPasswordSection,
    requiresLayout: false},
  "/browse": { component: BrowseSection, requiresLayout: true },
  "/live": { component: LiveSection, requiresLayout: true },
  }

// This is the main DOM element where all content will be injected.
// It replaces your old #content div.
const contentArea = document.getElementById("content");

function router(path) {
  const route = routes[path];

  if (!route) {
    console.error("Route not found:", path);
    contentArea.innerHTML = "<h2>404 - Page Not Found</h2>";
    return;
  }

  // Clear the content area before rendering anything new
  contentArea.innerHTML = "";

  if (route.requiresLayout) {
    // If the route needs the main app layout (sidebar, etc.)
    const layout = new AppLayout(); // Create the layout shell
    const pageComponent = new route.component(); // Create the page content (e.g., Dashboard)

    // Find the content slot within the layout and place the page inside it
    const pageContentSlot = layout.querySelector(".main-content");
    pageContentSlot.appendChild(pageComponent);

    contentArea.appendChild(layout); // Add the complete layout to the DOM
  } else {
    // If it's a full-screen page like the hero or login page
    const pageComponent = new route.component();
    contentArea.appendChild(pageComponent);
  }

  // Update the browser's URL bar
  history.pushState({ path }, "", path);
}

// Function to handle navigation
export function navigate(path) {
  router(path);
}

// Listen for clicks on links with the 'data-link' attribute for SPA navigation
window.addEventListener("click", (e) => {
  if (e.target.matches("[data-link]")) {
    e.preventDefault();
    navigate(e.target.href);
  }
});


// Handle browser back/forward buttons
window.addEventListener("popstate", () => {
  router(window.location.pathname);
});

export default router;
