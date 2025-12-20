export interface Project {
  name: string;
  type: string;
  company?: string;  // Company name (shown as "@ Company")
  role?: string;     // Role/context when not a company (shown without @)
  image: string;
  year?: string;
  url?: string;
  sunset?: boolean;
}

export const projects: Project[] = [
  {
    name: "CCToken, XSY, SilentData Rollup, Toqen",
    type: "Web3 DApps + Smart Contracts",
    company: "Applied Blockchain",
    image: "/images/projects/ab.png",
    year: "2021 - Now"
  },
  {
    name: "WSEduca",
    type: "School Management System",
    company: "Medidata",
    image: "/images/projects/wseduca.png",
    url: "https://www.medidata.pt/pt/produtos",
    year: "2020"
  },
  {
    name: "MatchFind",
    type: "Matchmaking Platform",
    role: "Personal Project",
    image: "/images/projects/matchfind.png",
    year: "2020",
    url: "https://github.com/diogopalhais/matchfind"
  },
  {
    name: "Scouting",
    type: "Scouting Intelligence Platform",
    company: "Red Adviser",
    image: "/images/projects/scouting.png",
    year: "2019"
  },
  {
    name: "BigOdds",
    type: "Sports Betting Platform",
    company: "Red Adviser",
    image: "/images/projects/bigodds.jpg",
    year: "2017",
    sunset: true
  },
  {
    name: "SportTransfers",
    type: "Football Transfer Market Platform",
    company: "Red Adviser",
    image: "/images/projects/sportransfers.jpg",
    year: "2016",
    sunset: true
  },
  {
    name: "Easy2rec",
    type: "Recorder and Video Platform",
    role: "Co-founder",
    image: "/images/projects/e2r.webp",
    year: "2015",
    sunset: true
  }
];

