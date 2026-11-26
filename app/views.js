// HTML for each page of Nusantara Stats, built from the data in data.js.
// Every figure is escaped before it goes into the page, and every page is
// reached by a link in the header or on another page.

import { AGE_BANDS, FACTS, GDP_SECTORS, HEADLINE, PROVINCES, PROVINCE_TOTAL_POP, RELEASES, SERIES } from './data.js';
import { barChart, donutChart, hbarChart, lineChart } from './charts.js';

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => `&#${c.charCodeAt(0)};`);

const fmtInt = (n) => n.toLocaleString('en-US');
const fmtPop = (thousands) => (thousands >= 1000 ? `${(thousands / 1000).toFixed(2)}m` : `${fmtInt(thousands)}k`);
const density = (p) => (p.pop * 1000) / p.area;
const share = (p) => (p.pop / PROVINCE_TOTAL_POP) * 100;

function kpiCards() {
  return `<section class="kpis" aria-label="Headline indicators">${HEADLINE.map(
    (k) => `<a class="kpi" href="${k.route}"><span class="kpi-label">${esc(k.label)}</span><span class="kpi-value">${esc(k.value)}</span><span class="kpi-sub">${esc(k.sub)}</span></a>`,
  ).join('')}</section>`;
}

function topicCards() {
  const topics = [
    { route: '#/population', title: 'Population', text: '281.6 million people, age structure and all 38 provinces.' },
    { route: '#/economy', title: 'Economy', text: 'GDP, growth, prices, trade, jobs and poverty.' },
    { route: '#/health', title: 'Health', text: 'Life expectancy, child health, stunting and hospitals.' },
    { route: '#/education', title: 'Education', text: 'Literacy, years of schooling and enrolment.' },
    { route: '#/provinces', title: 'Provinces', text: 'Search and sort every province by people, area and density.' },
    { route: '#/about', title: 'About & sources', text: 'Where every number comes from and how to cite it.' },
  ];
  return `<section class="topics" aria-label="Explore by topic">${topics
    .map((t) => `<a class="topic" href="${t.route}"><h3>${esc(t.title)}</h3><p>${esc(t.text)}</p><span class="more">Open →</span></a>`)
    .join('')}</section>`;
}

export function home() {
  const releases = RELEASES.map(
    (r) => `<li><span class="rel-date">${esc(r.date)}</span><span class="rel-title">${esc(r.title)}</span><span class="rel-src">${esc(r.source)}</span></li>`,
  ).join('');
  return `
<section class="hero">
  <p class="eyebrow">Indonesia in numbers · Updated November 2026</p>
  <h1>Indonesia, counted.</h1>
  <p class="lede">The people, the economy, health and schooling of the world’s fourth most
  populous country — 281.6 million people across 38 provinces and 17,508 islands —
  in one place, with every figure sourced.</p>
  <p class="hero-facts"><span><b>38</b> provinces</span><span><b>514</b> regencies &amp; cities</span><span><b>1,904,569 km²</b> of land</span><span><b>4th</b> largest population on Earth</span></p>
</section>
${kpiCards()}
<section class="card">
  <div class="card-head"><h2>Population, 2020–2024</h2>
  <div class="toggle" role="group" aria-label="Chart type">
    <button type="button" data-chart="bar" class="active" aria-pressed="true">Bars</button>
    <button type="button" data-chart="line" aria-pressed="false">Line</button>
  </div></div>
  <div id="pop-chart">${barChart(SERIES.population)}</div>
  <p class="source">Source: ${esc(SERIES.population.source)}. The population grew by 2.91 million people between mid-2023 and mid-2024.</p>
  <p><a href="#/population">See the full population page →</a></p>
</section>
<section class="grid-2">
  <article class="card">
    <h2>Real GDP growth</h2>
    ${barChart(SERIES.gdpGrowth)}
    <p class="source">Source: ${esc(SERIES.gdpGrowth.source)}. The 2020 contraction was the pandemic year; growth has held above 5% since 2022.</p>
    <p><a href="#/economy">See the full economy page →</a></p>
  </article>
  <article class="card">
    <h2>What the economy makes</h2>
    ${donutChart(GDP_SECTORS)}
    <p class="source">Source: BPS — shares of GDP at current prices, 2024. Manufacturing is the largest single sector at 18.7%.</p>
  </article>
</section>
<section class="card">
  <h2>Latest releases</h2>
  <ul class="releases">${releases}</ul>
</section>
${topicCards()}`;
}

