// Les controller ont besoin d'express
import express from 'express';
// On importe le(s) model(s) dont on a besoin dans ce controller
import Movie from '../models/movieModel.js';
// On importe Joi pour valider les données
import Joi from 'joi';
// On recupere le router express afin que les routes de ce controller soient enregistrees dans le router général
const router = express.Router(); 

const schemaMovie = Joi.object({
    id: Joi.number().integer(),
    title: Joi.string().min(3).max(50).required(),
})

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

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const movie = await Movie.getOneById(id);
        movie ? res.json(movie) : res.status(404).json({ message: 'Movie not found' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const result = await Movie.deleteById(id);
        result ? res.json({message : `MovieId ${id} has been deleted !`}).status(204) : res.status(404).json({ message: 'Movie not found' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

router.post('/', async (req, res) => {
    const movie = { title : req.body.title };
    try {
        const {error, value} = await schemaMovie.validate(movie)
        const lastInsertId = await Movie.createNew(value);
        if (lastInsertId) {
            const newMovie = await Movie.getOneById(lastInsertId) 
            res.json(newMovie);
        } else res.status(422).json({ message: error.message });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

router.put('/:id', async (req, res) => {
    const movie = { title : req.body.title };
    try {
        const {error, value} = await schemaMovie.validate(movie)
        const movieUpdate = await Movie.updateMovie(value);
        if (movieUpdate) res.status(204);
        else res.status(422).json({ message: error.message });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

// ne pas oublier l'export router
export default router;