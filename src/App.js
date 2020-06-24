import React, { useState, useEffect } from "react";

import api from "./services/api";
import "./styles.css";

function App() {

  const [list, setList] = useState([]);

  useEffect( () => {
    api.get('repositories').then(response =>{
      setList(response.data);
    });
  }, []);


  async function handleAddRepository() {
    const response = await api.post('repositories',{
      url: "https://github.com/japaaak",
      title: "Desafio ReactJS",
      techs: ["Node.js", "React", "React Native"]
    });

    setList([...list, response.data]);
    console.log(response.data);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setList(list.filter(list => list.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
      {list.map(list => ( <li key = {list.id}>
          Repositório 1
          <a href={list.url}>{list.title}</a>

          <button onClick={() => handleRemoveRepository(list.id)}>
            Remover
          </button>
        </li>))}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
