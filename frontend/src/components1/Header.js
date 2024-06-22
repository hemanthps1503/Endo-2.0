import PropTypes from "prop-types";
import styles from "./Header.module.css";

const Header = ({ className = "" }) => {
  return (
    <section className={[styles.header, className].join(" ")}>
      <div className={styles.headingContentParent}>
        <div className={styles.headingContent}>
          <div className={styles.headline}>
            <h1 className={styles.unlockYourPotentialContainer}>
              <p className={styles.learnAtThe}>{`Learn at the speed `}</p>
              <p className={styles.ofThought}>of thought</p>
            </h1>
          </div>
        </div>
        <div className={styles.subHeading}>
          <div className={styles.mostCalendarsAre}>
            Unlock your potential, one question at a time. Test your knowledge
            and grow with Endo Quiz!
          </div>
        </div>
      </div>
    </section>
  );
};

Header.propTypes = {
  className: PropTypes.string,
};

export default Header;
