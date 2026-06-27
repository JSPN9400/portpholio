
/* ═══════════════════════════════════════
   EMBEDDED DATA — No fetch() needed
   Works on GitHub Pages, local file, everywhere
   Update via Admin Panel → Push to GitHub
═══════════════════════════════════════ */
const EMBEDDED_PROJECTS = [
  {
    "id": "construction-intelligence",
    "title": "Construction Intelligence Dashboard",
    "tagline": "Turned scattered Excel files into a live command centre for construction management.",
    "domain": "Construction Analytics",
    "domainColor": "#EA580C",
    "domainBg": "#FFF7ED",
    "featured": true,
    "image": "assets/images/proj-construction.png",
    "problem": "A construction firm was detecting cost overruns weeks after they occurred. Project data lived in 5+ separate Excel sheets maintained by different teams. The management team spent 5+ hours every week just consolidating numbers before they could make a single decision.",
    "approach": "I mapped all data flows, designed a normalised SQL schema in PostgreSQL, wrote Python ETL scripts (OpenPyXL + Pandas) to automate weekly data ingestion, then built a Power BI model with DAX measures for cost-per-sq-ft, stage completion %, and contractor variance. Management now opens one dashboard instead of calling 3 people.",
    "tools": ["SQL", "PostgreSQL", "Python", "Pandas", "OpenPyXL", "Power BI", "DAX", "Power Query"],
    "metrics": [
      { "value": "40%", "label": "Reporting time reduced" },
      { "value": "Days", "label": "vs weeks for overrun detection" },
      { "value": "5 hrs/wk", "label": "Manual consolidation eliminated" },
      { "value": "3", "label": "Custom construction KPIs built" }
    ],
    "impact": "Management shifted from reactive cost reviews to proactive weekly monitoring. Cost overrun detection moved from weeks to days.",
    "github": "https://github.com/JSPN9400",
    "demo": null
  },
  {
    "id": "school-finance-analytics",
    "title": "School Finance Analytics Dashboard",
    "tagline": "Automated ₹8–10 lakh/month of transaction reporting and surfaced hidden billing anomalies.",
    "domain": "Financial Analytics",
    "domainColor": "#059669",
    "domainBg": "#F0FDF4",
    "featured": false,
    "image": "assets/images/proj-finance.png",
    "problem": "PM Modern Academy's finance team was manually consolidating fee collections, vendor payments, and expense records for 500+ students every month. The process took 8+ hours and still missed anomalies — including a billing error that had been repeating for months undetected.",
    "approach": "Built structured SQL tables for fees, payments, and expenses. Wrote 4 Python automation scripts (Pandas) for monthly report generation. Added data validation checks that flag statistical outliers before they reach the report stage. Delivered a Power BI dashboard showing collection efficiency by class, outstanding dues, and department-wise spending.",
    "tools": ["SQL", "Python", "Pandas", "Power BI", "Excel", "Data Validation"],
    "metrics": [
      { "value": "25%", "label": "Reporting effort reduced" },
      { "value": "500+", "label": "Student records tracked" },
      { "value": "20%", "label": "Data validation accuracy up" },
      { "value": "3/qtr", "label": "Anomalies surfaced & fixed" }
    ],
    "impact": "Finance team reclaimed 2+ hours per month. Caught a recurring billing error in the first month that had been missed for quarters.",
    "github": "https://github.com/JSPN9400",
    "demo": null
  },
  {
    "id": "ecommerce-customer-analytics",
    "title": "E-Commerce Sales & Customer Analytics",
    "tagline": "Found the 20% of customers driving 65% of revenue — and built the dashboard to keep finding them.",
    "domain": "Customer Analytics",
    "domainColor": "#2563EB",
    "domainBg": "#EFF6FF",
    "featured": false,
    "image": "assets/images/proj-ecommerce.png",
    "problem": "A large transaction dataset held patterns no one was reading: which customers were about to churn, which product categories were quietly underperforming, and where the high-value revenue cluster actually sat.",
    "approach": "Ingested 100,000+ transaction records into PostgreSQL. Applied RFM (Recency-Frequency-Monetary) segmentation using Python and SQL to cluster customers by behaviour. Built Power BI dashboards with revenue trend lines, retention cohorts, and churn-risk alerts. Identified top customer segments for targeted retention campaigns.",
    "tools": ["SQL", "PostgreSQL", "Python", "Pandas", "Power BI", "RFM Analysis", "Cohort Analysis"],
    "metrics": [
      { "value": "100K+", "label": "Transactions analysed" },
      { "value": "65%", "label": "Revenue from top 20% customers" },
      { "value": "RFM", "label": "Advanced segmentation model" },
      { "value": "Churn", "label": "Risk cohorts identified" }
    ],
    "impact": "Identified the customer segments worth retaining. Revenue distribution analysis challenged the team's assumptions about their best customers.",
    "github": "https://github.com/JSPN9400",
    "demo": null
  },
  {
    "id": "job-market-intelligence",
    "title": "India Job Market Intelligence Dashboard",
    "tagline": "Mapped salary benchmarks and skill demand across 5,000+ data analytics job postings in India.",
    "domain": "Market Intelligence",
    "domainColor": "#7C3AED",
    "domainBg": "#F5F3FF",
    "featured": false,
    "image": "assets/images/proj-jobmarket.png",
    "problem": "Data professionals in India lacked a rigorous, data-driven view of which skills command premium salaries, which cities are actually hiring, and what the skill-demand gap looks like across Data Analytics, BI, and AI roles.",
    "approach": "Collected and cleaned 5,000+ job postings using Python scraping and parsing. Normalised data into a SQL schema covering role types, required skills, salary ranges, cities, and company sizes. Built a Power BI dashboard enabling drill-down by city, role, skill stack, and compensation band.",
    "tools": ["Python", "SQL", "PostgreSQL", "Power BI", "Web Scraping", "Data Cleaning"],
    "metrics": [
      { "value": "5K+", "label": "Job postings analysed" },
      { "value": "Top 10", "label": "In-demand skills mapped" },
      { "value": "Salary", "label": "Benchmarks by role & city" },
      { "value": "Pan-India", "label": "Geographic coverage" }
    ],
    "impact": "Produced a clear map of where Data Analytics demand is concentrated in India, which skills are most valued, and realistic salary expectations by experience level.",
    "github": "https://github.com/JSPN9400",
    "demo": null
  }
];
const EMBEDDED_ARTICLES = [
  {
    "id": "data-changes-business-decisions",
    "title": "How Data Changes Business Decisions",
    "excerpt": "Most businesses make decisions on instinct. The ones that scale don't. Here's what I've seen when data finally enters the room — and what happens when it doesn't.",
    "category": "Business Intelligence",
    "categoryColor": "#2563EB",
    "status": "coming-soon",
    "readTime": "6 min read",
    "date": "Coming Soon",
    "gradient": "linear-gradient(135deg, #2563EB, #0891B2)"
  },
  {
    "id": "ai-will-not-replace-analysts",
    "title": "AI Will Not Replace Data Analysts — Here's Why",
    "excerpt": "After integrating Claude, ChatGPT, and Cursor AI into my daily workflow, the truth about AI and analyst jobs is more nuanced — and more interesting — than the headlines suggest.",
    "category": "AI & Technology",
    "categoryColor": "#D97706",
    "status": "coming-soon",
    "readTime": "8 min read",
    "date": "Coming Soon",
    "gradient": "linear-gradient(135deg, #F59E0B, #EF4444)"
  },
  {
    "id": "small-businesses-bihar-analytics",
    "title": "Why Small Businesses in Bihar Need Analytics",
    "excerpt": "Construction firms, schools, and local businesses in Bihar sit on mountains of unread data. What changes when they finally learn to use it?",
    "category": "Society & Business",
    "categoryColor": "#7C3AED",
    "status": "coming-soon",
    "readTime": "5 min read",
    "date": "Coming Soon",
    "gradient": "linear-gradient(135deg, #8B5CF6, #EC4899)"
  },
  {
    "id": "cost-of-poor-data-quality",
    "title": "The Real Cost of Poor Data Quality",
    "excerpt": "Bad data doesn't just slow teams down. It costs money, creates liability, and quietly erodes management trust. I've seen what it looks like from inside the finance office.",
    "category": "Data Quality",
    "categoryColor": "#059669",
    "status": "coming-soon",
    "readTime": "7 min read",
    "date": "Coming Soon",
    "gradient": "linear-gradient(135deg, #10B981, #3B82F6)"
  },
  {
    "id": "lessons-construction-analytics",
    "title": "Lessons From Construction Analytics",
    "excerpt": "Building dashboards for construction projects taught me more about data storytelling than any course ever could. The lessons apply across every domain.",
    "category": "Career & Craft",
    "categoryColor": "#EA580C",
    "status": "coming-soon",
    "readTime": "6 min read",
    "date": "Coming Soon",
    "gradient": "linear-gradient(135deg, #F97316, #EAB308)"
  },
  {
    "id": "open-data-india-governance",
    "title": "Open Data and India's Governance Gap",
    "excerpt": "India generates enormous government data. Most of it goes nowhere. What would a data-literate Bihar look like — and who builds the infrastructure for it?",
    "category": "Public Policy",
    "categoryColor": "#0891B2",
    "status": "coming-soon",
    "readTime": "9 min read",
    "date": "Coming Soon",
    "gradient": "linear-gradient(135deg, #06B6D4, #6366F1)"
  }
];
const EMBEDDED_TIMELINE = [
  {
    "id": "roots",
    "year": "Origin",
    "icon": "🌾",
    "title": "Bihar Roots",
    "subtitle": "Aurangabad, Bihar",
    "description": "Grew up understanding Bihar's business landscape from the inside — construction economics, institutional structures, and how local enterprises actually operate. This ground-level knowledge later became my biggest professional differentiator.",
    "color": "#059669"
  },
  {
    "id": "bca",
    "year": "2020–24",
    "icon": "🎓",
    "title": "BCA Graduate",
    "subtitle": "Ram Lakhan Singh Yadav College, Aurangabad",
    "description": "Bachelor of Computer Applications — studied Database Management, Programming, Statistics, and Information Systems. Built the technical foundation that would later power real analytics work. Graduated 2024.",
    "color": "#2563EB"
  },
  {
    "id": "finance-ops",
    "year": "May 2024",
    "icon": "💼",
    "title": "Finance Operations",
    "subtitle": "PM Modern Academy",
    "description": "Joined as Finance Assistant (Data Operations). Managed ₹8–10 lakh/month of transaction data, automated 4 monthly Python reports, and learned how financial data flows inside a real institution — with real consequences when it doesn't.",
    "color": "#7C3AED"
  },
  {
    "id": "data-analytics",
    "year": "2024–25",
    "icon": "📊",
    "title": "Analytics Depth",
    "subtitle": "Power BI · SQL · Python mastery",
    "description": "Invested in mastering the full analytics stack — Power BI, DAX, PostgreSQL, Pandas, OpenPyXL. Started integrating AI tools (Claude, ChatGPT, Cursor) into daily workflow. Shifted from reporting to genuine BI architecture.",
    "color": "#D97706"
  },
  {
    "id": "freelance",
    "year": "Sep 2025",
    "icon": "🚀",
    "title": "Freelance Consulting",
    "subtitle": "Self-Employed · Construction & Business Analytics",
    "description": "Launched independent practice. Built construction intelligence dashboards, automated financial workflows, and designed KPI frameworks for 3+ business clients. Real deliverables. Measurable outcomes. Paid work.",
    "color": "#EA580C"
  },
  {
    "id": "future",
    "year": "2026 →",
    "icon": "🔭",
    "title": "Next Chapter",
    "subtitle": "BI Engineer · PL-300 · Enterprise Scale",
    "description": "Pursuing Microsoft PL-300 certification (Q3 2026) and Google Data Analytics Certificate (Q4 2026). Targeting senior BI Analyst or Analytics Engineer roles — building toward enterprise-scale data infrastructure and team leadership.",
    "color": "#2563EB"
  }
];
const EMBEDDED_TESTIMONIALS = [
  {
    "id": "t1",
    "quote": "Jaishankar delivered a construction dashboard that changed how we track project costs. The domain understanding — cost-per-sq-ft tracking, contractor variance — was something we didn't expect from someone at this career stage.",
    "name": "Construction Client",
    "role": "Project Manager",
    "company": "Construction Firm, Aurangabad",
    "initials": "CK",
    "stars": 5
  },
  {
    "id": "t2",
    "quote": "The Python automation he built for our monthly reports saved our finance team hours every month. The anomaly detection alone caught a billing error we'd been missing for quarters. Worth every rupee.",
    "name": "PM Modern Academy",
    "role": "Finance Team",
    "company": "PM Modern Academy, Aurangabad",
    "initials": "PM",
    "stars": 5
  },
  {
    "id": "t3",
    "quote": "Very structured approach — he asked the right business questions before writing a single line of code. The final dashboard was exactly what we needed, built in less time than I expected.",
    "name": "Local Business Client",
    "role": "Business Owner",
    "company": "SME, Bihar",
    "initials": "BC",
    "stars": 4
  }
];

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
  // Try fetch first (GitHub Pages), fallback to embedded data
  const base = document.querySelector('meta[name="data-base"]')?.content || 'assets/data';
  const keys = ['projects','articles','timeline','testimonials'];
  const embedded = {
    projects: EMBEDDED_PROJECTS,
    articles: EMBEDDED_ARTICLES,
    timeline: EMBEDDED_TIMELINE,
    testimonials: EMBEDDED_TESTIMONIALS
  };
  await Promise.all(keys.map(async k => {
    try {
      const r = await fetch(`${base}/${k}.json`);
      if (!r.ok) throw new Error('not ok');
      const data = await r.json();
      // Use fetched data only if not empty
      state[k] = data && data.length ? data : embedded[k];
    } catch {
      // Fallback to embedded — works locally and offline
      state[k] = embedded[k];
    }
  }));
  // Also check localStorage for admin overrides
  const lsKeys = {projects:'jspn_projects', articles:'jspn_articles', timeline:'jspn_timeline', testimonials:'jspn_testimonials'};
  for (const [k, lsKey] of Object.entries(lsKeys)) {
    const saved = localStorage.getItem(lsKey);
    if (saved) {
      try { const d = JSON.parse(saved); if (d && d.length) state[k] = d; } catch {}
    }
  }
};

const renderFeatured = () => {
  const el = $('#featured-project'); if (!el) return;
  const p = state.projects.find(p => p.featured);
  if (!p) {
    // fallback: show first project if none marked featured
    const first = state.projects[0];
    if (!first) return;
    first.featured = true;
  }
  const proj = state.projects.find(p => p.featured);
  if (!proj) return;
  const p = proj;
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
  const el = $('#blog-latest'); if (!el) return;
  if (!state.articles || !state.articles.length) { el.innerHTML = '<p style="color:var(--text-3);text-align:center">Articles loading...</p>'; return; }
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
  if (!state.timeline || !state.timeline.length) {
    el.innerHTML = '<p style="color:var(--text-3);text-align:center;padding:40px">Timeline loading...</p>';
    return;
  }
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
  if (!state.testimonials || !state.testimonials.length) {
    el.innerHTML = '<p style="color:var(--text-3);text-align:center;padding:40px">Loading testimonials...</p>';
    return;
  }
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
