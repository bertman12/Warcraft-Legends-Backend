CREATE TABLE `game_reviews` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `author` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `genre` varchar(255) DEFAULT NULL,
  `version` varchar(255) DEFAULT NULL,
  `rating` varchar(255) DEFAULT NULL,
  `videoSrc` varchar(255) DEFAULT NULL,
  `imgSrc` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



CREATE TABLE `game_reviews` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `author` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `genre` varchar(255) DEFAULT NULL,
  `version` varchar(255) DEFAULT NULL,
  `rating` varchar(255) DEFAULT NULL,
  `videoSrc` varchar(255) DEFAULT NULL,
  `imgSrc` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

--     id: number,
--     title: string,
--     author: string,
--     description: string,
--     featureDescriptions: string[],
--     featureImages: string[],
--     genre: string,
--     version: string,
--     rating: string // may have to store as a number for calculations
--     publishDate: {month: string, day: number, year: number },
--     videoSrc: string, //this will be binded to the video tags src attribute in the media component
--     imgSrc: string
--

INSERT INTO game_reviews VALUES
  (0,
  "Uther Party",
  "TheZizz","Play a variety of randomly selected mini-games against your opponents.\
   A highly appraised warcraft classic, this custom game has been a benchmark for other\
   content creators when it comes to interesting and fun gameplay.",
  'Mini Games',
  '10.0',
  '5',
  "../../assets/Action 7-3-2021 3-09-01 PM.mp4",
  "../../assets/Warcraft-III-generic-image-half-size.png");


--         id: 0,  
--         title: "Uther Party", 
--         author: "TheZizz",
--         description: "Play a variety of randomly selected mini-games against your opponents.\
--          A highly appraised warcraft classic, this custom game has been a benchmark for other\
--          content creators when it comes to interesting and fun gameplay.",
--         featureDescriptions: ['FeatureDesc1','FeatureDesc2','FeatureDesc3',],
--         featureImages: ['../../assets/Warcraft-III-generic-image-half-size.png','../../arthas-evil-hr-flipped.jpg','../../orc-hr.jpg'],
--         genre: 'Mini Games',
--         version: '10.0',
--         rating: '5',
--         publishDate: {month: "September", day: 4, year: 2009},
--         videoSrc: "../../assets/Action 7-3-2021 3-09-01 PM.mp4",
--         imgSrc: "../../assets/Warcraft-III-generic-image-half-size.png" },