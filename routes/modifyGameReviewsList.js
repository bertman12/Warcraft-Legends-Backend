const express = require('express');
const router = express.Router();

//create a game
router.post('/create', async (req, res) => {
    console.log('CREATING THE GAME', req.body);

    let lastReviewId;
    try{
         //adding review info
        [lastReviewId] = await req.db.query(`
        INSERT INTO game_reviews (title, author, description, genre, version, rating, videoSrc, imgSrc)
        VALUES                   (:title, :author, :description, :genre, :version, :rating, :videoSrc, :imgSrc);
        `,
        {
            title: req.body.title, 
            author: req.body.author, 
            description: req.body.description, 
            genre: req.body.genre, 
            version: req.body.version, 
            rating: req.body.rating, 
            videoSrc: req.body.videoSrc, 
            imgSrc: req.body.imgSrc
        });
        console.log('req.body.imgSrc name....', req.body.imgSrc);
        // adding feature arrays
        for(const x in req.body.featureDescriptions){
            await req.db.query(`
            INSERT INTO review_features (review_id, feature_image, feature_description) 
            VALUES                      (:review_id, :feature_images, :feature_descriptions);`,
            {
                review_id: lastReviewId.insertId,
                feature_images: req.body.featureImages[x],
                feature_descriptions: req.body.featureDescriptions[x]
            });
        }
        req.db.query(`
        INSERT INTO review_publish_date (review_id, month, day, year)
        VALUES                          (:review_id, :month, :day, :year);`
        ,{
            review_id: lastReviewId.insertId,
            month: req.body.publishDate.month,
            day: req.body.publishDate.day,
            year: req.body.publishDate.year
        });
        res.json('Game Review was created!');
    }
    catch(err){
        console.error(err.stack, 'FINAL ERROR');
    }
});

//edit a game
router.put('/edit/:id', async (req, res) => {
    console.log('EDITING THE GAME', req.body);
    try{
        req.db.query(`
            UPDATE game_reviews
            SET title = :title,
            author = :author,
            description = :description,
            genre = :genre,
            version = :version,
            rating = :rating,
            videoSrc = :videoSrc,
            imgSrc = :imgSrc
            WHERE id = :id`,
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

        const [groupedFeatureIdsArr] = await req.db.query(`
        SELECT feature_subset_id FROM review_features WHERE review_id = :review_id`,
        { review_id: req.params.id });
        if(req.body.featureDescriptions.length <=  groupedFeatureIdsArr.length){
            for(const x in groupedFeatureIdsArr){
                await req.db.query(`
                UPDATE review_features  
                SET 
                feature_image = :feature_image,
                feature_description = :feature_description
                WHERE review_id = :review_id AND feature_subset_id = :curr_id`,
                {
                    review_id: req.params.id,
                    feature_image: req.body.featureImages[x],
                    feature_description: req.body.featureDescriptions[x],
                    curr_id: groupedFeatureIdsArr[x].feature_subset_id
                });
            }
            req.db.query(`
                UPDATE review_publish_date  
                SET 
                month = :month,
                day = :day,
                year = :year
                WHERE review_id = :review_id`,
                {
                    review_id: req.params.id,
                    month: req.body.publishDate['month'],
                    day: req.body.publishDate['day'],
                    year: req.body.publishDate['year'],
            });
        }
        else{
            //only update rows that already exist in the database
            for(const x in groupedFeatureIdsArr){
                await req.db.query(`
                UPDATE review_features  
                SET 
                feature_image = :feature_image,
                feature_description = :feature_description
                WHERE review_id = :review_id AND feature_subset_id = :curr_id`,
                {
                    review_id: req.params.id,
                    feature_image: req.body.featureImages[x],
                    feature_description: req.body.featureDescriptions[x],
                    curr_id: groupedFeatureIdsArr[x].feature_subset_id
                });
            }
            //begin inserting rows for the new features that are added
            for(let x = groupedFeatureIdsArr.length; x < req.body.featureDescriptions.length; x++){
                req.db.query(`
                    INSERT INTO review_features (review_id, feature_image, feature_description) 
                    VALUES                      (:review_id, :feature_images, :feature_descriptions);`,
                    {
                        review_id: req.params.id,
                        feature_images: req.body.featureImages[x],
                        feature_descriptions: req.body.featureDescriptions[x]
                    });
                }  
            req.db.query(`
            UPDATE review_publish_date  
            SET 
            month = :month,
            day = :day,
            year = :year
            WHERE review_id = :review_id`,
            {
                review_id: req.params.id,
                month: req.body.publishDate.month,
                day: req.body.publishDate.day,
                year: req.body.publishDate.year,
            }); 
        }
        req.db.query(`DELETE FROM review_features WHERE feature_image IS NULL`);
        res.json("Game Review was edited");
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
            {id: req.params.id});
            res.json('Game Review has been deleted!');
        }
        catch(err){
            console.error(err);
        }
});

module.exports = router;
