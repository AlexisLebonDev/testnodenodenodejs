import {connection} from "../db.js"

export const getAlltask = () =>{
    connection.query('SELECT * FROM tasks', (error, result) =>{
      if(error){
        console.log('erreur')
      }
      else{
        console.log(result)
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
  
//   getTaskFromNameUser('Jacques');