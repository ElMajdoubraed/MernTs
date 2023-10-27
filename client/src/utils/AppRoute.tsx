import React from "react";
import { Route, Redirect } from "react-router-dom";

type AppRouteProps = {
  component: React.ComponentType<any>;
  can: () => boolean;
  redirect?: string;
  path: string;
  exact: boolean;
};

const AppRoute = ({
  component: Component,
  can = () => true,
  redirect,
  ...rest
}: AppRouteProps) => (
  <Route
    {...rest}
    render={(props) =>
      can() ? <Component {...props} /> : <Redirect to={redirect as string} />
    }
  />
);

export default AppRoute;
