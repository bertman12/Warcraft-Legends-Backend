const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise'); 
const jwt = require('jsonwebtoken');

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

//*************************************************** get an individual game or all *****************************************************/
const getGameReviewsRouter = require('./routes/getGameReviews');
app.use('/game-reviews-list', getGameReviewsRouter);


//*************************************************** register and login *****************************************************/
// Public endpoints. User(s) doesn't need to be authenticated in order to reach them
//********* registration endpoint ********************/
const registerRouter = require('./routes/register');
app.use('/register', registerRouter); 
  
//*********************** login endpoint **************/
const loginRouter = require('./routes/login');
app.use('/login', loginRouter);

const getComments = require('./routes/comments')
app.use('/comments', getComments);
//**************************************** JWT Verfication **************************************************8*****/
// Jwt verification checks to see if there is an authorization header with a valid jwt in it.
app.use(async function verifyJwt(req, res, next) {
    // console.log('REQUESTTTT', req.headers)
    if (!req.headers.authorization) {
      throw(401, 'Invalid authorization');
    }
  
    const [scheme, token] = req.headers.authorization.split(' ');
  
    // console.log('[scheme, token]', scheme, ' ', token);
  
    if (scheme !== 'Bearer') {
      throw(401, 'Invalid authorization');
    }
  
    try {
      const payload = jwt.verify(token, process.env.JWT_KEY);
  
      // console.log('payload', payload)
  
      req.user = payload;
    } catch (err) {
      if (err.message && (err.message.toUpperCase() === 'INVALID TOKEN' || err.message.toUpperCase() === 'JWT EXPIRED')) {
  
        req.status = err.status || 500;
        req.body = err.message;
        req.app.emit('jwt-error', err, req);
      } else {
  
        throw((err.status || 500), err.message);
      }
      console.log(err)
    }
  
    await next();
});
//********************************Private Endpoints **************************/
// These are the private endpoints, they require jwt authentication. 
//When a request is made it goes to one of these functions after it goes through the middleware.
//***** */
//Then a response is set an returned (like `res.json(users)`)
const userRouter = require('./routes/user');
app.use('/user', userRouter);

//use this dummy route to check user role before entering endpoint for modifying games
// const dummyRoute = express.Router();
// dummyRoute.use((req, res)=>{
//   console.log('YOU ONLY SEE THIS BECAUSE WE LISTED THIS MIDDLEWARE TO BE INCLUDED IN THE GAME-REVIEWS-LIST ENDPOINT!');
// })
//*************************************************** Create, update and delete game reviews*****************************************************/
const modifyGameReviewsListRouter = require('./routes/modifyGameReviewsList');
app.use('/game-reviews-list/mod',modifyGameReviewsListRouter);

//****************************************************************************************************************/

const commentRouter = require('./routes/comment');
app.use('/comment', commentRouter);

const likesRouter = require('./routes/likes');
app.use('/likes', likesRouter);

//*********************************** listening to server*******************************************************/
app.listen( port , () => console.log (`API applicaiton is running. Listening at localhost/${port}`));