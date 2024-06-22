/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ghostwhite: "#f5f6fa",
        dimgray: "#4d4d4d",
        gray: {
          "100": "#838383",
          "200": "#777",
          "300": "#222",
          "400": "#1b1b1b",
          "500": "rgba(27, 27, 27, 0.2)",
        },
        white: "#fff",
        whitesmoke: {
          "100": "#f1f1f1",
          "200": "#efefef",
          "300": "#ebebeb",
        },
        gainsboro: "#ddd",
        silver: {
          "100": "#c4c4c4",
          "200": "#bbb",
          "300": "rgba(196, 196, 196, 0.09)",
        },
        darkslategray: {
          "100": "#414142",
          "200": "#363636",
        },
        tomato: "#ff5d5d",
        lemonchiffon: "#fef3c8",
        black: "#000",
        ivory: "#fffbed",
        palegoldenrod: "#fdeba3",
        gold: "#fbd748",
        goldenrod: "#e0bd2e",
        mediumslateblue: "#695ae0",
        lightgray: {
          "100": "#d4d4d4",
          "200": "#d1d1d1",
        },
        darkgray: {
          "100": "#aeaeae",
          "200": "#adadad",
        },
        darkgreen: "#236c11",
      },
      spacing: {
        '42': '10.5rem',
      },
      fontFamily: {
        poppins: "Poppins",
      },
      borderRadius: {
        "17xl": "36px",
        "3xs": "10px",
        "8xs-6": "4.6px",
        "11xs-8": "1.8px",
        "12xl": "31px",
        "7xl": "26px",
        "9xl-2": "28.2px",
        "8xl-8": "27.8px",
        "9xl": "28px",
        "11xl": "30px",
        "10xs-7": "2.7px",
        "45xl": "64px",
        "3xs-1": "9.1px",
        "lg-6": "18.6px",
      },
    },
    fontSize: {
      sm: "14px",
      base: "16px",
      xs: "12px",
      xl: "20px",
      "5xl": "30px",
      lgi: "19px",
      "21xl": "45px",
      "13xl": "32px",
      lg: "18px",
      "3xs-3": "9.3px",
      "4xl-3": "23.3px",
      "base-5": "15.5px",
      inherit: "inherit",
    },
    screens: {
      lg: {
        max: "1200px",
      },
      mq1050: {
        raw: "screen and (max-width: 1050px)",
      },
      mq900: {
        raw: "screen and (max-width: 900px)",
      },
      mq750: {
        raw: "screen and (max-width: 750px)",
      },
      mq675: {
        raw: "screen and (max-width: 675px)",
      },
      mq450: {
        raw: "screen and (max-width: 450px)",
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
};
