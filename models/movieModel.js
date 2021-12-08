// Tous les models import le fichier dbConnect (qui connecte à la base de données)
import dbConnect from '../config/db-config.js';

// Les models contiennent les CRUD et eventuellement des fonctions supplémentaires mais toujours en lien avec la base de données 
// La plupart des fonctions d'un model retournent une promesse

// on crée une fonction qui va envoyer une requête SQL à la base de données, ici on va chercher tous les films
const getAll = () => {
    return new Promise((resolve, reject) => {
        dbConnect.query('SELECT * FROM movie', (err, results) => {
            // si la requete n'est pas bonne on retourne une erreur
            if (err) reject(err);
            // sinon on retourne les résultats
            else resolve(results);
        })
    })
}

// exporter toutes les fonctions du model
export default { getAll };