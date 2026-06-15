import Head from "next/head";
import { useState } from "react";
import styles from "@/styles/Projects.module.css";

// Correspondance nom de repo → infos lisibles
const META: Record<string, { label: string; desc: string; cat: string; lang: string }> = {
  // ── REACT ──────────────────────────────────────────────────────────
  "React-Checkpoint-01":                          { label: "Product Card",          desc: "Catalogue sneakers avec barre de recherche et panier dynamique.",      cat: "⚛️ React",       lang: "React"      },
  "React-Checkpoint-02":                          { label: "FIFA Cards",             desc: "Cartes joueurs FIFA : Vinicius, Neymar, Haaland, Yamal, Rodri.",        cat: "⚛️ React",       lang: "React"      },
  "Point-de-contr-le-REACT-JS":                   { label: "Premier projet React",   desc: "Fragment, Navbar, Hero section et 3 cards composants.",                 cat: "⚛️ React",       lang: "React"      },
  "Point-de-contr-le-du-routeur-React":           { label: "Movie Router",           desc: "Application films avec React Router et embed YouTube.",                 cat: "⚛️ React",       lang: "React"      },
  "Point-de-contr-le-d-tat-React":                { label: "Class Component",        desc: "Composant classe avec état, setInterval et lifecycle methods.",         cat: "⚛️ React",       lang: "React"      },
  "Point-de-contr-le-des-hooks-React":            { label: "Movie Hooks",            desc: "Films avec useState / useEffect, filtres et modal d'ajout.",            cat: "⚛️ React",       lang: "React"      },
  "Gestion-de-l-tat-dans-React":                  { label: "Todo App",               desc: "Liste de tâches avec validation, priorités, filtres et localStorage.",  cat: "⚛️ React",       lang: "React"      },
  "Point-de-contr-le-Redux":                      { label: "Todo Redux",             desc: "Todo avec Redux Toolkit : addTask, toggleTask, editTask, deleteTask.",  cat: "🔴 Redux",       lang: "Redux"      },
  "Checkpoint-Cr-ation-d-applications-React-avec-TypeScript": { label: "React + TypeScript", desc: "Conversion de composants React JS vers TypeScript avec interfaces.", cat: "🟦 TypeScript", lang: "TypeScript" },
  // ── NODE / SLACK ────────────────────────────────────────────────────
  "Checkpoint-Principes-fondamentaux-de-TypeScript": { label: "Slack Bot",           desc: "Bot Slack avec Bolt et Node.js : /hello, écoute messages, Socket Mode.", cat: "🟢 Node.js",    lang: "Node.js"    },
  "chat-app":                                     { label: "Chat App",               desc: "Application de chat en temps réel.",                                    cat: "🟢 Node.js",    lang: "Node.js"    },
  // ── ALGORITHMES ─────────────────────────────────────────────────────
  "Syst-me-de-recherche-de-contacts-utilisant-des-structures-de-donn-es": { label: "Structures de données",  desc: "Système de recherche de contacts : liste chaînée, hash table, KMP.", cat: "🧮 Algorithmes", lang: "Python" },
  "Notions-de-base-sur-les-graphes-et-parcours":  { label: "Graphes DFS / BFS",      desc: "Parcours en profondeur et en largeur sur un graphe pondéré.",           cat: "🧮 Algorithmes", lang: "JavaScript" },
  "Syst-me-d-optimisation-de-la-planification-des-t-ches": { label: "Planification de tâches", desc: "Ordonnancement de tâches avec priorités et délais.",          cat: "🧮 Algorithmes", lang: "JavaScript" },
  "Analyse-comparative-des-techniques-algorithmiques": { label: "Greedy vs Brute Force", desc: "Comparaison empirique des deux approches algorithmiques.",          cat: "🧮 Algorithmes", lang: "JavaScript" },
  "Arbres-couvrants-minimaux":                    { label: "MST — Kruskal & Prim",   desc: "Arbres couvrants minimaux avec Union-Find et tas binaire.",             cat: "🧮 Algorithmes", lang: "JavaScript" },
  "Variantes-d-impl-mentation-et-compromis":      { label: "Dijkstra",               desc: "Plus court chemin avec l'algorithme de Dijkstra et Min Heap.",         cat: "🧮 Algorithmes", lang: "JavaScript" },
  "prise-de-d-cision-et-algorithmes-r-cursifs":   { label: "Récursivité",            desc: "Algorithmes récursifs et prise de décision.",                          cat: "🧮 Algorithmes", lang: "JavaScript" },
  "Simulation-d-une-file-d-impression":           { label: "File d'impression",      desc: "Simulation d'une file de priorité pour imprimantes.",                   cat: "🧮 Algorithmes", lang: "JavaScript" },
  "Points-de-contr-le-Algorithmes-appliqu-s-au-d-veloppement-logiciel": { label: "Algorithmes appliqués", desc: "Checkpoint algorithmes : tri, recherche, complexité.", cat: "🧮 Algorithmes", lang: "JavaScript" },
  // ── SQL / BDD ───────────────────────────────────────────────────────
  "Bases-de-donn-es-relationnelles-Mod-le-entit--relation": { label: "Modèle E-R",   desc: "Modélisation entité-relation d'une base de données.",                  cat: "🗄️ SQL & BDD",  lang: "SQL"        },
  "Bases-de-donn-es-relationnelles-Mod-le-relationnel": { label: "Modèle relationnel", desc: "Tables, clés primaires, clés étrangères et normalisation.",          cat: "🗄️ SQL & BDD",  lang: "SQL"        },
  "Langage-de-d-finition-de-donn-es-LDD-":        { label: "LDD — SQL",              desc: "CREATE, ALTER, DROP : langage de définition de données.",               cat: "🗄️ SQL & BDD",  lang: "SQL"        },
  "Langage-de-manipulation-de-donn-es-LMD-":      { label: "LMD — SQL",              desc: "INSERT, UPDATE, DELETE : manipulation des données.",                    cat: "🗄️ SQL & BDD",  lang: "SQL"        },
  "langage-de-requ-te-de-donn-es-DQL-":           { label: "DQL — SQL",              desc: "SELECT, JOIN, GROUP BY : interrogation des données.",                   cat: "🗄️ SQL & BDD",  lang: "SQL"        },
  "SQL-vs-NoSQL-avec-MongoDB":                    { label: "SQL vs NoSQL",           desc: "Comparaison SQL relationnel et MongoDB (NoSQL).",                       cat: "🗄️ SQL & BDD",  lang: "SQL"        },
  "Programmation-orient-e-objet-POO-":            { label: "POO",                    desc: "Programmation orientée objet : classes, héritage, encapsulation.",      cat: "🗄️ SQL & BDD",  lang: "Python"     },
  // ── PROJETS WEB ─────────────────────────────────────────────────────
  "docplanner-clone":                             { label: "Docplanner Clone",       desc: "Clone d'une plateforme médicale de prise de rendez-vous.",              cat: "🌐 Projets Web", lang: "HTML/CSS"   },
  "PROJET-1-Le-Restaurant":                       { label: "Restaurant",             desc: "Site vitrine d'un restaurant avec menu et réservation.",                cat: "🌐 Projets Web", lang: "HTML/CSS"   },
  "menu-de-restaurant":                           { label: "Menu Restaurant",        desc: "Carte de restaurant interactive.",                                      cat: "🌐 Projets Web", lang: "HTML/CSS"   },
  "boutique":                                     { label: "Boutique",               desc: "Site e-commerce vitrine.",                                             cat: "🌐 Projets Web", lang: "HTML/CSS"   },
  "-CSS-Tailwind-int-gr-es":                      { label: "Tailwind CSS",           desc: "Intégration et découverte de Tailwind CSS.",                           cat: "🌐 Projets Web", lang: "CSS"        },
  "Projet-DOM-1":                                 { label: "Projet DOM 1",           desc: "Manipulation du DOM avec JavaScript.",                                  cat: "🌐 Projets Web", lang: "JavaScript" },
  "Projet-DOM-2":                                 { label: "Projet DOM 2",           desc: "Projet DOM avancé avec événements et animations.",                     cat: "🌐 Projets Web", lang: "JavaScript" },
  "Projet-JavaScript-2":                          { label: "Projet JavaScript",      desc: "Application JavaScript avec logique avancée.",                         cat: "🌐 Projets Web", lang: "JavaScript" },
  // ── DIVERS ──────────────────────────────────────────────────────────
  "code-wars-defi":                               { label: "CodeWars",               desc: "Solutions aux défis algorithmiques CodeWars.",                          cat: "📚 Autre",       lang: "JavaScript" },
  "-Preuve-des-points-Edabit":                    { label: "Edabit Challenges",      desc: "Défis de programmation Edabit.",                                       cat: "📚 Autre",       lang: "JavaScript" },
  "Travail-sur-le-site-VisuAlgo":                 { label: "VisuAlgo",               desc: "Exercices sur la visualisation d'algorithmes.",                        cat: "📚 Autre",       lang: "JavaScript" },
  "Partie-1-Introduction-aux-algorithmes-et-aux-concepts-de-base-": { label: "Intro Algorithmes", desc: "Introduction aux algorithmes et aux concepts de base.", cat: "📚 Autre",       lang: "JavaScript" },
  "R-sum-des-chapitres-du-livre-Clean-Code-de-Robert-C.-Martin.": { label: "Clean Code", desc: "Résumé du livre Clean Code de Robert C. Martin.",               cat: "📚 Autre",       lang: "Markdown"   },
  "portfolio-on-line":                            { label: "Portfolio en ligne",     desc: "Premier portfolio personnel en ligne.",                                 cat: "🌐 Projets Web", lang: "HTML/CSS"   },
  "checkpoint-portfolio":                         { label: "Portfolio Checkpoint",   desc: "Checkpoint portfolio — version précédente.",                           cat: "🌐 Projets Web", lang: "HTML/CSS"   },
};

