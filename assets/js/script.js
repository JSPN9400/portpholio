function initTheme() {
  const root = document.documentElement;
  const toggle = document.getElementById("theme-toggle");
  const icon = document.getElementById("theme-toggle-icon");
  const saved = localStorage.getItem("theme");

  const initialTheme = saved || "dark";
  root.classList.toggle("light", initialTheme === "light");

  function setIcon() {
    if (!icon) return;
    icon.textContent = root.classList.contains("light") ? "Dark" : "Light";
  }

  setIcon();

  if (!toggle) return;
  toggle.addEventListener("click", () => {
    root.classList.toggle("light");
    localStorage.setItem("theme", root.classList.contains("light") ? "light" : "dark");
    setIcon();
  });
}

function initMobileMenu() {
  const button = document.getElementById("hamburger");
  const nav = document.getElementById("main-nav");
  if (!button || !nav) return;

  button.addEventListener("click", () => {
    const expanded = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!expanded));
    nav.classList.toggle("open");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      button.setAttribute("aria-expanded", "false");
      nav.classList.remove("open");
    });
  });
}

function initStickyHeader() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  function update() {
    header.classList.toggle("scrolled", window.scrollY > 10);
  }

  update();
  window.addEventListener("scroll", update);
}

function initActiveLinks() {
  const links = Array.from(document.querySelectorAll(".main-nav .nav-link"));
  if (links.length === 0) return;

  const page = document.body.dataset.page || "";
  const pageMap = {
    home: "index.html",
    projects: "projects.html",
    writing: "writing.html",
    resume: "resume.html",
  };

  const currentFile = pageMap[page] || window.location.pathname.split("/").pop() || "index.html";

  links.forEach((link) => {
    link.classList.remove("active");
    const href = link.getAttribute("href") || "";
    if (!href.startsWith("#") && href === currentFile) {
      link.classList.add("active");
    }
  });

  const sectionLinks = links.filter((link) => (link.getAttribute("href") || "").startsWith("#"));
  if (sectionLinks.length === 0) return;

  const items = sectionLinks
    .map((link) => {
      const id = link.getAttribute("href");
      if (!id) return null;
      const section = document.querySelector(id);
      return section ? { link, section } : null;
    })
    .filter(Boolean);

  if (items.length === 0) return;

  function setActiveByScroll() {
    const header = document.querySelector(".site-header");
    const headerHeight = header ? header.offsetHeight : 72;
    const probeY = headerHeight + window.innerHeight * 0.35;
    const isNearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;

    let current = items[0];
    let bestDistance = Number.POSITIVE_INFINITY;

    if (isNearBottom) {
      current = items[items.length - 1];
    } else {
      items.forEach((item) => {
        const rect = item.section.getBoundingClientRect();
        const containsProbe = rect.top <= probeY && rect.bottom > probeY;
        if (containsProbe) current = item;

        const distance = Math.abs(rect.top - headerHeight);
        if (distance < bestDistance) {
          bestDistance = distance;
          if (!containsProbe) current = item;
        }
      });
    }

    sectionLinks.forEach((link) => link.classList.remove("active"));
    current.link.classList.add("active");
  }

  setActiveByScroll();
  window.addEventListener("scroll", setActiveByScroll);
  window.addEventListener("resize", setActiveByScroll);
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (!target) return;
      event.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 84;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });
}

function initReveal() {
  const nodes = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) || nodes.length === 0) {
    nodes.forEach((node) => node.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  nodes.forEach((node) => observer.observe(node));
}

function initContactForm() {
  const form = document.getElementById("contact-form");
  const note = document.getElementById("form-note");
  const button = document.getElementById("submit-btn");
  if (!form || !note || !button) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    note.className = "form-note";
    note.textContent = "";

    const action = form.getAttribute("action") || "";
    if (!action.includes("formspree.io/f/") || action.includes("YOUR_FORM_ID")) {
      note.classList.add("error");
      note.textContent = "Formspree is not configured yet. Replace YOUR_FORM_ID in index.html.";
      return;
    }

    button.disabled = true;
    button.textContent = "Sending...";

    try {
      const response = await fetch(action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (!response.ok) throw new Error("Submission failed");

      form.reset();
      note.classList.add("success");
      note.textContent = "Message sent successfully. Thank you.";
    } catch (error) {
      note.classList.add("error");
      note.textContent = "Message could not be sent. Please try again.";
    } finally {
      button.disabled = false;
      button.textContent = "Send Message";
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initMobileMenu();
  initStickyHeader();
  initActiveLinks();
  initSmoothScroll();
  initReveal();
  initContactForm();
});
