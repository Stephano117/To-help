// routes/agendaRoute.js
const express = require('express');
const AgendaController = require('../controllers/agendaController');
const authMiddleware = require('../middleware/authMiddleware'); // Si tu veux protéger les routes

const router = express.Router();

// Route pour créer un événement
router.post('/events', authMiddleware, AgendaController.createEvent); // Protégée par authMiddleware

// Route pour récupérer tous les événements d'un utilisateur
router.get('/events/:userId', authMiddleware, AgendaController.getUserEvents); // Protégée par authMiddleware

// Route pour récupérer un événement spécifique par son ID
router.get('/events/:eventId', authMiddleware, AgendaController.getEventById); // Protégée par authMiddleware

// Route pour mettre à jour un événement
router.put('/events/:eventId', authMiddleware, AgendaController.updateEvent); // Protégée par authMiddleware

// Route pour supprimer un événement
router.delete('/events/:eventId', authMiddleware, AgendaController.deleteEvent); // Protégée par authMiddleware

module.exports = router;
