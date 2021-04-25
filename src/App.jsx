import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  useRouteMatch,
  useParams,
} from "react-router-dom";

const MyLink = (props) => (
  <NavLink
    to={props.to}
    exact={props.exact}
    activeClassName="bg-gray-900 text-white"
  >
    {props.children}
  </NavLink>
);
/**
 * Main React Compenent (App)
 */
export default function App() {
  return (
    <Router>
      <div className="bg-gray-100">
        {/* Main Navbar */}
        <ul className="flex bg-gray-200 shadow-lg">
          <li className="mx-2">
            <MyLink to="/" exact={true}>
              Home
            </MyLink>
          </li>
          <li className="mx-2">
            <MyLink to="/about">About</MyLink>
          </li>
          <li className="mx-2">
            <MyLink to="/topics">Topics</MyLink>
          </li>
        </ul>

        {/* Main Routes */}
        <div className="p-4">
          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/topics">
              <Topics />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

/* Main Routes React-Component */
function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Topics() {
  let match = useRouteMatch();

  return (
    <div>
      <h2>Topics</h2>
      <div className="ml-6">
        {/* Sub Navbar */}
        <ul className="bg-gray-200 flex mt-5 shadow-md">
          <li className="mx-2">
            <MyLink to={`${match.url}/components`}>Components</MyLink>
          </li>
          <li className="mx-2">
            <MyLink to={`${match.url}/props-v-state`}>Props v. State</MyLink>
          </li>
        </ul>

        {/* The Topics page has its own <Switch> with more routes
          that build on the /topics URL path. You can think of the
          2nd <Route> here as an "index" page for all topics, or
          the page that is shown when no topic is selected */}
        {/* Sub Routes */}
        <Switch>
          <Route path={`${match.path}/:topicId`}>
            <Topic />
          </Route>
          <Route path={match.path}>
            <h3>Please select a topic.</h3>
          </Route>
        </Switch>
      </div>
    </div>
  );
}

function Topic() {
  let { topicId } = useParams();
  return <h3>Requested topic ID: {topicId}</h3>;
}
