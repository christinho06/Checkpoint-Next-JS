import Head from "next/head";
import { useState, FormEvent } from "react";
import styles from "@/styles/Contact.module.css";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Simulation d'envoi (pas de backend dans cette démo)
    setSent(true);
  };

  return (
    <>
      <Head>
        <title>Contact — Christinho</title>
        <meta name="description" content="Contacter Christinho Roumeliotis" />
      </Head>

      <main className={styles.page}>
        <p className={styles.tag}>Contact</p>
        <h1 className={styles.title}>Travaillons ensemble</h1>
        <p className={styles.subtitle}>
          Une question, un projet ? Envoyez-moi un message, je réponds rapidement.
        </p>

        {sent ? (
          <p className={styles.success}>
            ✅ Message envoyé ! Je vous répondrai dans les plus brefs délais.
          </p>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.row}>
              <div className={styles.group}>
                <label htmlFor="name">Nom</label>
                <input id="name" name="name" type="text"
                  placeholder="Votre nom" value={form.name}
                  onChange={handleChange} required />
              </div>
              <div className={styles.group}>
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email"
                  placeholder="votre@email.com" value={form.email}
                  onChange={handleChange} required />
              </div>
            </div>
            <div className={styles.group}>
              <label htmlFor="subject">Sujet</label>
              <input id="subject" name="subject" type="text"
                placeholder="Sujet du message" value={form.subject}
                onChange={handleChange} required />
            </div>
            <div className={styles.group}>
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows={5}
                placeholder="Décrivez votre projet ou question..."
                value={form.message} onChange={handleChange} required />
            </div>
            <button type="submit" className={styles.submit}>
              Envoyer le message →
            </button>
          </form>
        )}

        {/* Coordonnées */}
        <div className={styles.info}>
          <div className={styles.infoItem}>
            <div className={styles.infoIcon}>📧</div>
            <div>
              <p className={styles.infoLabel}>Email</p>
              <p className={styles.infoValue}>duchelondziel@gmail.com</p>
            </div>
          </div>
          <div className={styles.infoItem}>
            <div className={styles.infoIcon}>🐙</div>
            <div>
              <p className={styles.infoLabel}>GitHub</p>
              <p className={styles.infoValue}>github.com/christinho06</p>
            </div>
          </div>
          <div className={styles.infoItem}>
            <div className={styles.infoIcon}>📍</div>
            <div>
              <p className={styles.infoLabel}>Formation</p>
              <p className={styles.infoValue}>GoMyCode</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
