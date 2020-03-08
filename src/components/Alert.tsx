import React, { useContext, useState } from "react";

import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText
} from "@material-ui/core";

interface IButton {
  Title: String;
}

type callbackMessage = (retorno: String) => void;

interface IStateAlert {
  Open: boolean;
  Message?: string;
  Title?: string;
  Buttons?: Array<IButton>;
  resolveCallback: callbackMessage;
}

type INewAlert = {
  Title: String;
  Message: String;
  Buttons?: Array<IButton>;
};

type ISetStateMessageComponent = React.Dispatch<
  React.SetStateAction<IStateAlert>
>;

interface IComponentProps {
  StateMessageComponent: IStateAlert;
  SetStateMessageComponent: ISetStateMessageComponent;
}

interface IAlert {
  Provider: React.FC;
  Component: React.FC<IComponentProps>;
}

type EventMessage = (value: INewAlert) => Promise<String>;

type IContextMesssage = (
  SetStateMessageComponent: ISetStateMessageComponent
) => EventMessage;

export const EventoContext: IContextMesssage = (
  SetStateMessageComponent: ISetStateMessageComponent
) => {
  const handleEventMessage: EventMessage = ({
    Title,
    Message,
    Buttons = [{ Title: "Ok" }]
  }) => {
    return new Promise((resolve, error) => {
      SetStateMessageComponent({
        Title: String(Title),
        Message: String(Message),
        Buttons,
        Open: true,
        resolveCallback: resolve
      });
    });
  };
  return handleEventMessage;
};

export const MessageContext = React.createContext<EventMessage>(
  {} as EventMessage
);

export function useMessage() {
  return useContext(MessageContext);
}

export const Message: IAlert = {
  Provider: ({ children }) => {
    const [exibeMesagem, setexibeMensagem] = useState<IStateAlert>({
      Open: false,
      resolveCallback: a => {}
    });
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
    const handleClose = (callback: String) => {
      SetStateMessageComponent(OldState => ({ ...OldState, Open: false }));
      resolveCallback(callback);
    };
    return (
      <Dialog
        open={Open}
        onClose={() => handleClose("")}
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
              //key={Title}
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
