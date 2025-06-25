-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 26-06-2025 a las 00:29:23
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `sena`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `idusuario` int(11) NOT NULL,
  `nombres` varchar(100) NOT NULL,
  `telefono` varchar(10) NOT NULL,
  `tipodoc` varchar(2) NOT NULL,
  `documento` varchar(10) NOT NULL,
  `correosena` varchar(200) NOT NULL,
  `correopersonal` varchar(200) NOT NULL,
  `contrasena` varchar(255) NOT NULL,
  `rh` varchar(3) NOT NULL,
  `programa` varchar(100) NOT NULL,
  `ficha` varchar(10) NOT NULL,
  `centro` varchar(100) NOT NULL,
  `fechacreacion` varchar(30) NOT NULL,
  `qr` longblob DEFAULT NULL,
  `foto` longblob DEFAULT NULL,
  `rol` varchar(20) NOT NULL DEFAULT 'APRENDIZ',
  `estado` varchar(20) NOT NULL DEFAULT 'activo',
  `intentosfallidos` int(10) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`idusuario`, `nombres`, `telefono`, `tipodoc`, `documento`, `correosena`, `correopersonal`, `contrasena`, `rh`, `programa`, `ficha`, `centro`, `fechacreacion`, `qr`, `foto`, `rol`, `estado`, `intentosfallidos`) VALUES
(1, 'Johan Stiven Peez Sanchez', '3117393212', 'CC', '1038868735', 'jsperez537@soy.sena.edu.co', 'jstiven600@gmail.com', '$2b$10$s38kfhRNicfnTtOKD.D6iudmVXbPzsIUyWOV3keyzOVT2kcXLu.IW', 'B-', 'TECNOLOGÍA EN ANALISIS Y DESARROLLO DE SOFTWARE', '2923733', 'Centro de Diseño y Manufactura del Cuero', '2025-06-25 14:55:41.746', NULL, NULL, 'APRENDIZ', 'activo', 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`idusuario`),
  ADD UNIQUE KEY `documento` (`documento`),
  ADD UNIQUE KEY `correopersonal` (`correopersonal`),
  ADD UNIQUE KEY `telefono` (`telefono`),
  ADD UNIQUE KEY `correosena` (`correosena`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `idusuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
