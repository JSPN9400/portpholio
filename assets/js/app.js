/* JSPN Portfolio v4 — app.js */
'use strict';

const $  = (s, c=document) => c.querySelector(s);
const $$ = (s, c=document) => [...c.querySelectorAll(s)];
const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');

/* ── THEME ── */
const initTheme = () => {
  const saved = localStorage.getItem('jspn-theme');
  const sys = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  setTheme(saved || sys);
};
const setTheme = t => {
  document.documentElement.setAttribute('data-theme', t);
  localStorage.setItem('jspn-theme', t);
  const btn = $('.nav-theme');
  if (btn) btn.textContent = t === 'dark' ? '☀️' : '🌙';
};
const toggleTheme = () => setTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');

/* ── LOADER ── */
const hideLoader = () => {
  const l = $('#loader');
  if (l) setTimeout(() => l.classList.add('done'), 1200);
};

/* ── NAV ── */
const initNav = () => {
  const nav = $('#nav');
  const update = () => nav?.classList.toggle('scrolled', window.scrollY > 20);
  update(); window.addEventListener('scroll', update, { passive: true });

  const sections = $$('section[id]');
  const links = $$('.nav-links a');
  window.addEventListener('scroll', () => {
    let cur = '';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 80) cur = s.id; });
    links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + cur || a.getAttribute('href') === '#' + cur));
  }, { passive: true });

  const burger = $('#nav-burger');
  const mob = $('#mobile-menu');
  burger?.addEventListener('click', () => {
    burger.classList.toggle('open');
    mob?.classList.toggle('open');
    burger.setAttribute('aria-expanded', burger.classList.contains('open'));
  });
  $$('a', mob || document).forEach(a => a.addEventListener('click', () => {
    burger?.classList.remove('open');
    mob?.classList.remove('open');
  }));

  $('.nav-theme')?.addEventListener('click', toggleTheme);
};

/* ── BACK TO TOP ── */
const initBtt = () => {
  const btn = $('#btt');
  if (!btn) return;
  window.addEventListener('scroll', () => btn.classList.toggle('show', window.scrollY > 400), { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
};

/* ── TYPING ── */
const initTyping = () => {
  const el = $('#typewriter');
  if (!el) return;
  const phrases = ['Data Analyst', 'BI Consultant', 'Power BI Developer', 'Python Automation Expert', 'SQL Analytics Specialist', 'Dashboard Consultant'];
  let pi = 0, ci = 0, del = false;
  const tick = () => {
    const p = phrases[pi];
    if (!del) { el.textContent = p.slice(0, ++ci); if (ci === p.length) { del = true; setTimeout(tick, 2200); return; } }
    else { el.textContent = p.slice(0, --ci); if (ci === 0) { del = false; pi = (pi + 1) % phrases.length; setTimeout(tick, 350); return; } }
    setTimeout(tick, del ? 48 : 88);
  };
  tick();
};

/* ── PHOTO ── */
const initPhoto = () => {
  const img = $('#hero-photo');
  const fb  = $('#hero-photo-fb');
  if (!img) return;
  img.addEventListener('load',  () => { img.style.display = 'block'; if (fb) fb.style.display = 'none'; });
  img.addEventListener('error', () => { img.style.display = 'none'; if (fb) fb.style.display = 'flex'; });
  if (img.complete && img.naturalWidth > 0) { img.style.display = 'block'; if (fb) fb.style.display = 'none'; }
  else if (img.complete) { img.style.display = 'none'; if (fb) fb.style.display = 'flex'; }
};

/* ── COUNTERS ── */
let countersDone = false;
const animateCounters = () => {
  if (countersDone) return; countersDone = true;
  $$('.counter').forEach(el => {
    const target = +el.dataset.target;
    const dur = 1600; const start = performance.now();
    const step = now => {
      const p = Math.min((now - start) / dur, 1);
      el.textContent = Math.floor(target * (1 - Math.pow(1 - p, 4)));
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target;
    };
    requestAnimationFrame(step);
  });
};

/* ── SKILL BARS ── */
let skillsDone = false;
const animateSkills = () => {
  if (skillsDone) return; skillsDone = true;
  $$('.skill-bar').forEach((bar, i) => setTimeout(() => bar.style.width = bar.dataset.w + '%', i * 75));
};

/* ── REVEAL ── */
const initReveal = () => {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.06, rootMargin: '0px 0px -24px 0px' });
  $$('.reveal').forEach(el => obs.observe(el));

  const mObs = new IntersectionObserver(e => { if (e[0].isIntersecting) animateCounters(); }, { threshold: 0.3 });
  const metBar = $('.metrics-bar'); if (metBar) mObs.observe(metBar);

  const sObs = new IntersectionObserver(e => { if (e[0].isIntersecting) animateSkills(); }, { threshold: 0.15 });
  const skillSec = $('#skills'); if (skillSec) sObs.observe(skillSec);
};

