import router from "../app/route.js"; 
class HeroSection extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    

    const template = document.createElement("template");
    template.innerHTML = `
      <style>
        .hero-content {
        }
        .cta-btn {
        }
      </style>
      <div class="hero-content">
        <h1>Welcome To Artists Alley</h1>
        <p>Your journey starts here. Discover amazing features.</p>
        <button class="cta-btn">Get Started</button>
      </div>
    `;
    shadow.appendChild(template.content.cloneNode(true)); 

    const getStartedButton = shadow.querySelector(".cta-btn");
    getStartedButton.addEventListener("click", () => {
      router("/login"); 
    });
  }
}

customElements.define("hero-section", HeroSection);

export default HeroSection;
