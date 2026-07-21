const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");
const navLinks = document.querySelectorAll(".main-nav a");
const currentYear = document.querySelector("#currentYear");

function closeMenu() {
  menuToggle?.setAttribute("aria-expanded", "false");
  mainNav?.classList.remove("open");
  document.body.classList.remove("menu-open");
}

menuToggle?.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  mainNav?.classList.toggle("open");
  document.body.classList.toggle("menu-open");
});

navLinks.forEach(link => {
  link.addEventListener("click", closeMenu);
});

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}
