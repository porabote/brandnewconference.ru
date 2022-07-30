import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { AuthContainer } from "@components/auth";
import AccessLists from "@components/access-lists"
import BusinessEvents from "@components/business-events";
import EquipmentsContainer from "@components/equipments";
import HomePage from "@components/pages";
import Observers from "@components/observers";
import PaymentsSetsContainer from "@components/payments-sets";
import Persons from "@components/persons";
import ProtectedRoute from "./protected-route";
import Platforms from "@components/platforms";
import ReportsContainer from "@components/reports";
import SparesContainer from "@components/spares";
import Samples from "@components/samples";
import Shifts from "@components/shifts"
import Store from "../../store";
import Tickets from "@components/tickets";
import UsersContainer from "@components/users";
import WorkflowContainer from "@components/workflow"
// import Chat from "@components/chat";

const AppRouter = () => {
    return (
        <div>
            <Switch>
                <ProtectedRoute path="/" exact component={HomePage} />
                {/*<ProtectedRoute path="/chat/:action" component={Chat} />*/}
                <ProtectedRoute path="/access-lists/:action?/:id?" component={AccessLists} />
                <ProtectedRoute path="/samples/:action?/:id?" component={Samples} />
                <ProtectedRoute path="/equipments/:action" component={EquipmentsContainer} />
                <ProtectedRoute path="/persons/:action" component={Persons} />
                <ProtectedRoute path="/spares/:action" component={SparesContainer} />
                <ProtectedRoute path="/reports/:action" component={ReportsContainer} />
                <ProtectedRoute path="/observers/:action" component={Observers} />
                <ProtectedRoute path="/business-events/:action" component={BusinessEvents} />
                <ProtectedRoute path="/platforms/:action" component={Platforms} />
                <ProtectedRoute path="/payments-sets/:action" component={PaymentsSetsContainer} />
                <ProtectedRoute path="/tickets/:action/:id?" component={Tickets} />
                <ProtectedRoute path="/users/:action/:id?" authAllow={['confirmInvitation']} component={UsersContainer} />
                <ProtectedRoute path="/workflow/:action?/:id?" component={WorkflowContainer} />
                <ProtectedRoute path="/shifts/:action?/:id?" component={Shifts} />
                <ProtectedRoute path="/store/:action" component={Store} />
                <Route path="/auth/:action" exact component={AuthContainer}></Route>
            </Switch>
        </div>
    );
};

export default AppRouter;