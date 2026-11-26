// Nusantara Stats — the data behind the site.
//
// Every figure is a real published figure, with its source and year named
// beside it on the page that shows it. Main sources: Statistics Indonesia
// (BPS), Bank Indonesia (BI), the Ministry of Health (Kemenkes / SSGI),
// the World Bank (WDI) and the IMF. Province populations are rounded
// mid-2024 estimates that add up to the national total.

export const META = {
  country: 'Indonesia',
  countryId: 'Republik Indonesia',
  updated: 'November 2026',
  dataYear: 2024,
};

// Headline indicators shown on the home page.
export const HEADLINE = [
  { label: 'Population', value: '281.6m', sub: 'Mid-2024 estimate · BPS', route: '#/population' },
  { label: 'GDP', value: '$1.40tn', sub: 'Rp 22,139 trillion · 2024 · BPS', route: '#/economy' },
  { label: 'GDP growth', value: '5.03%', sub: '2024, year on year · BPS', route: '#/economy' },
  { label: 'Poverty rate', value: '8.57%', sub: '24.06 million people · Sep 2024 · BPS', route: '#/economy' },
  { label: 'Human Development Index', value: '75.02', sub: 'High human development · 2024 · BPS', route: '#/health' },
  { label: 'Life expectancy', value: '74.2 yrs', sub: 'At birth · 2024 · BPS', route: '#/health' },
];

// Yearly series, 2020-2024. Values are the published annual figures.
export const SERIES = {
  population: {
    label: 'Population',
    unit: 'million people',
    source: 'BPS, mid-year estimates',
    years: [2020, 2021, 2022, 2023, 2024],
    values: [270.2, 272.25, 275.77, 278.69, 281.6],
  },
  gdpGrowth: {
    label: 'Real GDP growth',
    unit: '% per year',
    source: 'BPS',
    years: [2020, 2021, 2022, 2023, 2024],
    values: [-2.07, 3.7, 5.31, 5.05, 5.03],
  },
  inflation: {
    label: 'Consumer price inflation',
    unit: '% year on year, December',
    source: 'BPS',
    years: [2020, 2021, 2022, 2023, 2024],
    values: [1.68, 1.87, 5.51, 2.61, 1.57],
  },
  poverty: {
    label: 'Poverty rate',
    unit: '% of population, September',
    source: 'BPS',
    years: [2020, 2021, 2022, 2023, 2024],
    values: [10.19, 9.71, 9.57, 9.36, 8.57],
  },
  unemployment: {
    label: 'Open unemployment rate',
    unit: '% of labour force, August',
    source: 'BPS (Sakernas)',
    years: [2020, 2021, 2022, 2023, 2024],
    values: [7.07, 6.49, 5.86, 5.32, 4.91],
  },
  hdi: {
    label: 'Human Development Index',
    unit: 'index, 0-100',
    source: 'BPS',
    years: [2020, 2021, 2022, 2023, 2024],
    values: [71.94, 72.29, 72.91, 74.39, 75.02],
  },
  infantMortality: {
    label: 'Infant mortality',
    unit: 'deaths per 1,000 live births',
    source: 'World Bank (WDI)',
    years: [2020, 2021, 2022, 2023, 2024],
    values: [17.5, 17.0, 16.4, 15.9, 15.2],
  },
  stunting: {
    label: 'Child stunting',
    unit: '% of children under five',
    source: 'Ministry of Health (SSGI)',
    years: [2019, 2022, 2023, 2024],
    values: [27.7, 21.6, 21.5, 19.8],
  },
};

// GDP by sector, share of GDP at current prices, 2024 (BPS).
export const GDP_SECTORS = [
  { sector: 'Manufacturing', share: 18.7 },
  { sector: 'Wholesale & retail trade', share: 13.0 },
  { sector: 'Agriculture, forestry & fishing', share: 12.5 },
  { sector: 'Construction', share: 9.5 },
  { sector: 'Mining & quarrying', share: 8.9 },
  { sector: 'All other sectors', share: 37.4 },
];

// Age structure, 2024: share of the population in each five-year band
// (BPS age-structure estimates; bands add to 100%).
export const AGE_BANDS = [
  { band: '0-4', share: 7.4 }, { band: '5-9', share: 7.9 },
  { band: '10-14', share: 8.3 }, { band: '15-19', share: 8.3 },
  { band: '20-24', share: 8.4 }, { band: '25-29', share: 8.3 },
  { band: '30-34', share: 8.1 }, { band: '35-39', share: 7.8 },
  { band: '40-44', share: 7.4 }, { band: '45-49', share: 6.8 },
  { band: '50-54', share: 6.0 }, { band: '55-59', share: 4.9 },
  { band: '60-64', share: 3.9 }, { band: '65-69', share: 2.9 },
  { band: '70-74', share: 1.9 }, { band: '75+', share: 1.7 },
];

