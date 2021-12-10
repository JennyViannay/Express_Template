// Tous les models importent le fichier dbConnect (qui permet de se connecter à la base de données)
import dbConnect from '../config/db-config.js';

// Les models contiennent les CRUD et eventuellement des fonctions supplémentaires mais toujours en lien avec la base de données 
// La plupart des fonctions d'un model retournent une promesse

// On crée une fonction qui va envoyer une requête SQL à la base de données, ici on va chercher tous les films
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

const getOneById = (id) => {
    return new Promise((resolve, reject) => {
        dbConnect.query('SELECT * FROM movie WHERE id = ?', id, (err, result) => {
            if (err) reject(err);
            else resolve(result[0]);
        })
    })
}

const deleteById = (id) => {
    return new Promise((resolve, reject) => {
        dbConnect.query('DELETE FROM movie WHERE id = ?', id, (err, result) => {
            if (err) reject(err);
            else resolve(result.affectedRows);
        })
    })
}

const createNew = (movie) => {
    const { title } = movie;
    return new Promise((resolve, reject) => {
        dbConnect.query('INSERT INTO movie (title) VALUES (?)', title, (err, result) => {
            if (err) reject(err);
            else resolve(result.insertId);
        })
    })
}

const updateMovie = (movie) => {
    const { title, id } = movie;
    return new Promise((resolve, reject) => {
        dbConnect.query('UPDATE movie SET title = ? WHERE id = ?', [title, id], (err, result) => {
            if (err) reject(err);
            else resolve(result);
        })
    })
}

// exporter toutes les fonctions du model
export default { getAll, getOneById, deleteById, createNew, updateMovie };