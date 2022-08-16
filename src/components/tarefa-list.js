import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRemove, faEdit, faCheckSquare, faSquare } from '@fortawesome/free-solid-svg-icons'
import { API } from "../api-service";

function TarefaList(props){

    const tarefaClicked = tarefa => evt => {
        props.tarefaClicked(tarefa);
    }

    const editClicked = tarefa => {
        props.editClicked(tarefa);
    }

    const removeClicked = tarefa => {
        API.deleteTarefa(tarefa.id)
            .then(() => props.removeClicked(tarefa))
            .catch(error => console.log(error))
    }
    
    return(
        <div>
            <h1>Lista</h1>
            {props.tarefas && props.tarefas.map(tarefa => {
                let dt = new Date(tarefa.prazo);
            return (
                <div className="item-tarefa" key={tarefa.id}>  
                                      
                    <FontAwesomeIcon icon={ tarefa.completa ? faCheckSquare : faSquare}/>
                    <h2 onClick={tarefaClicked(tarefa)}>{tarefa.descricao}</h2>
                    <h3 onClick={tarefaClicked(tarefa)}>{dt.getDate()+ "/" + (dt.getMonth() + 1) + "/" + dt.getFullYear()}</h3>
                    <div>
                        {/* <FontAwesomeIcon icon={faAd}/> */}
                        <FontAwesomeIcon icon={faEdit} onClick={() => editClicked(tarefa)}/>
                        <FontAwesomeIcon icon={faRemove} onClick={() => removeClicked(tarefa)}/>
                    </div>
                </div>
            
            )
          })}
        </div>
    )
}

export default TarefaList;