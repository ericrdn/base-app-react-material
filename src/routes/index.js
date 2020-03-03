//Telas
import { Home } from "../views/Home";
import { Lancamento } from "../views/Lancamento";

import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";

export const URL = {
  Home: "/",
  Lancamentos: "/lancamentos"
};

export const Routes = [
  { Titulo: "Home", Caminho: URL.Home, Tela: Home, Icone: InboxIcon },
  {
    Titulo: "Lançamentos",
    Caminho: URL.Lancamentos,
    Tela: Lancamento,
    Icone: MailIcon
  }
];
