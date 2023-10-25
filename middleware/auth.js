import jsonwebtoken from 'jsonwebtoken'
import {User} from "./../models/users.js"

export const auth = async (req, res, next) =>{
    try {
        //On récupère le token qui est dans le header de la requête dans la partie Authorization et remplacer 'Bearer' (qui est automatiquement écrit) par rien du tout et enlever les espace en debut et fin avec la fonction trim
        //En gros, on veut que le token sans rien d'autre
        const token = req.header("Authorization").replace("Bearer","").trim()
        console.log(token)
        //On décode le token pour récupérer l'ID de l'utilisateur
        const tokenDecoded = jsonwebtoken.verify(token, process.env.secret)

        //On cherche l'utilisateur avec l'ID et le token
        const user = await User.findOne({
            where : {
                id: tokenDecoded.id,
                token: token
            }
        })

        if(!user) throw "pas d'utilisateur"

        //On ajoute la propriété user à la requête
        req.user = user

        //On ajoute la propriét" token à la requête
        req.token = token

        //On passe au middleware suivant avec la fonction next
        next()

    } catch (error) {
        res.status(400).send(error)
    }
}