/* ── FAQ ── */
const initFaq = () => {
  $$('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      $$('.faq-item.open').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
};

/* ── DATA & RENDER ── */
const state = { projects: [], articles: [], timeline: [], testimonials: [] };

const loadData = async () => {
  const base = document.querySelector('meta[name="data-base"]')?.content || 'assets/data';
  const urls = { projects: `${base}/projects.json`, articles: `${base}/articles.json`, timeline: `${base}/timeline.json`, testimonials: `${base}/testimonials.json` };
  await Promise.all(Object.entries(urls).map(async ([k, u]) => {
    try { const r = await fetch(u); state[k] = await r.json(); } catch { state[k] = []; }
  }));
};

const renderFeatured = () => {
  const el = $('#featured-project'); if (!el) return;
  const p = state.projects.find(p => p.featured); if (!p) return;
  el.innerHTML = `
    <div class="feat-left reveal reveal-left">
      <div class="feat-eyebrow badge badge-blue">⭐ Featured Case Study · ${esc(p.domain)}</div>
      <h2 class="feat-title">${esc(p.title)}</h2>
      <p class="feat-desc">${esc(p.tagline)}</p>
      <div class="feat-steps">
        <div class="feat-step"><div class="feat-step-num">1</div><div><div class="feat-step-title">Problem</div><div class="feat-step-desc">${esc(p.problem)}</div></div></div>
        <div class="feat-step"><div class="feat-step-num">2</div><div><div class="feat-step-title">Approach</div><div class="feat-step-desc">${esc(p.approach)}</div></div></div>
        <div class="feat-step"><div class="feat-step-num">3</div><div><div class="feat-step-title">Impact</div><div class="feat-step-desc">${esc(p.impact)}</div></div></div>
      </div>
      <div class="feat-btns">
        <a href="${esc(p.github)}" target="_blank" rel="noopener" class="btn btn-primary">🐙 View on GitHub</a>
        <a href="pages/projects.html" class="btn btn-outline">View All Projects →</a>
      </div>
    </div>
    <div class="feat-right reveal reveal-right">
      <div class="feat-metrics-grid">${p.metrics.map(m => `<div class="feat-metric"><div class="feat-metric-val">${esc(m.value)}</div><div class="feat-metric-lbl">${esc(m.label)}</div></div>`).join('')}</div>
      <div class="feat-tools">${p.tools.map(t => `<span class="badge badge-blue">${esc(t)}</span>`).join('')}</div>
    </div>`;
};

const renderBlogLatest = () => {
  const el = $('#blog-latest'); if (!el || !state.articles.length) return;
  const latest = state.articles.slice(0, 3);
  el.innerHTML = latest.map((a, i) => `
    <div class="blog-card reveal d${i+1}">
      <div class="blog-stripe" style="background:${esc(a.gradient)}"></div>
      <div class="blog-body">
        <span class="blog-cat" style="color:${esc(a.categoryColor)}">${esc(a.category)}</span>
        <h3 class="blog-title">${esc(a.title)}</h3>
        <p class="blog-exc">${esc(a.excerpt)}</p>
      </div>
      <div class="blog-foot">
        <span class="blog-meta">${esc(a.readTime)} · ${esc(a.date)}</span>
        <a href="pages/blog.html" class="blog-arrow">Read →</a>
      </div>
    </div>`).join('');
};

const renderJourney = () => {
  const el = $('#journey-grid'); if (!el) return;
  el.innerHTML = state.timeline.map((t, i) => `
    <div class="journey-card${i === 4 ? ' current' : ''} reveal d${Math.min(i+1,6)}">
      <div class="journey-icon" style="background:${esc(t.color)}20">${esc(t.icon)}</div>
      <div class="journey-yr">${esc(t.year)}</div>
      <div class="journey-h">${esc(t.title)}</div>
      <div class="journey-sub">${esc(t.subtitle)}</div>
      <p class="journey-p">${esc(t.description)}</p>
    </div>`).join('');
};

const renderTestimonials = () => {
  const el = $('#testi-grid'); if (!el) return;
  el.innerHTML = state.testimonials.map((t, i) => `
    <div class="testi-card reveal d${i+1}">
      <div class="testi-stars">${'★'.repeat(t.stars)}${'☆'.repeat(5-t.stars)}</div>
      <p class="testi-q">"${esc(t.quote)}"</p>
      <div class="testi-author">
        <div class="testi-av">${esc(t.initials)}</div>
        <div><div class="testi-name">${esc(t.name)}</div><div class="testi-role">${esc(t.role)} · ${esc(t.company)}</div></div>
      </div>
    </div>`).join('');
};

/* ── PROJECTS PAGE ── */
const renderProjectsPage = () => {
  const el = $('#projects-page-grid'); if (!el) return;
  el.innerHTML = state.projects.map((p, i) => `
    <div class="proj-page-card reveal d${(i%2)+1}">
      <div class="proj-page-img" style="background:linear-gradient(135deg,${esc(p.domainColor)}22,${esc(p.domainColor)}44)">
        <span style="font-size:52px">📊</span>
        <div class="proj-page-img-overlay"></div>
      </div>
      <div class="proj-page-body">
        <div class="proj-page-domain" style="color:${esc(p.domainColor)}">${esc(p.domain)}</div>
        <h2 class="proj-page-title">${esc(p.title)}</h2>
        <p class="proj-page-summary">${esc(p.tagline)}</p>
        <div class="proj-page-problem-lbl">The Problem</div>
        <p class="proj-page-problem">${esc(p.problem)}</p>
        <div class="proj-page-metrics">${p.metrics.map(m => `<div class="proj-page-metric"><div class="proj-page-metric-val">${esc(m.value)}</div><div class="proj-page-metric-lbl">${esc(m.label)}</div></div>`).join('')}</div>
        <div class="proj-page-tech">${p.tools.map(t => `<span class="badge badge-blue">${esc(t)}</span>`).join('')}</div>
      </div>
      <div class="proj-page-foot">
        <a href="${esc(p.github)}" target="_blank" rel="noopener" class="btn btn-outline btn-sm">🐙 GitHub</a>
        <a href="#" class="btn btn-primary btn-sm">📋 Case Study</a>
      </div>
    </div>`).join('');
};

/* ── BLOG PAGE ── */
const renderBlogPage = () => {
  const el = $('#blog-page-grid'); if (!el) return;
  el.innerHTML = state.articles.map((a, i) => `
    <div class="blog-page-card reveal d${(i%3)+1}" data-cat="${esc(a.category)}">
      <div class="blog-page-stripe" style="background:${esc(a.gradient)}"></div>
      <div class="blog-page-body">
        <span class="blog-page-cat" style="color:${esc(a.categoryColor)}">${esc(a.category)}</span>
        <h2 class="blog-page-title">${esc(a.title)}</h2>
        <p class="blog-page-exc">${esc(a.excerpt)}</p>
      </div>
      <div class="blog-page-foot">
        <span class="blog-page-meta">${esc(a.readTime)} · ${esc(a.date)}</span>
        <a href="#" class="blog-page-read">Read soon →</a>
      </div>
    </div>`).join('');

  // Filter
  $$('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.cat;
      $$('.blog-page-card').forEach(card => {
        if (cat === 'All' || card.dataset.cat === cat) card.classList.remove('hidden');
        else card.classList.add('hidden');
      });
    });
  });
};

