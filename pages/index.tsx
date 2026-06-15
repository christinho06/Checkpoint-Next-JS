import Head from "next/head";
import Link from "next/link";
import styles from "@/styles/Home.module.css";

// Rendu côté serveur (SSR) : cette fonction s'exécute sur le serveur
// à chaque requête et injecte la date dans les props de la page.
export async function getServerSideProps() {
  return {
    props: {
      buildTime: new Date().toLocaleDateString("fr-FR", {
        year: "numeric", month: "long", day: "numeric",
      }),
    },
  };
}

const skills = [
  { icon: "⚛️",  label: "React"      },
  { icon: "🔺",  label: "Next.js"    },
  { icon: "🟦",  label: "TypeScript" },
  { icon: "🔴",  label: "Redux"      },
  { icon: "🟢",  label: "Node.js"    },
  { icon: "🐍",  label: "Python"     },
  { icon: "🎨",  label: "CSS"        },
  { icon: "🗄️",  label: "SQL"        },
  { icon: "🐙",  label: "Git"        },
];

interface Props { buildTime: string }

export default function Home({ buildTime }: Props) {
  return (
    <>
      <Head>
        <title>Christinho — Portfolio</title>
        <meta name="description" content="Portfolio de Christinho Roumeliotis, développeur web" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.badge}>Étudiant GoMyCode · Développeur Web</p>
          <h1 className={styles.title}>
            Bonjour, je suis{" "}
            <span className={styles.gradient}>Christinho</span>
          </h1>
          <p className={styles.subtitle}>
            Je construis des applications web modernes avec React, Next.js et Node.js.
            Passionné par le code propre et les interfaces élégantes.
          </p>
          <div className={styles.ctas}>
            <Link href="/projects" className={styles.btnPrimary}>
              Voir mes projets
            </Link>
            <Link href="/contact" className={styles.btnSecondary}>
              Me contacter
            </Link>
          </div>
          <p style={{ marginTop: 24, fontSize: "0.78rem", color: "var(--muted)" }}>
            Page générée le {buildTime} (SSR)
          </p>
        </div>
      </section>

      {/* ── COMPÉTENCES ── */}
      <section className={styles.skills}>
        <h2 className={styles.sectionTitle}>
          Mes <span>compétences</span>
        </h2>
        <div className={styles.skillsGrid}>
          {skills.map((s) => (
            <div key={s.label} className={styles.skillCard}>
              <div className={styles.skillIcon}>{s.icon}</div>
              {s.label}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
