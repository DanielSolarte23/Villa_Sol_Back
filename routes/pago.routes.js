const express = require('express');
const router = express.Router();
const { Pago, Propietario } = require('../models');

// Obtener todos los pagos
router.get('/', async (req, res) => {
    try {
        const pagos = await Pago.findAll({
            include: [{ model: Propietario }]
        });
        res.json(pagos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Obtener un pago por ID
router.get('/:id', async (req, res) => {
    try {
        const pago = await Pago.findByPk(req.params.id, {
            include: [{ model: Propietario }]
        });
        if (pago) {
            res.json(pago);
        } else {
            res.status(404).json({ message: 'Pago no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Crear un pago
router.post('/', async (req, res) => {
    try {
        const pago = await Pago.create(req.body);
        res.status(201).json(pago);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Actualizar un pago
router.put('/:id', async (req, res) => {
    try {
        const pago = await Pago.findByPk(req.params.id);
        if (pago) {
            await pago.update(req.body);
            res.json(pago);
        } else {
            res.status(404).json({ message: 'Pago no encontrado' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Eliminar un pago
router.delete('/:id', async (req, res) => {
    try {
        const pago = await Pago.findByPk(req.params.id);
        if (pago) {
            await pago.destroy();
            res.json({ message: 'Pago eliminado exitosamente' });
        } else {
            res.status(404).json({ message: 'Pago no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;