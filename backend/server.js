/*require('dotenv').config();
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const sequelize = require('./config/db');
const speechRoutes = require('./routes/speechRoutes');
const router = express.Router();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/user', userRoutes);

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
});*/


// Fichier: server.js
require('dotenv').config();
const express = require('express');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const sequelize = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Routes utilisateur
app.use('/api/user', userRoutes);

// Route principale
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.post('/api/recognize', (req, res) => {
  const { duration = 5, engine = "google" } = req.body;
  
  
  const paramsPath = path.join(__dirname, 'params.json');
  const resultPath = path.join(__dirname, 'result.json');
  
  
  const params = { duration, engine };
  fs.writeFileSync(paramsPath, JSON.stringify(params));
  
  
  const options = {
    encoding: 'utf8',
    shell: true,
    cwd: __dirname 
  };
  
  
  const pythonCommand = process.env.PYTHON_COMMAND || 'python';
  const scriptPath = path.join(__dirname, 'speech_recognition_script.py');
  const command = `${pythonCommand} "${scriptPath}"`;
  
  console.log(`Exécution de: ${command}`);
  console.log(`Répertoire de travail: ${__dirname}`);
  
  exec(command, options, (error, stdout, stderr) => {
    console.log(`Sortie standard: ${stdout}`);
    
    if (stderr) {
      console.error(`Erreur standard: ${stderr}`);
    }
    
    if (error) {
      console.error(`Erreur d'exécution: ${error.message}`);
      return res.status(500).json({
        success: false,
        message: `Erreur lors de l'exécution: ${error.message}`,
        stderr: stderr
      });
    }
    
    try {
      if (fs.existsSync(resultPath)) {
        const result = fs.readFileSync(resultPath, 'utf8');
        console.log(`Contenu du fichier result.json: ${result}`);
        const data = JSON.parse(result);
        return res.json({ success: true, text: data.text });
      } else {
        return res.status(500).json({
          success: false,
          message: "Le fichier result.json n'a pas été créé"
        });
      }
    } catch (readError) {
      console.error(`Erreur de lecture: ${readError.message}`);
      return res.status(500).json({
        success: false,
        message: `Erreur lors de la lecture du résultat: ${readError.message}`
      });
    }
  });
});


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