export function population() {
  const top10 = [...PROVINCES].sort((a, b) => b.pop - a.pop).slice(0, 10);
  const ageRows = AGE_BANDS.map((a) => ({ label: a.band, value: a.share, display: `${a.share}%` }));
  return `
<p class="crumb"><a href="#/">← Home</a></p>
<h1>Population</h1>
<p class="lede">281.6 million people at mid-2024 (BPS), the fourth largest population in the
world — about 3.5% of everyone on Earth — spread over an archipelago of 17,508 islands.</p>
<section class="stat-row">
  <div class="stat"><span class="stat-value">281.6m</span><span class="stat-label">People, mid-2024 (BPS)</span></div>
  <div class="stat"><span class="stat-value">+2.91m</span><span class="stat-label">More than mid-2023</span></div>
  <div class="stat"><span class="stat-value">149 / km²</span><span class="stat-label">Average density (World Bank, 2024)</span></div>
  <div class="stat"><span class="stat-value">58.8%</span><span class="stat-label">Live in urban areas (World Bank, 2024)</span></div>
</section>
<section class="grid-2">
  <article class="card">
    <h2>Age structure, 2024</h2>
    ${hbarChart(ageRows, { labelWidth: 56 })}
    <p class="source">Share of the population in each five-year band. Source: BPS age-structure estimates.</p>
    <ul class="bullets">
      <li><b>23.6%</b> are children under 15.</li>
      <li><b>69.9%</b> are of working age (15–64).</li>
      <li><b>6.5%</b> are 65 or older — about 43 dependants per 100 working-age people.</li>
      <li>Median age is about <b>30 years</b>; fertility is <b>2.1</b> children per woman (World Bank, 2023).</li>
    </ul>
  </article>
  <article class="card">
    <div class="card-head"><h2>Largest provinces</h2>
    <div class="toggle" role="group" aria-label="Rank provinces by">
      <button type="button" data-rank="pop" class="active" aria-pressed="true">People</button>
      <button type="button" data-rank="density" aria-pressed="false">Density</button>
    </div></div>
    <div id="prov-rank">${hbarChart(top10.map((p) => ({ label: p.name, value: p.pop, display: fmtPop(p.pop) })), { labelWidth: 150 })}</div>
    <p class="source">Source: BPS mid-2024 estimates. Java holds about 55% of all Indonesians on 7% of the land.</p>
    <p><a href="#/provinces">Search and sort all 38 provinces →</a></p>
  </article>
</section>
<section class="card">
  <h2>Population, 2020–2024</h2>
  ${lineChart(SERIES.population)}
  <p class="source">Source: ${esc(SERIES.population.source)}.</p>
</section>`;
}

