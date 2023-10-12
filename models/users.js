import {sequelize} from "../db.js";
import { DataTypes } from "sequelize";

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