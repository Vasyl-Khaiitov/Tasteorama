import css from "./Button.module.css";

export default function Button({ type, name }) {
  return (
    <button className={css.button} type={type}>
      {name}
    </button>
  );
}
