// services/agendaservice.js
const Agenda = require('../models/agenda'); // Modèle Agenda

class AgendaService {
  // Créer un événement d'agenda
  static async createEvent(eventData) {
    try {
      const event = await Agenda.create(eventData);
      return event;
    } catch (error) {
      throw new Error('Erreur lors de la création de l\'événement : ' + error.message);
    }
  }

  // Récupérer tous les événements pour un utilisateur
  static async getUserEvents() {
    try {
      const events = await Agenda.findAll();
      return events;
    } catch (error) {
      throw new Error('Erreur lors de la récupération des événements : ' + error.message);
    }
  }

  // Récupérer un événement spécifique par son ID
  static async getEventById(eventId) {
    try {
      const event = await Agenda.findByPk(eventId);
      if (!event) {
        throw new Error('Événement non trouvé');
      }
      return event;
    } catch (error) {
      throw new Error('Erreur lors de la récupération de l\'événement : ' + error.message);
    }
  }

  // Mettre à jour un événement existant
  static async updateEvent(id, updatedData) {
    try {
      const event = await Agenda.findByPk(id);
      if (!event) {
        throw new Error('Événement non trouvé');
      }
      await event.update(updatedData);
      return event;
    } catch (error) {
      throw new Error('Erreur lors de la mise à jour de l\'événement : ' + error.message);
    }
  }

  // Supprimer un événement
  static async deleteEvent(id) {
    try {
      const event = await Agenda.findByPk(id);
      if (!event) {
        throw new Error('Événement non trouvé');
      }
      await event.destroy();
      return { message: 'Événement supprimé avec succès' };
    } catch (error) {
      throw new Error('Erreur lors de la suppression de l\'événement : ' + error.message);
    }
  }

  /*static async deleteMedecin(id) {
    const medecin = await Medecin.findByPk(id);
    if (!medecin) return null;
    return await medecin.destroy();
  };*/
}

module.exports = AgendaService;
