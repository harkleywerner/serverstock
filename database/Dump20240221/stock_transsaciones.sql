-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: stock
-- ------------------------------------------------------
-- Server version	8.0.35

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
  `id_sucursal` int NOT NULL,
  `id_producto` int NOT NULL,
  `id_stock` int NOT NULL,
  `cantidad` int DEFAULT '0',
  PRIMARY KEY (`id_transsaciones`),
  KEY `fk_Transsaciones_Usuarios1_idx` (`id_usuario`),
  KEY `fk_Transsaciones_Sucursales1_idx` (`id_sucursal`),
  KEY `fk_Trassaciones_Productos_idx` (`id_producto`),
  KEY `fk_Transsaciones_Stock_idx` (`id_stock`),
  CONSTRAINT `fk_Transsaciones_Stock` FOREIGN KEY (`id_stock`) REFERENCES `stock` (`id_stock`),
  CONSTRAINT `fk_Transsaciones_Sucursales1` FOREIGN KEY (`id_sucursal`) REFERENCES `sucursales` (`id_sucursal`),
  CONSTRAINT `fk_Transsaciones_Usuarios1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`),
  CONSTRAINT `fk_Trassaciones_Productos` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id_producto`)
) ENGINE=InnoDB AUTO_INCREMENT=2446 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transsaciones`
--

LOCK TABLES `transsaciones` WRITE;
/*!40000 ALTER TABLE `transsaciones` DISABLE KEYS */;
INSERT INTO `transsaciones` VALUES (2429,'2024-02-20 10:29:05',1,1,2,331,8),(2430,'2024-02-20 10:29:07',1,1,3,100,1),(2431,'2024-02-20 10:29:07',1,1,3,101,1),(2432,'2024-02-20 10:29:07',1,1,3,116,2),(2433,'2024-02-20 10:29:10',1,1,7,477,3),(2434,'2024-02-20 10:29:13',1,1,19,479,2),(2435,'2024-02-20 10:29:15',1,1,5,477,1),(2436,'2024-02-20 10:29:15',1,1,5,479,1),(2437,'2024-02-20 10:29:35',1,1,1,250,4),(2438,'2024-02-20 12:38:46',1,1,3,116,-2),(2439,'2024-02-20 12:38:46',1,1,3,101,-1),(2440,'2024-02-20 12:38:46',1,1,3,100,-1),(2441,'2024-02-20 12:42:13',1,1,15,100,5),(2442,'2024-02-20 12:42:13',1,1,15,101,5),(2443,'2024-02-20 12:42:13',1,1,15,324,5),(2444,'2024-02-20 12:42:13',1,1,15,479,1),(2445,'2024-02-20 12:42:13',1,1,15,480,2);
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

-- Dump completed on 2024-02-21 19:33:11
