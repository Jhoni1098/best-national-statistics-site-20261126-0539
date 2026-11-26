// Hand-rolled SVG charts. No library: every chart is drawn from the data in
// data.js, so the site works offline and the first load stays small.
//
// Each builder returns an SVG string with a <title> and labelled values, and
// sets window.__shotReady only through main.js once the page is on screen.

const INK = '#17324a';
const MUTED = '#5d7186';
const TEAL = '#0e7a6d';
const AMBER = '#d9930d';
const RED = '#b3402e';
const GRID = '#dfe7ee';

function esc(s) {
  return String(s).replace(/[&<>"]/g, (c) => `&#${c.charCodeAt(0)};`);
}

function niceMax(values) {
  const m = Math.max(...values.map(Math.abs));
  if (m <= 0) return 1;
  const pow = 10 ** Math.floor(Math.log10(m));
  const n = m / pow;
  const step = n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10;
  return step * pow;
}

// Vertical bar chart with value labels. Handles one negative bar (2020 GDP).
export function barChart(series, opts = {}) {
  const w = opts.width ?? 640;
  const h = opts.height ?? 260;
  const padL = 52;
  const padB = 28;
  const padT = 26;
  const plotW = w - padL - 12;
  const plotH = h - padT - padB;
  const max = niceMax(series.values);
  const min = Math.min(0, ...series.values);
  const span = max - min;
  const zeroY = padT + (max / span) * plotH;
  const n = series.values.length;
  const slot = plotW / n;
  const bw = Math.min(44, slot * 0.62);
  const bars = series.values
    .map((v, i) => {
      const x = padL + i * slot + (slot - bw) / 2;
      const y = v >= 0 ? padT + ((max - v) / span) * plotH : zeroY;
      const bh = (Math.abs(v) / span) * plotH;
      const fill = v < 0 ? RED : i === n - 1 ? AMBER : TEAL;
      const ly = y - 6; // value label sits above the bar's top edge, also for negative bars
      return `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${bw.toFixed(1)}" height="${Math.max(bh, 1.5).toFixed(1)}" rx="3" fill="${fill}"><title>${series.years[i]}: ${v}</title></rect><text x="${(x + bw / 2).toFixed(1)}" y="${ly.toFixed(1)}" text-anchor="middle" font-size="12" font-weight="700" fill="${INK}">${v}</text><text x="${(x + bw / 2).toFixed(1)}" y="${(h - 8).toFixed(1)}" text-anchor="middle" font-size="12" fill="${MUTED}">${series.years[i]}</text>`;
    })
    .join('');
  const grid = [0, 0.5, 1]
    .map((f) => {
      const val = min + f * span;
      const y = padT + ((max - val) / span) * plotH;
      return `<line x1="${padL}" y1="${y.toFixed(1)}" x2="${w - 12}" y2="${y.toFixed(1)}" stroke="${GRID}"/><text x="${padL - 8}" y="${(y + 4).toFixed(1)}" text-anchor="end" font-size="11" fill="${MUTED}">${val.toFixed(0)}</text>`;
    })
    .join('');
  return `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(series.label)} chart, ${series.years[0]} to ${series.years[series.years.length - 1]}" style="width:100%;height:auto;display:block">${grid}<line x1="${padL}" y1="${zeroY.toFixed(1)}" x2="${w - 12}" y2="${zeroY.toFixed(1)}" stroke="${INK}" stroke-width="1"/>${bars}</svg>`;
}

// Line chart with dots and value labels.
export function lineChart(series, opts = {}) {
  const w = opts.width ?? 640;
  const h = opts.height ?? 260;
  const padL = 52;
  const padB = 28;
  const padT = 26;
  const plotW = w - padL - 12;
  const plotH = h - padT - padB;
  const min = Math.min(...series.values);
  const max = Math.max(...series.values);
  const lo = min - (max - min) * 0.15;
  const hi = max + (max - min) * 0.15;
  const span = hi - lo;
  const x = (i) => padL + (i / (series.values.length - 1)) * plotW;
  const y = (v) => padT + ((hi - v) / span) * plotH;
  const pts = series.values.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
  const grid = [0, 0.5, 1]
    .map((f) => {
      const gy = padT + (1 - f) * plotH;
      const val = (lo + f * span).toFixed(0);
      return `<line x1="${padL}" y1="${gy.toFixed(1)}" x2="${w - 12}" y2="${gy.toFixed(1)}" stroke="${GRID}"/><text x="${padL - 8}" y="${(gy + 4).toFixed(1)}" text-anchor="end" font-size="11" fill="${MUTED}">${val}</text>`;
    })
    .join('');
  const dots = series.values
    .map((v, i) => `<circle cx="${x(i).toFixed(1)}" cy="${y(v).toFixed(1)}" r="4.5" fill="${i === series.values.length - 1 ? AMBER : TEAL}"><title>${series.years[i]}: ${v}</title></circle><text x="${x(i).toFixed(1)}" y="${(y(v) - 10).toFixed(1)}" text-anchor="middle" font-size="12" font-weight="700" fill="${INK}">${v}</text><text x="${x(i).toFixed(1)}" y="${h - 8}" text-anchor="middle" font-size="12" fill="${MUTED}">${series.years[i]}</text>`)
    .join('');
  return `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(series.label)} chart, ${series.years[0]} to ${series.years[series.years.length - 1]}" style="width:100%;height:auto;display:block">${grid}<polyline points="${pts}" fill="none" stroke="${TEAL}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>${dots}</svg>`;
}

// Donut chart with a legend list. Values are shares that add to 100.
export function donutChart(items, opts = {}) {
  const size = opts.size ?? 220;
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 14;
  const inner = r - 34;
  const colors = [TEAL, '#2a9d8f', AMBER, '#e76f51', '#457b9d', '#8a97a5'];
  let acc = 0;
  const slices = items
    .map((it, i) => {
      const a0 = (acc / 100) * Math.PI * 2 - Math.PI / 2;
      acc += it.share;
      const a1 = (acc / 100) * Math.PI * 2 - Math.PI / 2;
      const large = a1 - a0 > Math.PI ? 1 : 0;
      const x0 = cx + r * Math.cos(a0);
      const y0 = cy + r * Math.sin(a0);
      const x1 = cx + r * Math.cos(a1);
      const y1 = cy + r * Math.sin(a1);
      const xi1 = cx + inner * Math.cos(a1);
      const yi1 = cy + inner * Math.sin(a1);
      const xi0 = cx + inner * Math.cos(a0);
      const yi0 = cy + inner * Math.sin(a0);
      return `<path d="M ${x0.toFixed(1)} ${y0.toFixed(1)} A ${r} ${r} 0 ${large} 1 ${x1.toFixed(1)} ${y1.toFixed(1)} L ${xi1.toFixed(1)} ${yi1.toFixed(1)} A ${inner} ${inner} 0 ${large} 0 ${xi0.toFixed(1)} ${yi0.toFixed(1)} Z" fill="${colors[i % colors.length]}"><title>${esc(it.sector)}: ${it.share}%</title></path>`;
    })
    .join('');
  const legend = items
    .map((it, i) => `<li><span class="swatch" style="background:${colors[i % colors.length]}"></span>${esc(it.sector)}<b>${it.share}%</b></li>`)
    .join('');
  return `<div class="donut-wrap"><svg viewBox="0 0 ${size} ${size}" role="img" aria-label="GDP by sector, 2024" style="width:${size}px;height:${size}px;flex:none">${slices}<text x="${cx}" y="${cy - 4}" text-anchor="middle" font-size="26" font-weight="800" fill="${INK}">100%</text><text x="${cx}" y="${cy + 16}" text-anchor="middle" font-size="12" fill="${MUTED}">of GDP, 2024</text></svg><ul class="legend">${legend}</ul></div>`;
}

// Horizontal bars, for ranked lists such as the largest provinces.
export function hbarChart(items, opts = {}) {
  const w = opts.width ?? 640;
  const rowH = opts.rowHeight ?? 34;
  const h = items.length * rowH + 8;
  const max = Math.max(...items.map((d) => d.value));
  const labelW = opts.labelWidth ?? 150;
  const grouped = items
    .map((d, i) => {
      const bw = ((d.value / max) * (w - labelW - 90)).toFixed(1);
      return `<g transform="translate(0,${i * rowH})"><text x="0" y="22" font-size="13" fill="${INK}">${esc(d.label)}</text><rect x="${labelW}" y="8" width="${bw}" height="20" rx="3" fill="${d.highlight ? AMBER : TEAL}"><title>${esc(d.label)}: ${d.display}</title></rect><text x="${labelW + Number(bw) + 8}" y="23" font-size="13" font-weight="700" fill="${INK}">${esc(d.display)}</text></g>`;
    })
    .join('');
  return `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="Ranked horizontal bar chart" style="width:100%;height:auto;display:block">${grouped}</svg>`;
}
