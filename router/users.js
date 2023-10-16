import express from "express";
import { getAllUser, postUser, deleteUserById } from "./../controllers/userController.js";
export const userRouter = express.Router();

userRouter.get('/user', function(req, res) {
    getAllUser(req, res);
  });

userRouter.post('/newUser', async function(req, res){
    postUser(req, res);
})

userRouter.delete('/user/:id', function(req, res){
    deleteUserById(req, res);
})