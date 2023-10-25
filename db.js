// import mysql from 'mysql' ;

//Import Sequelize 
import Sequelize from 'sequelize';

// CONCERNE LES IDENTIFIANTS DE CONNEXION BDD
import dotenv from 'dotenv';
dotenv.config();

// import de bcrypt pour chiffrer les password
import bcrypt from 'bcrypt';

// CONNEXION BBD AVEC MYSQL
// export const connection = mysql.createConnection({
//   host     : process.env.db_host,
//   user     : process.env.db_userName,
//   password : process.env.db_password,
//   database : process.env.db_name,
// });
 
// connection.connect((error) =>{
//     if(error){
//         console.log('connexion impossible')
//     }
//     else{
//         console.log('connexion établie')
//     }
// }

// );

// CONNEXION BDD AVEC SEQUELIZE
export const sequelize = new Sequelize(process.env.db_name, process.env.db_userName, process.env.db_password, {
    host: process.env.db_host,
    dialect: "mysql", 
    define: {
      freezeTableName : true
    }
  });

