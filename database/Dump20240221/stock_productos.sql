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
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos` (
  `id_producto` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `estado` varchar(10) DEFAULT 'activo',
  `id_categoria` int NOT NULL,
  PRIMARY KEY (`id_producto`),
  KEY `fk_table2_Categorias1_idx` (`id_categoria`),
  CONSTRAINT `fk_table2_Categorias1` FOREIGN KEY (`id_categoria`) REFERENCES `categorias` (`id_categoria`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (1,'Chocolate','activo',1),(2,'Frutilla al agua','activo',4),(3,'Banana split','activo',2),(4,'Dulce de leche','activo',3),(5,'Chocotorta','activo',5),(6,'Dulce de leche granizado','activo',3),(7,'Dulce de leche con nuez','activo',3),(8,'Dulce de leche con frutos rojos','activo',3),(9,'Chocolate con almendras','activo',1),(10,'Chocolate shot','activo',1),(11,'Chocolate king ','activo',1),(12,'Chocolate amargo ','activo',1),(13,'Chocolate blanco c/fr ','activo',1),(14,'Chocolate blanco','activo',1),(15,'Bombon pauletti','activo',1),(16,'Alfajor pauletti','activo',1),(17,'Alfajor pauletti blanco','activo',1),(18,'Alfajor pauletti al whisky','activo',1),(19,'Americana','activo',2),(20,'Americana c/fr','activo',2),(21,'Cereza','activo',2),(22,'Chantilly tentancion','activo',2),(23,'Chocotorta a la crema','activo',2),(24,'Cookie','activo',2),(25,'Cookie pauletti','activo',2),(26,'Crema del cielo','activo',2),(27,'Flan con dulce de leche','activo',2);
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
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
