## UTILISER LE TEMPLATE EXPRESS NODE SERVER:
> - Supprimer l'origin : ```rm -rf .git``` <br>
> - Versionner le repo depuis un nouveau répertoire git : <br>
> ```git init``` <br>
> ```git commit -m "init server"``` <br>
> ```git branch -M main``` <br>
> ```git remote add origin [lien vers la nouvelle origin]```<br>
> ```git push -u origin main```<br>

### Créer la base de données 
> - se connecter au server mysql local ```mysql -u root -p```
> - (optionel : tester la base de données témoin du template depuis le script db.sql || ce fichier peut être supprimé ou modifier avec votre propre script de bdd)
> - créer votre base de données

### Créer le fichier .env 
> ajouter les variables d'environnement de connexion à la BDD (suivre l'exemple du fichier .env-sample)

### Installer les dépendences
> - ```npm install```

### Démarrer le server 
> - ```npm start```

## SERVER NODE EXPRESS DE 0 :

### Créer un dossier et se placer à la racine de celui-ci 

- ```mkdir my-server-express```
- ```cd my-server-express```

### Init server

- 1 : executer la commande ```npm init``` pour initialiser le serveur (cette commande crée un package.json)
- 2 : dans le package.json on peut voir qu'à l'attribut "main" il y a pour valeur ```index.js```, nous devons créer ce fichier à la racine du dossier courant, il contiendra la configuration de notre serveur
- 3 : ajouter dans package.json en dessous de la ligne main: ```"type": "module"``` qui nous permettra d'utiliser la synthaxe "import" comme dans React plutot que les "require" *

<small>* [require vs import](https://www.journaldunet.fr/web-tech/developpement/1498875-node-js-quelle-est-la-difference-entre-require-et-import/ "source: JDN")</small>

### Dépendances 

Notre serveur a besoin de plusieurs dépendences :
- **express**
- **nodemon** (écoute chacune des modifs apportées au serveur sans qu'on ait besoin de redémarrer le serveur à chaque fois pour que celles ci soient prises en compte)
- **cors** (optionnel dans un premier temps. cors nous permet d'autoriser ou non certain client sur le serveur. [Plus d'infos sur cors](https://developer.mozilla.org/fr/docs/Web/HTTP/CORS))
- **mysql** (MangoDB, SQLite, Postgresql...)si notre serveur a besoin de se connecter à une BDD
- dotenv pour nos variables d'environnement (exemple les accès à la BDD : username, password, db-port, db-name)

### git init 

Juste si vous repartez de 0 : ajouter un .gitignore et ignorer .env et node_modules
Si vous cloner ce template pour repartir sur un nouveau projet vous devez détacher le repo du repo distant github et donc supprimer
le .git à la racine puis relancer un ```git init``` et suivre la procédure normale à partir de là.
  
### Configuration du serveur après avoir installé les dépendances 
Dans index.js nous devons configurer notre serveur avec les lignes suivantes :
- dépendance à express : ```import express from "express";``` 
- dépendance à cors : ```import cors from "cors";```
- pour tourner, le serveur a également besoin d'un port (exemple : 5000 || 8000) : ```const port = 8000``` ou ajouter une variable d'environnement dans le .env : PORT=8000
- ajouter également : ```const app = express();```
- puis ajouter : ```app.use(cors('*')) app.use(express.json()) app.use(express.urlencoded({extended: true}))```

### Poser l'architecture du serveur 

- ajouter un dossier models, controllers et routes à la racine du serveur

#### MVC = Model View Controller
- Les models contiennent toutes les methodes qui connectent à la BDD 
- Les models renvoient des promesses
- Tous les models importent la connection à la BDD, ce sont les seuls fichiers qui contiennent ces imports
- Les models envoient des query vers la BDD (SELECT/INSERT/UPDATE/DELETE)

- Les controllers gèrent les request d'un client (exemple : une react app), et les response qui seront renvoyées au client.
- Entre request et response, le controller peut faire appel à un model pour renvoyer de la data au client ou inserer de la data en bdd; si le controller doit faire appel a un model, il devra l'importer pour avoir toutes les methodes du model disponibles (exemple : depuis movieModel, methodes disponibles : findAll, findOneById, create, delete, update)
  
- View => React App 


### Routing 

- Dans le dossier routes il faut ajouter un fichier qui sera en charge de rediriger les requests client vers le bon controller en fonction de l'url demandée (exemple : un client request sur '/movie' pour obtenir une liste de films, le router redirigera vers le controller movieController vers la methode qui se charge de retourner une liste de films)
- Donc notre fichier routes.js ou index.js du dossier routes contient la liste de tous les controllers disponible dans le serveur
```
    import movieController from '../controllers/movieController.js';
    export const setupRoutes = (app) => {
        app.use('/movies', movieController);
    } 
```
- index.js (le point d'entrée principal de notre serveur) doit importer la const setupRoutes du dossier routes/routes.js afin d'être en mesure de router correctement les request client (toujours en fonction de l'url qui est demandée par celui-ci)

