import { Button } from "@mui/material";
import PropTypes from "prop-types";
import { useNavigate } from 'react-router-dom';
import styles from "./Main.module.css";

const Main = ({ className = "" }) => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <section className={[styles.main, className].join(" ")}>
      <header className={styles.content}>
        <div className={styles.quiz}>
          <a className={styles.endoQuiz}>ENDO QUIZ</a>
        </div>
        <nav className={styles.sideMenu}>
          <nav className={styles.menu}>
            <nav className={styles.links}>
              <div className={styles.link}>
                <a className={styles.home}>Home</a>
              </div>
              <div className={styles.link1}>
                <a className={styles.about}>About</a>
              </div>
              <div className={styles.link2}>
                <a className={styles.contact}>Contact</a>
              </div>
            </nav>
          </nav>
        </nav>
        <Button
          className={styles.button}
          variant="outlined"
          sx={{
            textTransform: "none",
            color: "#fff",
            fontSize: "17",
            borderColor: "#fff",
            borderRadius: "0px 0px 0px 0px",
            "&:hover": { borderColor: "#fff" },
            width: 139,
            height: 52,
          }}
          onClick={handleLoginClick}
        >
          Login
        </Button>
      </header>
    </section>
  );
};

Main.propTypes = {
  className: PropTypes.string,
};

export default Main;
