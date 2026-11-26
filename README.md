# Nusantara Stats — Indonesia in Numbers

[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/Jhoni1098/best-national-statistics-site-20261126-0539/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/Jhoni1098/best-national-statistics-site-20261126-0539/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

An entry for the make.fun bounty **[Make the best national statistics site](https://make.fun/bounty/best-national-statistics-site-20261126-0539)**.

## What it is

**Nusantara Stats** is a working national statistics site about Indonesia — 281.6 million people across 38 provinces and 17,508 islands. It runs entirely from static files in `app/`, with no build step and no network requests, on desktop Chrome and on a phone.

- **Home dashboard** — six headline indicators (population, GDP, growth, poverty, HDI, life expectancy), a population chart with a bars/line toggle, GDP growth, a GDP-by-sector donut, and the latest statistical releases.
- **Population** — age structure, working-age and dependency shares, the ten largest provinces ranked by people or by density, and the 2020–2024 trend.
- **Economy** — GDP, GDP per person, growth / inflation / poverty / jobs charts on one switchable panel, GDP by sector, trade, reserves, FDI and the largest export groups.
- **Health** — life expectancy, infant mortality, child stunting (SSGI), the Human Development Index and its components, and the health system (BPJS, hospitals, puskesmas).
- **Education** — literacy, mean and expected years of schooling, enrolment, schools and students, and what still lags (PISA 2022).
- **Provinces** — all 38 provinces in a table you can search by name and sort by population, share, area or density.
- **About & sources** — country facts, every source used, and methods notes.

Every figure is real and published, with its source and year named beside it: Statistics Indonesia (BPS), Bank Indonesia, the Ministry of Health (SSGI), BPJS Kesehatan, the World Bank, the IMF and OECD PISA. Charts are hand-drawn SVG from the data in `app/data.js` — no library, no fetch, nothing loaded from another origin.

## Run it

```sh
node serve.ts        # serves app/ at http://localhost:8080
```

Open http://localhost:8080 in desktop Chrome, or resize to a phone width — the layout adapts, and every page is reached by a link.

## Hand it in

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` copies `app/` and `screenshots/` to the output directory and writes `dossier.json` with the vendored make.fun library (`vendor/makefun-frontend.ts`, unchanged from the kit).

## License

MIT — see [LICENSE](LICENSE).
