DROP DATABASE IF EXISTS congreso;
CREATE DATABASE congreso;
USE congreso;
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS usuario;
DROP TABLE IF EXISTS taller;
DROP TABLE IF EXISTS conferencia;
SET FOREIGN_KEY_CHECKS=1;

-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 04-06-2023 a las 00:27:24
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `congreso`
--

-- --------------------------------------------------------


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` varchar(20) NOT NULL,
  `usuario` varchar(20) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `contrasena` varchar(255) NOT NULL,
  `tallerista` tinyint(1) NOT NULL,
  `coordinador` tinyint(1) NOT NULL,
  `administrador` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`usuario`, `nombre`, `contrasena`, `tallerista`, `coordinador`, `administrador`) VALUES
('Admin', 'Administrador General', '123456789', 1, 1, 1);


--
-- Estructura de tabla para la tabla `taller`
--

CREATE TABLE `taller` (
  `id` int(10) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `descripcion` text NOT NULL,
  `capacidad` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



--
-- Estructura de tabla para la tabla `usr_taller`
--

CREATE TABLE `tallerista_taller` (
  `id_usr` int(10) NOT NULL,
  `id_taller` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `conferencia` (
  `id` int(19) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `conferencista` varchar(255) NOT NULL,
  `descripcion` text NOT NULL,
  `capacidad` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `taller`
--
ALTER TABLE `taller`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `taller`
--
ALTER TABLE `conferencia`
  ADD PRIMARY KEY (`id`);
--
-- AUTO_INCREMENT de la tabla `autor`
--
ALTER TABLE `conferencia`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
-- AUTO_INCREMENT de la tabla `autor`
--
ALTER TABLE `usuario`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- Indices de la tabla `tallerista_taller`
--
ALTER TABLE `tallerista_taller`
  ADD KEY `taller_tallerista` (`id_usr`,`id_taller`);
-- AUTO_INCREMENT de la tabla `autor`
--
ALTER TABLE `taller`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
