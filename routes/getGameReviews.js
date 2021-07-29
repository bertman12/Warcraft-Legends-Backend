const express = require('express');
const router = express.Router();

//get all game reviews
router.get("/", async (req, res)=> {
    
    try{
        const [gameReviews] = await req.db.query(
            `SELECT * FROM game_reviews`);
            res.json(gameReviews);
            console.log('All games have been grabbed: ', gameReviews)
    }
    catch(err){
        console.error(err);
    }
});

//get an individual game review
router.get("/:id", async (req, res)=> {
    try{
        const [[gameReview]] = await req.db.query(
            `SELECT * FROM game_reviews WHERE id = :id`,
            {
                id: req.params.id
            });
            res.json(gameReview);
            console.log('All games have been grabbed: ', gameReview)
    }
    catch(err){
        console.error(err);
    }
});

/**Private Endpoints that will require user authentication or perhaps I could use angular guards to prevent certain actions via the frontend
 * instead of the backend.?
*/
module.exports = router;
