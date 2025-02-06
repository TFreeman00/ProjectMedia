import userStore from "../Redux/Slices/userSlice.js";

function Dashboard() {
  const user = userStore.state.user;

  const dashboard = document.createElement("section");
  dashboard.classList.add("dashboard"); 
  dashboard.innerHTML = `
    <h1>Welcome to the Dashboard, ${user ? user.firstName : "Guest"}!</h1>
    <p>This is your personalized dashboard.</p>
    <button id="logoutButton">Logout</button> 
  `;

  const logoutButton = dashboard.querySelector("#logoutButton");
  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      window.authStore.logout();
      window.router.navigateTo("/auth"); 
    });
  }

 
  return dashboard;
}

export default Dashboard;
