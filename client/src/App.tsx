import React from "react";
import io from "socket.io-client";
import { LANGUAGES } from "../src/constants/languages";
import { useTranslation } from "react-i18next";
import { createUseStyles } from "react-jss";

const socket = io(process.env.REACT_APP_SOCKET as string, {
  query: { token: "test" },
});

const useStyles = createUseStyles({
  myButton: {
    color: "green",
    margin: {
      // jss-plugin-expand gives more readable syntax
      top: 5, // jss-plugin-default-unit makes this 5px
      right: 0,
      bottom: 0,
      left: "1rem",
    },
    "& span": {
      // jss-plugin-nested applies this to a child span
      fontWeight: "bold", // jss-plugin-camel-case turns this into 'font-weight'
    },
  },
  myLabel: {
    fontStyle: "italic",
  },
});

function App() {
  const { i18n, t } = useTranslation();
  const classes = useStyles();

  const onChangeLang = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang_code = e.target.value;
    i18n.changeLanguage(lang_code);
  };

  const initSocketConnection = () => {
    socket.on("message", (message) => {
      console.log(message);
    });
  };

  React.useEffect(() => {
    initSocketConnection();
  }, []);
  return (
    <>
      <div className="container mx-auto mt-24">
        <h1 className="text-3xl font-bold underline decoration-sky-500/30">
          {t("home")}
        </h1>
        <button className={classes.myButton}>
          <span className={classes.myLabel}>{t("change_language")}</span>
        </button>
        <select defaultValue={"ar"} onChange={onChangeLang}>
          {LANGUAGES.map(({ code, label }) => (
            <option key={code} value={code}>
              {label}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

export default App;
