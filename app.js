const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const mysql = require('mysql2/promise'); 

const app = express(); 

// importing and load .env file
require('dotenv').config();

const port = process.env.PORT; 
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

//****************************************** MIDDLEWARE *****************************************************************/
// Establish connection with mySQL 
app.use(async function mysqlConnection(req, res, next) {
    try {
      req.db = await pool.getConnection();
      req.db.connection.config.namedPlaceholders = true;
  
      await req.db.query('SET SESSION sql_mode = "TRADITIONAL"');
      await req.db.query(`SET time_zone = '-8:00'`);
  
      await next();
  
      req.db.release();
    } catch (err) {
      console.log(err)
      if (req.db) req.db.release();
      throw err;
    }
  });
  
app.use(cors());
app.use(express.json());

//*************************************************** register and login *****************************************************/
// Public endpoints. User(s) doesn't need to be authenticated in order to reach them
//********* registration endpoint ********************/
const registerRouter = require('./routes/register');
app.use('/register', registerRouter); 
  
//*********************** login endpoint **************/
const loginRouter = require('./routes/login');
app.use('/login', loginRouter);

//*********************************** listening to server*******************************************************/
app.listen( port , () => console.log (`API applicaiton is running. Listening at localhost/${port}`));