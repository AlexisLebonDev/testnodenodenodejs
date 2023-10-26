import express from "express";
import { getAllUser, postUser, deleteUserById, loginUser, logoutUser, patchUser } from "./../controllers/userController.js";
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

userRouter.post('/user/logout', auth, function(req, res){
    logoutUser(req, res);
})

userRouter.patch('/user/:id', auth, function(req, res){
    patchUser(req, res);
} )

import multer from 'multer'

const upload = multer({
    dest : "images"
})

userRouter.post('/user/:id/avatar', auth, upload.single("avatar"), function(req, res){
    // postUserAvatar(req, res);
    res.send("coucou")
})