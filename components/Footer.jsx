import styles from '../styles/Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>© {new Date().getFullYear()} Christinho Roumeliotis — Développé avec Next.js</p>
      <div className={styles.socials}>
        <a href="https://github.com/christinho06" target="_blank" rel="noreferrer">GitHub</a>
        <a href="mailto:duchelondziel@gmail.com">Email</a>
      </div>
    </footer>
  );
}
