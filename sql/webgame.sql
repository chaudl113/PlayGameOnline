-- MySQL dump 10.13  Distrib 5.7.32, for Linux (x86_64)
--
-- Host: localhost    Database: webgame
-- ------------------------------------------------------
-- Server version	5.7.32-0ubuntu0.18.04.1-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comments`
--
Use webgame;
DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_post` int(11) NOT NULL,
  `content` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (1,1,'Long123213213','chaudl113@gmail.com','long','2020-12-01 04:57:17','2020-12-01 04:57:17'),(2,1,'wqewqewqe213213213213','sdad@gmail.com','Long 12312321','2020-12-01 05:10:23','2020-12-01 05:10:23'),(3,1,'sasadsadsad','sadsad','Web','2020-12-01 05:25:48','2020-12-01 05:25:48');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `img` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,'Test1','<p>Albedo c&oacute; một người chị v&agrave; một người em t&ecirc;n l&agrave; Nirgedo v&agrave; Rubedo.</p>\r\n\r\n<p><a href=\"https://gamek.mediacdn.vn/133514250583805952/2020/11/25/photo-1-16063105297271776994084.jpg\" target=\"_blank\"><img alt=\"Mỹ nhân Overlord sở hữu vòng 1 nóng bỏng khoe body hoàn hảo trong chiếc váy trắng tinh khiết - Ảnh 5.\" src=\"https://gamek.mediacdn.vn/thumb_w/640/133514250583805952/2020/11/25/photo-1-16063105297271776994084.jpg\" /></a></p>\r\n\r\n<p>Albedo v&ocirc; c&ugrave;ng trung th&agrave;nh v&agrave; hết mực v&igrave; t&igrave;nh y&ecirc;u của m&igrave;nh l&agrave; Ainz Ooal Gown.&nbsp;Albedo lu&ocirc;n ganh đua v&igrave; t&igrave;nh cảm của Ainz, c&ocirc; rất dễ l&ecirc;n cơn ghen nếu c&oacute; ai đ&oacute; gần gũi với Ainz. Tuy nhi&ecirc;n Albedo kh&ocirc;ng phản đối việc Ainz c&oacute; nhiều th&ecirc; thiếp miễn sao c&ocirc; l&agrave; vợ cả v&agrave; l&agrave; người Ainz y&ecirc;u nhất l&agrave; được. Dặc biệt, Albedo rất giỏi nội trợ, c&ocirc; biết may v&aacute;, đan l&aacute;t v&agrave; th&ecirc;m th&ugrave;a...</p>\r\n','images/photo-3-1558423976556248143947.jpg','2020-11-26 04:18:00','2020-11-26 04:18:00'),(2,'Test2','<p>Notice that we start counting from page&nbsp;<strong>0</strong>.</p>\r\n\r\n<p>For example, if we want get page number 5 (page=5) and on each page there is 8 records (size=8), the calculations will look like this:</p>\r\n\r\n<ul>\r\n	<li>limit = size = 8</li>\r\n	<li>offset = page * size = 5 * 8 = 40</li>\r\n</ul>\r\n\r\n<p>So on page 5, there are records from 40 to 47.</p>\r\n\r\n<p>Generally, in the HTTP request URLs, paging parameters are optional. So if our Rest API supports pagination, we should provide default values to make paging work even when Client does not specify these parameters.</p>\r\n','images/unnamed.png','2020-11-26 08:41:52','2020-11-26 08:41:52');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_types`
--

DROP TABLE IF EXISTS `product_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product_types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_types`
--

LOCK TABLES `product_types` WRITE;
/*!40000 ALTER TABLE `product_types` DISABLE KEYS */;
INSERT INTO `product_types` VALUES (2,'HTML5','2020-11-23 10:10:10','2020-11-23 10:10:10'),(3,'Cocos','2020-11-23 10:10:17','2020-11-23 10:10:17'),(4,'Web','2020-11-23 10:10:31','2020-11-23 10:10:31');
/*!40000 ALTER TABLE `product_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `price` int(11) NOT NULL,
  `description` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (9,'FlapCat Copters',11,'AAA','images/unnamed.png','/Game_html5_FlapCat_Copters','2','2020-11-23 10:26:16','2020-11-23 10:26:16'),(10,'Flap Cat Chiristmas',166,'AAA','images/Gái-xinh.jpg','/Game_html5_FlapCat_Christmas','HTML5 ','2020-11-25 04:04:47','2020-11-23 10:27:07'),(11,'Flap Cat Steampunk',66,'FFF','images/images.jpeg','/Game_html5_FlapCat_Steampunk','2','2020-11-23 10:27:48','2020-11-23 10:27:48'),(12,'Pac Man',99,'AAA','images/pacman.jpg','/web','HTML5 ','2020-12-01 10:57:09','2020-12-01 10:57:09'),(13,'Test1',11,'AAA','images/68747470733a2f2f6173736574732e7374617274626f6f7473747261702e636f6d2f696d672f73637265656e73686f74732f7468656d65732f6c616e64696e672d706167652e706e67.png','/test1','Web ','2020-12-01 11:01:34','2020-12-01 11:01:34');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(16) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `roles` json NOT NULL,
  `updatedAt` varchar(45) NOT NULL DEFAULT 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','chaudl113@gmail.com','$2b$12$MP2NMjUqJcNyixdhhZ2sROU/C8w1SJvm8Teuh0ZcQOLqJ/Yq8jquC','2020-11-24 04:48:06','999','2020-12-01 09:02:45');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-12-02 16:23:12
