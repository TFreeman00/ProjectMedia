export function Navbar() {
  //navbar container
  const navbar = document.createElement("nav");
  navbar.className = "navbar";

  // Navbar styles
  navbar.style.display = "flex";
  navbar.style.justifyContent = "space-between";
  navbar.style.alignItems = "center";
  navbar.style.padding = "10px 20px";
  navbar.style.backgroundColor = "#3498db";
  navbar.style.color = "#fff";

  // Brand/logo
  const brand = document.createElement("div");
  brand.textContent = "My Vite Project";
  brand.style.fontSize = "1.5rem";
  brand.style.fontWeight = "bold";

  // Toggle button
  const toggleButton = document.createElement("button");
  toggleButton.textContent = "Toggle Dark Mode";
  toggleButton.style.padding = "10px 20px";
  toggleButton.style.cursor = "pointer";
  toggleButton.style.border = "none";
  toggleButton.style.borderRadius = "5px";
  toggleButton.style.backgroundColor = "#fff";
  toggleButton.style.color = "#3498db";
  toggleButton.style.fontWeight = "bold";

  toggleButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
  });

  // Append brand and button to navbar
  navbar.appendChild(brand);
  navbar.appendChild(toggleButton);

  // Append navbar to the body
  document.body.prepend(navbar);
}
