import { Button } from "@mui/material";
import PropTypes from "prop-types";
import styles from "./Buttons.module.css";
import { useNavigate } from "react-router-dom";

const Buttons = ({ className = "" }) => {
  const navigate = useNavigate();

  return (
    <div className={[styles.buttons, className].join(" ")}>
      <div className={styles.buttons1}>
        <Button
          className={styles.button}
          variant="contained"
          sx={{
            textTransform: "none",
            color: "#fff",
            fontSize: 17,
            background: "#4452fe",
            borderRadius: "0px 0px 0px 0px",
            "&:hover": { background: "#4452fe" },
            width: 180,
          }}
          onClick={() => navigate('/login')}
        >
          Try For Free
        </Button>
        <Button
          className={styles.button1}
          variant="outlined"
          sx={{
            textTransform: "none",
            color: "#fff",
            fontSize: 17,
            borderColor: "#fff",
            borderRadius: "0px 0px 0px 0px",
            "&:hover": { borderColor: "#fff" },
            width: 177,
          }}
          onClick={() => navigate('/login')}
        >
          Learn More
        </Button>
      </div>
    </div>
  );
};

Buttons.propTypes = {
  className: PropTypes.string,
};

export default Buttons;
