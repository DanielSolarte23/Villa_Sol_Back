// middleware/auth.middleware.js
const jwt = require('jsonwebtoken');
const { Usuario } = require('../models');

const JWT_SECRET = 'tu_jwt_secret'; // En producción, usar variables de entorno

const verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        
        if (!token) {
            return res.status(403).json({ message: 'No autorizado' });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        const usuario = await Usuario.findByPk(decoded.id);

        if (!usuario) {
            res.clearCookie('token');
            return res.status(401).json({ message: 'Usuario no encontrado' });
        }

        req.usuario = usuario;
        next();
    } catch (error) {
        res.clearCookie('token');
        return res.status(401).json({ message: 'Sesión inválida' });
    }
};

const isAdmin = (req, res, next) => {
    if (req.usuario.rol !== 'admin') {
        return res.status(403).json({ message: 'Requiere rol de administrador' });
    }
    next();
};

module.exports = { verifyToken, isAdmin };