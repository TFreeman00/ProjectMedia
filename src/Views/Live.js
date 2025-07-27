import liveStyles from "../scss/View/live.scss?inline";

class LiveSection extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.addEventListeners();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>${liveStyles}</style>
      <div class="live-wrapper">
        <div class="video-container">
          <video poster="https://images.unsplash.com/photo-1515405295579-ba7b45403062?q=80&w=2080" autoplay muted loop>
             <!-- In a real app, you'd have <source> tags here for the live stream -->
          </video>
          <div class="live-overlay">
            <div class="live-header">
              <span class="live-tag">LIVE</span>
              <span class="viewer-count">👁️ 1,245</span>
            </div>
          </div>
          <div class="hearts-container"></div>
        </div>
        <div class="chat-container">
          <div class="chat-messages">
            <div class="chat-message"><strong>ArtLover22:</strong> This is amazing! 😍</div>
            <div class="chat-message"><strong>PainterPro:</strong> What software are you using?</div>
            <div class="chat-message"><strong>CreativeCat:</strong> Love the colors!</div>
          </div>
          <form class="chat-input-form">
            <input type="text" placeholder="Add a comment..." required>
            <button type="submit">Send</button>
          </form>
          <div class="live-actions">
             <button id="like-btn">❤️</button>
          </div>
        </div>
      </div>
    `;
  }

  addEventListeners() {
    const likeBtn = this.shadowRoot.querySelector("#like-btn");
    const chatForm = this.shadowRoot.querySelector(".chat-input-form");
    const heartsContainer = this.shadowRoot.querySelector(".hearts-container");

    likeBtn.addEventListener("click", () => this.createHeart(heartsContainer));
    chatForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = chatForm.querySelector("input");
      if (input.value.trim()) {
        this.addChatMessage(input.value);
        input.value = "";
      }
    });
  }

  addChatMessage(message) {
    const chatMessages = this.shadowRoot.querySelector(".chat-messages");
    const newMessage = document.createElement("div");
    newMessage.classList.add("chat-message");
    newMessage.innerHTML = `<strong>You:</strong> ${message}`;
    chatMessages.appendChild(newMessage);
    // Auto-scroll to the bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  createHeart(container) {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerText = "❤️";
    // Randomize horizontal position and animation duration
    heart.style.left = `${Math.random() * 80 + 10}%`;
    heart.style.animationDuration = `${Math.random() * 2 + 3}s`;
    container.appendChild(heart);
    // Remove the heart after the animation is done
    setTimeout(() => {
      heart.remove();
    }, 5000);
  }
}

customElements.define("live-section", LiveSection);
export default LiveSection;
