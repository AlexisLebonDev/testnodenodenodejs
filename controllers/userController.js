import {User} from "./../models/users.js"

// VERSION SEQUELIZE :
export const getAllUser = async (req, res) =>{
    try {
      const user = await User.findAll()

      if (!user){
        res.status(404).send("Pas d'utilisateur trouvé")
      }
      res.status(200).send(user)

    } catch (error) {
      console.log(error)
      res.send(error)
    }
  }


  //VERSION SEQUELIZE:
  export const postUser = async (req, res) =>{
    const _nom = req.body.nom;
    const _mail = req.body.mail;
    const _age = req.body.age;
    const _password = req.body.password;
      try {
        const user = await User.create({
            nom : _nom,
            mail : _mail,
            age : _age,
            password : _password, 
        })
        User.disBonjour()
        res.status(200).send(user)
        
      } catch (error) {
        res.send(error)
      }
  }

  // VERSION SEQUELIZE :
export const deleteUserById = async (req, res) =>{
    const _id = req.params.id
  
    try {
      const user = await User.destroy({
        where: {
          id : _id
        }
      })
      User.delTaskById(_id)

      if (!user){
        res.status(404).send("Aucun utilisateur trouvé")
      }
      res.status(200).send("utilisateur supprimé")
        
    } catch (error) {
      res.send(error)
    }
  }

  