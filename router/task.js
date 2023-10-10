import express from "express";
export const taskRouter = express.Router();
import {getAlltask} from "./../controllers/taskController.js"

taskRouter.get('/tasks', function(req, res) {
    getAlltask(req, res);
  });