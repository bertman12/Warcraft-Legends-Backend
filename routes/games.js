const express = require('express');
const router = express.Router();

//we need a get, post, put, and delete

//get all data from games table
router.get("/", async (req, res)=> {
    try{
        const [[games]] = await req.db.query(
            `SELECT * FROM games`);
            res.json(games);
    }
    catch(err){
        console.error(err);
    }
});

//get a single game

//add a single game

/**Private Endpoints that will require user authentication or perhaps I could use angular guards to prevent certain actions via the frontend
 * instead of the backend.?
*/
//update a game object

//remove a game object


module.exports = router;
