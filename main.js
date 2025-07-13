const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("open");

  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

navLinks.addEventListener("click", () => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-line");
});

// Modal functionality
const modal = document.getElementById("bookingModal");
const bookNowButtons = document.querySelectorAll(".book-now-btn");
const closeBtn = document.querySelector(".close");
const cancelBtn = document.getElementById("cancelBooking");
const bookingForm = document.getElementById("bookingForm");

// Open modal when Book Now buttons are clicked
bookNowButtons.forEach(button => {
  button.addEventListener("click", () => {
    const roomType = button.getAttribute("data-room");
    if (roomType) {
      document.getElementById("roomType").value = roomType;
    }
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
  });
});

// Close modal functions
function closeModal() {
  modal.style.display = "none";
  document.body.style.overflow = "auto";
  bookingForm.reset();
}

closeBtn.addEventListener("click", closeModal);
cancelBtn.addEventListener("click", closeModal);

// Close modal when clicking outside
window.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});

// Form validation and submission
bookingForm.addEventListener("submit", function(e) {
  e.preventDefault();
  
  // Get form data
  const formData = new FormData(this);
  const bookingData = Object.fromEntries(formData);
  
  // Basic validation
  const requiredFields = ["guestName", "guestEmail", "guestPhone", "checkInDate", "checkOutDate", "adults", "roomType"];
  let isValid = true;
  
  requiredFields.forEach(field => {
    const input = document.getElementById(field);
    if (!input.value.trim()) {
      input.style.borderColor = "#e74c3c";
      isValid = false;
    } else {
      input.style.borderColor = "#ddd";
    }
  });
  
  // Email validation
  const email = document.getElementById("guestEmail");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    email.style.borderColor = "#e74c3c";
    isValid = false;
  }
  
  // Date validation
  const checkIn = new Date(document.getElementById("checkInDate").value);
  const checkOut = new Date(document.getElementById("checkOutDate").value);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  if (checkIn < today) {
    document.getElementById("checkInDate").style.borderColor = "#e74c3c";
    isValid = false;
  }
  
  if (checkOut <= checkIn) {
    document.getElementById("checkOutDate").style.borderColor = "#e74c3c";
    isValid = false;
  }
  
  if (isValid) {
    // Simulate form submission
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Processing...";
    submitBtn.disabled = true;
    
    setTimeout(() => {
      alert("Booking submitted successfully! We'll contact you soon.");
      closeModal();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 2000);
  } else {
    alert("Please fill in all required fields correctly.");
  }
});

// Set minimum date for check-in and check-out
const today = new Date().toISOString().split('T')[0];
document.getElementById("checkInDate").min = today;
document.getElementById("checkOutDate").min = today;

// Update check-out minimum date when check-in changes
document.getElementById("checkInDate").addEventListener("change", function() {
  document.getElementById("checkOutDate").min = this.value;
});

const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
};

// header container
ScrollReveal().reveal(".header__container p", {
  ...scrollRevealOption,
});

ScrollReveal().reveal(".header__container h1", {
  ...scrollRevealOption,
  delay: 500,
});

// about container
ScrollReveal().reveal(".about__image img", {
  ...scrollRevealOption,
  origin: "left",
});

ScrollReveal().reveal(".about__content .section__subheader", {
  ...scrollRevealOption,
  delay: 500,
});

ScrollReveal().reveal(".about__content .section__header", {
  ...scrollRevealOption,
  delay: 1000,
});

ScrollReveal().reveal(".about__content .section__description", {
  ...scrollRevealOption,
  delay: 1500,
});

ScrollReveal().reveal(".about__btn", {
  ...scrollRevealOption,
  delay: 2000,
});

// room container
ScrollReveal().reveal(".room__card", {
  ...scrollRevealOption,
  interval: 500,
});

// service container
ScrollReveal().reveal(".service__list li", {
  ...scrollRevealOption,
  interval: 500,
  origin: "right",
});