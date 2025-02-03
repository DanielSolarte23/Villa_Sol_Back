// controllers/auth.controller.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Usuario } = require('../models');
const { Op } = require('sequelize');

const JWT_SECRET = 'tu_jwt_secret';

const cookieOptions = {
    httpOnly: true,      // Previene acceso desde JavaScript del cliente
    secure: process.env.NODE_ENV === 'production',  // Solo HTTPS en producción
    sameSite: 'strict',  // Protección contra ataques CSRF
    maxAge: 24 * 60 * 60 * 1000  // 24 horas
};

const register = async (req, res) => {
    try {
        const { nombres, documentoIdentidad, nombreDeUsuario, password, rol } = req.body;

        const usuarioExistente = await Usuario.findOne({ 
            where: { 
                [Op.or]: [
                    { nombreDeUsuario },
                    { documentoIdentidad }
                ]
            }
        });

        if (usuarioExistente) {
            return res.status(400).json({ 
                message: 'Usuario o documento de identidad ya registrado' 
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const usuario = await Usuario.create({
            nombres,
            documentoIdentidad,
            nombreDeUsuario,
            password: hashedPassword,
            rol
        });

        const token = jwt.sign(
            { id: usuario.id, rol: usuario.rol },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.cookie('token', token, cookieOptions);

        res.status(201).json({
            message: 'Usuario registrado exitosamente',
            user: {
                id: usuario.id,
                nombres: usuario.nombres,
                nombreDeUsuario: usuario.nombreDeUsuario,
                rol: usuario.rol
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { nombreDeUsuario, password } = req.body;

        const usuario = await Usuario.findOne({ 
            where: { nombreDeUsuario }
        });

        if (!usuario) {
            return res.status(401).json({ 
                message: 'Credenciales inválidas' 
            });
        }

        const isValidPassword = await bcrypt.compare(password, usuario.password);

        if (!isValidPassword) {
            return res.status(401).json({ 
                message: 'Credenciales inválidas' 
            });
        }

        const token = jwt.sign(
            { id: usuario.id, rol: usuario.rol },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.cookie('token', token, cookieOptions);

        res.json({
            message: 'Login exitoso',
            user: {
                id: usuario.id,
                nombres: usuario.nombres,
                nombreDeUsuario: usuario.nombreDeUsuario,
                rol: usuario.rol
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const logout = async (req, res) => {
    try {
        res.clearCookie('token');
        res.json({ message: 'Sesión cerrada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    register,
    login,
    logout
};