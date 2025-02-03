const express = require('express');
const router = express.Router();
const { Usuario } = require('../models');

// Obtener todos los usuarios
router.get('/', async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Crear un usuario
router.post('/', async (req, res) => {
    try {
        const usuario = await Usuario.create(req.body);
        res.status(201).json(usuario);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Actualizar un usuario
router.put('/:id', async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id);
        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        await usuario.update(req.body);
        res.json({ message: "Usuario actualizado exitosamente", usuario });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Eliminar un usuario
router.delete('/:id', async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id);
        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        await usuario.destroy();
        res.json({ message: "Usuario eliminado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;

