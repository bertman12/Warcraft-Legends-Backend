const express = require('express');
const router = express.Router();

//************************** get request ********************/
// get all the comments depending on the game id 
router.get('/:id', async function(req, res) {

    try {

        const [comment] = await req.db.query(
          `SELECT * FROM comment WHERE gameID = :gameID`,
          {
            gameID: req.params.id
          }
        );
  
      res.json(comment)
    } catch(err) {
      console.log('Error in /user', err)
    }
  });

module.exports = router; 