import express from "express";
export const taskRouter = express.Router();
import {getAlltask, getTaskFromIdUser, postTaskById, updateTaskById, deleteTaskById,} from "./../controllers/taskController.js"



taskRouter.get('/tasks', function(req, res) {
    getAlltask(req, res);
  });

taskRouter.get('/tasks/:id', function(req, res){
    getTaskFromIdUser(req, res);
})

taskRouter.post('/tasks/:id', async function(req, res){
    postTaskById(req, res);
})

taskRouter.put('/tasks/:id', function(req, res){
    updateTaskById(req, res);
})

taskRouter.delete('/tasks/:id', function(req, res){
    deleteTaskById(req, res);
})

taskRouter.get('/tasks/completed=true', function(req, res){
    tasksCompleted(req, res);
})