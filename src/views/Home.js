import React from "react";
import axios from "axios";

import { useWait } from "../components/Wait";
import { useMessage } from "../components/Alert";

export function Home() {
  const Wait = useWait();
  const Message = useMessage();

  const handleButton = async () => {
    try {
      const ret = await Wait(axios.get("https://api.github.com/users/"));
      console.log(ret.data);
    } catch (e) {
      Message({ Title: "Erro", Message: e });
    }
  };

  return <button onClick={handleButton}>Home</button>;
}
