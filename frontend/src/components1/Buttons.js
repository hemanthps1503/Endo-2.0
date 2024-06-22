import { Button } from "@mui/material";
import PropTypes from "prop-types";
import styles from "./Buttons.module.css";

const Buttons = ({ className = "" }) => {
  return (
    <div className={[styles.buttons, className].join(" ")}>
      <div className={styles.buttons1}>
        <Button
          className={styles.button}
          variant="contained"
          sx={{
            textTransform: "none",
            color: "#fff",
            fontSize: "17",
            background: "#4452fe",
            borderRadius: "0px 0px 0px 0px",
            "&:hover": { background: "#4452fe" },
            width: 180,
          }}
        >
          Try For Free
        </Button>
        <Button
          className={styles.button1}
          variant="outlined"
          sx={{
            textTransform: "none",
            color: "#fff",
            fontSize: "17",
            borderColor: "#fff",
            borderRadius: "0px 0px 0px 0px",
            "&:hover": { borderColor: "#fff" },
            width: 177,
          }}
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
