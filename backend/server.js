require('dotenv').config();
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const agendaRoutes = require('./routes/agendaRoute'); // Import des routes agenda
const sequelize = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/user', userRoutes);
app.use('/api/agenda', agendaRoutes); // Ajout des routes d'agenda

sequelize
  .sync({ force: false })
  .then(() => {
    console.log('Base de données synchronisée.');
  })
  .catch((err) => {
    console.error('Erreur de synchronisation de la base de données :', err);
  });

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
