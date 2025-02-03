// routes/informe.routes.js
const express = require('express');
const router = express.Router();
const { Informe, Usuario } = require('../models');

// Obtener todos los informes
router.get('/', async (req, res) => {
    try {
        const informes = await Informe.findAll({
            include: [{ model: Usuario }]
        });
        res.json(informes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Obtener un informe por ID
router.get('/:id', async (req, res) => {
    try {
        const informe = await Informe.findByPk(req.params.id, {
            include: [{ model: Usuario }]
        });
        if (informe) {
            res.json(informe);
        } else {
            res.status(404).json({ message: 'Informe no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Crear un informe
router.post('/', async (req, res) => {
    try {
        const informe = await Informe.create(req.body);
        res.status(201).json(informe);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Actualizar un informe
router.put('/:id', async (req, res) => {
    try {
        const informe = await Informe.findByPk(req.params.id);
        if (informe) {
            await informe.update(req.body);
            res.json(informe);
        } else {
            res.status(404).json({ message: 'Informe no encontrado' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Eliminar un informe
router.delete('/:id', async (req, res) => {
    try {
        const informe = await Informe.findByPk(req.params.id);
        if (informe) {
            await informe.destroy();
            res.json({ message: 'Informe eliminado exitosamente' });
        } else {
            res.status(404).json({ message: 'Informe no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;