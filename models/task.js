import {sequelize} from "../db.js";
import { DataTypes } from "sequelize";

export const Task = sequelize.define('tasks', {
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true
    },
    complete: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      trim: true
    },
    owner: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        trim: true
    }
  }, 
  {
    createdAt: false,
    updatedAt: false,
  });

