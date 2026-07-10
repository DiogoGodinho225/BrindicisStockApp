-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: brindic1_stock_novo
-- ------------------------------------------------------
-- Server version	5.7.44

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
-- Table structure for table `cache`
--

DROP TABLE IF EXISTS `cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache`
--

LOCK TABLES `cache` WRITE;
/*!40000 ALTER TABLE `cache` DISABLE KEYS */;
INSERT INTO `cache` VALUES ('laravel_cache_auth_token:frontoffice','s:32:\"acda78c50415496cd337c7af88ad101c\";',2060850683),('laravel_cache_auth_token:backoffice','s:32:\"44cf35e2a8ad1f5ec0cd4a46a8ef93b4\";',2060850971),('brindicis_stock_cache_auth_token:frontoffice','s:32:\"fc4af11965fc9481c9f76f59528ad448\";',2062677807),('brindicis_stock_cache_auth_token:backoffice','s:32:\"eee1c9deb21556217c9f0e5b53d5bc7f\";',2062676449);
/*!40000 ALTER TABLE `cache` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cache_locks`
--

DROP TABLE IF EXISTS `cache_locks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache_locks`
--

LOCK TABLES `cache_locks` WRITE;
/*!40000 ALTER TABLE `cache_locks` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache_locks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(75) NOT NULL,
  `status` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=79 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (65,'Makito',1,'2025-05-15 10:19:33','2025-05-15 10:19:33'),(64,'Material personalizado',1,'2025-05-15 10:19:26','2025-05-15 10:19:26'),(63,'MD stock',1,'2025-05-15 10:19:17','2025-05-15 10:19:17'),(62,'MID-OCEAN',1,'2025-05-15 10:19:11','2025-05-15 10:19:11'),(61,'Mundifer',1,'2025-05-15 10:19:04','2025-05-15 10:19:04'),(60,'PAYPER',1,'2025-05-15 10:18:57','2025-05-15 10:18:57'),(50,'Workteam',1,'2025-05-15 10:17:49','2025-05-15 10:17:49'),(51,'VELILLA',1,'2025-05-15 10:17:57','2025-05-15 10:17:57'),(52,'Valento',1,'2025-05-15 10:18:03','2025-05-15 10:18:03'),(53,'TEJOBRINDE',1,'2025-05-15 10:18:10','2025-05-15 10:18:10'),(54,'STRICKER',1,'2025-05-15 10:18:19','2025-05-15 10:18:19'),(55,'SOLS',1,'2025-05-15 10:18:26','2025-05-15 10:18:26'),(56,'Showroom',1,'2025-05-15 10:18:32','2025-05-15 10:18:32'),(57,'Roly',1,'2025-05-15 10:18:38','2025-05-15 10:18:38'),(58,'Primero',1,'2025-05-15 10:18:44','2025-05-15 10:18:44'),(59,'PF CONCEPT',1,'2025-05-15 10:18:51','2025-05-15 10:18:51'),(66,'Keya',1,'2025-05-15 10:19:40','2025-05-15 10:19:40'),(67,'Kariban',1,'2025-05-15 10:19:46','2025-05-15 10:19:46'),(68,'JHK',1,'2025-05-15 10:19:55','2025-05-15 10:19:55'),(69,'Granicentro',1,'2025-05-15 10:20:02','2025-05-15 10:20:02'),(70,'Fvc',1,'2025-05-15 10:20:08','2025-05-15 10:20:08'),(71,'Fardamento',1,'2025-05-15 10:20:13','2025-05-15 10:20:13'),(72,'Crachas',1,'2025-05-15 10:20:20','2025-05-15 10:20:20'),(73,'Cifra',1,'2025-05-15 10:20:26','2025-05-15 10:20:26'),(74,'CHUVITEX',1,'2025-05-15 10:20:30','2025-05-15 10:20:30'),(75,'Blandys',1,'2025-05-15 10:20:36','2025-05-15 10:20:36'),(76,'Biscana',1,'2025-05-15 10:21:01','2025-05-15 10:21:01'),(77,'B&C',1,'2025-05-15 10:21:14','2025-05-15 10:21:14'),(78,'Sem Fornecedor',1,'2025-05-15 10:58:36','2025-05-15 10:58:36');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `failed_jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `families`
--

DROP TABLE IF EXISTS `families`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `families` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `status` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `families`
--

LOCK TABLES `families` WRITE;
/*!40000 ALTER TABLE `families` DISABLE KEYS */;
INSERT INTO `families` VALUES (1,'Têxtil',1,'2025-05-07 09:15:55','2025-05-07 09:15:55'),(2,'Acessórios de escrita',1,'2025-05-07 09:15:55','2025-05-07 09:15:55'),(3,'Escritório',1,'2025-05-07 09:15:55','2025-05-07 09:15:55'),(4,'Viagens e mochilas',1,'2025-05-07 09:15:55','2025-05-07 09:15:55'),(5,'Copos, garrafas e canecas',1,'2025-05-07 09:15:55','2025-05-07 09:15:55'),(6,'Tecnologia',1,'2025-05-07 09:15:55','2025-05-07 09:15:55'),(7,'Crianças e escola',1,'2025-05-07 09:15:55','2025-05-07 09:15:55'),(8,'Bem-estar e saúde',1,'2025-05-07 09:15:55','2025-05-07 09:15:55'),(9,'Lazer e Desporto',1,'2025-05-07 09:15:55','2025-05-07 09:15:55'),(10,'Casa e Cozinha',1,'2025-05-07 09:15:55','2025-05-07 09:15:55'),(11,'Ferramentas',1,'2025-05-07 09:15:55','2025-05-07 09:15:55'),(12,'Acessórios',1,'2025-05-13 17:04:04','2025-05-13 17:04:04'),(13,'Sem Família',1,'2025-05-14 11:28:52','2025-05-14 11:28:52');
/*!40000 ALTER TABLE `families` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_product` int(11) NOT NULL,
  `img_url` varchar(100) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `color` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=135 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
INSERT INTO `images` VALUES (76,123,'images/5tjfVSz5.png','2025-05-15 10:49:07','2025-05-15 10:49:07','antracite'),(75,122,'images/7FzNd6yg.png','2025-05-15 10:46:40','2025-05-15 10:46:40','chumbo escuro'),(74,121,'images/WFSZSzMz.png','2025-05-15 10:44:56','2025-05-15 10:44:56','cinza'),(72,120,'images/dNC5tJHq.png','2025-05-15 10:40:46','2025-05-15 10:40:46','cinza escuro'),(73,120,'images/1YlzAszR.png','2025-05-15 10:43:25','2025-05-15 10:43:25','azul real'),(77,124,'images/uDbMnO8c.png','2025-05-15 10:51:00','2025-05-15 10:51:00','azul marinho'),(78,125,'images/D7VJ6Y1k.png','2025-05-15 10:52:19','2025-05-15 10:52:19','preto'),(79,126,'images/sZbsbFHP.png','2025-05-15 10:53:49','2025-05-15 10:53:49','preto'),(80,127,'images/YUD9DOJ3.png','2025-05-15 10:55:25','2025-05-15 10:55:25','azul marinho'),(81,127,'images/IvKgYjGt.png','2025-05-15 10:57:29','2025-05-15 10:57:29','azul real'),(82,128,'images/OBMVq5Ko.png','2025-05-15 10:59:53','2025-05-15 10:59:53','verde'),(83,129,'images/gWc0gPW0.png','2025-05-15 11:01:10','2025-05-15 11:01:10','prata mate'),(84,132,'images/sqKN3s7L.png','2025-05-15 12:20:40','2025-05-15 12:20:40','preto'),(85,133,'images/vS9ojTWY.png','2025-05-15 12:23:46','2025-05-15 12:23:46','cinza mat'),(86,134,'images/GeHG3f4f.png','2025-05-15 12:28:31','2025-05-15 12:28:31','cinza mat'),(87,135,'images/hsJnTBEe.png','2025-05-15 12:30:42','2025-05-15 12:30:42','cinza puro'),(88,136,'images/pkDJFica.png','2025-05-15 12:34:15','2025-05-15 12:34:15','azul profundo'),(89,137,'images/oZ4t6yi6.png','2025-05-15 12:36:24','2025-05-15 12:36:24','branco'),(90,138,'images/Z5aa8ZJN.png','2025-05-15 12:40:02','2025-05-15 12:40:02','preto'),(91,139,'images/swOTVAp4.png','2025-05-15 12:43:37','2025-05-15 12:43:37','preto'),(92,140,'images/LOtc6SSZ.png','2025-05-15 13:41:55','2025-05-15 13:41:55','azul real'),(93,141,'images/XUdKtXHm.png','2025-05-15 13:44:33','2025-05-15 13:44:33','azul marinho'),(94,142,'images/2QdEyF5V.png','2025-05-15 13:49:33','2025-05-15 13:49:33','azul real'),(95,143,'images/7ZVorKBc.png','2025-05-15 13:51:11','2025-05-15 13:51:11','cinza claro'),(96,144,'images/ONsOBoRW.png','2025-05-15 13:53:02','2025-05-15 13:53:02','az.claro'),(97,145,'images/B1S67Wbe.png','2025-05-15 13:54:45','2025-05-15 13:54:45','tilia'),(98,147,'images/SNqhbaLA.png','2025-05-15 14:00:23','2025-05-15 14:00:23','azul profundo'),(99,149,'images/xEO6kQ7C.png','2025-05-15 14:04:32','2025-05-15 14:04:32','verde'),(100,150,'images/KqFuvYPo.png','2025-05-15 14:06:56','2025-05-15 14:06:56','preto'),(101,151,'images/xbammJBq.png','2025-05-15 14:15:01','2025-05-15 14:15:01','azul'),(102,151,'images/dR1RV5ux.png','2025-05-15 14:15:01','2025-05-15 14:15:01','azul'),(103,152,'images/Gu76FE4V.png','2025-05-15 14:20:26','2025-05-15 14:20:26','azul real'),(104,152,'images/Pi6clebs.png','2025-05-15 14:21:06','2025-05-15 14:21:06','ABYSS BLUE'),(105,153,'images/R6UskA5e.png','2025-05-15 14:41:47','2025-05-15 14:41:47','preto'),(106,154,'images/i314KzZQ.png','2025-05-15 14:42:59','2025-05-15 14:42:59','azul marinho'),(107,155,'images/URJEkuTd.png','2025-05-15 14:44:21','2025-05-15 14:44:21','verde pastos'),(108,155,'images/lXpStGlu.png','2025-05-15 14:45:02','2025-05-15 14:45:02','preto'),(109,156,'images/4EcOJ2oI.png','2025-05-15 14:54:51','2025-05-15 14:54:51','limão'),(110,156,'images/y7ZrQL65.png','2025-05-15 14:55:18','2025-05-15 14:55:18','AZ.ATOL'),(111,157,'images/7wKL9CcC.png','2025-05-15 14:57:22','2025-05-15 14:57:22','preto'),(112,158,'images/hOQte0ui.png','2025-05-15 14:58:54','2025-05-15 14:58:54','vermelho'),(113,159,'images/vsoLZJWc.png','2025-05-15 15:00:18','2025-05-15 15:00:18','preto'),(114,160,'images/w0COQiIX.png','2025-05-15 15:01:50','2025-05-15 15:01:50','branco'),(115,162,'images/SLm0y1Kf.png','2025-05-15 15:07:11','2025-05-15 15:07:11','preto/vermelho'),(116,162,'images/sIwh3Im8.png','2025-05-15 15:07:11','2025-05-15 15:07:11','preto/vermelho'),(117,163,'images/inSoXd5B.png','2025-05-15 15:09:46','2025-05-15 15:09:46','azul marinho/azul real'),(118,122,'images/XiAqsAqY.png','2025-05-15 15:16:48','2025-05-15 15:16:48','azul marinho'),(119,122,'images/1F4AHyhv.png','2025-05-15 15:16:48','2025-05-15 15:16:48','azul marinho'),(120,122,'images/qaGpGkOm.png','2025-05-15 15:16:48','2025-05-15 15:16:48','azul marinho'),(121,165,'images/jl20fWvI.png','2025-05-15 15:18:33','2025-05-15 15:18:33','preto/vermelho'),(122,166,'images/AxdcPdBK.png','2025-05-15 15:19:44','2025-05-15 15:19:44','castanho'),(123,167,'images/vRLwDOPJ.png','2025-05-15 15:21:06','2025-05-15 15:21:06','preto'),(124,168,'images/n4JffAmw.png','2025-05-15 15:24:25','2025-05-15 15:24:25','AZUL REAL'),(125,169,'images/FcL9sKVQ.png','2025-05-15 15:26:12','2025-05-15 15:26:12','cinza titÂnio'),(126,170,'images/S9U1kvOB.png','2025-05-15 15:28:06','2025-05-15 15:28:06','preto'),(127,171,'images/x4Xkas5V.png','2025-05-15 15:29:34','2025-05-15 15:29:34','azul real'),(128,134,'images/yiKoySvV.png','2025-05-15 15:31:29','2025-05-15 15:31:29','branco'),(129,172,'images/byFtPJHW.png','2025-05-15 15:33:03','2025-05-15 15:33:03','azul marinho/amarelo'),(130,173,'images/xpaZFwOM.png','2025-05-15 15:34:50','2025-05-15 15:34:50','azul marinho'),(131,174,'images/NiG3tlKX.png','2025-05-15 15:37:47','2025-05-15 15:37:47','preto'),(132,177,'images/mjpWfBjU.png','2025-05-15 15:45:27','2025-05-15 15:45:27','natural'),(133,178,'images/QyzDZJYw.png','2025-05-15 15:47:15','2025-05-15 15:47:15','azul marinho'),(134,179,'images/F4kXXIyY.png','2025-05-15 15:48:37','2025-05-15 15:48:37','azul marinho');
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_batches`
--

DROP TABLE IF EXISTS `job_batches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_batches`
--

LOCK TABLES `job_batches` WRITE;
/*!40000 ALTER TABLE `job_batches` DISABLE KEYS */;
/*!40000 ALTER TABLE `job_batches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) unsigned NOT NULL,
  `reserved_at` int(10) unsigned DEFAULT NULL,
  `available_at` int(10) unsigned NOT NULL,
  `created_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `logs`
--

DROP TABLE IF EXISTS `logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `logs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_product` int(11) NOT NULL,
  `message` text CHARACTER SET latin1 NOT NULL,
  `addQuantity` int(11) DEFAULT NULL,
  `removeQuantity` int(11) DEFAULT NULL,
  `addReserved` int(11) DEFAULT NULL,
  `removeReserved` int(11) DEFAULT NULL,
  `oldQuantity` int(11) DEFAULT NULL,
  `newQuantity` int(11) DEFAULT NULL,
  `newReserved` int(11) DEFAULT NULL,
  `oldReserved` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=296 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `logs`
--

LOCK TABLES `logs` WRITE;
/*!40000 ALTER TABLE `logs` DISABLE KEYS */;
INSERT INTO `logs` VALUES (234,118,'Produto adicionado',NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,'2025-05-15 11:25:17','2025-05-15 11:25:17'),(235,119,'Produto adicionado',NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,'2025-05-15 11:28:43','2025-05-15 11:28:43'),(236,120,'Produto adicionado',NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,'2025-05-15 11:40:46','2025-05-15 11:40:46'),(237,121,'Produto adicionado',NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,'2025-05-15 11:44:56','2025-05-15 11:44:56'),(238,122,'Produto adicionado',NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,'2025-05-15 11:46:40','2025-05-15 11:46:40'),(239,123,'Produto adicionado',NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,'2025-05-15 11:49:07','2025-05-15 11:49:07'),(240,124,'Produto adicionado',NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,'2025-05-15 11:51:00','2025-05-15 11:51:00'),(241,125,'Produto adicionado',NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,'2025-05-15 11:52:19','2025-05-15 11:52:19'),(242,126,'Produto adicionado',NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,'2025-05-15 11:53:49','2025-05-15 11:53:49'),(243,127,'Produto adicionado',NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,'2025-05-15 11:55:25','2025-05-15 11:55:25'),(244,128,'Produto adicionado',NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,'2025-05-15 11:59:53','2025-05-15 11:59:53'),(245,129,'Produto adicionado',NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,'2025-05-15 12:01:10','2025-05-15 12:01:10'),(246,130,'Produto adicionado',NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,'2025-05-15 13:16:03','2025-05-15 13:16:03'),(247,131,'Produto adicionado',NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,'2025-05-15 13:17:45','2025-05-15 13:17:45'),(248,132,'Produto adicionado',NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,'2025-05-15 13:20:40','2025-05-15 13:20:40'),(249,133,'Produto adicionado',NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,'2025-05-15 13:23:46','2025-05-15 13:23:46'),(250,134,'Produto adicionado',NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,'2025-05-15 13:28:31','2025-05-15 13:28:31'),(251,135,'Produto adicionado',NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,'2025-05-15 13:30:42','2025-05-15 13:30:42'),(252,136,'Produto adicionado',NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,'2025-05-15 13:34:15','2025-05-15 13:34:15'),(253,137,'Produto adicionado',NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,'2025-05-15 13:36:24','2025-05-15 13:36:24'),(254,138,'Produto adicionado',NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,'2025-05-15 13:40:02','2025-05-15 13:40:02'),(255,139,'Produto adicionado',NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,'2025-05-15 13:43:37','2025-05-15 13:43:37'),(256,140,'Produto adicionado',NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,'2025-05-15 14:41:55','2025-05-15 14:41:55'),(257,141,'Produto adicionado',NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,'2025-05-15 14:44:33','2025-05-15 14:44:33'),(258,142,'Produto adicionado',NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,'2025-05-15 14:49:33','2025-05-15 14:49:33'),(259,143,'Produto adicionado',NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,'2025-05-15 14:50:52','2025-05-15 14:50:52'),(260,144,'Produto adicionado',NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,'2025-05-15 14:53:02','2025-05-15 14:53:02'),(261,145,'Produto adicionado',NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,'2025-05-15 14:54:45','2025-05-15 14:54:45'),(262,146,'Produto adicionado',NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,'2025-05-15 14:55:50','2025-05-15 14:55:50'),(263,147,'Produto adicionado',NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,'2025-05-15 15:00:23','2025-05-15 15:00:23'),(264,148,'Produto adicionado',NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,'2025-05-15 15:01:51','2025-05-15 15:01:51'),(265,149,'Produto adicionado',NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,'2025-05-15 15:04:32','2025-05-15 15:04:32'),(266,150,'Produto adicionado',NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,'2025-05-15 15:06:56','2025-05-15 15:06:56'),(267,151,'Produto adicionado',NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,'2025-05-15 15:15:01','2025-05-15 15:15:01'),(268,152,'Produto adicionado',NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,'2025-05-15 15:20:26','2025-05-15 15:20:26'),(269,153,'Produto adicionado',NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,'2025-05-15 15:41:47','2025-05-15 15:41:47'),(270,154,'Produto adicionado',NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,'2025-05-15 15:42:59','2025-05-15 15:42:59'),(271,155,'Produto adicionado',NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,'2025-05-15 15:44:21','2025-05-15 15:44:21'),(272,156,'Produto adicionado',NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,'2025-05-15 15:54:51','2025-05-15 15:54:51'),(273,157,'Produto adicionado',NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,'2025-05-15 15:57:22','2025-05-15 15:57:22'),(274,158,'Produto adicionado',NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,'2025-05-15 15:58:54','2025-05-15 15:58:54'),(275,159,'Produto adicionado',NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,'2025-05-15 16:00:18','2025-05-15 16:00:18'),(276,160,'Produto adicionado',NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,'2025-05-15 16:01:50','2025-05-15 16:01:50'),(277,161,'Produto adicionado',NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,'2025-05-15 16:03:31','2025-05-15 16:03:31'),(278,162,'Produto adicionado',NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,'2025-05-15 16:07:11','2025-05-15 16:07:11'),(279,163,'Produto adicionado',NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,'2025-05-15 16:09:46','2025-05-15 16:09:46'),(280,164,'Produto adicionado',NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,'2025-05-15 16:10:48','2025-05-15 16:10:48'),(281,165,'Produto adicionado',NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,'2025-05-15 16:18:33','2025-05-15 16:18:33'),(282,166,'Produto adicionado',NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,'2025-05-15 16:19:44','2025-05-15 16:19:44'),(283,167,'Produto adicionado',NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,'2025-05-15 16:21:06','2025-05-15 16:21:06'),(284,168,'Produto adicionado',NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,'2025-05-15 16:23:24','2025-05-15 16:23:24'),(285,169,'Produto adicionado',NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,'2025-05-15 16:26:12','2025-05-15 16:26:12'),(286,170,'Produto adicionado',NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,'2025-05-15 16:28:06','2025-05-15 16:28:06'),(287,171,'Produto adicionado',NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,'2025-05-15 16:29:34','2025-05-15 16:29:34'),(288,172,'Produto adicionado',NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,'2025-05-15 16:33:03','2025-05-15 16:33:03'),(289,173,'Produto adicionado',NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,'2025-05-15 16:34:50','2025-05-15 16:34:50'),(290,174,'Produto adicionado',NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,'2025-05-15 16:37:47','2025-05-15 16:37:47'),(291,175,'Produto adicionado',NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,'2025-05-15 16:41:41','2025-05-15 16:41:41'),(292,176,'Produto adicionado',NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,'2025-05-15 16:44:06','2025-05-15 16:44:06'),(293,177,'Produto adicionado',NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,'2025-05-15 16:45:12','2025-05-15 16:45:12'),(294,178,'Produto adicionado',NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,'2025-05-15 16:47:15','2025-05-15 16:47:15'),(295,179,'Produto adicionado',NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,'2025-05-15 16:48:37','2025-05-15 16:48:37');
/*!40000 ALTER TABLE `logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'0001_01_01_000000_create_users_table',1),(2,'0001_01_01_000001_create_cache_table',1),(3,'0001_01_01_000002_create_jobs_table',1);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_tokens`
--

LOCK TABLES `password_reset_tokens` WRITE;
/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(55) NOT NULL,
  `ref` varchar(100) NOT NULL,
  `quantity` int(11) NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `reserved` int(11) NOT NULL,
  `drawer` varchar(55) NOT NULL,
  `cx` varchar(55) NOT NULL,
  `pvp` double NOT NULL,
  `id_category` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` int(11) NOT NULL,
  `active` int(11) NOT NULL,
  `name` varchar(75) NOT NULL,
  `number` int(11) DEFAULT NULL,
  `id_family` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=180 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (121,'Stock Importado','POWER STRETCH',0,'CALÇAS',0,'STOCK TEXTIL - ZONA RECEÇÃO MATERIAL','PAYPER',0,60,'2025-05-15 10:44:56','2025-05-15 10:44:56',0,1,'POWER STRETCH',NULL,1),(118,'Stock Importado','11975 MOSQUITO',0,'T-SHIRT PARA BEBÊ',0,'STOCK TEXTIL - ZONA RECEÇÃO MATERIAL','TSH CRIANÇA',0,55,'2025-05-15 10:25:17','2025-05-15 10:25:17',0,1,'T-SHIRT',NULL,1),(119,'Stock Importado','ANKARA',0,'T-SHIRT DE HOMEM',0,'STOCK TEXTIL - ZONA RECEÇÃO MATERIAL','BISCANA 2',4.13,76,'2025-05-15 10:28:43','2025-05-15 12:03:50',1,1,'T-SHIRT',1058,1),(130,'Stock Importado','NS300',0,'TSHIRT UNISSEXO',0,'STOCK TEXTIL - ZONA RECEÇÃO MATERIAL','KARIBAN 3',0,67,'2025-05-15 12:16:03','2025-05-15 12:16:03',0,1,'T-SHIRT',769,1),(120,'Stock Importado','PRIME MEN 00571',0,'POLO',0,'STOCK TEXTIL - ZONA RECEÇÃO MATERIAL','STOCK TEXTIL - ZONA RECEÇÃO MATERIAL',10.43,55,'2025-05-15 10:40:46','2025-05-15 10:43:25',0,1,'POLO',1149,1),(122,'Stock Importado','RUDOLPH',0,'SOFTSHELL PARA HOMEM',0,'STOCK TEXTIL - ZONA RECEÇÃO MATERIAL','ROLY 3',28.14,57,'2025-05-15 10:46:40','2025-05-15 10:46:40',0,1,'CASACO SOFTSHELL',840,1),(123,'Stock Importado','WORKER PRO',0,'CALÇAS DE TRABALHO',0,'STOCK TEXTIL - ZONA RECEÇÃO MATERIAL','PAYPER',0,60,'2025-05-15 10:49:07','2025-05-15 10:49:07',0,1,'CALÇAS',NULL,1),(124,'Stock Importado','CASTER',0,'CALÇAS DE TRABALHO',0,'STOCK TEXTIL - ZONA RECEÇÃO MATERIAL','VALENTO 4',11.88,52,'2025-05-15 10:51:00','2025-05-15 10:51:00',0,1,'Calças de trabalho',699,1),(125,'Stock Importado','5095 FINLAND WOMEN',0,NULL,0,'STOCK TEXTIL - ZONA RECEÇÃO MATERIAL','A14.0',0,57,'2025-05-15 10:52:19','2025-05-15 10:52:19',0,1,'CASACO ALCOCHOADO',NULL,1),(126,'Stock Importado','1708 POLO PHOENIX (OUTLET)',0,'outlet',0,'STOCK TEXTIL - ZONA RECEÇÃO MATERIAL','A9.1',0,55,'2025-05-15 10:53:49','2025-05-15 10:53:49',0,1,'polo',1214,1),(127,'Stock Importado','EVE',0,'Polo para senhora - 195 g/m2',0,'STOCK TEXTIL - ZONA RECEÇÃO MATERIAL','A9.5',0,76,'2025-05-15 10:55:25','2025-05-15 10:55:25',0,1,'POLO',1242,1),(128,'Stock Importado','NS314',0,'T-SHIRT',0,'ESTANTE PRODUÇÃO','QUERMESSE',0,78,'2025-05-15 10:59:53','2025-05-15 10:59:53',0,1,'T-SHIRT',NULL,1),(129,'Stock Importado','MO6373',0,'MOB - GARRAFA de parede dupla. Capacidade: 1L.',0,'GAVETA 14','IDENTIFICADA',0,78,'2025-05-15 11:01:10','2025-05-15 12:09:14',0,1,'GARRAFA',NULL,5),(131,'Stock Importado','BLAKE MEN 01426',0,'CAMISA SLIM FIT DE MANGA COMPRIDA PARA HOMEM',0,'STOCK TEXTIL - ZONA RECEÇÃO MATERIAL','A10.2',0,55,'2025-05-15 12:17:45','2025-05-15 12:17:45',0,1,'CAMISA',NULL,1),(132,'Stock Importado','12006 REPORTER/ SAFARI',0,'COLETE MULTIBOLSOS REPORTER/SAFARI - CHUVITEX',0,'STOCK TEXTIL - ZONA RECEÇÃO MATERIAL','A14.3',0,74,'2025-05-15 12:20:40','2025-05-15 12:20:40',0,1,'COLETE',1344,4),(133,'Stock Importado','11362 SPRING',0,'Spring',0,'STOCK TEXTIL - ZONA RECEÇÃO MATERIAL','A9.2',9,56,'2025-05-15 12:23:46','2025-05-15 12:23:46',0,1,'Spring',NULL,1),(134,'Stock Importado','11310 PEOPLE',0,'POLO SENHORA',0,'STOCK TEXTIL - ZONA RECEÇÃO MATERIAL','A9.2',9.03,55,'2025-05-15 12:28:31','2025-05-15 12:28:31',0,1,'POLO',1184,1),(135,'Stock Importado','PARIS',0,'Camisa de manga comprida para homem - 115 g/m2',0,'STOCK TEXTIL - ZONA RECEÇÃO MATERIAL','A10.2',0,76,'2025-05-15 12:30:42','2025-05-15 12:30:42',0,1,'CAMISA',NULL,1),(136,'Stock Importado','JARED WOMEN 02918',0,'CALÇAS STRETCH ACETINADAS PARA SENHORA\r\nCETIM 228',0,'STOCK TEXTIL - ZONA RECEÇÃO MATERIAL','A15.1',27.28,55,'2025-05-15 12:34:15','2025-05-15 12:34:15',0,1,'CALÇAS',1430,1),(137,'Stock Importado','PARIS WOMEN',0,'CAMISA DE MULHER (TONS DIFERENTES) MODELO ANTIGO',0,'STOCK TEXTIL - ZONA RECEÇÃO MATERIAL','A10.1',18.76,76,'2025-05-15 12:36:24','2025-05-15 12:36:24',0,1,'Camisa mulher',1264,1),(138,'Stock Importado','21147 COLETE ACOLCHOADO',0,NULL,0,'STOCK TEXTIL - ZONA RECEÇÃO MATERIAL','A14.3',0,65,'2025-05-15 12:40:02','2025-05-15 12:40:02',0,1,'COLETE ACOLCHOADO',NULL,1),(139,'Stock Importado','6465 COLETE BORDY',0,'COLETE BORDY',0,'SHOWROOM','SHOWROOM',0,65,'2025-05-15 12:43:37','2025-05-15 12:43:37',0,1,'COLETE',NULL,1),(140,'Stock Importado','46601 RALLYE MEN',0,'COLETE',0,'STOCK TEXTIL - ZONA RECEÇÃO MATERIAL','A14.3',0,55,'2025-05-15 13:41:55','2025-05-15 13:41:55',0,1,'COLETE',NULL,1),(141,'Stock Importado','PRIME WOMEN 00573',0,'POLO PRIME WOMEN',0,'STOCK TEXTIL','A8.1',0,55,'2025-05-15 13:44:33','2025-05-15 13:44:33',0,1,'POLO',NULL,1),(142,'Stock Importado','AT610261 HIT',0,NULL,0,'GAVETA 13','13.E',0,53,'2025-05-15 13:49:32','2025-05-15 13:49:32',0,1,'BONE',NULL,12),(143,'Stock Importado','MOVE',0,'T-shirt técnica - 150 g/m2',0,'STOCK TEXTIL - ZONA RECEÇÃO MATERIAL','TT1',0,76,'2025-05-15 13:50:52','2025-05-15 13:50:52',0,1,'T-SHIRT TECNICA',NULL,1),(144,'Stock Importado','TECNIC PLUS 4184',0,'TESH TECNICA PARA HOMEM',0,'STOCK TEXTIL - ZONA RECEÇÃO MATERIAL','TT1',0,65,'2025-05-15 13:53:02','2025-05-15 13:53:02',0,1,'T-SHIRT TECNICA',NULL,1),(145,'Stock Importado','11380 REGENT',0,'T-SHIRT REGENT',0,'STOCK TEXTIL - ZONA RECEÇÃO MATERIAL','REGENT 2',0,55,'2025-05-15 13:54:45','2025-05-15 13:54:45',0,1,'T-SHIRT',NULL,1),(146,'Stock Importado','11500 IMPERIAL',0,'T-SHIRT DE GOLA REDONDA PARA HOMEM',0,'STOCK TEXTIL - ZONA RECEÇÃO MATERIAL','IMPERIAL 3',0,55,'2025-05-15 13:55:50','2025-05-15 13:55:50',0,1,'T-SHIRT',NULL,1),(147,'Stock Importado','RACE BW MEN 02887',0,'COLETE SOFTSHELL PARA HOMEM',0,'STOCK TEXTIL - ZONA RECEÇÃO MATERIAL','A14.3',0,55,'2025-05-15 14:00:23','2025-05-15 14:00:23',0,1,'COLETE',NULL,1),(148,'Stock Importado','13255 SLAM KIDS',0,'SWEAT UNISSEXO COM CAPUZ\r\nMALHA ESCOVADA 320',0,'STOCK TEXTIL - ZONA RECEÇÃO MATERIAL','A4.5',0,55,'2025-05-15 14:01:51','2025-05-15 14:01:51',0,1,'SWEAT',NULL,1),(149,'Stock Importado','2453 BATA',0,'BATA LABORAL MANGA COMPRIDA',0,'STOCK TEXTIL - ZONA RECEÇÃO MATERIAL','FVC 2',0,70,'2025-05-15 14:04:32','2025-05-15 14:04:32',0,1,'BATA',NULL,1),(150,'Stock Importado','4630',0,'TUNICA MANGA CURTA',0,'STOCK TEXTIL - ZONA RECEÇÃO MATERIAL','FVC 2',18.11,70,'2025-05-15 14:06:56','2025-05-15 14:06:56',0,1,'tunica',804,1),(151,'Stock Importado','5643',0,'LÁPIS DE MADEIRA',0,'GAVETA 21','21.E',0,65,'2025-05-15 14:15:01','2025-05-15 14:15:01',0,1,'LÁPIS',NULL,2),(152,'Stock Importado','46600 RELAX',0,'SOFTSHELL RELAX',0,'STOCK TEXTIL - ZONA RECEÇÃO MATERIAL','A14.2',0,55,'2025-05-15 14:20:26','2025-05-15 14:40:07',0,1,'CASACO SOFTSHELL',1380,1),(153,'Stock Importado','DAILY 9100',0,'CALÇAS MAIS GROSSAS QUE DAILY NEXT',0,'N/A','ROLY 1',0,57,'2025-05-15 14:41:47','2025-05-15 14:41:47',0,1,'CALÇAS',853,1),(154,'Stock Importado','Molter 3854',0,NULL,0,'STOCK TEXTIL - ZONA RECEÇÃO MATERIAL','MOLTER',0,65,'2025-05-15 14:42:59','2025-05-15 14:42:59',0,1,'CASACO SOFTSHELL',NULL,1),(155,'Stock Importado','ADAM',0,'Polo para homem - 195 g/m2',0,'STOCK TEXTIL - ZONA RECEÇÃO MATERIAL','A9.3',0,76,'2025-05-15 14:44:21','2025-05-15 14:44:21',0,1,'POLO',NULL,1),(156,'Stock Importado','LUANDA',0,NULL,0,'STOCK TEXTIL - ZONA RECEÇÃO MATERIAL','LUANDAS 1',0,76,'2025-05-15 14:54:50','2025-05-15 14:54:50',0,1,'T-SHIRT',NULL,1),(157,'Stock Importado','11420 MONARCH',0,'T-shirt de gola redonda e manga comprida para homem.',0,'STOCK TEXTIL - ZONA RECEÇÃO MATERIAL','SOLS 1',0,55,'2025-05-15 14:57:22','2025-05-15 14:57:22',0,1,'T-SHIRT MANGA COMPRIDA',NULL,1),(158,'Stock Importado','DELTA',0,'SWEAT UNISSEXO\r\nMALHA ESCOVADA 280',0,'STOCK TEXTIL - ZONA RECEÇÃO MATERIAL','A4.5',0,76,'2025-05-15 14:58:54','2025-05-15 14:58:54',0,1,'SWEAT',NULL,1),(159,'Stock Importado','NEW SUPREME 13250',0,'SWEAT UNISSEXO\r\nMALHA ESCOVADA 280',0,'STOCK TEXTIL - ZONA RECEÇÃO MATERIAL','A4.5',0,55,'2025-05-15 15:00:18','2025-05-15 15:00:18',0,1,'SWEAT',NULL,1),(160,'Stock Importado','4060',0,NULL,0,'ZONA 2_ESTANTE AO PÉ DAS PRENSAS','IDENTIFICADA',0,65,'2025-05-15 15:01:50','2025-05-15 15:01:50',0,1,'BLOCO',NULL,3),(161,'Stock Importado','PHOENIX',0,'SWEAT PHOENIX',0,'STOCK TEXTIL - ZONA RECEÇÃO MATERIAL','A4.3',0,76,'2025-05-15 15:03:31','2025-05-15 15:03:31',0,1,'SWEAT',NULL,1),(162,'Stock Importado','105504',0,'POLO DE MANGA CURTA',0,'STOCK TEXTIL - ZONA RECEÇÃO MATERIAL','VELILLA 1',0,51,'2025-05-15 15:07:11','2025-05-15 15:07:11',0,1,'POLO',NULL,1),(163,'Stock Importado','THUNDER (POLO)',0,'POLO THUNDER VALENTO',0,'STOCK TEXTIL - ZONA RECEÇÃO MATERIAL','VALENTO 2',10.56,52,'2025-05-15 15:09:46','2025-05-15 15:09:46',0,1,'POLO',709,1),(164,'Stock Importado','THUNDER (POLAR)',0,'CASACO POLAR THUNDER VALENTO',0,'STOCK TEXTIL - ZONA RECEÇÃO MATERIAL','VALENTO 2',0,52,'2025-05-15 15:10:48','2025-05-15 15:10:48',0,1,'POLAR',709,1),(165,'Stock Importado','103024',0,'CALÇAS',0,'STOCK TEXTIL - ZONA RECEÇÃO MATERIAL','VELILLA 1',0,51,'2025-05-15 15:18:33','2025-05-15 15:18:33',0,1,'CALÇAS',NULL,1),(166,'Stock Importado','5228',0,'AVENTAL',0,'N/A','FVC 1',0,70,'2025-05-15 15:19:44','2025-05-15 15:19:44',0,1,'AVENTAL',NULL,10),(167,'Stock Importado','NORTH WOMEN 54500',0,'CASACO POLAR COM FECHO PARA SENHORA\r\nMALHA POLAR 300',0,'STOCK TEXTIL - ZONA RECEÇÃO MATERIAL','A12.2',0,55,'2025-05-15 15:21:06','2025-05-15 15:21:06',0,1,'CASACO POLAR',NULL,1),(168,'Stock Importado','6636-ESTRELA WOMEN',0,'POLO MANGA COMPRIDA',0,'STOCK TEXTIL - ZONA RECEÇÃO MATERIAL','A9.1',0,57,'2025-05-15 15:23:24','2025-05-15 15:23:24',0,1,'POLO',658,1),(169,'Stock Importado','BLAKE MEN',0,'CAMISA',0,'N/A','A10.2',19.14,55,'2025-05-15 15:26:12','2025-05-15 15:26:12',0,1,'Camisa',1292,1),(170,'Stock Importado','1845',0,NULL,0,'GAVETA 16','16A',0,65,'2025-05-15 15:28:06','2025-05-15 15:28:06',0,1,'MOCHILA',NULL,4),(171,'Stock Importado','MC150',0,'T-SHIRT',0,'N/A','KEYA 1',0,66,'2025-05-15 15:29:34','2025-05-15 15:29:34',0,1,'T-SHIRT',NULL,1),(172,'Stock Importado','C4010',0,'COLETE',0,'STOCK TEXTIL - ZONA RECEÇÃO MATERIAL','WORKTEAM 7',0,50,'2025-05-15 15:33:03','2025-05-15 15:33:03',0,1,'COLETE',785,1),(173,'Stock Importado','5377',0,'TÚNICA SENHORA MANGA CURTA',0,'STOCK TEXTIL - ZONA RECEÇÃO MATERIAL','FVC1',18.11,70,'2025-05-15 15:34:50','2025-05-15 15:34:50',0,1,'tunica',799,1),(174,'Stock Importado','HELSINKI WOMEN',0,'CASACO POLAR',0,'STOCK TEXTIL - ZONA RECEÇÃO MATERIAL','A12.1',12,76,'2025-05-15 15:37:47','2025-05-15 15:37:47',0,1,'CASACO POLAR',1321,1),(175,'Stock Importado','NORTH 2.0',0,'BLUSÃO',0,'STOCK TEXTIL - ZONA RECEÇÃO MATERIAL','A12.5',0,60,'2025-05-15 15:41:41','2025-05-15 15:41:41',0,1,'BLUSÃO',NULL,1),(176,'Stock Importado','99457',0,'Boné em poliéster com 6 painéis',0,'GAVETA 13','BONES',0,54,'2025-05-15 15:44:06','2025-05-15 15:44:06',0,1,'BONE',NULL,12),(177,'Stock Importado','Cotton310  311168',0,'Saco de alças compridas 100% algodão de 310 g.',0,'GAVETA 16','16.B',0,53,'2025-05-15 15:45:12','2025-05-15 15:45:12',0,1,'SACO ALGODAO',NULL,12),(178,'Stock Importado','SAFARI',0,'COLETE MULTIBOLSOS',0,'STOCK TEXTIL - ZONA RECEÇÃO MATERIAL','VALENTO 4',0,52,'2025-05-15 15:47:15','2025-05-15 15:47:15',0,1,'COLETE',NULL,1),(179,'Stock Importado','OSLO 5092',0,NULL,0,'STOCK TEXTIL - ZONA RECEÇÃO MATERIAL','ROLY 3',0,57,'2025-05-15 15:48:37','2025-05-15 15:48:37',0,1,'COLETE ALCOCHOADO',NULL,1);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productvariants`
--

DROP TABLE IF EXISTS `productvariants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productvariants` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_product` int(11) NOT NULL,
  `color` varchar(100) NOT NULL,
  `size` varchar(45) DEFAULT NULL,
  `quantity` int(11) NOT NULL,
  `reserved` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=159 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productvariants`
--

LOCK TABLES `productvariants` WRITE;
/*!40000 ALTER TABLE `productvariants` DISABLE KEYS */;
INSERT INTO `productvariants` VALUES (97,130,'azul marinho','M',0,0,'2025-05-15 13:16:03','2025-05-15 13:16:03'),(96,129,'prata mate',NULL,0,0,'2025-05-15 12:01:10','2025-05-15 13:09:14'),(95,128,'verde','L',0,0,'2025-05-15 11:59:53','2025-05-15 11:59:53'),(94,127,'azul real','L',0,0,'2025-05-15 11:57:29','2025-05-15 11:57:29'),(93,127,'azul marinho','XL',0,0,'2025-05-15 11:55:25','2025-05-15 11:55:25'),(92,126,'preto','L',0,0,'2025-05-15 11:53:49','2025-05-15 11:53:49'),(86,120,'azul real','L',0,0,'2025-05-15 11:43:25','2025-05-15 11:43:25'),(87,121,'cinza','L',0,0,'2025-05-15 11:44:56','2025-05-15 11:44:56'),(88,122,'chumbo escuro','XXL',0,0,'2025-05-15 11:46:40','2025-05-15 11:46:40'),(89,123,'antracite','M',0,0,'2025-05-15 11:49:07','2025-05-15 11:49:07'),(90,124,'azul marinho','M',0,0,'2025-05-15 11:51:00','2025-05-15 11:51:00'),(91,125,'preto','M',0,0,'2025-05-15 11:52:19','2025-05-15 11:52:19'),(85,120,'cinza escuro','L',0,0,'2025-05-15 11:40:46','2025-05-15 11:40:46'),(80,118,'azul céu','3-6M',0,0,'2025-05-15 11:25:17','2025-05-15 11:25:30'),(81,119,'verde abadia','XL',0,0,'2025-05-15 11:28:43','2025-05-15 12:03:06'),(82,119,'azul marinho','S',0,0,'2025-05-15 11:31:21','2025-05-15 11:31:21'),(83,119,'azul marinho','M',0,0,'2025-05-15 11:31:21','2025-05-15 11:31:21'),(84,119,'azul marinho','L',0,0,'2025-05-15 11:31:21','2025-05-15 11:31:21'),(98,131,'preto','S',0,0,'2025-05-15 13:17:45','2025-05-15 13:17:45'),(99,132,'preto',NULL,0,0,'2025-05-15 13:20:40','2025-05-15 13:20:40'),(100,133,'cinza mat','L',0,0,'2025-05-15 13:23:46','2025-05-15 13:23:46'),(101,134,'cinza mat','XXL',0,0,'2025-05-15 13:28:31','2025-05-15 13:28:31'),(102,135,'cinza puro','M',0,0,'2025-05-15 13:30:42','2025-05-15 13:30:42'),(103,136,'azul profundo','38',0,0,'2025-05-15 13:34:15','2025-05-15 13:34:15'),(104,136,'azul profundo','40',0,0,'2025-05-15 13:34:15','2025-05-15 13:34:15'),(105,136,'azul profundo','44',0,0,'2025-05-15 13:34:15','2025-05-15 13:34:15'),(106,137,'branco','XL',0,0,'2025-05-15 13:36:24','2025-05-15 13:36:24'),(107,138,'preto','M',0,0,'2025-05-15 13:40:02','2025-05-15 13:40:02'),(108,139,'preto','L',0,0,'2025-05-15 13:43:37','2025-05-15 13:43:37'),(109,140,'azul real','L',0,0,'2025-05-15 14:41:55','2025-05-15 14:41:55'),(110,141,'azul marinho','S',0,0,'2025-05-15 14:44:33','2025-05-15 14:44:33'),(111,142,'azul real',NULL,0,0,'2025-05-15 14:49:33','2025-05-15 14:49:33'),(112,143,'cinza claro','L',0,0,'2025-05-15 14:50:52','2025-05-15 14:50:52'),(113,144,'az.claro','L',0,0,'2025-05-15 14:53:02','2025-05-15 14:53:02'),(114,145,'tilia','M',0,0,'2025-05-15 14:54:45','2025-05-15 14:54:45'),(115,146,'verde kaki','XL',0,0,'2025-05-15 14:55:50','2025-05-15 14:55:50'),(116,147,'azul profundo','M',0,0,'2025-05-15 15:00:23','2025-05-15 15:00:23'),(117,148,'azul marinho','10',0,0,'2025-05-15 15:01:51','2025-05-15 15:01:51'),(118,149,'verde','M',0,0,'2025-05-15 15:04:32','2025-05-15 15:04:32'),(119,150,'preto','M',0,0,'2025-05-15 15:06:56','2025-05-15 15:06:56'),(120,151,'azul',NULL,0,0,'2025-05-15 15:15:01','2025-05-15 15:15:01'),(121,152,'azul real','L',0,0,'2025-05-15 15:20:26','2025-05-15 15:20:26'),(122,152,'abyss blue','L',0,0,'2025-05-15 15:21:06','2025-05-15 15:21:06'),(123,153,'preto','44',0,0,'2025-05-15 15:41:47','2025-05-15 15:41:47'),(124,153,'preto','46',0,0,'2025-05-15 15:41:47','2025-05-15 15:41:47'),(125,154,'azul marinho','L',0,0,'2025-05-15 15:42:59','2025-05-15 15:42:59'),(126,155,'verde pastos','L',0,0,'2025-05-15 15:44:21','2025-05-15 15:44:21'),(127,155,'preto','L',0,0,'2025-05-15 15:45:02','2025-05-15 15:45:02'),(128,156,'limão','M',0,0,'2025-05-15 15:54:51','2025-05-15 15:54:51'),(129,156,'az.atol','L',0,0,'2025-05-15 15:55:18','2025-05-15 15:55:18'),(130,157,'preto','M',0,0,'2025-05-15 15:57:22','2025-05-15 15:57:22'),(131,158,'vermelho','M',0,0,'2025-05-15 15:58:54','2025-05-15 15:58:54'),(132,159,'preto','L',0,0,'2025-05-15 16:00:18','2025-05-15 16:00:18'),(133,160,'branco',NULL,0,0,'2025-05-15 16:01:50','2025-05-15 16:01:50'),(134,161,'azul marinho','S',0,0,'2025-05-15 16:03:31','2025-05-15 16:03:31'),(135,161,'azul marinho','L',0,0,'2025-05-15 16:03:31','2025-05-15 16:03:31'),(136,162,'preto/vermelho','L',0,0,'2025-05-15 16:07:11','2025-05-15 16:07:11'),(137,163,'azul marinho/azul real','L',0,0,'2025-05-15 16:09:46','2025-05-15 16:09:46'),(138,164,'azul marinho/laranja','L',0,0,'2025-05-15 16:10:48','2025-05-15 16:10:48'),(139,122,'azul marinho','L',0,0,'2025-05-15 16:16:48','2025-05-15 16:16:48'),(140,165,'preto/vermelho','42',0,0,'2025-05-15 16:18:33','2025-05-15 16:18:33'),(141,166,'castanho',NULL,0,0,'2025-05-15 16:19:44','2025-05-15 16:19:44'),(142,167,'preto','M',0,0,'2025-05-15 16:21:06','2025-05-15 16:21:06'),(143,168,'azul marinho','M',0,0,'2025-05-15 16:23:24','2025-05-15 16:23:24'),(144,168,'azul real','XL',0,0,'2025-05-15 16:24:25','2025-05-15 16:24:25'),(145,169,'cinza titÂnio','L',0,0,'2025-05-15 16:26:12','2025-05-15 16:26:12'),(146,170,'preto',NULL,0,0,'2025-05-15 16:28:06','2025-05-15 16:28:06'),(147,171,'azul real','S',0,0,'2025-05-15 16:29:34','2025-05-15 16:29:34'),(148,134,'branco','M',0,0,'2025-05-15 16:31:29','2025-05-15 16:31:29'),(149,172,'azul marinho/amarelo','L',0,0,'2025-05-15 16:33:03','2025-05-15 16:33:03'),(150,173,'azul marinho','M',0,0,'2025-05-15 16:34:50','2025-05-15 16:34:50'),(151,127,'areia','L',0,0,'2025-05-15 16:35:56','2025-05-15 16:35:56'),(152,174,'preto','M',0,0,'2025-05-15 16:37:47','2025-05-15 16:37:47'),(153,121,'azul marinho','XL',0,0,'2025-05-15 16:39:04','2025-05-15 16:39:04'),(154,175,'preto','M',0,0,'2025-05-15 16:41:41','2025-05-15 16:41:41'),(155,176,'ganga',NULL,0,0,'2025-05-15 16:44:06','2025-05-15 16:44:06'),(156,177,'natural',NULL,0,0,'2025-05-15 16:45:12','2025-05-15 16:45:12'),(157,178,'azul marinho','M',0,0,'2025-05-15 16:47:15','2025-05-15 16:47:15'),(158,179,'azul marinho','M',0,0,'2025-05-15 16:48:37','2025-05-15 16:48:37');
/*!40000 ALTER TABLE `productvariants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservations`
--

DROP TABLE IF EXISTS `reservations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `id_product` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `message` text NOT NULL,
  `status` int(11) NOT NULL,
  `viewed` int(11) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `proposal` int(11) NOT NULL,
  `order` varchar(100) DEFAULT NULL,
  `id_variant` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=84 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservations`
--

LOCK TABLES `reservations` WRITE;
/*!40000 ALTER TABLE `reservations` DISABLE KEYS */;
/*!40000 ALTER TABLE `reservations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) unsigned DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('Ce7A4bK3LZvVrZSJeI0IeHmiZZb78ZhbJ6W9P9ZR',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiMUZod0FjQWVFVnJIM2dqS1c0ZVZhcGs3MU5Ya3VXckllTXFpcUYyZCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzU6Imh0dHA6Ly9zdG9jay5icmluZGljaXMvcmVzZXJ2YXRpb25zIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==',1747382241),('l0BgjCLUHls1rmWzDHJTD24nJ2VLEyJK1iyvBLrq',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiaExWYk1BM1dwQnNreElZNzdiZHYxcUNaenkxVldmVk9OSmVrbG0xTiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6OTE6Imh0dHA6Ly9zdG9jay5icmluZGljaXMvYXBpL2dldC11bnZpZXdlZC1yZXNlcnZhdGlvbnM/dG9rZW49ZWVlMWM5ZGViMjE1NTYyMTdjOWYwZTViNTNkNWJjN2YiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1747382751);
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
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

-- Dump completed on 2025-05-16  9:05:52
