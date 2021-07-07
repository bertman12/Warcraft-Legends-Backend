const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//If your login request is via a user supplying a username and password then a POST is preferable, 
//as details will be sent in the HTTP messages body rather than the URL
router.post('/', async (req , res) => {
    try {
        //console.log(`request body:${JSON.stringify(req.body,null,2)}`);
        const [[user]] = await req.db.query(`
          SELECT * FROM user WHERE email = :email
        `, {  
          email: req.body.email
        });
    
        if (!user) {
          res.json('Email Not Found');
        }
    
        const userPassword = `${user.password}`
    
        const compare = await bcrypt.compare(req.body.password, userPassword);
    
        // why no password?  
        if (compare) {
          const payload = {
            userId: user.id,
            username: user.username,
            name: user.name,
            email: user.email,
            age: user.age,
            location: user.location
            //role: 4
          }
          
          const encodedUser = jwt.sign(payload, process.env.JWT_KEY);
    
          res.json(encodedUser)
        } else { 
          res.json('Password Not Found');
        } 
      } catch (err) {
        console.log('Error in /auth', err)
      }
    })

    module.exports = router;