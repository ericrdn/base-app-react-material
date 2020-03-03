import React from "react";

import { useWait } from "../components/Wait";

export function Home() {
  const Mensagem = useWait();

  const handleButton = async () => {
    const ret = await Mensagem();
    console.log(ret);
  };

  return <button onClick={handleButton}>Home</button>;
}
