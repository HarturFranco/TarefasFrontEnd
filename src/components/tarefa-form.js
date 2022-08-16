import React, { useEffect } from "react";
import DateTimePicker from 'react-datetime-picker';
import { useState } from 'react';
import { API } from "../api-service";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRemove, faEdit, faCheckSquare, faSquare } from '@fortawesome/free-solid-svg-icons'

function TarefaForm(props){
    // const checked = 
    const [prazo, setPrazo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [completa, setCompleta] = useState('');

    useEffect( () => {
        setPrazo(new Date(props.tarefa.prazo));
        setDescricao(props.tarefa.descricao);
        setCompleta(props.tarefa.completa)
    }, [props.tarefa] )

    const updateClicked =  () => {
        console.log(new Date(prazo).toISOString());
        API.updateTarefa(props.tarefa.id, {prazo: new Date(prazo).toISOString(), descricao: descricao, completa: completa})
        .then(resp => props.updatedTarefa(resp))
        .catch(error => console.log(error))
    } 

    const createClicked =  () => {
        API.createTarefa({prazo: new Date(prazo).toISOString(), descricao: descricao, completa: completa})
        .then(resp => props.tarefaCreated(resp))
        .catch(error => console.log(error))
    }

    return (
        props.tarefa ? (
            <div>
                { props.tarefa.id ?
                    <h1>Editar Tarefa:</h1>
                    :
                    <h1>Criar Nova Tarefa:</h1>
                }
                
                <label htmlFor="Descricao">Descrição: </label><br/>
                <input id="Descricao" type="text" placeholder="Descrição" value={descricao} 
                    onChange={evt => setDescricao(evt.target.value)}></input><br/>
                <label htmlFor="Prazo">Prazo: </label><br/>
                <DateTimePicker id="Prazo" onChange={setPrazo} value={prazo} /><br/> <br/> 
                <label htmlFor="Completa">Completa: </label>
                <FontAwesomeIcon onClick={() => setCompleta(!completa)} icon={ completa ? faCheckSquare : faSquare}/>
                <br/>
                {
                    props.tarefa.id ? 
                    <button onClick={updateClicked}>Update</button>
                    :
                    <button onClick={createClicked}>Create</button>
                }
                
                
            </div>
        ) : null
    )
}

export default TarefaForm;