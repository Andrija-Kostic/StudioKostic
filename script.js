/* ===================================
   StudioKostic – Master JS
   =================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* =====================
     LOADING SCREEN
     ===================== */
  const loader = document.getElementById("loading-screen");
  window.addEventListener("load", () => {
    setTimeout(() => {
      loader?.classList.add("hidden");
    }, 600);
  });

  /* =====================
     NAV SCROLL EFFECT
     ===================== */
  const nav = document.querySelector("nav");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      nav?.classList.add("scrolled");
    } else {
      nav?.classList.remove("scrolled");
    }
  });

  /* =====================
     CURSOR TRAIL
     ===================== */
  const cursor = document.querySelector(".cursor-trail");
  let cursorTimeout;

  document.addEventListener("mousemove", (e) => {
    if (!cursor) return;

    cursor.style.left = `${e.clientX - 10}px`;
    cursor.style.top = `${e.clientY - 10}px`;
    cursor.classList.add("active");

    clearTimeout(cursorTimeout);
    cursorTimeout = setTimeout(() => {
      cursor.classList.remove("active");
    }, 100);
  });

  /* =====================
     MOBILE MENU
     ===================== */
  const mobileBtn = document.querySelector(".mobile-menu-btn");
  const mobileMenu = document.querySelector(".mobile-menu");
  const mobileClose = document.querySelector(".mobile-menu-close");

  mobileBtn?.addEventListener("click", () => {
    mobileMenu?.classList.add("active");
  });

  mobileClose?.addEventListener("click", () => {
    mobileMenu?.classList.remove("active");
  });

  document.querySelectorAll(".mobile-menu a").forEach(link => {
    link.addEventListener("click", () => {
      mobileMenu?.classList.remove("active");
    });
  });

  /* =====================
     STATS COUNTER
     ===================== */
  const stats = document.querySelectorAll(".stat-number");

  const statsObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10);
        let count = 0;
        const step = Math.max(1, target / 120);

        const update = () => {
          count += step;
          if (count < target) {
            el.textContent = Math.floor(count);
            requestAnimationFrame(update);
          } else {
            el.textContent = target;
          }
        };

        update();
        statsObserver.unobserve(el);
      }
    });
  }, { threshold: 0.6 });

  stats.forEach(stat => statsObserver.observe(stat));

  /* =====================
     SKILLS ANIMATION
     ===================== */
  const skills = document.querySelectorAll(".skill-progress");

  const skillObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        bar.style.width = bar.dataset.width || bar.style.width;
        skillObserver.unobserve(bar);
      }
    });
  }, { threshold: 0.5 });

  skills.forEach(skill => {
    skill.style.width = "0";
    skillObserver.observe(skill);
  });

  /* =====================
     PORTFOLIO FILTER
     ===================== */
  const filterBtns = document.querySelectorAll(".filter-btn");
  const portfolioItems = document.querySelectorAll(".portfolio-item");

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;

      portfolioItems.forEach(item => {
        const match =
          filter === "all" || item.dataset.category === filter;

        item.style.display = match ? "block" : "none";
      });
    });
  });

  /* =====================
     LIGHTBOX
     ===================== */
  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.innerHTML = `
    <div class="lightbox-content">
      <button class="lightbox-close">×</button>
      <img src="" alt="Preview">
    </div>
  `;
  document.body.appendChild(lightbox);

  const lightboxImg = lightbox.querySelector("img");
  const closeBtn = lightbox.querySelector(".lightbox-close");

  document.querySelectorAll(".portfolio-item img").forEach(img => {
    img.addEventListener("click", () => {
      lightboxImg.src = img.src;
      lightbox.classList.add("active");
    });
  });

  closeBtn.addEventListener("click", () => {
    lightbox.classList.remove("active");
  });

  lightbox.addEventListener("click", e => {
    if (e.target === lightbox) {
      lightbox.classList.remove("active");
    }
  });

  /* =====================
     SCROLL TO TOP
     ===================== */
  const scrollBtn = document.getElementById("scrollTop");

  window.addEventListener("scroll", () => {
    if (!scrollBtn) return;
    scrollBtn.classList.toggle("visible", window.scrollY > 400);
  });

  scrollBtn?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* =====================
     PARTICLES (LIGHT)
     ===================== */
  const particles = document.getElementById("particles-bg");
  if (particles) {
    for (let i = 0; i < 40; i++) {
      const p = document.createElement("div");
      p.className = "particle";
      p.style.left = Math.random() * 100 + "%";
      p.style.top = Math.random() * 100 + "%";
      p.style.animationDuration = 15 + Math.random() * 20 + "s";
      particles.appendChild(p);
    }
  }

});