import mysql from 'mysql' ;
import dotenv from 'dotenv';
dotenv.config();

export const connection = mysql.createConnection({
  host     : process.env.db_host,
  user     : process.env.db_userName,
  password : process.env.db_password,
  database : process.env.db_name,
});
 
connection.connect((error) =>{
    if(error){
        console.log('connexion impossible')
    }
    else{
        console.log('connexion établie')
    }
}

);
