-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: stock
-- ------------------------------------------------------
-- Server version	8.0.36

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
-- Table structure for table `transsaciones`
--

DROP TABLE IF EXISTS `transsaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transsaciones` (
  `id_transsaciones` int NOT NULL AUTO_INCREMENT,
  `fecha` datetime DEFAULT CURRENT_TIMESTAMP,
  `id_usuario` int NOT NULL,
  `id_producto` int NOT NULL,
  `id_stock` int NOT NULL,
  `cantidad` int DEFAULT '0',
  PRIMARY KEY (`id_transsaciones`),
  KEY `fk_Transsaciones_Usuarios1_idx` (`id_usuario`),
  KEY `fk_Trassaciones_Productos_idx` (`id_producto`),
  KEY `fk_Transsaciones_Stock_idx` (`id_stock`),
  CONSTRAINT `fk_Transsaciones_Stock` FOREIGN KEY (`id_stock`) REFERENCES `stock` (`id_stock`),
  CONSTRAINT `fk_Transsaciones_Usuarios1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`),
  CONSTRAINT `fk_Trassaciones_Productos` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id_producto`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transsaciones`
--

LOCK TABLES `transsaciones` WRITE;
/*!40000 ALTER TABLE `transsaciones` DISABLE KEYS */;
INSERT INTO `transsaciones` VALUES (1,'2024-03-11 06:49:05',23,3,3,1),(2,'2024-03-11 07:05:40',23,1,3,1),(3,'2024-03-11 07:19:16',23,1,3,-1),(4,'2024-03-11 07:20:34',23,1,3,1),(5,'2024-03-11 07:33:19',23,1,3,-1),(14,'2024-03-11 07:53:00',23,1,3,1),(15,'2024-03-11 07:53:30',23,1,3,-1),(16,'2024-03-11 07:53:43',23,1,3,1),(17,'2024-03-11 08:48:15',23,1,3,-1),(18,'2024-03-11 09:10:30',23,18,4,1),(19,'2024-03-11 09:12:40',23,18,4,-1);
/*!40000 ALTER TABLE `transsaciones` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-12 18:43:08
