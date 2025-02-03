// routes/visitante.routes.js
const express = require('express');
const router = express.Router();
const { Visitante, Apartamento } = require('../models');

// Obtener todos los visitantes
router.get('/', async (req, res) => {
    try {
        const visitantes = await Visitante.findAll({
            include: [{ model: Apartamento }]
        });
        res.json(visitantes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Obtener un visitante por ID
router.get('/:id', async (req, res) => {
    try {
        const visitante = await Visitante.findByPk(req.params.id, {
            include: [{ model: Apartamento }]
        });
        if (visitante) {
            res.json(visitante);
        } else {
            res.status(404).json({ message: 'Visitante no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Crear un visitante
router.post('/', async (req, res) => {
    try {
        const visitante = await Visitante.create(req.body);
        res.status(201).json(visitante);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Actualizar un visitante
router.put('/:id', async (req, res) => {
    try {
        const visitante = await Visitante.findByPk(req.params.id);
        if (visitante) {
            await visitante.update(req.body);
            res.json(visitante);
        } else {
            res.status(404).json({ message: 'Visitante no encontrado' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Eliminar un visitante
router.delete('/:id', async (req, res) => {
    try {
        const visitante = await Visitante.findByPk(req.params.id);
        if (visitante) {
            await visitante.destroy();
            res.json({ message: 'Visitante eliminado exitosamente' });
        } else {
            res.status(404).json({ message: 'Visitante no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;