import HeroSection from "../Views/Hero.js";
import LoginSection from "../Views/Login.js";
import DashboardSection from "../Views/Dashboard.js";
import CreateAccountSection from "../Views/Create.js";

const routes = {
  "/": { component: DashboardSection },
  "/hero": { component: HeroSection },
  "/login": { component: LoginSection },
  "/create-account": { component: CreateAccountSection },
  "/forgot-password": { component: CreateAccountSection },
};

function router(path) {
  const contentArea = document.getElementById("content");

  const updateContent = (Component) => {
    const componentInstance = new Component();
    if (contentArea) {
      contentArea.innerHTML = "";
      contentArea.appendChild(componentInstance);
      history.pushState({ path }, "", path);
    } else {
      console.error("Content area not found!");
    }
  };

  
  if (routes && routes[path]) {
    updateContent(routes[path].component);
  } else {
    console.error("Route not found:", path);
    contentArea.innerHTML = "Page Not Found"; 
  }
}

export default router;