export function economy() {
  return `
<p class="crumb"><a href="#/">← Home</a></p>
<h1>Economy</h1>
<p class="lede">A $1.40 trillion economy (2024) — the largest in Southeast Asia and 16th in the
world — growing 5.03% in 2024, with inflation down to 1.57% and poverty at its lowest on record.</p>
<section class="stat-row">
  <div class="stat"><span class="stat-value">$1.40tn</span><span class="stat-label">GDP, 2024 (Rp 22,139 trillion · BPS)</span></div>
  <div class="stat"><span class="stat-value">$4,925</span><span class="stat-label">GDP per person, 2024 (World Bank)</span></div>
  <div class="stat"><span class="stat-value">5.03%</span><span class="stat-label">Real GDP growth, 2024 (BPS)</span></div>
  <div class="stat"><span class="stat-value">1.57%</span><span class="stat-label">Inflation, Dec 2024 year on year (BPS)</span></div>
</section>
<section class="card">
  <div class="card-head"><h2>Trends, 2020–2024</h2>
  <div class="toggle" role="group" aria-label="Choose an indicator">
    <button type="button" data-trend="gdpGrowth" class="active" aria-pressed="true">Growth</button>
    <button type="button" data-trend="inflation" aria-pressed="false">Inflation</button>
    <button type="button" data-trend="poverty" aria-pressed="false">Poverty</button>
    <button type="button" data-trend="unemployment" aria-pressed="false">Jobs</button>
  </div></div>
  <div id="trend-chart">${barChart(SERIES.gdpGrowth)}</div>
  <p class="source" id="trend-source">Source: ${esc(SERIES.gdpGrowth.source)} — ${esc(SERIES.gdpGrowth.unit)}.</p>
</section>
<section class="grid-2">
  <article class="card">
    <h2>What the economy makes</h2>
    ${donutChart(GDP_SECTORS)}
    <p class="source">Source: BPS — shares of GDP at current prices, 2024.</p>
  </article>
  <article class="card">
    <h2>Trade &amp; money, 2024</h2>
    <dl class="facts">
      <div><dt>Exports</dt><dd>$264.70 billion (BPS)</dd></div>
      <div><dt>Imports</dt><dd>$233.66 billion (BPS)</dd></div>
      <div><dt>Trade surplus</dt><dd>$31.04 billion — the fifth straight yearly surplus</dd></div>
      <div><dt>Foreign reserves</dt><dd>$155.7 billion at end-2024 (Bank Indonesia)</dd></div>
      <div><dt>Foreign direct investment</dt><dd>$24.2 billion (World Bank)</dd></div>
      <div><dt>Rupiah, average</dt><dd>Rp 15,847 per US$ in 2024 (Bank Indonesia)</dd></div>
      <div><dt>Labour force</dt><dd>152.1 million people; 144.6 million employed (Aug 2024, BPS)</dd></div>
      <div><dt>Gini index</dt><dd>0.379 — income inequality, Sep 2024 (BPS)</dd></div>
    </dl>
    <h3>Largest export groups, 2024 (approx.)</h3>
    <ul class="bullets">
      <li>Iron &amp; steel — about $28 billion</li>
      <li>Coal — about $27 billion</li>
      <li>Palm oil — about $23 billion</li>
      <li>Electrical machinery — about $14 billion</li>
    </ul>
    <p class="source">Source: BPS trade statistics.</p>
  </article>
</section>`;
}

export function health() {
  return `
<p class="crumb"><a href="#/">← Home</a></p>
<h1>Health</h1>
<p class="lede">Indonesians live longer than ever — 74.2 years at birth in 2024 — and child
stunting has fallen to 19.8%, though one child in five is still stunted.</p>
<section class="stat-row">
  <div class="stat"><span class="stat-value">74.2 yrs</span><span class="stat-label">Life expectancy at birth, 2024 (BPS)</span></div>
  <div class="stat"><span class="stat-value">15.2</span><span class="stat-label">Infant deaths per 1,000 live births, 2024 (World Bank)</span></div>
  <div class="stat"><span class="stat-value">19.8%</span><span class="stat-label">Children under five stunted, 2024 (SSGI)</span></div>
  <div class="stat"><span class="stat-value">75.02</span><span class="stat-label">Human Development Index, 2024 (BPS)</span></div>
</section>
<section class="grid-2">
  <article class="card">
    <h2>Child stunting is falling</h2>
    ${barChart(SERIES.stunting)}
    <p class="source">Source: ${esc(SERIES.stunting.source)}. Down from 27.7% in 2019 — but still above the government’s 14% target for 2024.</p>
  </article>
  <article class="card">
    <h2>Infant mortality, 2020–2024</h2>
    ${lineChart(SERIES.infantMortality)}
    <p class="source">Source: ${esc(SERIES.infantMortality.source)}. Under-five mortality was 17.7 per 1,000 in 2024.</p>
  </article>
</section>
<section class="grid-2">
  <article class="card">
    <h2>Human development, 2020–2024</h2>
    ${lineChart(SERIES.hdi)}
    <p class="source">Source: ${esc(SERIES.hdi.source)}. Indonesia is classed as high human development. The index combines health, schooling and living standards.</p>
    <ul class="bullets">
      <li>Life expectancy at birth: <b>74.15 years</b> (2024)</li>
      <li>Mean years of schooling: <b>9.19 years</b> (2024)</li>
      <li>Expected years of schooling: <b>13.21 years</b> (2024)</li>
    </ul>
  </article>
  <article class="card">
    <h2>The health system</h2>
    <dl class="facts">
      <div><dt>Health insurance (BPJS Kesehatan)</dt><dd>278.1 million participants — about 98.6% of the population (Dec 2024)</dd></div>
      <div><dt>Hospitals</dt><dd>More than 3,100 across the country</dd></div>
      <div><dt>Community health centres</dt><dd>More than 10,000 puskesmas, the front line of primary care</dd></div>
      <div><dt>Leading causes of death</dt><dd>Stroke, heart disease and diabetes — non-communicable diseases dominate</dd></div>
    </dl>
    <p class="source">Sources: BPJS Kesehatan, Ministry of Health.</p>
  </article>
</section>`;
}

