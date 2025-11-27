import FastMarquee from "react-fast-marquee";

// Handle both ESM and CJS default exports
const Marquee = FastMarquee.default || FastMarquee;

const techStack = [
  { name: "TypeScript", icon: "devicon-typescript-plain colored" },
  { name: "React", icon: "devicon-react-original colored" },
  { name: "Node.js", icon: "devicon-nodejs-plain colored" },
  { name: "Solidity", icon: "devicon-solidity-plain" },
  { name: "JavaScript", icon: "devicon-javascript-plain colored" },
  { name: "HTML5", icon: "devicon-html5-plain colored" },
  { name: "CSS3", icon: "devicon-css3-plain colored" },
  { name: "PostgreSQL", icon: "devicon-postgresql-plain colored" },
  { name: "Docker", icon: "devicon-docker-plain colored" },
  { name: "Redis", icon: "devicon-redis-plain colored" },
  { name: "Next.js", icon: "devicon-nextjs-plain" },
  { name: "Astro", icon: "devicon-astro-plain" },
  { name: "Laravel", icon: "devicon-laravel-original colored" },
  { name: "Hardhat", icon: "devicon-hardhat-plain colored" },
  { name: "Tailwind", icon: "devicon-tailwindcss-original colored" },
];

const itemStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "0.75rem",
  padding: "0.75rem 1rem",
  borderRadius: "0.75rem",
  backgroundColor: "rgba(24, 24, 27, 0.5)",
  border: "1px solid rgba(39, 39, 42, 0.5)",
  minWidth: "100px",
  marginRight: "1.5rem",
  transition: "all 0.3s ease",
};

const iconStyle = {
  fontSize: "2.5rem",
  lineHeight: 1,
};

const labelStyle = {
  fontSize: "0.75rem",
  fontWeight: 500,
  color: "rgba(161, 161, 170, 1)",
  whiteSpace: "nowrap",
};

export default function TechStackMarquee() {
  return (
    <Marquee
      gradient={true}
      gradientColor="#0c0c0e"
      gradientWidth={80}
      speed={30}
      pauseOnHover={true}
    >
      {techStack.map((tech) => (
        <div key={tech.name} style={itemStyle}>
          <i className={tech.icon} style={iconStyle}></i>
          <span style={labelStyle}>{tech.name}</span>
        </div>
      ))}
    </Marquee>
  );
}
