const mockFunds = [
  {
    id: 1,
    name: "EIC Accelerator",
    description: "EU funding for innovative startups and SMEs",
    country: "EU-wide",
    amount: "Up to €2.5 million",
    website: "https://eic.ec.europa.eu/eic-funding-opportunities/eic-accelerator_en"
  },
  {
    id: 2,
    name: "Horizon Europe",
    description: "EU's key funding programme for research and innovation",
    country: "EU-wide",
    amount: "Varies by project",
    website: "https://ec.europa.eu/info/research-and-innovation/funding/funding-opportunities/funding-programmes-and-open-calls/horizon-europe_en"
  },
  {
    id: 3,
    name: "EXIST Business Start-up Grant",
    description: "German funding program for innovative start-up projects",
    country: "Germany",
    amount: "Up to €150,000",
    website: "https://www.exist.de/EN/Programme/EXIST-Business-Startup-Grant/content.html"
  },
  {
    id: 4,
    name: "Bpifrance Innovation Grant",
    description: "French innovation funding for SMEs",
    country: "France",
    amount: "Up to €3 million",
    website: "https://www.bpifrance.com/"
  },
  {
    id: 5,
    name: "Innovate UK Smart Grants",
    description: "UK funding for game-changing and commercially viable innovation",
    country: "United Kingdom",
    amount: "£25,000 to £500,000",
    website: "https://www.gov.uk/government/organisations/innovate-uk"
  },
];

export const fetchFunds = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return mockFunds;
};