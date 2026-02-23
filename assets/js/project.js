// Wait for DOM to load before initializing
document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.getElementById("theme-toggle");
  const html = document.documentElement;

  if (!toggleBtn) {
    console.error("Theme toggle button not found");
    return;
  }

  // Load saved theme preference
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    html.classList.add("dark");
    updateToggleIcon();
  }

  // Theme toggle functionality
  toggleBtn.addEventListener("click", () => {
    html.classList.toggle("dark");
    
    if (html.classList.contains("dark")) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
    
    updateToggleIcon();
  });

  function updateToggleIcon() {
    if (html.classList.contains("dark")) {
      toggleBtn.textContent = "☀️";
      toggleBtn.title = "Switch to light mode";
    } else {
      toggleBtn.textContent = "🌙";
      toggleBtn.title = "Switch to dark mode";
    }
  }

  // Initialize icon on page load
  updateToggleIcon();

  // Add smooth animations to project cards on scroll
  const cards = document.querySelectorAll(".project-card");
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }, index * 100);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  cards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(card);
  });
});
