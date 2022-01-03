// Import des dépendences du serveur avec express / cors 
import cors from 'cors';
import express from 'express';
// Import du fichier de gestion des routes || ROUTER DU SERVEUR
import { setupRoutes } from './routes/routing.js';

const app = express();
const port = 8080;

// Configuration du serveur
app.use(cors('*')); // autorise toutes les origines client
app.use(express.json()); // parse les requêtes en json
app.use(express.urlencoded({extended: true})); // parse les request.body en urlencoded

// Serveur est routé grâce à cette ligne
setupRoutes(app);

// Serveur est lancé
app.listen(port, () => console.log(`✅ Server is running on port ${port}`));