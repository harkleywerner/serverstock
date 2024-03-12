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
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `apellido` varchar(45) NOT NULL,
  `contraseña` int NOT NULL,
  `estado` varchar(45) DEFAULT 'activo',
  `rol` varchar(45) DEFAULT 'empleado',
  `id_sucursal` int NOT NULL,
  PRIMARY KEY (`id_usuario`),
  KEY `fk_Usuarios_Sucursales1_idx` (`id_sucursal`),
  CONSTRAINT `fk_Usuarios_Sucursales1` FOREIGN KEY (`id_sucursal`) REFERENCES `sucursales` (`id_sucursal`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Franco','Werner',2525,'activo','administrador',1),(2,'Joel','Werner',2525,'activo','empleado',2),(3,'Joell','Wernerrrr',2525,'activo','empleado',2),(4,'Joefll','Werffnerrrr',2525,'activo','empleado',2),(5,'Joefll','Werffnerrrr',2525,'activo','empleado',2),(6,'Joefll','Werffnerrrr',2525,'activo','empleado',2),(7,'Joefll','Werffnerrrr',2525,'activo','empleado',2),(8,'Joefll','Werffnerrrr',2525,'activo','empleado',2),(9,'Joefll','Werffnerrrr',2525,'activo','empleado',2),(10,'Joefll','Werffnerrrr',2525,'activo','empleado',2),(11,'Joefll','Werffnerrrr',2525,'activo','empleado',2),(12,'Joefll','Werffnerrrr',2525,'activo','empleado',2),(13,'Joefll','Werffnerrrr',2525,'activo','empleado',2),(14,'Joefll','Werffnerrrr',2525,'activo','empleado',2),(15,'Joefll','Werffnerrrr',2525,'activo','empleado',2),(16,'Joefll','Werffnerrrr',2525,'activo','empleado',2),(17,'Joefll','Werffnerrrr',2525,'activo','empleado',2),(18,'Joefll','Werffnerrrr',2525,'activo','empleado',2),(19,'Joefll','Werffnerrrr',2525,'activo','empleado',2),(20,'Joefll','Werffnerrrr',2525,'activo','empleado',2),(21,'Joefll','Werffnerrrr',2525,'activo','empleado',2),(22,'Joefll','Werffnerrrr',2525,'activo','empleado',2),(23,'admin','',1,'activo','admin',3);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
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
