const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// register user  
router.post('/', async (req , res) => {
  try {
    let user;
    // console.log(`request body:${JSON.stringify(req.body,null,2)}`);
    // Hashes the password and inserts the info into the `user` table
    const hash = await bcrypt.hash(req.body.password, 10);
    // role=0 by default which means they are normal user 
    try {
      [user] = await req.db.query(`
        INSERT INTO user (username, password, name, email, age, location, role)
        VALUES (:username, :password, :name, :email, :age, :location, :role);
      `, {
        username: req.body.username,
        password: hash,
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
        location: req.body.location,
        role: 0
      });

      console.log('user', user)
    } catch (error) {
      console.log('error', error)
    }

    const encodedUser = jwt.sign(
      { 
        userId: user.insertId,
        ...req.body
      },
      process.env.JWT_KEY
    );

    res.json(encodedUser);
  } catch (err) {
    console.log('err', err)
  }
})

module.exports = router;