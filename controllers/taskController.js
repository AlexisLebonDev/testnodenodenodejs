import {connection} from "../db.js"

export const getAlltask = (req, res) =>{
    connection.query('SELECT * FROM tasks', (error, result) =>{
      if(error){
        console.log('erreur')
      }
      else{
        res.send(result)
      }
    })
  }


export const getTaskFromIdUser = (id) =>{
    connection.query('SELECT * FROM tasks WHERE owner = ?',[id], (error, result) =>{
      if(error){
        console.log('erreur')
      }
      else{
        console.log(result)
      }
    })
  }



export const getTaskFromNameUser = (name) =>{
    connection.query('SELECT * FROM tasks INNER JOIN user ON tasks.owner = user.id WHERE user.nom = ?', [name], (error, result) =>{
      if(error){
        console.log('erreur')
      }
      else{
        // console.log(result[1].description)
        // for (let i = 0; i < result.length; i++) {
        //   console.log(result[i].description)
        // }
        result.forEach(element => {
          if(element.id == 2) console.log(element.description)
        });
      }
    })
  }
  



const editAllTaskByNameUser = (nom, description) =>{
    // Aller chercher l'id de l'user qui à un certain nom
    connection.query('SELECT id FROM user WHERE nom = ?', [nom], (error, result)=>{
        if(error){
            console.log('erreur', error)
        }
        else{
            console.log(result[0])
            const id = result[0].id 

            // Aller chercher la tâche qui a pour onwer l'ID du user demandé
            connection.query(`UPDATE tasks SET description = ? WHERE owner = ?`, [description, id], (error, result)=>{
                if(error){
                    console.log('erreur')
                }
                else {
                    console.log(result.message)
                }
            })
        }
    })
}



const addTaskFromNameUser = (nom, description) =>{
        // Aller chercher l'id de l'user qui à un certain nom
    connection.query(`SELECT id FROM user WHERE nom = ?`, [nom], (error, result)=>{
        if(error){
            console.log(error)
        }
        else{
            console.log(result[0])
            const id = result[0].id

            connection.query(`INSERT INTO tasks (description, owner) VALUES (?, ?)`, [description, id], (error, result)=>{
                if(error){
                    console.log('erreur')
                }
                else{
                    console.log(result.message)
                }
            })
        }
    })
}