export function education() {
  return `
<p class="crumb"><a href="#/">← Home</a></p>
<h1>Education</h1>
<p class="lede">96.5% of Indonesians aged 15 and over can read and write, children can expect
13.21 years of schooling, and about 9 million students are in higher education.</p>
<section class="stat-row">
  <div class="stat"><span class="stat-value">96.5%</span><span class="stat-label">Adult literacy, ages 15+, 2024 (BPS)</span></div>
  <div class="stat"><span class="stat-value">9.19 yrs</span><span class="stat-label">Mean years of schooling, 2024 (BPS)</span></div>
  <div class="stat"><span class="stat-value">13.21 yrs</span><span class="stat-label">Expected years of schooling, 2024 (BPS)</span></div>
  <div class="stat"><span class="stat-value">31.7%</span><span class="stat-label">Gross enrolment in higher education, 2024 (BPS)</span></div>
</section>
<section class="grid-2">
  <article class="card">
    <h2>Human Development Index, 2020–2024</h2>
    ${lineChart(SERIES.hdi)}
    <p class="source">Source: ${esc(SERIES.hdi.source)}. Schooling is two of the index’s three dimensions; the rise since 2020 is driven by longer schooling as well as longer lives.</p>
  </article>
  <article class="card">
    <h2>Schools &amp; students</h2>
    <dl class="facts">
      <div><dt>Primary &amp; secondary schools</dt><dd>About 218,000 schools nationwide</dd></div>
      <div><dt>Primary net enrolment</dt><dd>99.3% of primary-age children in school (2023, BPS)</dd></div>
      <div><dt>Higher-education institutions</dt><dd>About 4,500 universities, institutes and colleges</dd></div>
      <div><dt>Tertiary students</dt><dd>About 9 million students enrolled</dd></div>
      <div><dt>Youth literacy (15–24)</dt><dd>Above 99% — near universal among the young</dd></div>
    </dl>
    <p class="source">Sources: BPS; Ministry of Education, Culture, Research and Technology (PDDikti).</p>
  </article>
</section>
<section class="card">
  <h2>What still lags</h2>
  <p>Adults average only 9.19 years of schooling — just past junior secondary — and
  the gap between provinces is wide: Yogyakarta’s mean schooling is above 10 years,
  while Papua’s is below 7. Tertiary enrolment of 31.7% is still far below Malaysia’s
  or Thailand’s, and learning outcomes (PISA 2022: reading 359, mathematics 366,
  science 383) sit below the OECD average.</p>
  <p class="source">Sources: BPS; OECD PISA 2022.</p>
</section>`;
}

export function provinceRows(list) {
  return list
    .map(
      (p) => `<tr><td>${esc(p.name)}</td><td class="num">${fmtInt(p.pop * 1000)}</td><td class="num opt">${share(p).toFixed(2)}%</td><td class="num opt">${fmtInt(p.area)}</td><td class="num">${fmtInt(Math.round(density(p)))}</td></tr>`,
    )
    .join('');
}

