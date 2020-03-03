import React, { useContext, useState, useEffect, useCallback } from "react";
import { Backdrop, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff"
  }
}));

export const WaitContext = React.createContext();

export function useWait() {
  return useContext(WaitContext);
}

export const Wait = {
  Provider: ({ children }) => {
    const [exibeMesagem, setexibeMensagem] = useState(false);
    return (
      <WaitContext.Provider value={EventoContext(setexibeMensagem)}>
        <Wait.Component
          StateMessageComponent={exibeMesagem}
          SetStateMessageComponent={setexibeMensagem}
        />
        {children}
      </WaitContext.Provider>
    );
  },
  Component: ({ StateMessageComponent, SetStateMessageComponent }) => {
    const classes = useStyles();
    const {
      Open = false,
      resolveCallback,
      errorCallback,
      Handle = new Promise((r, e) => {})
    } = StateMessageComponent;

    useEffect(() => {
      Handle.then(retorno => {
        resolveCallback(retorno);
        SetStateMessageComponent(OldState => ({ ...OldState, Open: false }));
      }).catch(e => {
        errorCallback(e);
        SetStateMessageComponent(OldState => ({ ...OldState, Open: false }));
      });
    }, [Handle, SetStateMessageComponent, errorCallback, resolveCallback]);

    return (
      <Backdrop className={classes.backdrop} open={Open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }
};

export function EventoContext(SetStateMessageComponent) {
  return Handle =>
    new Promise((resolve, error) => {
      SetStateMessageComponent({
        Open: true,
        Handle,
        resolveCallback: resolve,
        errorCallback: error
      });
    });
}
