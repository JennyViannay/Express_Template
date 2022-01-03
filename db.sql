## Ici une petite base de données pour tester le fonctionnement du serveur.
CREATE DATABASE `template_express`;
USE `template_express`;
CREATE TABLE movie (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    title VARCHAR(255) NOT NULL
);
INSERT INTO movie (title) VALUES ('Don\t look up'),('Cruella');
