import styles from "./About.module.css";
const About = ({ description }) => {
  return (
    <div className={styles.sectionabout}>
      <h2>About recipe</h2>
      <p className={styles.textabout}>{description}</p>
    </div>
  );
};
export default About;
