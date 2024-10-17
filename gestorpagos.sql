-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 17-10-2024 a las 08:37:26
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
-- Base de datos: `gestorpagos`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pagos`
--

CREATE TABLE `pagos` (
  `id` int(11) NOT NULL,
  `fechaPago` datetime NOT NULL,
  `metodoPago` varchar(255) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `monto` decimal(10,0) NOT NULL,
  `activo` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pagos`
--

INSERT INTO `pagos` (`id`, `fechaPago`, `metodoPago`, `descripcion`, `monto`, `activo`, `createdAt`, `updatedAt`) VALUES
(3, '2020-12-12 00:00:00', 'Lemon', 'Aguante boca', 200, 1, '2024-10-08 00:37:45', '2024-10-08 00:37:45'),
(4, '2020-04-23 00:00:00', 'Banco Nación', 'Alquiler', 300000, 1, '2024-10-08 00:44:07', '2024-10-08 00:44:07'),
(5, '2020-12-12 00:00:00', 'Modo', 'Pago de Prueba Aguante Boca', 20000, 1, '2024-10-17 02:13:51', '2024-10-17 02:13:51');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `rol` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `nombre`, `email`, `password`, `rol`, `createdAt`, `updatedAt`) VALUES
(5, 'valen', 'valen@email.com', '$2a$10$CKp1gVzjPhEz1t/MYq1Ks.44RQHWm9iVA4ZTe5BMOV0uAytleznfi', 'comun', '2024-10-16 10:00:48', '2024-10-16 10:00:48'),
(6, 'test', 'test@email.com', '$2a$10$m2c14NH085C7IjgotPwjNuhTa/RLC.oAtqGinjdYHR6tDYgLz0bYe', 'comun', '2024-10-16 10:01:53', '2024-10-16 10:01:53'),
(7, 'valen', 'valen123@gmail.com', '$2a$10$45uI24Q6PHU6z35FiJFl..89AAnSLpFYEceVjQBHQFG7TLalaXB7q', 'admin', '2024-10-17 05:56:37', '2024-10-17 05:56:37'),
(8, 'valen', 'valen12d3@gmail.com', '$2a$10$AUCzPKi5vW7ecxMCxf8Cf.Ikw2dbG6CAkucfXpHTTyL2EfynqAFMS', 'comun', '2024-10-17 05:59:26', '2024-10-17 05:59:26');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `pagos`
--
ALTER TABLE `pagos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `pagos`
--
ALTER TABLE `pagos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
