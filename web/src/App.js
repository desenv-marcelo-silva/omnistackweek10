import React, { useState, useEffect } from "react";
import api from "./services/api";
import DevForm from "./components/DevForm";
import DevItem from "./components/DevItem";

import "./global.css";
import "./App.css";
import "./Main.css";
import "./Sidebar.css";

// https://rocketseat.com.br/week-10/aulas?aula=3
// 1h10
// Componente: repetindo o mesmo código, ou isolando um pedaço da aplicação (html+css+javascript)
// Propriedade: Informações que um componente PAI passa para seus componentes FILHO
// Estado: Informações mantidas pelo componente (imutabilidade)

function App() {
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get("/devs");

      setDevs(response.data);
    }

    loadDevs();
  }, []);

  async function handleAddDev(data) {
    const response = await api.post("/devs", data);

    setDevs([...devs, response.data]);
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>

      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
