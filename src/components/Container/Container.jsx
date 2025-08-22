import styles from "./Container.module.css";

export default function Container({ children }) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>{children}</div>
    </section>
  );
}
