import FastMarquee from "react-fast-marquee";

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


export default function TechStackMarquee() {
  const gradientColor = typeof document !== 'undefined'
    ? getComputedStyle(document.documentElement).getPropertyValue('--color-card').trim() || '#0a0a0a'
    : '#0a0a0a';

  return (
    <Marquee
      gradient={true}
      gradientColor={gradientColor}
      gradientWidth={80}
      speed={30}
      pauseOnHover={true}
    >
      {techStack.map((tech) => (
        <div
          key={tech.name}
          className="flex flex-col items-center gap-2 md:gap-3 px-3 md:px-5 mr-2 md:mr-4"
        >
          <i className={`${tech.icon} text-2xl md:text-4xl leading-none`}></i>
          <span className="text-[10px] md:text-xs font-medium text-text-muted whitespace-nowrap">
            {tech.name}
          </span>
        </div>
      ))}
    </Marquee>
  );
}
