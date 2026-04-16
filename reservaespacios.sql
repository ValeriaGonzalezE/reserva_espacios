-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-04-2026 a las 18:29:22
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
-- Base de datos: `reservaespacios`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `espacios`
--

CREATE TABLE `espacios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `tipo_id` int(11) DEFAULT NULL,
  `capacidad` int(11) DEFAULT NULL,
  `ubicacion` varchar(100) DEFAULT NULL,
  `estado` enum('activo','inactivo') DEFAULT 'activo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `espacios`
--

INSERT INTO `espacios` (`id`, `nombre`, `tipo_id`, `capacidad`, `ubicacion`, `estado`) VALUES
(1, 'Salón 101', 1, 30, 'Bloque A', 'activo'),
(2, 'Salón 102', 1, 25, 'Bloque A', 'activo'),
(3, 'Biblioteca Central', 2, 100, 'Bloque B', 'activo'),
(4, 'Sala de Estudio 1', 3, 10, 'Bloque C', 'activo'),
(5, 'Auditorio Principal', 4, 200, 'Bloque D', 'activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `recuperacion_password`
--

CREATE TABLE `recuperacion_password` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `expiracion` datetime DEFAULT NULL,
  `usado` tinyint(4) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reservas`
--

CREATE TABLE `reservas` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) DEFAULT NULL,
  `espacio_id` int(11) DEFAULT NULL,
  `fecha` date NOT NULL,
  `hora_inicio` time NOT NULL,
  `hora_fin` time NOT NULL,
  `estado` enum('activa','cancelada') DEFAULT 'activa',
  `creado_en` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `reservas`
--

INSERT INTO `reservas` (`id`, `usuario_id`, `espacio_id`, `fecha`, `hora_inicio`, `hora_fin`, `estado`, `creado_en`) VALUES
(1, 1, 2, '2026-04-11', '14:00:00', '17:00:00', 'activa', '2026-04-09 23:24:42'),
(2, 1, 5, '2026-04-09', '18:48:00', '18:50:00', 'activa', '2026-04-09 23:46:28'),
(3, 2, 3, '2026-04-12', '12:30:00', '13:30:00', 'activa', '2026-04-11 12:22:01'),
(4, 2, 4, '2026-04-24', '06:00:00', '18:00:00', 'activa', '2026-04-11 13:04:53'),
(5, 2, 1, '2026-04-14', '08:25:00', '09:25:00', 'activa', '2026-04-11 13:25:52');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `restricciones`
--

CREATE TABLE `restricciones` (
  `id` int(11) NOT NULL,
  `espacio_id` int(11) DEFAULT NULL,
  `dia_semana` enum('lunes','martes','miercoles','jueves','viernes','sabado','domingo') DEFAULT NULL,
  `hora_inicio` time DEFAULT NULL,
  `hora_fin` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipos_espacio`
--

CREATE TABLE `tipos_espacio` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tipos_espacio`
--

INSERT INTO `tipos_espacio` (`id`, `nombre`) VALUES
(1, 'Salón'),
(2, 'Biblioteca'),
(3, 'Sala de estudio'),
(4, 'Auditorio'),
(5, 'Sala de juegos');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `apellido` varchar(100) DEFAULT NULL,
  `email` varchar(150) DEFAULT NULL,
  `codigo` varchar(50) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `foto` varchar(255) DEFAULT NULL,
  `rol` enum('admin','usuario') DEFAULT 'usuario',
  `proveedor` enum('local','google','facebook') DEFAULT 'local',
  `estado` tinyint(4) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `telefono` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `apellido`, `email`, `codigo`, `password`, `foto`, `rol`, `proveedor`, `estado`, `created_at`, `telefono`) VALUES
(1, 'admin', '', 'admin@gmail.com', 'admin', '$2b$10$LTpOddt1XodV6Ye2.QS3FuMN83kyrW.Cw65BLDTitNCfpArcHH1Ca', NULL, 'admin', 'local', 1, '2026-03-24 02:09:43', '3111111111'),
(2, 'valeria', '', 'valeriagoes170805@gmail.com', 'valeriagoes170805@gmail.com', '$2b$10$5OFjJy0KxfnxiAO890jO6uBJxNaXXIEEAeRkYZDEc8YdqQI1O1NAe', NULL, 'usuario', 'local', 1, '2026-03-28 12:06:08', '3148950404'),
(18, 'prueba', '', 'prueba@prueba.com', 'prueba@prueba.com', '$2b$10$nWXYjD03dREnZozBGMnxxOxJY9C1fiicX46nhl/JedLA0WXati/Pm', NULL, 'usuario', 'local', 1, '2026-03-28 12:54:15', '3021645220');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `espacios`
--
ALTER TABLE `espacios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tipo_id` (`tipo_id`);

--
-- Indices de la tabla `recuperacion_password`
--
ALTER TABLE `recuperacion_password`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Indices de la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`usuario_id`),
  ADD KEY `idx_reserva` (`espacio_id`,`fecha`,`hora_inicio`,`hora_fin`);

--
-- Indices de la tabla `restricciones`
--
ALTER TABLE `restricciones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `espacio_id` (`espacio_id`);

--
-- Indices de la tabla `tipos_espacio`
--
ALTER TABLE `tipos_espacio`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `codigo` (`codigo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `espacios`
--
ALTER TABLE `espacios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `recuperacion_password`
--
ALTER TABLE `recuperacion_password`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `reservas`
--
ALTER TABLE `reservas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `restricciones`
--
ALTER TABLE `restricciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tipos_espacio`
--
ALTER TABLE `tipos_espacio`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `espacios`
--
ALTER TABLE `espacios`
  ADD CONSTRAINT `espacios_ibfk_1` FOREIGN KEY (`tipo_id`) REFERENCES `tipos_espacio` (`id`);

--
-- Filtros para la tabla `recuperacion_password`
--
ALTER TABLE `recuperacion_password`
  ADD CONSTRAINT `recuperacion_password_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD CONSTRAINT `reservas_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`),
  ADD CONSTRAINT `reservas_ibfk_2` FOREIGN KEY (`espacio_id`) REFERENCES `espacios` (`id`);

--
-- Filtros para la tabla `restricciones`
--
ALTER TABLE `restricciones`
  ADD CONSTRAINT `restricciones_ibfk_1` FOREIGN KEY (`espacio_id`) REFERENCES `espacios` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
