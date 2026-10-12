/* Site behavior: all editable content and URLs live in config.js. */
(() => {
  const config = window.SITE_CONFIG || {};
  document.querySelectorAll("[data-site]").forEach((el) => {
    const key = el.dataset.site;
    if (typeof config[key] === "string" && config[key].trim()) el.textContent = config[key];
  });
  document.querySelectorAll("[data-order-link]").forEach((link) => {
    const invite = config.discordInvite || "#custom-bot";
    link.href = invite;
    if (invite.includes("YOUR_INVITE_CODE") || invite === "#") {
      link.href = "#custom-bot";
      link.addEventListener("click", (event) => {
        event.preventDefault();
        alert("Add your real Discord invite URL in config.js first.");
      });
    }
    link.setAttribute("aria-label", "Join the official bot owner's Discord server to order a custom bot");
  });
  const menuButton = document.getElementById("menuBtn");
  const nav = document.getElementById("navLinks");
  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(open));
      menuButton.textContent = open ? "Close" : "Menu";
    });
    nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.textContent = "Menu";
    }));
  }
  const items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    items.forEach((item) => observer.observe(item));
  } else {
    items.forEach((item) => item.classList.add("in-view"));
  }
})();
