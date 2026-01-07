
import { Project, Experience, Education } from './types.ts';

export const PROJECTS: Project[] = [
  {
    id: 8,
    title: "Dreamflow App",
    description: "An advanced interactive flow application designed for seamless digital experiences and high-fidelity interactions.",
    tags: ["Dreamflow", "Interactive", "Performance"],
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200",
    link: "https://e8h39l43j7nf05todog1.share.dreamflow.app/"
  },
  {
    id: 1,
    title: "MyClothWeb",
    description: "Premium e-commerce destination with a focus on high-fashion aesthetics and fluid user flow.",
    tags: ["React", "Tailwind", "GSAP"],
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200",
    link: "https://myclothweb.netlify.app/"
  },
  {
    id: 2,
    title: "SCSMCOE AI",
    description: "Next-generation academic portal featuring AI-driven authentication and secure resource management.",
    tags: ["AI", "Auth", "Security"],
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=1200",
    link: "https://scsmcoe-ai.netlify.app/auth"
  },
  {
    id: 3,
    title: "TaskMaster",
    description: "A performance-focused utility for modern workflow management and high-velocity productivity.",
    tags: ["JavaScript", "Utility", "UI/UX"],
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=1200",
    link: "http://pktechnic.netlify.app/to-do-app/index.html"
  }
];

export const EXPERIENCES: Experience[] = [
  {
    company: "Tata Electronics Private Ltd.",
    role: "Engineer 2 | Java Full Stack Developer",
    period: "Aug 2024 - Present",
    description: "Engineered scalable microservice architectures and high-performance backend systems for global operations."
  },
  {
    company: "Perpetual Design Studio",
    role: "Web Development Trainee",
    period: "Jan 2024 - May 2024",
    description: "Implemented high-end responsive interfaces and interactive web experiences for premium digital brands."
  }
];

export const EDUCATION: Education[] = [
  {
    institution: "Shri Chatrapati Shivaji Maharaj College of Engineering",
    degree: "Bachelor of Computer Engineering",
    period: "Aug 2020 - Jul 2023",
    score: "8.3 CGPA",
    location: "Nepti, Ahmednagar"
  },
  {
    institution: "Shree Samarth Polytechnic",
    degree: "Diploma in Computer Science",
    period: "Aug 2016 - Jul 2019",
    score: "71%",
    location: "Mhasne Phata, Ahmednagar"
  }
];

export const SKILLS_CATEGORIES = [
  { name: "Backend Architecture", items: ["Java 17", "Spring Boot", "Microservices", "Oracle SQL"] },
  { name: "Frontend Flow", items: ["React.js", "Three.js", "GSAP", "Tailwind CSS"] },
  { name: "Integration", items: ["Webmethods", "REST APIs", "OAuth2", "GraphQL"] },
  { name: "Operations", items: ["Docker", "AWS", "CI/CD", "Kubernetes"] }
];

export const SYSTEM_INSTRUCTION = `
You are the AI representative for Prathmesh Narayan Kamble.
He is a high-level Java Developer specializing in Java and immersive Web interfaces.
He currently works at Tata Electronics.
Education: 
- Bachelor of Computer Engineering from SCSMCOE Ahmednagar (Aug 2020 - Jul 2023) with a CGPA of 8.3.
- Diploma in Computer Science from Shree Samarth Polytechnic, Mhasne Phata-Ahmednagar (Aug 2016 - Jul 2019) with 71%.
Certifications: AWS Cloud Practitioner.
Keep responses professional, elite, and technically concise.
`;
