import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AppRoute from "./utils/AppRoute";
import Auth from "./utils/Auth";
import AdminDashboard from "./views/admin/Dashboard";
import Home from "./views/Home";
import LoginPage from "./pages/auth/Login";

const App = () => {
  const { i18n } = useTranslation();
  const [lang, setLang] = React.useState<string>(i18n.language || "ar");

  React.useEffect(() => {
    Auth.init();
    setLang(i18n.language || "ar");
  }, []);

  return (
    <div
      dir={lang === "ar" ? "rtl" : "ltr"}
      className="animate__animated animate__zoomIn"
    >
      <Router>
        <Switch>
          <AppRoute path="/" exact component={Home} can={Auth.all} />
          <AppRoute
            path="/login"
            exact
            component={LoginPage}
            can={Auth.all}
            redirect="/login"
          />
          <AppRoute
            path="/admin"
            exact
            component={AdminDashboard}
            can={Auth.all}
            redirect="/"
          />
        </Switch>
      </Router>
    </div>
  );
};

export default App;

const routes = [
  {
    path: "",
    can: Auth.all,
  },
];