const CATEGORIES = ["Tous", "⚛️ React", "🔴 Redux", "🟦 TypeScript", "🟢 Node.js", "🧮 Algorithmes", "🗄️ SQL & BDD", "🌐 Projets Web", "📚 Autre"];

interface Repo { name: string; html_url: string; stargazers_count: number }
interface Props { repos: Repo[] }

export async function getStaticProps() {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  try {
    const res  = await fetch("https://api.github.com/users/christinho06/repos?per_page=100&sort=updated", {
      headers: { "User-Agent": "portfolio-nextjs" },
    });
    const repos = await res.json();
    return { props: { repos }, revalidate: 3600 };
  } catch {
    return { props: { repos: [] }, revalidate: 60 };
  }
}

export default function Projects({ repos }: Props) {
  const [activeFilter, setActiveFilter] = useState("Tous");

  // Enrichir les repos avec les métadonnées
  const enriched = repos
    .map((r) => ({ ...r, meta: META[r.name] }))
    .filter((r) => r.meta); // ignorer les repos sans métadonnées (learn_git, portfolio, etc.)

  // Filtrer par catégorie
  const filtered = activeFilter === "Tous"
    ? enriched
    : enriched.filter((r) => r.meta.cat === activeFilter);

  // Grouper par catégorie
  const grouped: Record<string, typeof enriched> = {};
  filtered.forEach((r) => {
    if (!grouped[r.meta.cat]) grouped[r.meta.cat] = [];
    grouped[r.meta.cat].push(r);
  });

  // Ordre des catégories
  const orderedCats = CATEGORIES.slice(1).filter((c) => grouped[c]);

  return (
    <>
      <Head>
        <title>Projets — Christinho</title>
        <meta name="description" content="Tous les projets GitHub de Christinho Roumeliotis" />
      </Head>

      <main className={styles.page}>
        <p className={styles.tag}>Projets</p>
        <h1 className={styles.title}>Tous mes projets</h1>
        <p className={styles.subtitle}>{enriched.length} projets sur GitHub</p>

        {/* Filtres */}
        <div className={styles.filters}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`${styles.filterBtn} ${activeFilter === cat ? styles.active : ""}`}
              onClick={() => setActiveFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Groupes par catégorie */}
        {orderedCats.map((cat) => (
          <div key={cat} className={styles.category}>
            <h2 className={styles.catTitle}>{cat}</h2>
            <div className={styles.grid}>
              {grouped[cat].map((r) => (
                <article key={r.name} className={styles.card}>
                  <div className={styles.cardTop}>
                    <h3 className={styles.cardName}>{r.meta.label}</h3>
                    {r.stargazers_count > 0 && (
                      <span className={styles.starCount}>⭐ {r.stargazers_count}</span>
                    )}
                  </div>
                  <p className={styles.cardDesc}>{r.meta.desc}</p>
                  <div className={styles.cardFooter}>
                    <span className={styles.langBadge}>{r.meta.lang}</span>
                    <a href={r.html_url} target="_blank" rel="noreferrer" className={styles.cardLink}>
                      GitHub →
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ))}
      </main>
    </>
  );
}