/* ── CONTACT FORM ── */
const initForm = () => {
  const btn = $('#form-submit');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const name = $('#f-name')?.value.trim() || 'Visitor';
    const email = $('#f-email')?.value.trim() || '';
    if (!email) { $('#f-email')?.focus(); return; }
    const sub = encodeURIComponent(`Portfolio Enquiry — ${name}`);
    const body = encodeURIComponent(`Hello Jaishankar,\n\nI came across your portfolio and would like to connect.\n\nName: ${name}\nEmail: ${email}\nEnquiry: ${$('#f-about')?.value || ''}\n\n${$('#f-message')?.value || ''}\n\nBest regards,\n${name}`);
    btn.textContent = '✓ Opening email…'; btn.classList.add('ok');
    window.location.href = `mailto:jaishankar.9400@gmail.com?subject=${sub}&body=${body}`;
    setTimeout(() => { btn.textContent = 'Send Message →'; btn.classList.remove('ok'); }, 3000);
  });
};

/* ── SMOOTH SCROLL ── */
const initScroll = () => {
  $$('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    const t = document.getElementById(id);
    if (!t) return; e.preventDefault();
    t.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }));
};

/* ── PWA ── */
const initPWA = () => {
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('/portpholio/sw.js').catch(() => {});
};

/* ── MAIN ── */
async function init() {
  initTheme();
  initNav();
  initTyping();
  initPhoto();
  initBtt();
  initScroll();
  initFaq();
  initPWA();
  await loadData();
  renderFeatured();
  renderBlogLatest();
  renderJourney();
  renderTestimonials();
  renderProjectsPage();
  renderHomepageProjects();
  renderBlogPage();
  initReveal();
  initForm();
  hideLoader();
  setTimeout(() => {
    $$('.reveal:not(.visible)').forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.95) el.classList.add('visible');
    });
  }, 300);
}
document.addEventListener('DOMContentLoaded', init);

