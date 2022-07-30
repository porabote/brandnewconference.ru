import React from "react";
import {Route, Switch, Redirect} from "react-router-dom";
import {AuthContainer} from "@components/auth";
import AccessLists from "@components/access-lists";
import BusinessEvents from "@components/business-events";
import Faq from "@components/faq";
import {MainPage} from "@components/pages";
import MenuContainer from "@components/menus";
import Observers from "@components/observers";
import ProtectedRoute from "./protected-route";
import SpeakersContainer from "@components/speakers"
import UsersContainer from "@components/users";
import Consumers from "@components/consumers";
import Сontents from "@components/contents";
import AuthLogin from "@components/auth/auth-login";

const AppRouter = (props) => {
  return (
    <div>
      <Switch>
        <ProtectedRoute path="/" exact component={Consumers}/>
        <ProtectedRoute path="/speakers/:action?/:id?" component={SpeakersContainer} />
        <ProtectedRoute path="/menus/:action?/:id?" component={MenuContainer} />
        <ProtectedRoute path="/business-events/:action" component={BusinessEvents} />
        <ProtectedRoute path="/faq/:action?/:id?" component={Faq} />
        <ProtectedRoute path="/consumers/:action/:id?" exact component={Consumers}/>
        <ProtectedRoute path="/contents/:action/:id?" exact component={Сontents}/>
        <ProtectedRoute path="/access-lists/:action?/:id?" component={AccessLists}/>
        <ProtectedRoute path="/observers/:action" component={Observers}/>
        <ProtectedRoute path="/users/:action/:id?" authAllow={['confirmInvitation']} component={UsersContainer}/>
        <Route path="/auth/:action" exact>
          <AuthLogin {...props}/>
        </Route>
      </Switch>
    </div>
  );
};

export default AppRouter;