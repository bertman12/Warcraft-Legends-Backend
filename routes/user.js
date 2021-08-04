const express = require('express');
const router = express.Router();


router.post('/', async function(req, res) {

    try {

        const [[user]] = await req.db.query(
          `SELECT * FROM user WHERE email = :email`,
          {
            email: req.body.email
          }
        );
  
      res.json(user);
    } catch(err) {
      console.log('Error in /user', err)
    }
  });

  module.exports = router; 