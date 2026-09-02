const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.nav-links');

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const isOpen = navigation.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.innerHTML = `<i class="fa-solid fa-${isOpen ? 'xmark' : 'bars'}"></i>`;
  });

  navigation.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    navigation.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.innerHTML = '<i class="fa-solid fa-bars"></i>';
  }));
}

if (!reducedMotion) {
  const portrait = document.querySelector('.portrait-frame');
  const floatingElements = document.querySelectorAll('.float-on-scroll, .project');
  let ticking = false;

  const animateScroll = () => {
    const scrollY = window.scrollY;
    document.querySelectorAll('.experience, .projects, #competences, .contact').forEach((section, index) => {
      const rect = section.getBoundingClientRect();
      const distance = (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight;
      const shift = Math.max(-24, Math.min(24, distance * -30));
      const tilt = Math.max(-10, Math.min(10, distance * (index % 2 ? 12 : -12)));
      section.style.setProperty('--scroll-shift', `${shift}px`);
      section.style.setProperty('--scroll-tilt', `${tilt}deg`);
    });
    floatingElements.forEach((element, index) => {
      const rect = element.getBoundingClientRect();
      const distance = (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight;
      const rotate = Math.max(-4, Math.min(4, distance * (index % 2 ? 5 : -5)));
      const shift = Math.max(-18, Math.min(18, distance * -22));
      element.style.transform = `translateY(${shift}px) rotateX(${rotate}deg) rotateY(${-rotate}deg)`;
    });
    if (portrait) portrait.style.transform = `rotateY(${-10 + Math.sin(scrollY / 380) * 4}deg) rotateX(${4 + Math.cos(scrollY / 420) * 3}deg)`;
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(animateScroll);
      ticking = true;
    }
  }, { passive: true });
  animateScroll();
}
