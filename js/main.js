const header = document.getElementById("header");
const hero = document.querySelector(".hero");
const stickyCall = document.getElementById("sticky-call");

// Header scroll state
function updateHeader() {
  header.classList.toggle("scrolled", window.scrollY > 20);

  if (stickyCall && hero) {
    const showSticky = window.scrollY > hero.offsetHeight * 0.5;
    stickyCall.classList.toggle("visible", showSticky);
  }
}

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

// Mobile nav
const navToggle = document.getElementById("nav-toggle");
const navLinks = document.getElementById("nav-links");

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.classList.toggle("active", isOpen);
  navToggle.setAttribute("aria-expanded", isOpen);
  navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.classList.remove("active");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

// Scroll reveal
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
);

document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

document.querySelectorAll(".hero .reveal").forEach((el, i) => {
  el.style.transitionDelay = `${0.15 + i * 0.1}s`;
  requestAnimationFrame(() => el.classList.add("visible"));
});

// Service finder
const serviceOptions = document.querySelectorAll(".service-option");
const serviceError = document.getElementById("service-error");
const finderSubmit = document.getElementById("finder-submit");
const serviceTypeSelect = document.getElementById("service-type");

let selectedService = "repair";

serviceOptions.forEach((btn) => {
  btn.addEventListener("click", () => {
    serviceOptions.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    selectedService = btn.dataset.service;
    serviceError.hidden = true;
  });
});

finderSubmit.addEventListener("click", () => {
  if (!selectedService) {
    serviceError.hidden = false;
    return;
  }

  setServiceType(selectedService);
  sessionStorage.setItem("pw-service", selectedService);
  document.getElementById("book").scrollIntoView({ behavior: "smooth" });
});

// Service card links → pre-fill form
function setServiceType(serviceId) {
  if (!serviceTypeSelect || !serviceId) return;
  const option = serviceTypeSelect.querySelector(`option[value="${serviceId}"]`);
  if (!option) return;
  serviceTypeSelect.value = serviceId;
  serviceTypeSelect.classList.add("prefilled");
}

document.querySelectorAll("[data-service]").forEach((link) => {
  link.addEventListener("click", () => {
    setServiceType(link.dataset.service);
    sessionStorage.setItem("pw-service", link.dataset.service);
  });
});

if (serviceTypeSelect) {
  const saved = sessionStorage.getItem("pw-service");
  if (saved) setServiceType(saved);

  serviceTypeSelect.addEventListener("change", () => {
    serviceTypeSelect.classList.toggle("prefilled", serviceTypeSelect.value !== "");
  });
}

// Reviews carousel
const reviewsTrack = document.getElementById("reviews-track");
const reviewPrev = document.getElementById("review-prev");
const reviewNext = document.getElementById("review-next");
const reviewDots = document.getElementById("review-dots");

if (reviewsTrack) {
  const reviews = reviewsTrack.querySelectorAll(".review-card");
  let currentReview = 0;
  let autoplayTimer;

  reviews.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.className = `review-dot${i === 0 ? " active" : ""}`;
    dot.setAttribute("aria-label", `Go to review ${i + 1}`);
    dot.addEventListener("click", () => goToReview(i));
    reviewDots.appendChild(dot);
  });

  const dots = reviewDots.querySelectorAll(".review-dot");

  function goToReview(index) {
    currentReview = ((index % reviews.length) + reviews.length) % reviews.length;
    reviewsTrack.style.transform = `translateX(-${currentReview * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle("active", i === currentReview));
  }

  function startAutoplay() {
    clearInterval(autoplayTimer);
    autoplayTimer = setInterval(() => goToReview(currentReview + 1), 5000);
  }

  reviewPrev.addEventListener("click", () => {
    goToReview(currentReview - 1);
    startAutoplay();
  });

  reviewNext.addEventListener("click", () => {
    goToReview(currentReview + 1);
    startAutoplay();
  });

  startAutoplay();
}

// Commitment tabs
const tabBtns = document.querySelectorAll(".tab-btn");
const tabPanels = document.querySelectorAll(".tab-panel");

tabBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const tab = btn.dataset.tab;

    tabBtns.forEach((b) => {
      b.classList.toggle("active", b === btn);
      b.setAttribute("aria-selected", b === btn);
    });

    tabPanels.forEach((panel) => {
      const isActive = panel.dataset.panel === tab;
      panel.classList.toggle("active", isActive);
      panel.hidden = !isActive;
    });
  });
});

// FAQ accordion — one open at a time
document.querySelectorAll(".faq-item").forEach((item) => {
  item.addEventListener("toggle", () => {
    if (!item.open) return;
    document.querySelectorAll(".faq-item").forEach((other) => {
      if (other !== item) other.open = false;
    });
  });
});

// Contact form
const form = document.getElementById("contact-form");
const formNote = document.getElementById("form-note");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formNote.hidden = false;
  form.reset();
  serviceTypeSelect?.classList.remove("prefilled");
  sessionStorage.removeItem("pw-service");

  const btn = form.querySelector("button[type=submit]");
  btn.disabled = true;
  btn.textContent = "Enquiry Sent";
  stickyCall?.classList.remove("visible");
});
