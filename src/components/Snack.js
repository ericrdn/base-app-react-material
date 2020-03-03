import React, { useContext, useState } from "react";
import { Snackbar } from "@material-ui/core";

export const SnackContext = React.createContext();

export function useSnack() {
  return useContext(SnackContext);
}

export const Snack = {
  Provider: ({ children }) => {
    const [exibeMesagem, setexibeMensagem] = useState(false);
    return (
      <SnackContext.Provider value={EventoContext(setexibeMensagem)}>
        <Snack.Component
          StateMessageComponent={exibeMesagem}
          SetStateMessageComponent={setexibeMensagem}
        />
        {children}
      </SnackContext.Provider>
    );
  },
  Component: ({ StateMessageComponent, SetStateMessageComponent }) => {
    const {
      Open = false,
      Message = "",
      resolveCallback
    } = StateMessageComponent;
    const handleClose = callback => {
      SetStateMessageComponent(OldState => ({ ...OldState, Open: false }));
      resolveCallback(callback);
    };
    return (
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        autoHideDuration={2000}
        open={Open}
        onClose={handleClose}
        message={Message}
      />
    );
  }
};

export function EventoContext(SetStateMessageComponent) {
  return ({ Title, Message, Buttons } = {}) =>
    new Promise((resolve, error) => {
      SetStateMessageComponent({
        Message,
        Open: true,
        resolveCallback: resolve
      });
    });
}
