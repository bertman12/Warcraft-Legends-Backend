const express = require('express');
const router = express.Router();

//create a game
router.post('/create', async (req, res) => {
    try{
        const newReview = req.body;
        console.log("The new review is ...",newReview);

        await req.db.query(`
        INSERT INTO game_reviews (id, game_id, title, author, description, genre, version, rating, videoSrc, imgSrc)
        VALUES (:id, :game_id, :title, :author, :description, :genre, :version, :rating, :videoSrc, :imgSrc
        );`,
        {
            id: 0,
            game_id: req.body.game_id, 
            title: req.body.title, 
            author: req.body.author, 
            description: req.body.description, 
            genre: req.body.genre, 
            version: req.body.version, 
            rating: req.body.rating, 
            videoSrc: req.body.videoSrc, 
            imgSrc: req.body.imgSrc
        });
        res.json('posted new review!');
    }
    catch(err){
        console.error(err);
    }
});

//edit a game
router.put('/edit/:id', async (req, res) => {
    try{
        await req.db.query(
            `
            UPDATE game_reviews
            SET title = :title,
                author = :author,
                description = :description,
                genre = :genre,
                version = :version,
                rating = :rating,
                videoSrc = :videoSrc,
                imgSrc = :imgSrc
            WHERE game_id = :game_id
            `,
            {
                game_id: req.params.id, 
                title: req.body.title, 
                author: req.body.author, 
                description: req.body.description, 
                genre: req.body.genre, 
                version: req.body.version, 
                rating: req.body.rating, 
                videoSrc: req.body.videoSrc, 
                imgSrc: req.body.imgSrc
            });
            res.json("object updated");
        }
        catch(err){
            console.error(err);
        }
});

//delete a game
router.delete('/delete/:id', async(req, res) => {
    try{
        await req.db.query(
        `DELETE FROM game_reviews WHERE game_id = :game_id`,
        {game_id: req.params.id}
        );
        res.json('game was deleted');
    }
    catch(err){
        console.error(err);
    }
});

module.exports = router;
