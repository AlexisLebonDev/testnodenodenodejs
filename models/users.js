import {sequelize} from "../db.js";
import { DataTypes } from "sequelize";
import {Task} from "./task.js"

export const User = sequelize.define('user', {
    id : {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      trim: true
    },
    nom: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true
    },
    mail: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      trim: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true
    }
  }, 
  {
    createdAt: false,
    updatedAt: false,
  });

User.disBonjour = () =>{
  console.log("Michel")
}

User.delTaskById = async (_id) =>{
  //Ici je cherche à supprimer toutes les tâches qui ont pour owner l'ID en paramètre
  const tasks = await Task.destroy({
    where: {
      owner : _id
    }
  })

}