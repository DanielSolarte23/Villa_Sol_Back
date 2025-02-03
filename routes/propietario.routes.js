const express = require('express');
const router = express.Router();
const { Propietario, Apartamento, Pago } = require('../models');

// Obtener todos los propietarios
router.get('/', async (req, res) => {
    try {
        const propietarios = await Propietario.findAll({
            include: [
                { model: Apartamento },
                { model: Pago }
            ]
        });
        res.json(propietarios);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Obtener un propietario por ID
router.get('/:id', async (req, res) => {
    try {
        const propietario = await Propietario.findByPk(req.params.id, {
            include: [
                { model: Apartamento },
                { model: Pago }
            ]
        });
        if (propietario) {
            res.json(propietario);
        } else {
            res.status(404).json({ message: 'Propietario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Crear un propietario
router.post('/', async (req, res) => {
    try {
        const propietario = await Propietario.create(req.body);
        res.status(201).json(propietario);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Actualizar un propietario
router.put('/:id', async (req, res) => {
    try {
        const propietario = await Propietario.findByPk(req.params.id);
        if (propietario) {
            await propietario.update(req.body);
            res.json(propietario);
        } else {
            res.status(404).json({ message: 'Propietario no encontrado' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Eliminar un propietario
router.delete('/:id', async (req, res) => {
    try {
        const propietario = await Propietario.findByPk(req.params.id);
        if (propietario) {
            await propietario.destroy();
            res.json({ message: 'Propietario eliminado exitosamente' });
        } else {
            res.status(404).json({ message: 'Propietario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;