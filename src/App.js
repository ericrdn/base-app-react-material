import React from "react";
import { Menu } from "./components/Container";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { Routes } from "./routes";

import { Message } from "./components/Alert";
import { Snack } from "./components/Snack";
import { Wait } from "./components/Wait";

function App() {
  return (
    <BrowserRouter>
      <Wait.Provider>
        <Snack.Provider>
          <Message.Provider>
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
          </Message.Provider>
        </Snack.Provider>
      </Wait.Provider>
    </BrowserRouter>
  );
}

export default App;