/* ── HOMEPAGE PROJECTS (3-4 cards teaser) ── */
const renderHomepageProjects = () => {
  const el = $('#projects-list'); if (!el) return;
  el.innerHTML = state.projects.map((p, i) => `
    <div class="proj-card reveal d${(i%2)+1}">
      <div class="proj-card-top" style="background:linear-gradient(90deg,${esc(p.domainColor)},${esc(p.domainColor)}88)"></div>
      <div class="proj-card-body">
        <div class="proj-domain" style="color:${esc(p.domainColor)}">${esc(p.domain)}</div>
        <h3 class="proj-title">${esc(p.title)}</h3>
        <p class="proj-tagline">${esc(p.tagline)}</p>
        <div class="proj-kpis">${p.metrics.slice(0,2).map(m=>`<div><span class="proj-kpi-val">${esc(m.value)}</span> <span class="proj-kpi-lbl">${esc(m.label)}</span></div>`).join('')}</div>
        <div class="proj-tags">${p.tools.slice(0,5).map(t=>`<span class="proj-tag">${esc(t)}</span>`).join('')}${p.tools.length>5?`<span class="proj-tag">+${p.tools.length-5}</span>`:''}</div>
      </div>
      <div class="proj-card-foot">
        <a class="proj-btn-gh" href="${esc(p.github)}" target="_blank" rel="noopener">🐙 GitHub</a>
        <a class="proj-btn-cs" href="pages/projects.html">Case Study →</a>
      </div>
    </div>`).join('');
};

// Patch init to also call homepage projects
const _origInit = window._jspnInit;

/* ── TOOL MINI BARS ── */
const initToolBars = () => {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.querySelectorAll('.tool-bar-mini-fill').forEach((bar, i) => {
        setTimeout(() => bar.style.width = bar.dataset.w + '%', i * 60);
      });
      obs.unobserve(e.target);
    });
  }, { threshold: 0.2 });
  const toolSection = document.querySelector('.tool-stack-section');
  if (toolSection) obs.observe(toolSection);
};

/* ── DOMAIN KPI BARS ── */
const initDomainBars = () => {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.querySelectorAll('.domain-kpi-bar').forEach((bar, i) => {
        setTimeout(() => bar.style.width = bar.dataset.w + '%', i * 100);
      });
      obs.unobserve(e.target);
    });
  }, { threshold: 0.25 });
  document.querySelectorAll('.domain-card').forEach(c => obs.observe(c));
};

/* ── DASHBOARD BAR CHART ANIMATION ── */
const initDashChart = () => {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.querySelectorAll('.bar-fill').forEach((bar, i) => {
        setTimeout(() => bar.style.height = bar.dataset.h, i * 120);
      });
      obs.unobserve(e.target);
    });
  }, { threshold: 0.3 });
  const dash = document.querySelector('.dashboard-preview');
  if (dash) obs.observe(dash);
};

/* Hook into DOMContentLoaded */
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    initToolBars();
    initDomainBars();
    initDashChart();
  }, 500);
});
