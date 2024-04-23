CREATE DATABASE  IF NOT EXISTS `ujedsetting` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `ujedsetting`;
-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: ujedsetting
-- ------------------------------------------------------
-- Server version	8.0.33

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
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admins` (
  `idadmin` int NOT NULL AUTO_INCREMENT,
  `username` varchar(40) NOT NULL,
  `password` varchar(70) NOT NULL,
  PRIMARY KEY (`idadmin`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `alumnos`
--

DROP TABLE IF EXISTS `alumnos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alumnos` (
  `idalumno` int NOT NULL AUTO_INCREMENT,
  `idcarrera` int DEFAULT NULL,
  `semestre` varchar(20) NOT NULL,
  `matricula` varchar(7) NOT NULL,
  `nombre` varchar(160) NOT NULL,
  `correo` varchar(120) NOT NULL,
  `telefono` varchar(10) NOT NULL,
  `horario` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`idalumno`),
  UNIQUE KEY `matricula_UNIQUE` (`matricula`),
  KEY `idcarrera_idx` (`idcarrera`),
  CONSTRAINT `idcarrera` FOREIGN KEY (`idcarrera`) REFERENCES `carreras` (`idcarrera`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `carreraesc`
--

DROP TABLE IF EXISTS `carreraesc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carreraesc` (
  `idcarrera` int NOT NULL,
  `idescuela` int NOT NULL,
  KEY `idcarreraEsc_idx` (`idcarrera`),
  KEY `idescuelaCar_idx` (`idescuela`),
  CONSTRAINT `idcarreraEsc` FOREIGN KEY (`idcarrera`) REFERENCES `carreras` (`idcarrera`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `idescuelaCar` FOREIGN KEY (`idescuela`) REFERENCES `escuelas` (`idescuela`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `carreras`
--

DROP TABLE IF EXISTS `carreras`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carreras` (
  `idcarrera` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `descripcion` varchar(3500) NOT NULL,
  `objetivos` varchar(800) NOT NULL,
  `metas` varchar(800) NOT NULL,
  `relprof` varchar(800) NOT NULL,
  `empleosasp` varchar(800) NOT NULL,
  `duracion` varchar(40) NOT NULL,
  PRIMARY KEY (`idcarrera`),
  UNIQUE KEY `nombre_UNIQUE` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `directorios`
--

DROP TABLE IF EXISTS `directorios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `directorios` (
  `idescuela` int NOT NULL,
  `puesto` varchar(50) NOT NULL,
  `nombre` varchar(160) NOT NULL,
  KEY `idescuelaDir_idx` (`idescuela`),
  CONSTRAINT `idescuelaDir` FOREIGN KEY (`idescuela`) REFERENCES `escuelas` (`idescuela`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `escuelas`
--

DROP TABLE IF EXISTS `escuelas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `escuelas` (
  `idescuela` int NOT NULL AUTO_INCREMENT,
  `ciudad` varchar(100) NOT NULL,
  `area` varchar(80) NOT NULL,
  `nombre` varchar(160) NOT NULL,
  `abreviatura` varchar(15) NOT NULL,
  `descripcion` varchar(1000) DEFAULT NULL,
  `direccion` varchar(250) DEFAULT NULL,
  `urlmapa` varchar(220) NOT NULL,
  `urlweb` varchar(220) DEFAULT NULL,
  `contacto` varchar(160) NOT NULL,
  `mision` varchar(800) NOT NULL,
  `vision` varchar(800) NOT NULL,
  `objetivos` varchar(800) DEFAULT NULL,
  `bolsatrabajo` varchar(300) DEFAULT NULL,
  `urlbotr` varchar(220) DEFAULT NULL,
  `servicios` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`idescuela`),
  UNIQUE KEY `abreviatura_UNIQUE` (`abreviatura`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `imagenes`
--

DROP TABLE IF EXISTS `imagenes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `imagenes` (
  `idimagen` int NOT NULL AUTO_INCREMENT,
  `url` varchar(150) NOT NULL,
  PRIMARY KEY (`idimagen`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `imagenesnoti`
--

DROP TABLE IF EXISTS `imagenesnoti`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `imagenesnoti` (
  `idimagen` int NOT NULL,
  `idnoticia` int NOT NULL,
  `principal` tinyint NOT NULL,
  KEY `idnoticia_idx` (`idnoticia`),
  KEY `idimagen_idx` (`idimagen`),
  CONSTRAINT `idimagen` FOREIGN KEY (`idimagen`) REFERENCES `imagenes` (`idimagen`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `idnoticia` FOREIGN KEY (`idnoticia`) REFERENCES `noticias` (`idnoticia`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `maestros`
--

DROP TABLE IF EXISTS `maestros`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `maestros` (
  `idmaestro` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(160) NOT NULL,
  `telefono` varchar(10) NOT NULL,
  `especialidad` varchar(50) NOT NULL,
  `horario` varchar(100) DEFAULT NULL,
  `turno` varchar(20) NOT NULL,
  PRIMARY KEY (`idmaestro`),
  UNIQUE KEY `nombre_UNIQUE` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `materias`
--

DROP TABLE IF EXISTS `materias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `materias` (
  `idmateria` int NOT NULL AUTO_INCREMENT,
  `idcarrera` int NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `semestre` varchar(20) NOT NULL,
  PRIMARY KEY (`idmateria`),
  KEY `idcarrera_idx` (`idcarrera`),
  CONSTRAINT `idcarreraMaterias` FOREIGN KEY (`idcarrera`) REFERENCES `carreras` (`idcarrera`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `noticias`
--

DROP TABLE IF EXISTS `noticias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `noticias` (
  `idnoticia` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(100) NOT NULL,
  `descorta` varchar(400) NOT NULL,
  `descripcion` varchar(3000) NOT NULL,
  `fechapub` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idnoticia`),
  UNIQUE KEY `titulo_UNIQUE` (`titulo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `publicaciones`
--

DROP TABLE IF EXISTS `publicaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `publicaciones` (
  `idpublicacion` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(160) NOT NULL,
  `categoria` varchar(70) NOT NULL,
  `urlpdf` varchar(150) NOT NULL,
  `urlportada` varchar(150) DEFAULT NULL,
  `fecha` varchar(20) NOT NULL,
  PRIMARY KEY (`idpublicacion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tesis`
--

DROP TABLE IF EXISTS `tesis`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tesis` (
  `idtesis` int NOT NULL AUTO_INCREMENT,
  `idalumno` int NOT NULL,
  `nombre` varchar(160) NOT NULL,
  `generacion` varchar(4) NOT NULL,
  `enlace` varchar(250) NOT NULL,
  `director` varchar(165) NOT NULL,
  PRIMARY KEY (`idtesis`),
  KEY `idalumno_idx` (`idalumno`),
  CONSTRAINT `idalumno` FOREIGN KEY (`idalumno`) REFERENCES `alumnos` (`idalumno`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tutorestesis`
--

DROP TABLE IF EXISTS `tutorestesis`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tutorestesis` (
  `idtutor` int NOT NULL AUTO_INCREMENT,
  `idtesis` int NOT NULL,
  `nombre` varchar(160) NOT NULL,
  `escuela` varchar(160) NOT NULL,
  `gradoacademico` varchar(100) NOT NULL,
  PRIMARY KEY (`idtutor`),
  KEY `idtesis_idx` (`idtesis`),
  CONSTRAINT `idtesis` FOREIGN KEY (`idtesis`) REFERENCES `tesis` (`idtesis`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-23 16:05:01
