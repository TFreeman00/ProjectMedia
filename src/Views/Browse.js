import browseStyles from "../scss/View/browse.scss?inline";
import ArtModal from "./ArtModal.js";

// Dummy data for showcasing the grid.
// In a real app, this would come from an API.
const artPieces = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1944",
    title: "Floral Dreams",
    artist: "Jane Doe",
    price: "150.00",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1579965342575-16428a7c8881?q=80&w=1992",
    title: "Cerulean Splash",
    artist: "John Artist",
    price: "220.00",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?q=80&w=2067",
    title: "Cosmic Ocean",
    artist: "Alex Art",
    price: "300.00",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1501493498939-7a71a933a009?q=80&w=2070",
    title: "The Thinker",
    artist: "Studio Artista",
    price: "95.00",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1515405295579-ba7b45403062?q=80&w=2080",
    title: "Neon Night",
    artist: "Cyber Brush",
    price: "450.00",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1578301978018-3005759f48f7?q=80&w=2070",
    title: "Golden Face",
    artist: "Mia Gold",
    price: "600.00",
  },
];

class BrowseSection extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>${browseStyles}</style>
      <div class="browse-container">
        <h2>Explore Artwork</h2>
        <div class="art-grid">
          ${artPieces
            .map(
              (art) => `
            <div class="art-card" data-id="${art.id}">
              <img src="${art.src}" alt="${art.title}" loading="lazy">
              <div class="art-card-overlay">
                <p>${art.title}</p>
              </div>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
    `;
  }

  connectedCallback() {
    this.shadowRoot.querySelectorAll(".art-card").forEach((card) => {
      card.addEventListener("click", () => {
        const artId = card.dataset.id;
        const artData = artPieces.find((p) => p.id == artId);
        this.openArtModal(artData);
      });
    });
  }

  openArtModal(artData) {
    // Check if a modal already exists and remove it
    let existingModal = document.querySelector("art-modal");
    if (existingModal) {
      existingModal.remove();
    }

    // Create and append the new modal to the document body
    const artModal = new ArtModal();
    artModal.setData(artData);
    document.body.appendChild(artModal);
  }
}

customElements.define("browse-section", BrowseSection);
export default BrowseSection;
