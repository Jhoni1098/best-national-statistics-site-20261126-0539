// Nusantara Stats: hash router and page controls.
//
//   #/                home dashboard
//   #/population      people, age structure, largest provinces
//   #/economy         GDP, prices, trade, jobs
//   #/health          life expectancy, child health, HDI
//   #/education       literacy, schooling, enrolment
//   #/provinces       searchable, sortable table of all 38 provinces
//   #/about           sources, methods, country facts
//
// window.__shotReady is false while a page renders and true once it is on
// screen, so a screenshot script knows when to capture.

import { PROVINCES, PROVINCE_TOTAL_POP, SERIES } from './data.js';
import { about, economy, education, health, home, missing, population, provinceRows, provinces } from './views.js';
import { barChart, hbarChart, lineChart } from './charts.js';

const app = document.getElementById('app');
const navLinks = [...document.querySelectorAll('[data-nav]')];

const ROUTES = {
  '': { view: home, title: 'Nusantara Stats — Indonesia in Numbers' },
  '/': { view: home, title: 'Nusantara Stats — Indonesia in Numbers' },
  '/population': { view: population, title: 'Population | Nusantara Stats' },
  '/economy': { view: economy, title: 'Economy | Nusantara Stats' },
  '/health': { view: health, title: 'Health | Nusantara Stats' },
  '/education': { view: education, title: 'Education | Nusantara Stats' },
  '/provinces': { view: provinces, title: 'Provinces | Nusantara Stats' },
  '/about': { view: about, title: 'About & Sources | Nusantara Stats' },
};

const fmtInt = (n) => n.toLocaleString('en-US');
const fmtPop = (thousands) => (thousands >= 1000 ? `${(thousands / 1000).toFixed(2)}m` : `${fmtInt(thousands)}k`);
const densityOf = (p) => (p.pop * 1000) / p.area;
const shareOf = (p) => (p.pop / PROVINCE_TOTAL_POP) * 100;

function setPressed(group, activeBtn) {
  group.forEach((b) => {
    const on = b === activeBtn;
    b.classList.toggle('active', on);
    b.setAttribute('aria-pressed', String(on));
  });
}

// Home page: switch the population chart between bars and a line.
function wireHomeChart() {
  const box = document.getElementById('pop-chart');
  if (!box) return;
  const buttons = [...document.querySelectorAll('[data-chart]')];
  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      setPressed(buttons, btn);
      box.innerHTML = btn.dataset.chart === 'line' ? lineChart(SERIES.population) : barChart(SERIES.population);
    });
  });
}

// Population page: rank the largest provinces by people or by density.
function wireProvinceRank() {
  const box = document.getElementById('prov-rank');
  if (!box) return;
  const buttons = [...document.querySelectorAll('[data-rank]')];
  const render = (metric) => {
    const top = [...PROVINCES]
      .sort((a, b) => (metric === 'density' ? densityOf(b) - densityOf(a) : b.pop - a.pop))
      .slice(0, 10);
    box.innerHTML = hbarChart(
      top.map((p) => ({
        label: p.name,
        value: metric === 'density' ? densityOf(p) : p.pop,
        display: metric === 'density' ? `${fmtInt(Math.round(densityOf(p)))}/km²` : fmtPop(p.pop),
      })),
      { labelWidth: 150 },
    );
  };
  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      setPressed(buttons, btn);
      render(btn.dataset.rank);
    });
  });
}

// Economy page: one chart area, four indicators to switch between.
function wireTrendChart() {
  const box = document.getElementById('trend-chart');
  const note = document.getElementById('trend-source');
  if (!box) return;
  const buttons = [...document.querySelectorAll('[data-trend]')];
  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      setPressed(buttons, btn);
      const s = SERIES[btn.dataset.trend];
      box.innerHTML = barChart(s);
      if (note) note.textContent = `Source: ${s.source} — ${s.unit}.`;
    });
  });
}

// Provinces page: live search by name, and sorting by any column.
function wireProvinceTable() {
  const input = document.getElementById('prov-search');
  const tbody = document.querySelector('#prov-table tbody');
  const count = document.getElementById('prov-count');
  if (!input || !tbody) return;
  const sortButtons = [...document.querySelectorAll('[data-sort]')];
  let sortKey = 'pop';
  let sortDir = -1; // population starts largest first
  let query = '';

  const keyOf = (p) => ({ name: p.name, pop: p.pop, share: shareOf(p), area: p.area, density: densityOf(p) })[sortKey];

  const render = () => {
    const q = query.trim().toLowerCase();
    const list = PROVINCES.filter((p) => !q || p.name.toLowerCase().includes(q)).sort((a, b) => {
      const ka = keyOf(a);
      const kb = keyOf(b);
      const cmp = typeof ka === 'string' ? ka.localeCompare(kb) : ka - kb;
      return cmp * sortDir;
    });
    tbody.innerHTML = provinceRows(list);
    if (count) count.textContent = q ? `${list.length} of 38 provinces` : '38 provinces';
  };

  input.addEventListener('input', () => {
    query = input.value;
    render();
  });
  sortButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.sort;
      if (key === sortKey) {
        sortDir = -sortDir;
      } else {
        sortKey = key;
        sortDir = key === 'name' ? 1 : -1;
      }
      sortButtons.forEach((b) => b.classList.remove('sorted'));
      btn.classList.add('sorted');
      btn.textContent = `${btn.textContent.replace(/ [↑↓]$/, '')} ${sortDir === 1 ? '↑' : '↓'}`;
      render();
    });
  });
}

function render() {
  window.__shotReady = false;
  const path = location.hash.replace(/^#/, '') || '/';
  const route = ROUTES[path] ?? null;
  document.title = route ? route.title : 'Page not found | Nusantara Stats';
  app.innerHTML = route ? route.view() : missing();
  navLinks.forEach((a) => {
    const on = a.getAttribute('href') === `#${path}`;
    a.classList.toggle('current', on);
    if (on) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
  wireHomeChart();
  wireProvinceRank();
  wireTrendChart();
  wireProvinceTable();
  window.scrollTo(0, 0);
  window.__shotReady = true;
}

window.addEventListener('hashchange', render);
render();
