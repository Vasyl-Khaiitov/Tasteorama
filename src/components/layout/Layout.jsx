import css from "./Layout.module.css";

export default function Layout({ children }) {
  return (
    <div className={css.container}>
      <h2>I'm layout</h2>
      {children}
    </div>
  );
}
