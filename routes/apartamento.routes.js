// routes/apartamento.routes.js
const express = require('express');
const router = express.Router();
const { Apartamento, Propietario } = require('../models');

// Obtener todos los apartamentos
router.get('/', async (req, res) => {
    try {
        const apartamentos = await Apartamento.findAll({
            include: [{ model: Propietario }]
        });
        res.json(apartamentos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Obtener un apartamento por ID
router.get('/:id', async (req, res) => {
    try {
        const apartamento = await Apartamento.findByPk(req.params.id, {
            include: [{ model: Propietario }]
        });
        if (apartamento) {
            res.json(apartamento);
        } else {
            res.status(404).json({ message: 'Apartamento no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Crear un apartamento
router.post('/', async (req, res) => {
    try {
        const apartamento = await Apartamento.create(req.body);
        res.status(201).json(apartamento);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Actualizar un apartamento
router.put('/:id', async (req, res) => {
    try {
        const apartamento = await Apartamento.findByPk(req.params.id);
        if (apartamento) {
            await apartamento.update(req.body);
            res.json(apartamento);
        } else {
            res.status(404).json({ message: 'Apartamento no encontrado' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Eliminar un apartamento
router.delete('/:id', async (req, res) => {
    try {
        const apartamento = await Apartamento.findByPk(req.params.id);
        if (apartamento) {
            await apartamento.destroy();
            res.json({ message: 'Apartamento eliminado exitosamente' });
        } else {
            res.status(404).json({ message: 'Apartamento no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
