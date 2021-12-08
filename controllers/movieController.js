// Les controller ont besoin d'express
import express from 'express';
// On importe le(s) model(s) dont on a besoin dans ce controller
import Movie from '../models/movieModel.js';
// On recupere le router express afin que les routes de ce controller soient enregistrees dans le router général
const router = express.Router(); 

// Dans ce controller, toutes les routes commencent par /movies cf(routes/routings.js L:10)

// On crée une route qui va nous permettre de récupérer tous les movies
// Le verbe HTTP GET indique que cette route doit être requeter en GET depuis le client
// On utilise une méthode asynchrone afin de ne pas bloquer le serveur
router.get('/', async (req, res) => {
    try {
        // On récupère toutes les movies depuis le model qui lui meme connect avec la base de données
        // Depuis le movieModel, que l'on a nommé ici Movie, on a accès a toutes ses fonctions
        const movies = await Movie.getAll();
        // On renvoie les movies récupérés au client
        res.json(movies);
    } catch (error) {
        // sinon erreur 500
        res.status(500).json({ message: error.message });
    }
})

// ne pas oublier l'export router
export default router;