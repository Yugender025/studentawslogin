document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const navItems = document.querySelector(".nav_items");
  const navBtns = document.querySelector(".nav_btns");
  const ctct = document.querySelector(".ctct");

  hamburger.addEventListener("click", function () {
    // Toggle active classes
    hamburger.classList.toggle("active");
    navItems.classList.toggle("active");
    navBtns.classList.toggle("active");
  });

  // Close menu when clicking outside
  document.addEventListener("click", function (event) {
    if (
      !navItems.contains(event.target) &&
      !hamburger.contains(event.target) &&
      navItems.classList.contains("active")
    ) {
      hamburger.classList.remove("active");
      navItems.classList.remove("active");
      navBtns.classList.remove("active");
    }
  });
});
