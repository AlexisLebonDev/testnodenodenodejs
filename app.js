console.log("coucou");


import { getAlltask, getTaskFromIdUser, getTaskFromNameUser } from "./controllers/taskController.js";



// getAlltask();



// getTaskFromIdUser(2);


import express from 'express'

const app = express()

//Mon serveur qui s'appel APP, quand tu reçois une requête GET sur le chemin "/" et bien renvoie dans la réponse un message ex:"Hello WOrld"
app.get('/json', function (req, res) {
  //Ici c'est la partie controlleur qui me permet de faire de calcul, ou aller chercher des données avant de l'envoyer au client
  res.json({
    "prenom": "Jean",
    "age" : 28
  })
})

// Mon serveur qui s'appel APP, quand tu reçois une requête GET sur le chemin "/" et bien renvoie dans la réponse un message ex:"Hello WOrld"
app.get('/', function (req, res) {
  res.send('Coucou')
})

app.listen(3000,()=>{
  console.log("serveur démarré sur local host")
})