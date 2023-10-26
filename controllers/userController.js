import {User} from "./../models/users.js"

// import de bcrypt pour chiffrer les password
import bcrypt from 'bcrypt';

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

    const passwordHashed = await bcrypt.hash(_password, 10);

      try {
        const user = await User.create({
            nom : _nom,
            mail : _mail,
            age : _age,
            password : passwordHashed, 
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

export const loginUser = async (req, res) =>{

  try {
        //Verifier le mot de passe de l'user dans la requête avec la methode compare de bcrypt, si il existe on renvoi l'utilisateur (connexion ok)
    const password = req.body.password
    const mail = req.body.mail

    //Obtenir en BDD l'utilisateur qui possède l'email en question
    const user = await User.findOne({
      where : {
        mail : mail
      }
    })

    if(!user) throw "Pas d'utilisateur avec cet mail"

    //On créer une variable isMatch qui compare le mot de passe envoyé dans la requête avec celui qui est dans la base de donnée)
    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) throw "Mot de passe erroné"

    const token = await User.generateAuthToken(user)

    res.send({user, token})

  } catch (error) {
    res.status(400).send(error)  
  }

}


export const logoutUser = async (req, res) => {
  try {

    const token = req.header("Authorization").replace("Bearer","").trim()

    const user = await User.findOne({
      where:{
        id: req.user.id,
        token : token
      }
    })

    if(!user) throw ("Pas d'utilisateur")

    user.token = null

    await user.save()

    res.status(200).send("Déconnexion réussie")
    
  } catch (error) {
    res.status(400).send(error)
  }
}


export const patchUser = async (req, res) =>{
  // const option vide sert à stocker les éventuelles options
  const option = {}

  //if demande dans la requête si il y a des paramètres pour les mettre en option
  if(req.body.age) option.age = req.body.age
  if(req.body.nom) option.nom = req.body.nom
  if(req.body.mail) option.mail = req.body.mail
  if(req.body.password) option.password = req.body.password
console.log(option)
  try {
    const user = await User.update(option, {
      where: {
        id : req.params.id
      }
    })
    if (!user){
      res.status(400).send("Pas de mise à jour possible")
    }

    res.status(200).send("Mise à jour réussie")

  } catch (error) {
    res.status(400).send(error)
  }
}