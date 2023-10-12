console.log("coucou");


import { getAlltask, getTaskFromIdUser, getTaskFromNameUser } from "./controllers/taskController.js";
// getAlltask();
// getTaskFromIdUser(2);
// getTaskFromNameUser('Jacques');
// editAllTaskByNameUser('Jean', 'apprendre qui il est') 
// addTaskFromNameUser('Jean', 'Trouver Ornicar')

import express from 'express';

// Appel le serveur
const app = express();


const port = 3000;


//Mon serveur qui s'appel APP, quand tu reçois une requête GET sur le chemin "/" et bien renvoie dans la réponse un message ex:"Hello WOrld"
// app.get('/json', function (req, res) {
//   //Ici c'est la partie controlleur qui me permet de faire de calcul, ou aller chercher des données avant de l'envoyer au client
//   res.json({
//     "prenom": "Jean",
//     "age" : 28
//   })
// })

// Mon serveur qui s'appel APP, quand tu reçois une requête GET sur le chemin "/" et bien renvoie dans la réponse un message ex:"Hello WOrld"
// app.get('/', function (req, res) {
//   res.send('Coucou')
// })

import axios from 'axios' ;
import { taskRouter } from "./router/task.js";
import { userRouter } from "./router/users.js";


app.set("view engine", "ejs");
app.get('/', async (req, res) => {
    try {
        // Fetch data from the remote API
        const response = await axios.get('https://api.jikan.moe/v4/anime');

        // Access the response data directly using response.data
        const data = response.data.data; // Assuming 'data' is an array of movies

        // Render the EJS template with the movie data
        res.render('index', { movies: data });
        // res.send(data)
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// pour avoir le front
// app.set("view engine", "ejs");
// app.get("/display", (req, res) => {
//     res.render("index");
// })

app.use(express.json())
app.use(taskRouter)
app.use(userRouter)


//Appel l'APP (serveur localhost:3000)
app.listen(port, () => {
  console.log(`Example apps listening on port ${port}`)
})