// All 38 provinces: mid-2024 population estimate (thousands, rounded) and
// land area (km2). Density is computed from these two numbers.
export const PROVINCES = [
  { name: 'Aceh', pop: 5554, area: 57956 },
  { name: 'North Sumatra', pop: 15400, area: 72981 },
  { name: 'West Sumatra', pop: 6030, area: 42013 },
  { name: 'Riau', pop: 6971, area: 87024 },
  { name: 'Jambi', pop: 3662, area: 50058 },
  { name: 'South Sumatra', pop: 8837, area: 91592 },
  { name: 'Bengkulu', pop: 2115, area: 19919 },
  { name: 'Lampung', pop: 9450, area: 34624 },
  { name: 'Bangka Belitung Islands', pop: 1497, area: 16424 },
  { name: 'Riau Islands', pop: 2189, area: 8202 },
  { name: 'Jakarta', pop: 10562, area: 664 },
  { name: 'West Java', pop: 50050, area: 35378 },
  { name: 'Central Java', pop: 37700, area: 32801 },
  { name: 'Yogyakarta', pop: 3759, area: 3133 },
  { name: 'East Java', pop: 41200, area: 47803 },
  { name: 'Banten', pop: 12610, area: 9663 },
  { name: 'Bali', pop: 4374, area: 5780 },
  { name: 'West Nusa Tenggara', pop: 5523, area: 18572 },
  { name: 'East Nusa Tenggara', pop: 5628, area: 47932 },
  { name: 'West Kalimantan', pop: 5875, area: 147307 },
  { name: 'Central Kalimantan', pop: 2800, area: 153564 },
  { name: 'South Kalimantan', pop: 4290, area: 38744 },
  { name: 'East Kalimantan', pop: 4030, area: 127347 },
  { name: 'North Kalimantan', pop: 739, area: 75467 },
  { name: 'North Sulawesi', pop: 2726, area: 13892 },
  { name: 'Central Sulawesi', pop: 3142, area: 61841 },
  { name: 'South Sulawesi', pop: 9463, area: 46717 },
  { name: 'Southeast Sulawesi', pop: 2823, area: 38068 },
  { name: 'Gorontalo', pop: 1251, area: 11257 },
  { name: 'West Sulawesi', pop: 1531, area: 16787 },
  { name: 'Maluku', pop: 1978, area: 46914 },
  { name: 'North Maluku', pop: 1406, area: 31982 },
  { name: 'West Papua', pop: 1226, area: 60275 },
  { name: 'Southwest Papua', pop: 631, area: 39167 },
  { name: 'Papua', pop: 1115, area: 82680 },
  { name: 'Central Papua', pop: 1395, area: 61073 },
  { name: 'Highland Papua', pop: 1534, area: 51213 },
  { name: 'South Papua', pop: 549, area: 117849 },
];

export const PROVINCE_TOTAL_POP = PROVINCES.reduce((s, p) => s + p.pop, 0); // thousands

// Latest statistical releases a visitor would look for.
export const RELEASES = [
  { date: 'Nov 2025', title: 'Economy grew 5.04% in the third quarter of 2025', source: 'BPS' },
  { date: 'Nov 2024', title: 'Human Development Index reached 75.02 in 2024', source: 'BPS' },
  { date: 'Feb 2025', title: 'GDP grew 5.03% in 2024; GDP per capita Rp 78.6 million', source: 'BPS' },
  { date: 'Jan 2025', title: 'Poverty fell to 8.57% in September 2024 — 24.06 million people', source: 'BPS' },
  { date: 'May 2025', title: 'Stunting prevalence fell to 19.8% in 2024 (SSGI)', source: 'Ministry of Health' },
  { date: 'Jan 2025', title: '13.90 million foreign visitor arrivals in 2024', source: 'BPS' },
];

// Key facts shown on the About page.
export const FACTS = [
  { label: 'Full name', value: 'Republic of Indonesia (Republik Indonesia)' },
  { label: 'Capital', value: 'Jakarta (seat of government moving to Nusantara, East Kalimantan)' },
  { label: 'Land area', value: '1,904,569 km² — the world’s largest archipelago, 17,508 islands' },
  { label: 'Population density', value: 'About 149 people per km² (World Bank, 2024)' },
  { label: 'Urban population', value: '58.8% of people live in urban areas (World Bank, 2024)' },
  { label: 'Median age', value: 'About 30 years' },
  { label: 'Fertility rate', value: '2.1 children per woman (World Bank, 2023)' },
  { label: 'Currency', value: 'Indonesian rupiah (IDR) — about Rp 15,847 per US$ on average in 2024' },
  { label: 'Languages', value: 'Indonesian (official); more than 700 local languages' },
  { label: 'Time zones', value: 'WIB (UTC+7), WITA (UTC+8), WIT (UTC+9)' },
];
