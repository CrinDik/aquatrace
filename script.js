/* AquaTrace — минимальный скрипт: меню, тень шапки, появление секций. */
(function () {
  "use strict";

  var doc = document;
  var header = doc.querySelector(".site-header");
  var toggle = doc.querySelector(".nav-toggle");
  var nav = doc.getElementById("nav");

  /* --- Мобильное меню --- */
  function closeNav() {
    if (!toggle) return;
    doc.body.classList.remove("nav-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Открыть меню");
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = doc.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Закрыть меню" : "Открыть меню");
    });

    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) closeNav();
    });

    doc.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 860) closeNav();
    });
  }

  /* --- Тень шапки при скролле --- */
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* --- Появление блоков --- */
  var items = doc.querySelectorAll(".card, .step, .param, .case, .status-panel, .contact-panel");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!("IntersectionObserver" in window) || reduce) return;

  items.forEach(function (el) { el.classList.add("reveal-init"); });

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el = entry.target;
      var siblings = Array.prototype.slice.call(el.parentNode.children);
      var index = siblings.indexOf(el);
      el.style.transitionDelay = Math.min(index, 4) * 70 + "ms";
      el.classList.add("reveal-in");
      io.unobserve(el);
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });

  items.forEach(function (el) { io.observe(el); });

  /* --- Год в подвале --- */
  var year = doc.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
