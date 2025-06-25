const express = require('express');
const URutas = require('../controlador/UsuarioControlador');
const router = express.Router();

router.post('/usuarios', URutas.crearUsuario);
module.exports = router; 