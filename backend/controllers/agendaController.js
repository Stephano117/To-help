// controllers/agendaController.js
const AgendaService = require('../services/agendaservice');

class AgendaController {
  // Créer un événement
  static async createEvent(req, res) {
    try {
      const event = await AgendaService.createEvent(req.body);
      res.status(201).json(event);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Récupérer les événements d'un utilisateur
  static async getUserEvents(req, res) {
    try {
      const events = await AgendaService.getUserEvents(req.params.userId);
      res.status(200).json(events);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Récupérer un événement par ID
  static async getEventById(req, res) {
    try {
      const event = await AgendaService.getEventById(req.params.eventId);
      res.status(200).json(event);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Mettre à jour un événement
  static async updateEvent(req, res) {
    try {
      const updatedEvent = await AgendaService.updateEvent(req.params.id, req.body);
      res.status(200).json(updatedEvent);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Supprimer un événement
  static async deleteEvent(req, res) {
    try {
      await AgendaService.deleteEvent(req.params.id);
      res.status(200).json({ message: 'Événement supprimé' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = AgendaController;
