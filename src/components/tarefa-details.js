import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckSquare, faSquare } from '@fortawesome/free-solid-svg-icons'
import { API } from "../api-service";

function TarefaDetails(props){
    
    const tar = props.tarefa
    let dt = tar && new Date(props.tarefa.prazo);    

    return(
        tar ? (
            <div>
                <h1>Detalhes</h1>
                <h2 >Descricao: {tar.descricao}</h2>
                <p>Prazo: {dt.getDate()+ "/" + (dt.getMonth() + 1) + "/" + dt.getFullYear()}</p>

                {tar.completa === true ? (
                    <div>
                        Completa:  
                        <FontAwesomeIcon icon={faCheckSquare} />
                    </div>
                    
                ): (
                    <div>
                        Completa: 
                        <FontAwesomeIcon icon={faSquare} />
                    </div>
                )}
                
            </div>
        ) : null
        
    )
}

export default TarefaDetails;