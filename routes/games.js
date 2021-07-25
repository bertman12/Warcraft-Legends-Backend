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

module.exports = router;
