import { PropagateLoader } from "react-spinners";
import css from "./Loader.module.css";

export default function Loader({ size = "default" }) {
  return (
    <div className={`${css.loader} ${css[size]}`}>
      <PropagateLoader
        className={css.loader}
        color="#3D2218"
        size={20}
        speedMultiplier={0.8}
      />{" "}
    </div>
  );
}
