import React, { useContext, useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText
} from "@material-ui/core";

export const MessageContext = React.createContext();

export function useMessage() {
  return useContext(MessageContext);
}

export const Message = {
  Provider: ({ children }) => {
    const [exibeMesagem, setexibeMensagem] = useState(false);
    return (
      <MessageContext.Provider value={EventoContext(setexibeMensagem)}>
        <Message.Component
          StateMessageComponent={exibeMesagem}
          SetStateMessageComponent={setexibeMensagem}
        />
        {children}
      </MessageContext.Provider>
    );
  },
  Component: ({ StateMessageComponent, SetStateMessageComponent }) => {
    const {
      Open = false,
      Message = "",
      Title = "",
      Buttons = [],
      resolveCallback
    } = StateMessageComponent;
    const handleClose = callback => {
      SetStateMessageComponent(OldState => ({ ...OldState, Open: false }));
      resolveCallback(callback);
    };
    return (
      <Dialog
        open={Open}
        onClose={() => handleClose()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{Title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {Message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {Buttons.map(({ Title }) => (
            <Button
              key={Title}
              onClick={() => handleClose(Title)}
              color="primary"
            >
              {Title}
            </Button>
          ))}
        </DialogActions>
      </Dialog>
    );
  }
};

export function EventoContext(SetStateMessageComponent) {
  return ({ Title, Message, Buttons = [{ Title: "Ok" }] } = {}) =>
    new Promise((resolve, error) => {
      SetStateMessageComponent({
        Title: String(Title),
        Message: String(Message),
        Buttons,
        Open: true,
        resolveCallback: resolve
      });
    });
}
