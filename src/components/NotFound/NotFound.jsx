import { Link } from "react-router-dom";
import css from "./NotFoundPage.module.css";
import Icon from "../../shared/Icon";

export default function NotFound() {
  return (
   <section>
    <div className={css.wrapper}>
          <picture> 
            <source media="(min-width:768px)" srcSet="../../../assets/404/1x/404Photo.jpg" className={css.image} />
            <img src="../../../assets/404/1x/404PhonePhoto.jpg" alt="Not found" className={css.image} />
          </picture>
          <h2 className={css.nfn}>404</h2>
          <p className={css.title}>Recipe not found</p>
      <Link to="/" className={css.backBtn}>
         <div className={css.arrow_container}><Icon name="left-arrow" classname={css.icon_arrow} /></div>Back to Home
      </Link>
      </div>
    </section>
  );
}
