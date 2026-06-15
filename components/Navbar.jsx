import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/Navbar.module.css';

const links = [
  { href: '/',         label: 'Accueil'  },
  { href: '/about',    label: 'À propos' },
  { href: '/projects', label: 'Projets'  },
  { href: '/contact',  label: 'Contact'  },
];

export default function Navbar() {
  const { pathname } = useRouter();

  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.logo}>
        &lt;Christinho /&gt;
      </Link>
      <ul className={styles.links}>
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className={`${styles.link} ${pathname === href ? styles.active : ''}`}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
