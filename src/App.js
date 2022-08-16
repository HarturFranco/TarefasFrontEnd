import './App.css';
import { useEffect, useState } from 'react';
import TarefaList from './components/tarefa-list';
import TarefaDetails from './components/tarefa-details';
import TarefaForm from './components/tarefa-form';
import { API } from './api-service';

function App() {

  const [tarefas, setTarefas] = useState([]);
  const [selectedTarefa, setSelectedTarefa] = useState(null);
  const [editedTarefa, setEditedTarefa] = useState(null);

  useEffect(()=>{
    API.getTarefas()
    .then( resp => resp.sort((a, b) => {
      return new Date(a.prazo) - new Date(b.prazo)
    }))
    .then( resp => setTarefas(resp))
    .catch( error => console.log(error))
  }, [])

  

  const loadTarefa = tarefa => {
    setSelectedTarefa(tarefa);
    setEditedTarefa(null);
  }

  const editClicked = tarefa => {
    setEditedTarefa(tarefa);
    setSelectedTarefa(null);
  }

  const updatedTarefa = tarefa => {
    const newTarefas = tarefas.map(tar => {
      if (tar.id === tarefa.id){
        return tarefa;
      }
      return tar;
    })
    setTarefas(newTarefas);
  }

  const newTarefa = () => {
    setEditedTarefa({descricao: '', prazo: new Date().toISOString(), completa: false});
    setSelectedTarefa(null);
  }

  const tarefaCreated = tarefa => {
    const newTarefas = [...tarefas, tarefa];
    setTarefas(newTarefas);
  }

  const removeClicked = tarefa => {
    const newTarefas = tarefas.filter( tar => tar.id !== tarefa.id)
    setTarefas(newTarefas);
  }

  return (
    <div className="App">
      <header className="App-header">
        
        <h1>Tarefas</h1>
      </header>
      <div className='layout'>
        <div>
          <TarefaList tarefas={tarefas} tarefaClicked={loadTarefa} editClicked={editClicked} removeClicked={removeClicked}></TarefaList>  
          <button onClick={newTarefa}>Nova Tarefa</button>
        </div>
        
        <TarefaDetails tarefa={selectedTarefa} tarefaClicked={loadTarefa} updateTarefa={loadTarefa}></TarefaDetails>
        {editedTarefa ? <TarefaForm tarefa={editedTarefa} updatedTarefa={updatedTarefa} tarefaCreated={tarefaCreated}/> : null}
      </div>
    </div>
  );
}

export default App;
