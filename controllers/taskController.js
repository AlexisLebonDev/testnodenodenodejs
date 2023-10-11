import {Task} from "./../models/task.js"

// VERSION MYSQL :
// export const getAlltask = (req, res) =>{
//     connection.query('SELECT * FROM tasks', (error, result) =>{
//       if(error){
//         console.log('erreur')
//       }
//       else{
//         res.send(result)
//       }
//     })

// VERSION SEQUELIZE :
  export const getAlltask = async (req, res) =>{
    try {
      const tasks = await Task.findAll()

      if (!tasks){
        res.status(404).send("Pas de tâche trouvé")
      }
      res.status(200).send(tasks)

    } catch (error) {
      console.log(error)
      res.send(error)
    }
  }

// VERSION MYSQL :
// export const getTaskFromIdUser = (req, res) =>{
//     const id = req.params.id
//     connection.query('SELECT * FROM tasks WHERE owner = ?',[id], (error, result) =>{
//       if(error){
//         console.log('erreur')
//       }
//       else{
//         res.send(result)
//       }
//     })

// VERSION SEQUELIZE :
export const getTaskFromIdUser = async (req, res) =>{
    try {
      const tasks = await Task.findAll({
        where: {
          id : req.params.id
        }
      })
      
      if (!tasks){
        res.status(404).send("Pas trouvé de tâche en fonction de l'ID")
      }
      res.status(200).send(tasks)
      
    } catch (error) {
      res.send(error)
    }
  }



export const getTaskFromNameUser = async (name) =>{
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

// VERSION MYSQL :
// export const postTaskById = (req, res) =>{
//   const _id = req.params.id;
//   const _description = req.body.description;
//   const _complete = req.body.complete;
  //   connection.query(`INSERT INTO tasks (description, owner, complete) VALUES (?, ?, ?)`, [description, id, complete], (error, result)=>{
  //     if(error){
  //         console.log('erreur')
  //     }
  //     else{
  //         res.send(result)
  //     }
// })

// VERSION SEQUELIZE :
export const postTaskById = async (req, res) =>{
  const _id = req.params.id;
  const _description = req.body.description;
  const _complete = req.body.complete;
    try {
      console.log(_description)
      const tasks = await Task.create({
          owner : _id,
          description : _description,
          complete : _complete
      })
      
      if (!tasks){
        res.status(404).send("Pas trouvé de tâche en fonction de l'ID")
      }
      res.status(200).send(tasks)
      
    } catch (error) {
      res.send(error)
    }
}

export const updateTaskById = (req, res) =>{

  try {
    const id = req.params.id;
    const description = req.body.description;
    const complete = req.body.complete;
    connection.query(`UPDATE tasks SET description = ?, complete = ? WHERE id = ? `, [description, complete, id], (error, result)=>{

    res.status(200).send(result)

    })
  } catch (error) {

    res.send(error)

  }

}

export const deleteTaskById = (req, res) =>{
  try {
    const id = req.params.id

    connection.query(`DELETE FROM tasks WHERE id = ? `, [id], (error, result)=>{

      res.status(200).send(result)
  
      })

  }

  catch (error) {
    res.send(error)
  }
}