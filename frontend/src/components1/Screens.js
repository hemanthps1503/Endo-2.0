import PropTypes from "prop-types";
import styles from "./Screens.module.css";

const Screens = ({ className = "" }) => {
  return (
    <section className={[styles.screens, className].join(" ")}>
      <div className={styles.screens1}>
        <img
          className={styles.dashboard1Icon}
          alt=""
          src="/dashboard-1@2x.png"
        />
        <img
          className={styles.chatBotIcon}
          loading="lazy"
          alt=""
          src="/chat-bot@2x.png"
        />
        <img className={styles.boardsIcon} alt="" src="/boards@2x.png" />
      </div>
      <footer className={styles.gradient} />
    </section>
  );
};

Screens.propTypes = {
  className: PropTypes.string,
};

export default Screens;
