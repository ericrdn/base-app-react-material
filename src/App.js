import React from "react";
import { Menu } from "./components/container";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { Routes } from "./routes";

function App() {
  return (
    <BrowserRouter>
      <Menu Routes={Routes}>
        <Switch>
          {Routes.map(item => (
            <Route
              exact
              key={item.Titulo}
              path={item.Caminho}
              component={item.Tela}
            />
          ))}
        </Switch>
      </Menu>
    </BrowserRouter>
  );
}

export default App;
