import router from "../app/route.js";
import heroStyles from "../scss/View/hero.scss?inline";

class HeroSection extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    const template = document.createElement("template");
    template.innerHTML = `
      <style>
        ${heroStyles}
      </style>
      <div class="hero-content">
        <h1>Welcome To Artists Alley</h1>
        <p>Your journey starts here. Discover amazing features.</p>
        <button class="cta-btn">Get Started</button>
      </div>
    `;

    shadow.appendChild(template.content.cloneNode(true));

    const getStartedButton = shadow.querySelector(".cta-btn");
    if (getStartedButton) {
      getStartedButton.addEventListener("click", () => {
        router("/login");
      });
    } else {
      console.error("CTA button not found in HeroSection shadow DOM");
    }
    console.log("HeroSection constructor finished.");
  }

  connectedCallback() {
    console.log("HeroSection connected to DOM.");
  }
}

customElements.define("hero-section", HeroSection);
export default HeroSection;
