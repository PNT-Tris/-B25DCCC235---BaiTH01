"use strict";

const body = document.body;
const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navigationLinks = document.querySelectorAll(".nav-link");
const themeToggle = document.querySelector(".theme-toggle");
const themeIcon = document.querySelector(".theme-icon");
const projectSearch = document.querySelector("#project-search");
const filterButtons = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(".project-card");
const emptyState = document.querySelector("#empty-state");
const contactForm = document.querySelector("#contact-form");
const messageField = document.querySelector("#message");
const characterCount = document.querySelector("#character-count");
const formSuccess = document.querySelector("#form-success");

let activeFilter = "all";

// 1. Menu hamburger cho màn hình nhỏ
function closeMenu() {
  menuToggle.classList.remove("is-open");
  navLinks.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Mở menu");
}

menuToggle.addEventListener("click", () => {
  const willOpen = !navLinks.classList.contains("is-open");
  menuToggle.classList.toggle("is-open", willOpen);
  navLinks.classList.toggle("is-open", willOpen);
  menuToggle.setAttribute("aria-expanded", String(willOpen));
  menuToggle.setAttribute("aria-label", willOpen ? "Đóng menu" : "Mở menu");
});

navigationLinks.forEach((link) => {
  link.addEventListener("click", () => closeMenu());
});

// 2. Đổi giao diện sáng/tối và ghi nhớ lựa chọn trong trình duyệt
function setTheme(isDark) {
  body.classList.toggle("dark-mode", isDark);
  themeIcon.textContent = isDark ? "☀" : "☾";
  themeToggle.setAttribute("aria-label", isDark ? "Bật chế độ sáng" : "Bật chế độ tối");
  localStorage.setItem("portfolio-theme", isDark ? "dark" : "light");
}

const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme === "dark") setTheme(true);

themeToggle.addEventListener("click", () => {
  setTheme(!body.classList.contains("dark-mode"));
});

// 3. Smooth scroll, đánh dấu menu đang ở khu vực tương ứng và header khi cuộn
const sections = document.querySelectorAll("main section[id]");
const scrollObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const currentId = `#${entry.target.id}`;
      navigationLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === currentId);
      });
    });
  },
  { rootMargin: "-42% 0px -52% 0px" }
);
sections.forEach((section) => scrollObserver.observe(section));

window.addEventListener("scroll", () => {
  header.classList.toggle("is-scrolled", window.scrollY > 10);
}, { passive: true });

// 4. Lọc và tìm kiếm dự án theo tag hoặc từ khóa
function updateProjects() {
  const keyword = projectSearch.value.trim().toLocaleLowerCase("vi");
  let visibleProjects = 0;

  projectCards.forEach((card) => {
    const matchesFilter = activeFilter === "all" || card.dataset.category === activeFilter;
    const matchesSearch = card.dataset.search.includes(keyword);
    const isVisible = matchesFilter && matchesSearch;
    card.hidden = !isVisible;
    if (isVisible) visibleProjects += 1;
  });

  emptyState.hidden = visibleProjects > 0;
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.toggle("is-selected", item === button));
    updateProjects();
  });
});
projectSearch.addEventListener("input", updateProjects);

// 5. Đếm ký tự cho ô lời nhắn
function updateCharacterCount() {
  characterCount.textContent = `${messageField.value.length}/500`;
}
messageField.addEventListener("input", updateCharacterCount);

// 6. Kiểm tra form với nhiều điều kiện
function showError(input, message) {
  const group = input.closest(".form-group");
  group.classList.add("is-invalid");
  group.querySelector(".error-message").textContent = message;
}

function clearError(input) {
  const group = input.closest(".form-group");
  group.classList.remove("is-invalid");
  group.querySelector(".error-message").textContent = "";
}

function validateField(input) {
  const value = input.value.trim();
  let error = "";

  if (input.name === "name") {
    if (value.length < 2) error = "Vui lòng nhập họ tên có ít nhất 2 ký tự.";
    else if (!/^[\p{L}\s.'-]+$/u.test(value)) error = "Họ tên chỉ được chứa chữ cái và khoảng trắng.";
  }
  if (input.name === "email") {
    if (!/^\S+@\S+\.\S+$/.test(value)) error = "Vui lòng nhập một địa chỉ email hợp lệ.";
  }
  if (input.name === "subject" && value.length < 5) {
    error = "Chủ đề cần có ít nhất 5 ký tự.";
  }
  if (input.name === "message") {
    if (value.length < 20) error = "Lời nhắn cần có ít nhất 20 ký tự.";
    else if (value.length > 500) error = "Lời nhắn không được vượt quá 500 ký tự.";
  }

  if (error) {
    showError(input, error);
    return false;
  }
  clearError(input);
  return true;
}

contactForm.querySelectorAll("input, textarea").forEach((field) => {
  field.addEventListener("blur", () => validateField(field));
  field.addEventListener("input", () => {
    if (field.closest(".form-group").classList.contains("is-invalid")) validateField(field);
  });
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const fields = [...contactForm.querySelectorAll("input, textarea")];
  const isValid = fields.map(validateField).every(Boolean);
  formSuccess.textContent = "";

  if (!isValid) {
    const firstInvalid = contactForm.querySelector(".is-invalid input, .is-invalid textarea");
    firstInvalid.focus();
    return;
  }

  formSuccess.textContent = "Cảm ơn bạn! Tin nhắn đã được kiểm tra hợp lệ (bản demo).";
  contactForm.reset();
  updateCharacterCount();
});

// 7. Hiệu ứng xuất hiện khi cuộn
const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.14 }
);
document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

// 8. Hiển thị năm hiện tại ở footer
document.querySelector("#current-year").textContent = new Date().getFullYear();
