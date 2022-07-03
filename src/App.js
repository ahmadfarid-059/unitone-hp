import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Drawer, NavBar } from "./Components";
import { routes } from "./routes";
import { DataProvider } from "./context";

import "./App.css";

function App() {
  // Drawer state
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <DataProvider>
      <div className="App">
        <Router>
          {/* Nav Bar */}
          <NavBar handleOpen={handleOpen} />
          {/* Routes */}
          <Switch>
            <Route exact path="/">
              <Redirect to="/customers" />
            </Route>
            {routes.map((route) => (
              <Route key={route.path} exact={route.exact} path={route.path}>
                {route.children}
              </Route>
            ))}
          </Switch>
          {/* Drawer */}
          <Drawer open={open} handleClose={handleOpen} />
        </Router>
      </div>
    </DataProvider>
  );
}

export default App;
