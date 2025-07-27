// This class defines the main application shell, now including a top navbar.

class AppLayout extends HTMLElement {
  constructor() {
    super();

    this.innerHTML = `
      <div id="main-app">
          <!-- Your Navbar HTML is now part of the main layout -->
          <header class="top-navbar">
            <div class="navbar-brand">Artist Alley</div>
            <div class="navbar-actions">
                <div class="theme-switcher">
                    <span class="material-icons-outlined">wb_sunny</span>
                    <label class="switch">
                        <input type="checkbox" id="theme-switcher-top">
                        <span class="slider round"></span>
                    </label>
                    <span class="material-icons-outlined">nights_stay</span>
                </div>
            </div>
          </header>

          <!-- The Desktop Sidebar -->
          <nav class="sidebar-nav">
              <div class="sidebar-header">
                  <h2 class="logo-font">AA</h2>
              </div>
              <ul>
                  <li><a href="/" data-link class="nav-link"><span class="material-icons-outlined">home</span><span class="nav-text">Home</span></a></li>
                  <li><a href="/browse" data-link class="nav-link"><span class="material-icons-outlined">search</span><span class="nav-text">Browse</span></a></li>
                  <!-- Add other links here -->
              </ul>
          </nav>

          <!-- This div is the "slot" where our router will place page content -->
          <main class="main-content">
              <!-- Page content (like Dashboard) will be injected here by the router -->
          </main>

          <!-- The Mobile Bottom Nav -->
          <nav class="bottom-nav">
              <ul>
                  <li><a href="/" data-link class="nav-link"><span class="material-icons-outlined">home</span></a></li>
                  <li><a href="/browse" data-link class="nav-link"><span class="material-icons-outlined">search</span></a></li>
                   <!-- Add other links here -->
              </ul>
          </nav>
      </div>
    `;
  }

  // connectedCallback runs when the element is added to the DOM
  connectedCallback() {
    this.updateActiveLink();

    const themeSwitcher = this.querySelector("#theme-switcher-top");
    if (themeSwitcher) {
      themeSwitcher.addEventListener("change", () => {
        // This toggles a class on the body for dark mode
        document.body.classList.toggle("dark-mode");
      });
    }
  }

  // This method highlights the currently active link in the navigation
  updateActiveLink() {
    const currentPath = window.location.pathname;
    this.querySelectorAll(".nav-link").forEach((link) => {
      if (link.getAttribute("href") === currentPath) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }
}

// Register the custom element with the browser
customElements.define("app-layout", AppLayout);

export default AppLayout;
