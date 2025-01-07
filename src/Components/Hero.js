class HeroSection extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    // Styles for Hero Section
    const style = document.createElement("style");
    style.textContent = `
      :host {
        font-family: "Source Code Pro", monospace;
        display: flex;
        border-radius: 10px;  
        text-align: center;
        padding: 50px 20px;
        background: #4aa3df;
        color: #ecf0f1;
      }
      .hero-image {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        object-fit: cover;
        z-index: -1; 
        width: 100%;
        height: 100%;
      }
      .hero-content {
        position: relative;
        z-index: 1;
      }
      h1 {
        font-size: 2.5rem;
        margin-bottom: 10px;
      }
      p {
        font-size: 1.2rem;
        margin-bottom: 20px;
      }
      .cta-btn {
        background: #2c3e50;
        color: #ecf0f1;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 1rem;
        transition: background 0.3s;
      }
      .cta-btn:hover {
        background: #34495e;
      }
    `;

    // Hero Content
    const wrapper = document.createElement("div");
    wrapper.innerHTML = `
      < div class=" hero-content">
      <h1>Welcome To Artists Alley</h1>
      <p>Your journey starts here. Discover amazing features.</p>
      <button class="cta-btn">Get Started</button>
      </div>
      <img class="hero-image" src="./Assets/hero.jpg" alt="Hero Image">
    `;

    // Append styles and content to Shadow DOM
    shadow.appendChild(style);
    shadow.appendChild(wrapper);
  }
}

// Define the custom element
customElements.define("hero-section", HeroSection);
