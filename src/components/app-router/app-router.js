import React from "react";
import {Route, Switch, Redirect} from "react-router-dom";
import ProtectedRoute from "./protected-route";
import MainPage from "@components/pages/main-page";

const AppRouter = (props) => {
  return (
    <div>
      <Switch>
        <Route path="/" exact component={MainPage}/>
      </Switch>
    </div>
  );
};

export default AppRouter;