const express = require('express');
const router = express.Router();

//create a game
router.post('/create', async (req, res) => {
    try{
        const newReview = req.body;
        console.log("The new review is ...",newReview);


        // const fetched_id = await req.db.query(`SELECT MAX(game_id) FROM game_reviews`,);
        // if(!fetched_id){
        //     fetched_id === 0;
        // }
        await req.db.query(`
        INSERT INTO game_reviews (id, title, author, description, genre, version, rating, videoSrc, imgSrc)
        VALUES                   (:id, :title, :author, :description, :genre, :version, :rating, :videoSrc, :imgSrc);`,
        {
            id: 0,
            title: req.body.title, 
            author: req.body.author, 
            description: req.body.description, 
            genre: req.body.genre, 
            version: req.body.version, 
            rating: req.body.rating, 
            videoSrc: req.body.videoSrc, 
            imgSrc: req.body.imgSrc
        });
        res.json('Game Review was created!');
        // res.json('posted new review! Here is the new game id as well: ', game_id);
        
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
            WHERE id = :id
            `,
            {
                id: req.params.id, 
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
        `DELETE FROM game_reviews WHERE id = :id`,
        {id: req.params.id}
        );
        res.json('game was deleted');
    }
    catch(err){
        console.error(err);
    }
});

module.exports = router;
