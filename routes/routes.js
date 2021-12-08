// Ce fichié contient les routes de l'application c'est le ROUTER de notre serveur
// Il importe tous les controllers

import movieController from '../controllers/movieController.js';

// Il exporte toutes les routes
export const setupRoutes = (app) => {
    // On définit ici une route pour les movies
    app.use('/movies', movieController);
    // Mais on peut définir autant de routes que l'on veut, toujours en se référant à un controller
}