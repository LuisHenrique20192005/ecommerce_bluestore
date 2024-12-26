const navBar = document.querySelector(".navbar");
const menuButton = document.querySelector(".menu-button");

menuButton.addEventListener("click", () => {
  navBar.classList.toggle("show-menu");
});

window.history.replaceState(null, null, window.location.pathname);
