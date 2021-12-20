import dva from "dva";
import { Router, Route, Switch } from "dva/router";
import Counter from "./pages/Counter";

// 1. Initialize
const app = dva();

// 2. Model
// Remove the comment and define your model.
app.model(require("./models/counter").default);

// 3. Router
const HomePage = () => {
  return (
    <div>
      <Counter />
    </div>
  );
};

app.router(({ history }) => (
  <Router history={history}>
    <Switch>
      <Route path="/" component={HomePage} />
    </Switch>
  </Router>
));

// 4. Start
app.start("#root");
