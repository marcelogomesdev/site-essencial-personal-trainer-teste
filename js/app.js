(() => {
  'use strict';

  const config = window.SITE_CONFIG;
  if (!config) return;

  const getByPath = (obj, path) => path.split('.').reduce((acc, key) => acc?.[key], obj);

  // Conteúdo textual centralizado
  document.querySelectorAll('[data-bind]').forEach((el) => {
    const value = getByPath(config, el.dataset.bind);
    if (value !== undefined && value !== null) el.textContent = value;
  });

  // SEO básico
  if (config.seo?.title) document.title = config.seo.title;
  const description = document.querySelector('meta[name="description"]');
  const ogTitle = document.querySelector('meta[property="og:title"]');
  const ogDescription = document.querySelector('meta[property="og:description"]');
  if (description && config.seo?.description) description.content = config.seo.description;
  if (ogTitle && config.seo?.title) ogTitle.content = config.seo.title;
  if (ogDescription && config.seo?.description) ogDescription.content = config.seo.description;

  // Links dinâmicos
  const message = encodeURIComponent(config.contact.whatsappMessage || 'Olá! Gostaria de mais informações.');
  const links = {
    whatsapp: `https://wa.me/${config.contact.whatsapp}?text=${message}`,
    phone: `tel:+${config.contact.phone}`,
    email: `mailto:${config.contact.email}`,
    instagram: config.contact.instagram,
    linkedin: config.contact.linkedin
  };

  Object.entries(links).forEach(([key, href]) => {
    document.querySelectorAll(`[data-link="${key}"]`).forEach((el) => {
      if (href) el.setAttribute('href', href);
    });
  });

  // Seções opcionais sem espaços residuais
  Object.entries(config.sections || {}).forEach(([section, enabled]) => {
    document.querySelectorAll(`[data-section="${section}"], [data-section-link="${section}"]`).forEach((el) => {
      el.hidden = !enabled;
      if (!enabled) el.setAttribute('aria-hidden', 'true');
    });
  });

  // Ícones SVG embutidos para os serviços
  const icons = {
    spark: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l1.5 5.2L19 9l-5.5 1.8L12 16l-1.5-5.2L5 9l5.5-1.8L12 2Zm7 12 .8 2.7L22 18l-2.2 1.3L19 22l-.8-2.7L16 18l2.2-1.3L19 14Z"/></svg>',
    shield: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2 4.5 5v5.8c0 4.8 3.1 9.2 7.5 10.7 4.4-1.5 7.5-5.9 7.5-10.7V5L12 2Zm-1.1 13.4-3-3 1.4-1.4 1.6 1.6 3.8-3.8 1.4 1.4-5.2 5.2Z"/></svg>',
    chart: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 19h16v2H2V3h2v16Zm3-2H5v-6h2v6Zm5 0H9V7h3v10Zm5 0h-3V4h3v13Zm4 0h-2v-8h2v8Z"/></svg>',
    layers: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 2 9 5-9 5-9-5 9-5Zm-7.5 9L12 15l7.5-4L21 12l-9 5-9-5 1.5-1Zm0 5L12 20l7.5-4L21 17l-9 5-9-5 1.5-1Z"/></svg>',
    clock: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 1 0 .01 20.01A10 10 0 0 0 12 2Zm1 11h-5V6h2v5h3v2Z"/></svg>',
    hand: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 11V5a2 2 0 1 1 4 0v4-5a2 2 0 1 1 4 0v5-3a2 2 0 1 1 4 0v7c0 5-3.1 9-8 9-3.3 0-5.4-1.7-7-4l-2.4-3.4A2 2 0 0 1 4.8 12L7 14.3V11Z"/></svg>'
  };

  const servicesGrid = document.getElementById('services-grid');
  if (servicesGrid) {
    servicesGrid.innerHTML = config.services.map((service, index) => `
      <article class="service-card reveal" style="--delay:${index * 40}ms">
        <div class="service-icon">${icons[service.icon] || icons.spark}</div>
        <h3>${service.title}</h3>
        <p>${service.description}</p>
      </article>
    `).join('');
  }

  const differentialsGrid = document.getElementById('differentials-grid');
  if (differentialsGrid) {
    differentialsGrid.innerHTML = config.differentials.map((item, index) => `
      <article class="differential-card reveal" style="--delay:${index * 40}ms">
        <span class="differential-number">${item.number}</span>
        <h3>${item.title}</h3>
        <p>${item.description}</p>
      </article>
    `).join('');
  }

  const testimonialsGrid = document.getElementById('testimonials-grid');
  if (testimonialsGrid) {
    testimonialsGrid.innerHTML = config.testimonials.map((item, index) => `
      <article class="testimonial-card reveal" style="--delay:${index * 45}ms">
        <div class="stars" aria-label="5 estrelas">★★★★★</div>
        <blockquote>“${item.quote}”</blockquote>
        <div class="testimonial-author"><span>${item.name.charAt(0)}</span><div><strong>${item.name}</strong><small>${item.role}</small></div></div>
      </article>
    `).join('');
  }

  // Header e menu mobile
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');

  const closeMenu = () => {
    if (!toggle || !mobileMenu) return;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menu');
    mobileMenu.hidden = true;
    document.body.classList.remove('menu-open');
  };

  toggle?.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Abrir menu' : 'Fechar menu');
    mobileMenu.hidden = isOpen;
    document.body.classList.toggle('menu-open', !isOpen);
  });

  mobileMenu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

  const onScroll = () => {
    header?.classList.toggle('is-scrolled', window.scrollY > 12);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Reveal com respeito a prefers-reduced-motion
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealEls = document.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach((el) => observer.observe(el));
  }

  document.getElementById('year').textContent = new Date().getFullYear();
})();
