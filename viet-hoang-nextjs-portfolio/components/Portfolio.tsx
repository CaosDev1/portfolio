"use client";

import { useEffect, useState } from "react";

type Game = { title: string; description: string; category: string; platform: string; image: string; link: string };
type SiteData = {
  name: string; role: string; intro: string; email: string; location: string; github: string;
  cvLink: string; heroImage: string; about: string; skills: string; games: Game[];
};
const defaults: SiteData = {
  name: "Viet Hoang",
  role: "Unity Game Developer",
  intro: "I create casual and hyper-casual games, turning simple ideas into fun, engaging experiences.",
  email: "vhoang0327@gmail.com",
  location: "Hanoi, Vietnam",
  github: "https://github.com/",
  cvLink: "",
  heroImage: "",
  about: "I’m passionate about game development and always eager to learn new skills. I enjoy building small games, improving my craft, and turning creative ideas into playable experiences.",
  skills: "Unity, C#, Visual Studio, Git, Blender (basic), Photoshop (basic), Aseprite, Game Design",
  games: [
    { title: "Rolling Ball Rush", description: "Roll, dodge and reach the finish line! A simple but addictive casual game.", category: "Casual · 3D", platform: "Unity", image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1000&q=85", link: "" },
    { title: "Shadow Runner", description: "Run, jump and avoid obstacles in this fast-paced 2D platformer.", category: "Platformer · 2D", platform: "Unity", image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1000&q=85", link: "" },
    { title: "Black Hole Clicker", description: "Click, collect, upgrade. Grow your black hole and consume the universe!", category: "Idle · Incremental", platform: "Unity", image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1000&q=85", link: "" }
  ]
};
const KEY = "vh-portfolio-data";

export default function Portfolio() {
  const [data, setData] = useState<SiteData>(defaults);
  const [loaded, setLoaded] = useState(false);
  const [light, setLight] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY);
      if (saved) setData({ ...defaults, ...JSON.parse(saved) });
    } catch {}
    setLoaded(true);
    const onStorage = (event: StorageEvent) => {
      if (event.key === KEY && event.newValue) {
        try { setData({ ...defaults, ...JSON.parse(event.newValue) }); } catch {}
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const skills = data.skills.split(",").map(s => s.trim()).filter(Boolean);
  return (
    <main className={light ? "site light" : "site"}>
      <header className="nav wrap">
        <a className="brand" href="#home"><span className="brand-icon">✦</span>{data.name}</a>
        <nav><a href="#home">Home</a><a href="#games">Games</a><a href="#skills">Skills</a><a href="#about">About</a><a href="#contact">Contact</a></nav>
        <button className="theme-button" aria-label="Toggle theme" onClick={() => setLight(!light)}>{light ? "☾" : "☼"}</button>
      </header>

      <section id="home" className="hero wrap">
        <div className="hero-copy">
          <p className="eyebrow">{data.role}</p>
          <h1>Hi, I&apos;m <span>{data.name}</span></h1>
          <p className="lead">{data.intro}</p>
          <div className="actions"><a className="button primary" href="#games">Explore my games ↗</a>
            {data.cvLink && <a className="button secondary" href={data.cvLink} target="_blank" rel="noreferrer">Download CV ↓</a>}
          </div>
        </div>
        <div className="hero-art">
          {data.heroImage ? <img src={data.heroImage} alt="Developer workspace" /> : <div className="hero-placeholder"><span className="orb orb-one"/><span className="orb orb-two"/><div className="monitor"><span>UNITY</span><small>GAME DEVELOPMENT</small></div><div className="desk"/><p>Build · Play · Repeat</p></div>}
        </div>
      </section>

      <section id="games" className="section wrap">
        <div className="section-heading"><div><p className="eyebrow">Selected projects</p><h2>Games I&apos;ve made</h2></div><span className="muted">{data.games.length} projects</span></div>
        <div className="game-grid">
          {data.games.map((game, i) => <article className="game-card" key={`${game.title}-${i}`}>
            <div className="game-image">{game.image ? <img src={game.image} alt={game.title} /> : <div className="image-fallback">GAME {String(i + 1).padStart(2, "0")}</div>}<span className="game-number">0{i + 1}</span></div>
            <div className="game-content"><p className="tag">{game.category}</p><h3>{game.title}</h3><p className="game-description">{game.description}</p><div className="game-bottom"><span className="pill">{game.platform}</span>{game.link ? <a className="text-link" href={game.link} target="_blank" rel="noreferrer">View project ↗</a> : <span className="muted small">Project details coming soon</span>}</div></div>
          </article>)}
        </div>
      </section>

      <section className="lower wrap">
        <div id="skills" className="lower-panel"><p className="eyebrow">My toolkit</p><h2>Skills & tools</h2><div className="skill-list">{skills.map(skill => <span className="skill" key={skill}>{skill}</span>)}</div></div>
        <div id="about" className="lower-panel"><p className="eyebrow">A little about me</p><h2>Making ideas playable.</h2><p className="body-copy">{data.about}</p><p className="meta">⌖ &nbsp;{data.location}</p><p className="meta">✉ &nbsp;<a href={`mailto:${data.email}`}>{data.email}</a></p>{data.github && <p className="meta">↗ &nbsp;<a href={data.github} target="_blank" rel="noreferrer">GitHub profile</a></p>}</div>
        <div id="contact" className="lower-panel contact-panel"><p className="eyebrow">Have a project?</p><h2>Let&apos;s talk.</h2><p className="body-copy">I’m open to discussing game ideas, opportunities, or collaborations.</p><a className="button secondary" href={`mailto:${data.email}?subject=Let's%20connect`}>Send me a message ↗</a></div>
      </section>
      <footer className="footer wrap"><span>© {new Date().getFullYear()} {data.name}. Made with curiosity.</span><a href="#home">Back to top ↑</a><a href="/admin">Edit website ⚙</a></footer>
      {!loaded && <div className="loading">Loading portfolio…</div>}
    </main>
  );
}
