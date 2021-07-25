-- MySQL dump 10.13  Distrib 8.0.21, for macos10.15 (x86_64)
--
-- Host: localhost    Database: wc3-newsletter-db
-- ------------------------------------------------------
-- Server version	8.0.23

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` blob,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `age` int DEFAULT NULL,
  `location` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'frankie',_binary '$2b$10$Ge44h4N6fja5.Hldyhm6MeM/D7akeBvBSEBkt6NJIxNUtiEkMRoc6','frankie','frankie@bvtca.com',21,95351);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-07-07 15:09:26

CREATE TABLE `games` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `author` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  --featuredescriptions
  --featureimages
  `genre` varchar(255) DEFAULT NULL,
  `version` varchar(255) DEFAULT NULL,
  `rating` varchar(255) DEFAULT NULL,
  `videoSrc` varchar(255) DEFAULT NULL,
  `imgSrc` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


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

INSERT INTO games VALUES
  (0,
  "Uther Party",
  "TheZizz","Play a variety of randomly selected mini-games against your opponents.\
--          A highly appraised warcraft classic, this custom game has been a benchmark for other\
--          content creators when it comes to interesting and fun gameplay.",
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