import express from "express";
export const taskRouter = express.Router();
import {getAlltask, getTaskFromIdUser, postTaskById, updateTaskById, deleteTaskById,} from "./../controllers/taskController.js"
import {auth} from "./../middleware/auth.js"


taskRouter.get('/tasks', auth, function(req, res) {
    getAlltask(req, res);
  });

taskRouter.get('/tasks/:id', auth, function(req, res){
    getTaskFromIdUser(req, res);
})

taskRouter.post('/tasks/:id', auth, async function(req, res){
    postTaskById(req, res);
})

taskRouter.put('/tasks/:id', auth, function(req, res){
    updateTaskById(req, res);
})

taskRouter.delete('/tasks/:id', auth, function(req, res){
    deleteTaskById(req, res);
})

taskRouter.get('/tasks/completed=true', auth, function(req, res){
    tasksCompleted(req, res);
})

taskRouter.get('*', function(req, res){
    res.status(404).send('<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiS32QffaYH9j7iZV5lLEuLX7_ppDL3pt40mmc1L2WDagzE1XCK97Yc4JjNK9ByTgCRyU&usqp=CAU"/>');
})