import styles from "./GeneralInfo.module.css";
const GeneralInfo = ({ category, time, calories }) => {
  return (
    <div className={styles.generalInfo}>
      <h3 className={styles.recipeinform}>General informations</h3>
      <p>
        <span className="recipeinfovalue">
          <b>Category: </b>
        </span>
        {category}
      </p>
      <p>
        <span className="recipeinfovalue">
          <b>Cooking time: </b>
        </span>{" "}
        {time} minutes
      </p>
      <p>
        <span className="recipeinfovalue">
          <b>Caloric content: </b>
        </span>
        Approximately {calories || "-"} kcal per serving
      </p>
    </div>
  );
};
export default GeneralInfo;
