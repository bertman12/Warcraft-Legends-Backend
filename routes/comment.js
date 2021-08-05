const express = require('express');
const router = express.Router();
const moment = require('moment');



//************************ post request **********************/
// post new comment with the detials ( username, date created, game id, likes
// comment text, time). Time will use moment.js to post time comm. was created. 
router.post('/', async function(req, res) {

    const mysqlTimestamp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');

    try {

        const comment = await req.db.query(
          `INSERT INTO comment (userID, likes, commentText, time, gameID, username,subject ) 
            VALUES ( :userID, :likes, :commentText, :time, :gameID, :username, :subject )`,
          {
            userID: req.body.userID,
            likes:  req.body.likes,
            commentText: req.body.commentText,
            time: mysqlTimestamp,
            gameID: req.body.gameID,
            username: req.body.username,
            subject: req.body.subject
          }
        );
  
      res.json(comment);
    } catch(err) {
      console.log('Error in /user', err)
    }
  });
  //************************* editing request ********************/
  router.post('/:id', async function(req, res) {

    const mysqlTimestamp = moment(Date.now()).format('MMMM-DD-YYYY');

    try {
        const comment = await req.db.query(
          `UPDATE comment SET commentText=:commentText , time=:time , subject=:subject
            WHERE ( commentID = :commentID )` ,
          {
            commentText: req.body.commentText,
            time: mysqlTimestamp,
            commentID: req.params.id,
            subject: req.body.subject
          }
        );
  
      res.json(comment);
    } catch(err) {
      console.log('Error in /user', err)
    }
  });

  //********************* delete request  ********************/
  // delete comment depending on comment id 
  router.delete('/:id', async function(req, res) {

    try {

        const [comment] = await req.db.query(
          `DELETE FROM comment WHERE commentID = :commentID`,
          {
            commentID: req.params.id
          }
        );
  
      res.json(comment);
    } catch(err) {
      console.log('Error in /user', err)
    }
  });   

  module.exports = router; 