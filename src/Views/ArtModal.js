class ArtModal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  setData(artData) {
    this.artData = artData;
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
        <style>
            :host {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.7);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1000;
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            .modal-content {
                background-color: var(--container-bg, #fff);
                color: var(--text-color, #000);
                padding: 1.5rem;
                border-radius: 8px;
                max-width: 90%;
                max-height: 90%;
                width: 700px;
                display: flex;
                flex-direction: column;
                gap: 1rem;
                transform: scale(0.95);
                transition: transform 0.3s ease;
            }
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .modal-header h3 {
                margin: 0;
                font-size: 1.5rem;
            }
            .close-btn {
                background: none;
                border: none;
                font-size: 2rem;
                cursor: pointer;
                color: var(--text-color, #000);
            }
            .modal-body img {
                width: 100%;
                max-height: 60vh;
                object-fit: contain;
            }
            .modal-footer {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .price {
                font-size: 1.25rem;
                font-weight: bold;
            }
            .purchase-btn {
                padding: 0.75rem 1.5rem;
                border: none;
                background-color: var(--primary-color);
                color: var(--button-text-color);
                border-radius: 5px;
                cursor: pointer;
                font-size: 1rem;
            }
        </style>
        <div class="modal-wrapper">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${this.artData.title}</h3>
                    <button class="close-btn">&times;</button>
                </div>
                <div class="modal-body">
                    <img src="${this.artData.src}" alt="${this.artData.title}">
                    <p>by <strong>${this.artData.artist}</strong></p>
                </div>
                <div class="modal-footer">
                    <span class="price">$${this.artData.price}</span>
                    <button class="purchase-btn">Purchase</button>
                </div>
            </div>
        </div>
    `;

    // We add these classes after rendering to trigger the entry animation
    requestAnimationFrame(() => {
      this.style.opacity = "1";
      this.shadowRoot.querySelector(".modal-content").style.transform =
        "scale(1)";
    });
  }

  connectedCallback() {
    this.shadowRoot
      .querySelector(".close-btn")
      .addEventListener("click", this.close.bind(this));
    this.shadowRoot
      .querySelector(".modal-wrapper")
      .addEventListener("click", (e) => {
        // Close modal if user clicks on the backdrop, but not on the content
        if (e.target === this.shadowRoot.querySelector(".modal-wrapper")) {
          this.close();
        }
      });
  }

  close() {
    this.style.opacity = "0";
    this.shadowRoot.querySelector(".modal-content").style.transform =
      "scale(0.95)";
    // Remove the element from the DOM after the animation finishes
    setTimeout(() => this.remove(), 300);
  }
}

customElements.define("art-modal", ArtModal);
export default ArtModal;
