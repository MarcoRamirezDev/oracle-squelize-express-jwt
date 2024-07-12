const express = require('express');
const router = express.Router();
const userController = require('../../controllers/UserController');
// Crear un usuario
router.post('/create', userController.createUser);
// Obtener todos los usuarios
router.post('/', userController.getAllUsers);

// Obtener un usuario por ID
/*router.get('/users/:id', userController.getUserById);

// Actualizar un usuario por ID
router.put('/users/:id', userController.updateUserById);

// Eliminar un usuario por ID
router.delete('/users/:id', userController.deleteUserById);*/

module.exports = router;
