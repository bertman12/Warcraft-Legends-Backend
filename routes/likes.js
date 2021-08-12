const express = require('express');
const router = express.Router();

  //************************* editing request ********************/
  router.post('/:id', async function(req, res) {

    try {
        const likes = await req.db.query(
          `UPDATE comment SET likes=:likes WHERE ( commentID = :commentID )` ,
          {
            likes: req.body.likes,
            commentID: req.params.id
          }
        );
  
      console.log(likes)
      res.json(likes);
    } catch(err) {
      console.log('Error in /user', err)
    }
  });

  module.exports = router; 
