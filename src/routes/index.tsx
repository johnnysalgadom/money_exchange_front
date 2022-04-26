import { Router, Switch, Route } from "react-router-dom"
import { history } from '../common/route';
import Home from '../pages/index'
import SignInPage from '../pages/signIn'
import SignUpPage from '../pages/signUp'
import ExchangePage from "../pages/Exchange";

export const AppRouter = () => {
  return (
    <Router history={history}>
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/sign-in" component={SignInPage} />
          <Route exact path="/sign-up" component={SignUpPage} />
          <Route exact path="/exchange" component={ExchangePage} />
        </Switch>
      </div>
    </Router>
  );
}
