/* ──────────────────────────────────────────────────────────── */
/* RATHOR CONSTRUCTIONS — Pure JavaScript Functionality */
/* ──────────────────────────────────────────────────────────── */

/* ──────── Particles Canvas ──────── */
(function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let dots = [];
  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
  }
  resize();
  window.addEventListener('resize', resize);
  const count = 35;
  for (let i = 0; i < count; i++) {
    dots.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: 1.5 + Math.random() * 2.5,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      o: 0.2 + Math.random() * 0.6,
    });
  }
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const d of dots) {
      d.x += d.vx; d.y += d.vy;
      if (d.x < 0) d.x = canvas.width;
      if (d.x > canvas.width) d.x = 0;
      if (d.y < 0) d.y = canvas.height;
      if (d.y > canvas.height) d.y = 0;
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.globalAlpha = d.o;
      ctx.fillStyle = '#FF6600';
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }
  draw();
})();

/* ──────── Intro Splash ──────── */
document.addEventListener('DOMContentLoaded', () => {
  const splash = document.getElementById('intro-splash');
  setTimeout(() => {
    if (splash) splash.classList.add('hidden');
  }, 1800);
  document.getElementById('year').textContent = new Date().getFullYear();
});

/* ──────── Navigation & Scroll Progress ──────── */
const nav = document.getElementById('nav');
const progressBar = document.getElementById('scroll-progress');
const backToTop = document.getElementById('back-to-top');

function onScroll() {
  const sy = window.scrollY;
  nav.classList.toggle('scrolled', sy > 60);
  backToTop.classList.toggle('visible', sy > 400);
  const el = document.documentElement;
  const pct = (sy / (el.scrollHeight - el.clientHeight)) * 100;
  if (progressBar) progressBar.style.width = pct + '%';
}
window.addEventListener('scroll', onScroll);

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  btn.classList.toggle('active');
  menu.classList.toggle('open');
}
function closeMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  btn.classList.remove('active');
  menu.classList.remove('open');
}

/* ──────── Typewriter ──────── */
const typeText = "India's trusted contractor for homes, commercial properties, and transformative renovations across 50+ cities.";
const typeEl = document.getElementById('hero-subtitle');
let ti = 0;
function typewriter() {
  if (ti <= typeText.length) {
    typeEl.innerHTML = typeText.slice(0, ti) + '<span class="type-cursor">|</span>';
    ti++;
    setTimeout(typewriter, 35);
  }
}
setTimeout(typewriter, 2200);

