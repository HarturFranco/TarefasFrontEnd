export class API {

    static getTarefas(){
        return fetch("http://127.0.0.1:8000/api/tarefas/", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then( resp => resp.json())
    }

    static updateTarefa(tar_id, body_field) {
        
        return fetch(`http://127.0.0.1:8000/api/tarefas/${tar_id}/`, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(body_field),
        }).then( resp => resp.json())
    }

    static createTarefa(body_field) {
        
        return fetch('http://127.0.0.1:8000/api/tarefas/', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(body_field),
        }).then( resp => resp.json())
    }

    static deleteTarefa(tar_id) {
        
        return fetch(`http://127.0.0.1:8000/api/tarefas/${tar_id}/`, {
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json',
            },
        })
    }
}