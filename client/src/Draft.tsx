import React from "react";
import io from "socket.io-client";
import { LANGUAGES } from "../src/constants/languages";
import { useTranslation } from "react-i18next";
import { createUseStyles } from "react-jss";
import AdminNavbar from "./components/navbar/admin.navbar";
import styled from "styled-components";

const socket = io(process.env.REACT_APP_SOCKET as string, {
  query: { token: "test" },
});

const Button = styled.button`
  background: ${(props: any) => (props.primary ? "palevioletred" : "white")};
  color: ${(props: any) => (props.primary ? "white" : "palevioletred")};
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;
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
  const [lang, setLang] = React.useState<string>();

  const onChangeLang = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang_code = e.target.value;
    i18n.changeLanguage(lang_code);
    sessionStorage.setItem("lang", lang_code);
    setLang(lang_code);
  };

  const initSocketConnection = () => {
    socket.on("message", (message) => {
      console.log(message);
    });
  };

  const initLang = () => {
    const lang_code = sessionStorage.getItem("lang");
    if (lang_code) {
      setLang(lang_code);
      i18n.changeLanguage(lang_code);
    } else {
      i18n.changeLanguage("ar");
      setLang("ar");
    }
  };

  React.useEffect(() => {
    initSocketConnection();
    initLang();
  }, []);
  return (
    <div dir={lang === "ar" ? "rtl" : "ltr"}>
      <div className="container mx-auto mt-24">
        <h1 className="text-3xl font-bold underline decoration-sky-500/30">
          {t("home")}
        </h1>
        <Button className={classes.myButton}>
          <span className={classes.myLabel}>{t("change_language")}</span>
        </Button>
        <select defaultValue={lang} onChange={onChangeLang}>
          {LANGUAGES.map(({ code, label }) => (
            <option key={code} value={code}>
              {label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default App;
