import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import routes from "./routes";
import withTracker from "./withTracker";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/shards-dashboards.1.1.0.min.css";
import "./styles/index.css";
import "./styles/spinner.css";
import "./styles/main.css";
import "./styles/util.css";

export default () => (
  <Router basename={process.env.REACT_APP_BASENAME || ""}>
    <div>
      {routes.map((route, index) => {
        return (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={withTracker(props => {
              return (
                route.path === '/login' ?
                  <route.component {...props} />
                  :
                  <route.layout {...props}>
                    <route.component {...props} />
                  </route.layout>
              );
            })}
          />
        );
      })}
    </div>
  </Router>
);
