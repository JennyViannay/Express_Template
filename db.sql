CREATE DATABASE `template_express`;
USE `template_express`;
CREATE TABLE movie (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    title VARCHAR(255) NOT NULL
);
INSERT INTO movie (title) VALUES ('plop'),('plop2');

Ici juste un petite base de données pour tester le fonctionnement de l'application.