export function provinces() {
  const sorted = [...PROVINCES].sort((a, b) => b.pop - a.pop);
  return `
<p class="crumb"><a href="#/">← Home</a></p>
<h1>Provinces</h1>
<p class="lede">All 38 provinces, from West Java’s 50.05 million people to South Papua’s
549,000. Search by name, or sort by any column.</p>
<section class="card">
  <div class="table-tools">
    <label for="prov-search">Search provinces</label>
    <input id="prov-search" type="search" placeholder="Type a province name…" autocomplete="off">
    <span id="prov-count" class="count" aria-live="polite">38 provinces</span>
  </div>
  <div class="table-wrap">
  <table id="prov-table">
    <thead><tr>
      <th><button type="button" data-sort="name">Province</button></th>
      <th><button type="button" data-sort="pop" class="sorted">Population, 2024 ↓</button></th>
      <th class="opt"><button type="button" data-sort="share">Share</button></th>
      <th class="opt"><button type="button" data-sort="area">Area (km²)</button></th>
      <th><button type="button" data-sort="density">Density (/km²)</button></th>
    </tr></thead>
    <tbody>${provinceRows(sorted)}</tbody>
    <tfoot><tr><td><b>Indonesia</b></td><td class="num"><b>${fmtInt(PROVINCE_TOTAL_POP * 1000)}</b></td><td class="num opt"><b>100.00%</b></td><td class="num opt"><b>1,904,569</b></td><td class="num"><b>148</b></td></tr></tfoot>
  </table>
  </div>
  <p class="source">Source: BPS mid-2024 population estimates (rounded to the nearest thousand) and land areas. Density is people per km² of land. The six provinces on Java hold about 55% of the population; Jakarta, at 15,907 people per km², is by far the densest.</p>
</section>`;
}

export function about() {
  const facts = FACTS.map((f) => `<div><dt>${esc(f.label)}</dt><dd>${esc(f.value)}</dd></div>`).join('');
  return `
<p class="crumb"><a href="#/">← Home</a></p>
<h1>About &amp; sources</h1>
<p class="lede">Nusantara Stats is an independent statistics site about Indonesia. It is not
affiliated with Statistics Indonesia (BPS) or any government body. Every figure on
this site comes from a published official source, named beside the figure.</p>
<section class="card">
  <h2>Country facts</h2>
  <dl class="facts">${facts}</dl>
</section>
<section class="card">
  <h2>Sources</h2>
  <ul class="bullets">
    <li><b>Statistics Indonesia (BPS)</b> — population, GDP, inflation, poverty, unemployment, HDI, trade, schooling. bps.go.id</li>
    <li><b>Bank Indonesia</b> — foreign reserves, rupiah exchange rate. bi.go.id</li>
    <li><b>Ministry of Health</b> — stunting prevalence (Indonesian Nutrition Status Survey, SSGI) and health facilities. kemkes.go.id</li>
    <li><b>BPJS Kesehatan</b> — health-insurance participation.</li>
    <li><b>World Bank, World Development Indicators</b> — population density, urban share, infant and under-five mortality, FDI, GDP in US dollars.</li>
    <li><b>IMF</b> — GDP at purchasing power parity.</li>
    <li><b>OECD PISA 2022</b> — student learning outcomes.</li>
  </ul>
  <h2>Methods &amp; notes</h2>
  <ul class="bullets">
    <li>Figures are for the latest year published when the site was compiled (mostly 2024); the year is shown with each figure.</li>
    <li>Province populations are rounded mid-2024 estimates; they add to 281.6 million, the BPS national estimate.</li>
    <li>Where sources disagree — for example BPS and World Bank population totals — the site says which source each figure comes from.</li>
    <li>The site is a static site: it makes no network requests and stores nothing about its visitors.</li>
  </ul>
  <h2>How to cite</h2>
  <p>“Nusantara Stats, Indonesia in Numbers (data as published by BPS and the sources named on each page), November 2026.”</p>
</section>`;
}

export function missing() {
  return `
<h1>Page not found</h1>
<p class="lede">There is no page at this address.</p>
<p><a href="#/">← Back to the home page</a></p>`;
}
