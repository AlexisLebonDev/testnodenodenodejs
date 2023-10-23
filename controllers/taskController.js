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
      //Récupérer différents paramètres soumis via l'URL au travers de paramètres, ex: /tasks?completed=true&limit=2
  export const getAlltask = async (req, res) =>{
    try {

      //Option est une variable qui nous permet de stocker les éventuels paramètres
      const options = {}

      //On test si il y a le paramètre 'complete' dans l'URL
      if (req.query.complete){
        //On créer une variable 'isComplete' par défault égal à Zéro pour réécrire la valeur 'complete' sans les guillemets
        let isComplete = 0
        //Si 'complete' est égal à 'true' je sauvegarde 'isComplete' avec la valeur 'true' mais sans les guillemets
        if (req.query.complete === 'true') {
          isComplete = true
        }
        //Si 'complete' est égal à 'false' je sauvegarde 'isComplete' avec la valeur 'false' mais sans les guillemets
        else if (req.query.complete === 'false'){
          isComplete = false
        }
        //On ajoute la clause 'where' à la variable option qui sera passé en paramètre de la requête
        options.where = {complete : isComplete}
      }
console.log(options)

      //On va chercher toutes les tâches avec potentiellement des options
      const tasks = await Task.findAll(options)

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

// VERSION MYSQL :
// export const updateTaskById = (req, res) =>{

//   try {
//     const id = req.params.id;
//     const description = req.body.description;
//     const complete = req.body.complete;
//     connection.query(`UPDATE tasks SET description = ?, complete = ? WHERE id = ? `, [description, complete, id], (error, result)=>{

//     res.status(200).send(result)

//     })
//   } catch (error) {

//     res.send(error)
//   }
// }

// VERSION SEQUELIZE :
export const updateTaskById = async (req, res) =>{
  const _id = req.params.id;
  const _description = req.body.description;
  const _complete = req.body.complete;
  try {
    const tasks = await Task.update({ description: _description , complete: _complete}, {
      where: {
        owner : _id
      }
    })
    if (!tasks){
      res.status(404).send("Pas de tache trouvée")
    }
    res.status(202).send(tasks)
  } catch (error) {
    res.send(error)
  }
}


// VERSION MYSQL :
// export const deleteTaskById = (req, res) =>{
//   try {
//     const id = req.params.id

//     connection.query(`DELETE FROM tasks WHERE id = ? `, [id], (error, result)=>{

//       res.status(200).send(result)
  
//       })

//   }

//   catch (error) {
//     res.send(error)
//   }
// }

// VERSION SEQUELIZE :
export const deleteTaskById = async (req, res) =>{
  const _id = req.params.id

  try {
    const tasks = await Task.destroy({
      where: {
        id : _id
      }
    })

    if (!tasks){
      res.status(404).send("Aucune tâche trouvée")
    }
    res.status(200).send("tache(s) supprimée(s)")
      
  } catch (error) {
    res.send(error)
  }
}