/* ──────── Scroll Reveal ──────── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 100);
    }
  });
}, { threshold: 0.1, rootMargin: '-50px' });

document.querySelectorAll('.stat-card, .service-card, .project-card, .testimonial-card, .timeline-item, .feature, .faq-item, .ba-card, .whyus-stat-card, .contact-form-card, .estimator-card, .estimator-header').forEach(el => {
  el.classList.add('reveal');
  observer.observe(el);
});

/* ──────── Stats Counter ──────── */
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const card = entry.target;
      const numEl = card.querySelector('.stat-number');
      const target = parseInt(numEl.dataset.target);
      const duration = 2200;
      const t0 = performance.now();
      function tick(now) {
        const p = Math.min((now - t0) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        numEl.textContent = Math.floor(eased * target);
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      statObserver.unobserve(card);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.stat-card').forEach(card => statObserver.observe(card));

/* ──────── FAQ ──────── */
function toggleFaq(btn) {
  const item = btn.parentElement;
  const wasActive = item.classList.contains('active');
  document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
  if (!wasActive) item.classList.add('active');
}

/* ──────── Before/After Slider ──────── */
document.querySelectorAll('.ba-slider').forEach(slider => {
  const before = slider.querySelector('.ba-before');
  const divider = slider.querySelector('.ba-divider');
  let dragging = false;

  function setPct(clientX) {
    const rect = slider.getBoundingClientRect();
    let pct = ((clientX - rect.left) / rect.width) * 100;
    pct = Math.max(3, Math.min(97, pct));
    before.style.width = pct + '%';
    divider.style.left = pct + '%';
  }

  slider.addEventListener('mousedown', (e) => { dragging = true; setPct(e.clientX); });
  document.addEventListener('mousemove', (e) => { if (dragging) setPct(e.clientX); });
  document.addEventListener('mouseup', () => { dragging = false; });
  slider.addEventListener('touchstart', (e) => { dragging = true; setPct(e.touches[0].clientX); });
  slider.addEventListener('touchmove', (e) => { if (dragging) setPct(e.touches[0].clientX); });
  slider.addEventListener('touchend', () => { dragging = false; });
});

/* ──────── Cost Estimator ──────── */
const CE_TYPES = [
  { id: 'house', label: 'NEW HOUSE', icon: '🏠', mult: 1.00 },
  { id: 'commercial', label: 'COMMERCIAL', icon: '🏢', mult: 1.15 },
  { id: 'reno', label: 'RENOVATION', icon: '🔨', mult: 0.45 },
];
const CE_FLOORS = [
  { id: 1, label: 'GROUND FLOOR', sub: 'G', mult: 1 },
  { id: 2, label: 'G + 1 FLOOR', sub: 'G+1', mult: 2 },
  { id: 3, label: 'G + 2 FLOORS', sub: 'G+2', mult: 3 },
  { id: 4, label: 'G + 3 FLOORS', sub: 'G+3', mult: 4 },
];
const CE_FINISH = [
  { id: 'basic', label: 'BASIC', sub: 'Standard RCC, economy fittings', rateMin: 1400, rateMax: 1650 },
  { id: 'standard', label: 'STANDARD', sub: 'Vitrified tiles, branded fittings', rateMin: 1700, rateMax: 2050 },
  { id: 'premium', label: 'PREMIUM', sub: 'Marble/granite, modular look', rateMin: 2100, rateMax: 2600 },
  { id: 'luxury', label: 'LUXURY', sub: 'Italian marble, full automation', rateMin: 2700, rateMax: 3500 },
];
const CE_ADDONS = [
  { id: 'parking', label: 'Covered Parking', icon: '🚗', cost: 120000 },
  { id: 'kitchen', label: 'Modular Kitchen', icon: '🍳', cost: 180000 },
  { id: 'garden', label: 'Garden/Landscape', icon: '🌿', cost: 80000 },
  { id: 'solar', label: 'Solar Panels', icon: '⚡', cost: 250000 },
  { id: 'lift', label: 'Passenger Lift', icon: '🛗', cost: 500000 },
];
const CE_BREAKDOWN = [
  { label: 'Civil & Structure', pct: 45 },
  { label: 'Flooring', pct: 12 },
  { label: 'Electrical', pct: 8 },
  { label: 'Plumbing', pct: 7 },
  { label: 'Doors & Windows', pct: 10 },
  { label: 'Finishing & Paint', pct: 8 },
  { label: 'Labour', pct: 10 },
];

let estStep = 0;
let estType = '';
let estPlot = 1000;
let estFloors = 1;
let estFinish = '';
let estAddons = [];

function fmt(n) {
  if (n >= 10000000) return '₹' + (n / 10000000).toFixed(2) + ' Cr';
  if (n >= 100000) return '₹' + (n / 100000).toFixed(1) + ' L';
  return '₹' + n.toLocaleString('en-IN');
}

function renderEstimator() {
  const body = document.getElementById('estimator-body');
  const dots = document.querySelectorAll('.step-dot');
  const lines = document.querySelectorAll('.step-line');
  dots.forEach((d, i) => {
    d.classList.toggle('active', i === estStep);
    d.classList.toggle('done', i < estStep);
    d.textContent = i < estStep ? '✓' : (i + 1);
  });
  lines.forEach((l, i) => {
    l.classList.toggle('done', i < estStep);
  });

  if (estStep === 0) {
    body.innerHTML = `
      <div class="est-step-header">
        <p class="est-step-num">STEP 1 OF 5</p>
        <h3 class="est-step-title">WHAT ARE YOU BUILDING?</h3>
      </div>
      <div class="est-options" style="grid-template-columns:repeat(3,1fr);">
        ${CE_TYPES.map(t => `<div class="est-option ${estType === t.id ? 'selected' : ''}" onclick="setEstType('${t.id}')">
          <span class="est-option-icon">${t.icon}</span>
          <span class="est-option-label">${t.label}</span>
        </div>`).join('')}
      </div>
      <button class="est-nav-btn primary" onclick="nextStep()" ${!estType ? 'disabled' : ''}>NEXT →</button>
    `;
  } else if (estStep === 1) {
    body.innerHTML = `
      <div class="est-step-header">
        <p class="est-step-num">STEP 2 OF 5</p>
        <h3 class="est-step-title">PLOT / CARPET SIZE</h3>
        <p class="est-step-sub">Enter the total plot or built-up area in sq. ft.</p>
      </div>
      <div class="est-presets">
        ${[500,800,1000,1200,1500,2000,2500,3000].map(v =>
          `<button class="est-preset ${estPlot === v ? 'active' : ''}" onclick="setEstPlot(${v})">${v.toLocaleString()} sq.ft</button>`
        ).join('')}
      </div>
      <div class="est-slider-wrap">
        <div class="est-slider-labels">
          <span>200 sq.ft</span>
          <span class="est-slider-val">${estPlot.toLocaleString()} sq.ft</span>
          <span>5000 sq.ft</span>
        </div>
        <input type="range" class="est-slider" min="200" max="5000" step="50" value="${estPlot}" oninput="setEstPlot(Number(this.value))">
        <p class="est-slider-conv">≈ ${Math.round(estPlot / 9)} sq.yards · ${(estPlot * 0.0929).toFixed(1)} sq.m</p>
      </div>
      <div class="est-nav">
        <button class="est-nav-btn" onclick="prevStep()">← BACK</button>
        <button class="est-nav-btn primary" onclick="nextStep()">NEXT →</button>
      </div>
    `;
  } else if (estStep === 2) {
    body.innerHTML = `
      <div class="est-step-header">
        <p class="est-step-num">STEP 3 OF 5</p>
        <h3 class="est-step-title">HOW MANY FLOORS?</h3>
      </div>
      <div class="est-options" style="grid-template-columns:repeat(2,1fr);">
        ${CE_FLOORS.map(f => `<div class="est-option ${estFloors === f.id ? 'selected' : ''}" onclick="setEstFloors(${f.id})">
          <span class="est-option-label" style="font-size:2rem;color:var(--orange);">${f.sub}</span>
          <span class="est-option-sub">${f.label}</span>
        </div>`).join('')}
      </div>
      <div class="est-nav">
        <button class="est-nav-btn" onclick="prevStep()">← BACK</button>
        <button class="est-nav-btn primary" onclick="nextStep()">NEXT →</button>
      </div>
    `;
  } else if (estStep === 3) {
    body.innerHTML = `
      <div class="est-step-header">
        <p class="est-step-num">STEP 4 OF 5</p>
        <h3 class="est-step-title">FINISH QUALITY</h3>
      </div>
      <div class="est-options" style="grid-template-columns:1fr 1fr;">
        ${CE_FINISH.map(f => `<div class="est-option ${estFinish === f.id ? 'selected' : ''}" onclick="setEstFinish('${f.id}')" style="flex-direction:row;align-items:flex-start;gap:1rem;">
          <div style="width:12px;height:48px;border-radius:9999px;background:var(--orange);flex-shrink:0;"></div>
          <div>
            <p class="est-option-label" style="font-size:1.1rem;">${f.label}</p>
            <p class="est-option-sub">${f.sub}</p>
            <p style="color:var(--orange);font-size:0.75rem;font-weight:700;margin-top:0.25rem;">₹${f.rateMin.toLocaleString()}&ndash;${f.rateMax.toLocaleString()}/sq.ft</p>
          </div>
        </div>`).join('')}
      </div>
      <div class="est-nav">
        <button class="est-nav-btn" onclick="prevStep()">← BACK</button>
        <button class="est-nav-btn primary" onclick="nextStep()" ${!estFinish ? 'disabled' : ''}>NEXT →</button>
      </div>
    `;
  } else if (estStep === 4) {
    const typeObj = CE_TYPES.find(t => t.id === estType);
    const finishObj = CE_FINISH.find(f => f.id === estFinish);
    const builtArea = estPlot * estFloors * 0.72;
    const addonCost = estAddons.reduce((s, id) => s + (CE_ADDONS.find(a => a.id === id)?.cost ?? 0), 0);
    const minCost = finishObj && typeObj ? Math.round(builtArea * finishObj.rateMin * typeObj.mult) + addonCost : 0;
    const maxCost = finishObj && typeObj ? Math.round(builtArea * finishObj.rateMax * typeObj.mult) + addonCost : 0;
    const midCost = Math.round((minCost + maxCost) / 2);

    body.innerHTML = `
      <div class="est-step-header">
        <p class="est-step-num">STEP 5 OF 5 &mdash; ADD-ONS</p>
        <h3 class="est-step-title">OPTIONAL EXTRAS</h3>
      </div>
      <div class="est-options" style="grid-template-columns:repeat(3,1fr);">
        ${CE_ADDONS.map(a => `<div class="est-option ${estAddons.includes(a.id) ? 'selected' : ''}" onclick="toggleEstAddon('${a.id}')" style="flex-direction:row;align-items:center;gap:0.75rem;">
          <span class="est-option-icon">${a.icon}</span>
          <div>
            <p class="est-option-label" style="font-size:0.85rem;">${a.label}</p>
            <p style="color:var(--orange);font-size:0.75rem;font-weight:700;">${fmt(a.cost)}</p>
          </div>
          <div style="margin-left:auto;width:20px;height:20px;border-radius:50%;border:2px solid ${estAddons.includes(a.id) ? 'var(--orange)' : 'var(--stone-300)'};display:flex;align-items:center;justify-content:center;transition:all 0.2s;background:${estAddons.includes(a.id) ? 'var(--orange)' : 'transparent'};">
            ${estAddons.includes(a.id) ? '<span style="color:white;font-size:0.7rem;">✓</span>' : ''}
          </div>
        </div>`).join('')}
      </div>
      <div class="est-result">
        <p class="est-result-label">ESTIMATED CONSTRUCTION COST</p>
        <div class="est-result-num">${fmt(midCost)}</div>
        <p class="est-result-range">Range: <span style="color:var(--orange);font-weight:700;">${fmt(minCost)}</span> &ndash; <span style="color:var(--orange);font-weight:700;">${fmt(maxCost)}</span></p>
        <div style="margin-top:1.5rem;">
          ${CE_BREAKDOWN.map((b, i) => {
            const amt = Math.round(midCost * b.pct / 100);
            return `<div class="est-result-bar">
              <div class="est-result-bar-label">
                <span>${b.label}</span>
                <span>${fmt(amt)}</span>
              </div>
              <div class="est-result-bar-track">
                <div class="est-result-bar-fill" style="width:${b.pct}%;transition-delay:${i * 0.08}s;"></div>
              </div>
            </div>`;
          }).join('')}
        </div>
        <div class="est-result-meta">
          <div><p class="est-result-meta-label">BUILT AREA</p><p class="est-result-meta-val">${Math.round(builtArea).toLocaleString()} sq.ft</p></div>
          <div><p class="est-result-meta-label">RATE USED</p><p class="est-result-meta-val">${finishObj ? `₹${finishObj.rateMin.toLocaleString()}&ndash;${finishObj.rateMax.toLocaleString()}` : '—'}</p></div>
          <div><p class="est-result-meta-label">FLOORS</p><p class="est-result-meta-val">${estFloors} floor${estFloors > 1 ? 's' : ''}</p></div>
        </div>
        <p class="est-result-note">* Indicative estimate only. Actual costs may vary based on soil type, design complexity, and material prices at time of construction. Contact us for a precise site-specific quote.</p>
      </div>
      <div class="est-cta-row">
        <button class="est-nav-btn" onclick="prevStep()">← BACK</button>
        <a href="https://wa.me/919639974556?text=${encodeURIComponent('Hi Rathor Constructions, I got an estimate of ' + fmt(midCost) + ' from your website. Please call me for a detailed quote.')}" target="_blank" class="est-whatsapp">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
          SHARE ON WHATSAPP
        </a>
        <button class="est-nav-btn primary" onclick="document.getElementById('contact').scrollIntoView({behavior:'smooth'})">GET EXACT QUOTE →</button>
      </div>
      <button class="est-reset" onclick="resetEstimator()">↻ START OVER</button>
    `;
    setTimeout(() => {
      body.querySelectorAll('.est-result-bar-fill').forEach(f => {
        f.style.width = f.style.width;
      });
    }, 50);
  }
}

function setEstType(id) { estType = id; renderEstimator(); }
function setEstPlot(v) { estPlot = v; renderEstimator(); }
function setEstFloors(v) { estFloors = v; renderEstimator(); }
function setEstFinish(id) { estFinish = id; renderEstimator(); }
function toggleEstAddon(id) {
  estAddons = estAddons.includes(id) ? estAddons.filter(x => x !== id) : [...estAddons, id];
  renderEstimator();
}
function nextStep() { if (estStep < 4) { estStep++; renderEstimator(); } }
function prevStep() { if (estStep > 0) { estStep--; renderEstimator(); } }
function resetEstimator() {
  estStep = 0; estType = ''; estPlot = 1000; estFloors = 1; estFinish = ''; estAddons = [];
  renderEstimator();
}

/* Init estimator */
renderEstimator();

/* ──────── Contact Form ──────── */
function handleContactSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const data = new FormData(form);
  const name = data.get('name');
  const phone = data.get('phone');
  const email = data.get('email');
  const service = data.get('serviceType');
  const message = data.get('message');
  const msg = encodeURIComponent(
    `🔔 *NEW ENQUIRY – Rathor Constructions Website*\n\n` +
    `👤 Name: ${name}\n` +
    `📞 Phone: ${phone}\n` +
    `📧 Email: ${email}\n` +
    `🏗️ Service: ${service}\n\n` +
    `💬 Message:\n${message}\n\n` +
    `_Submitted via rathorconstructions.in_`
  );
  window.open(`https://wa.me/919639974556?text=${msg}`, '_blank');
  form.reset();
  alert('Thank you! Your message has been sent to our WhatsApp. We will be in touch within 24 hours.');
}

/* ──────── Lead Popup (after 60% scroll, once per session) ──────── */
let popupShown = sessionStorage.getItem('rc_popup_done');
let popupVisible = false;
const popupObserver = new IntersectionObserver((entries) => {
  if (!popupShown && !popupVisible && entries.some(e => e.isIntersecting)) {
    showLeadPopup();
  }
}, { threshold: 0 });

function showLeadPopup() {
  if (popupShown || popupVisible) return;
  popupVisible = true;
  const popup = document.createElement('div');
  popup.className = 'lead-popup';
  popup.innerHTML = `
    <div class="lead-popup-glow"></div>
    <div class="lead-popup-card">
      <div class="lead-popup-bar"></div>
      <button class="lead-popup-close" onclick="closeLeadPopup()">×</button>
      <div class="lead-popup-body">
        <div class="lead-popup-header">
          <div class="lead-popup-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          </div>
          <div>
            <p class="lead-popup-title">GET A FREE QUOTE</p>
            <p class="lead-popup-sub">We'll call you back within 2 hours</p>
          </div>
        </div>
        <div class="lead-popup-offer">
          <span>🏗️</span>
          <p>FREE site visit + no-obligation estimate for Haldwani &amp; nearby areas</p>
        </div>
        <div class="lead-popup-fields">
          <input type="text" id="popup-name" placeholder="Your full name" class="lead-popup-input">
          <input type="tel" id="popup-phone" placeholder="+91 XXXXX XXXXX" class="lead-popup-input">
        </div>
        <button class="lead-popup-submit" onclick="submitLeadPopup()">GET MY FREE QUOTE →</button>
        <p class="lead-popup-note">No spam. No obligation. 100% free consultation.</p>
      </div>
    </div>
  `;
  document.body.appendChild(popup);
  requestAnimationFrame(() => popup.classList.add('active'));
}

function closeLeadPopup() {
  const popup = document.querySelector('.lead-popup');
  if (popup) {
    popup.classList.remove('active');
    setTimeout(() => popup.remove(), 300);
  }
  popupShown = true;
  popupVisible = false;
  sessionStorage.setItem('rc_popup_done', '1');
}

function submitLeadPopup() {
  const name = document.getElementById('popup-name').value.trim();
  const phone = document.getElementById('popup-phone').value.trim();
  if (!name || !phone) {
    alert('Please enter your name and phone number.');
    return;
  }
  const msg = encodeURIComponent(
    `🔔 *NEW LEAD – Free Quote Request*\n\n` +
    `👤 Name: ${name}\n` +
    `📞 Phone: ${phone}\n\n` +
    `_Submitted via rathorconstructions.in_`
  );
  window.open(`https://wa.me/919639974556?text=${msg}`, '_blank');
  closeLeadPopup();
}

/* Trigger popup at 60% scroll */
window.addEventListener('scroll', () => {
  const el = document.documentElement;
  const pct = (window.scrollY / (el.scrollHeight - el.clientHeight)) * 100;
  if (pct >= 60 && !popupShown && !popupVisible) {
    showLeadPopup();
  }
});

/* Add popup styles dynamically */
const popupStyles = document.createElement('style');
popupStyles.textContent = `
  .lead-popup { position:fixed; bottom:2rem; left:2rem; z-index:60; width:340px; max-width:calc(100vw - 2rem); opacity:0; transform:translateY(60px) scale(0.95); transition:all 0.3s ease; }
  .lead-popup.active { opacity:1; transform:translateY(0) scale(1); }
  .lead-popup-glow { position:absolute; inset:-2px; background:linear-gradient(to bottom right, var(--orange), var(--orange-light), var(--orange)); border-radius:1rem; opacity:0.7; filter:blur(4px); pointer-events:none; }
  .lead-popup-card { position:relative; background:white; border-radius:1rem; box-shadow:0 24px 60px rgba(0,0,0,0.15); overflow:hidden; }
  .lead-popup-bar { height:4px; background:linear-gradient(90deg, var(--orange), var(--orange-light)); }
  .lead-popup-close { position:absolute; top:0.75rem; right:0.75rem; width:1.75rem; height:1.75rem; border-radius:50%; background:var(--stone-100); display:flex; align-items:center; justify-content:center; color:var(--stone-500); font-size:1.1rem; cursor:pointer; transition:background 0.2s; border:none; z-index:2; }
  .lead-popup-close:hover { background:var(--stone-200); }
  .lead-popup-body { padding:1.5rem; }
  .lead-popup-header { display:flex; align-items:center; gap:0.75rem; margin-bottom:1rem; }
  .lead-popup-icon { width:2.5rem; height:2.5rem; background:var(--orange); border-radius:0.75rem; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
  .lead-popup-title { font-family:var(--font-heading); font-size:1.1rem; font-weight:900; color:var(--stone-900); line-height:1.2; }
  .lead-popup-sub { color:var(--stone-400); font-size:0.75rem; }
  .lead-popup-offer { background:rgba(255,102,0,0.05); border:1px solid rgba(255,102,0,0.1); border-radius:0.75rem; padding:0.75rem 1rem; margin-bottom:1.25rem; display:flex; align-items:center; gap:0.5rem; }
  .lead-popup-offer span { font-size:1.25rem; }
  .lead-popup-offer p { color:var(--orange); font-size:0.7rem; font-weight:700; line-height:1.4; }
  .lead-popup-fields { display:flex; flex-direction:column; gap:0.75rem; margin-bottom:1rem; }
  .lead-popup-input { width:100%; height:2.75rem; padding:0 1rem; border:1px solid var(--stone-200); border-radius:0.5rem; font-size:0.85rem; color:var(--stone-900); transition:all 0.3s; }
  .lead-popup-input:focus { outline:none; border-color:var(--orange); box-shadow:0 0 0 3px rgba(255,102,0,0.1); }
  .lead-popup-input::placeholder { color:var(--stone-300); }
  .lead-popup-submit { width:100%; height:2.75rem; background:var(--orange); color:white; border-radius:0.5rem; font-family:var(--font-heading); font-weight:700; font-size:0.85rem; letter-spacing:0.1em; border:none; cursor:pointer; transition:background 0.3s; display:flex; align-items:center; justify-content:center; gap:0.5rem; }
  .lead-popup-submit:hover { background:#E65C00; }
  .lead-popup-note { color:var(--stone-400); font-size:0.65rem; text-align:center; margin-top:0.75rem; }
  @media (max-width:480px) { .lead-popup { left:1rem; bottom:5rem; width:calc(100% - 2rem); } }
`;
document.head.appendChild(popupStyles);
