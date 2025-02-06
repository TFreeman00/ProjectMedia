import "./scss/main.scss";
import router from "./app/route.js";

function isLoggedIn() {
  return localStorage.getItem("isLoggedIn") === "true";
}

document.addEventListener("DOMContentLoaded", () => {
  const initialPath = isLoggedIn() ? "/" : "/hero"; 
  router(initialPath);
});


document.addEventListener("click", (event) => {
  const link = event.target.closest("a");
  if (link && link.getAttribute("href")) { 
    event.preventDefault();
    const path = link.getAttribute("href");


    if (routes[path]) { 
      router(path);
    } else {
      console.error("Invalid path:", path);
    }
  }
});

window.addEventListener("popstate", (event) => {
  if (event.state && event.state.path) {
    router(event.state.path);
  }
});