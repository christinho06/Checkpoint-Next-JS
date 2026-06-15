import Head from "next/head";
import styles from "@/styles/About.module.css";

const frontSkills  = ["React", "Next.js", "TypeScript", "Redux", "CSS Modules"];
const backSkills   = ["Node.js", "Express", "API REST", "SQL", "Python"];
const toolSkills   = ["Git & GitHub", "Slack API / Bolt", "Vercel", "VS Code"];

const timeline = [
  { year: "2026",        title: "GoMyCode",               desc: "Formation développeur web Full Stack" },
  { year: "2026",        title: "Portfolio Next.js",      desc: "Rendu côté serveur, routage, CSS Modules" },
  { year: "2025 – 2026", title: "Projets React",          desc: "Todo Redux, Slack Bot, FIFA Cards, Movie App" },
  { year: "2025",        title: "Bases du développement", desc: "HTML, CSS, JavaScript, Python, SQL" },
];

export default function About() {
  return (
    <>
      <Head>
        <title>À propos — Christinho</title>
        <meta name="description" content="Parcours et compétences de Christinho Roumeliotis" />
      </Head>

      <main className={styles.page}>
        {/* En-tête */}
        <header className={styles.header}>
          <p className={styles.tag}>À propos</p>
          <h1 className={styles.title}>Qui suis-je ?</h1>
          <p className={styles.intro}>
            Je m&apos;appelle <strong>Christinho Roumeliotis</strong>, développeur web en formation chez GoMyCode.
            Passionné par la création d&apos;applications web modernes, j&apos;aime construire des interfaces
            élégantes et des architectures solides. Je maîtrise aussi bien le frontend que les notions de backend.
          </p>
        </header>

        {/* Compétences */}
        <div className={styles.grid}>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>⚛️ Frontend</h3>
            <ul className={styles.list}>
              {frontSkills.map((s) => <li key={s}>{s}</li>)}
            </ul>
          </div>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>🟢 Backend</h3>
            <ul className={styles.list}>
              {backSkills.map((s) => <li key={s}>{s}</li>)}
            </ul>
          </div>
          <div className={styles.card} style={{ gridColumn: "1 / -1" }}>
            <h3 className={styles.cardTitle}>🛠️ Outils</h3>
            <ul className={styles.list} style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {toolSkills.map((s) => <li key={s}>{s}</li>)}
            </ul>
          </div>
        </div>

        {/* Parcours */}
        <h2 className={styles.cardTitle} style={{ fontSize: "1.2rem", marginBottom: 24 }}>
          📅 Parcours
        </h2>
        <div className={styles.timeline}>
          {timeline.map((t) => (
            <div key={t.title} className={styles.timelineItem}>
              <div className={styles.timelineDot} />
              <div className={styles.timelineContent}>
                <p className={styles.timelineYear}>{t.year}</p>
                <p className={styles.timelineTitle}>{t.title}</p>
                <p className={styles.timelineDesc}>{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
