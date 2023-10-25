import express from "express";
import { getAllUser, postUser, deleteUserById, loginUser } from "./../controllers/userController.js";
import {auth} from "./../middleware/auth.js"
export const userRouter = express.Router();

userRouter.get('/user', auth, function(req, res) {
    getAllUser(req, res);
  });

userRouter.post('/newUser', auth, async function(req, res){
    postUser(req, res);
})

userRouter.delete('/user/:id', auth, function(req, res){
    deleteUserById(req, res);
})

userRouter.post('/user/login', function(req, res){
    loginUser(req, res);
})