// Question: Pourquoi séparer les routes dans différents fichiers ?
// Réponse : Séparer les routes dans différents fichiers permet de mieux organiser le code, de le rendre plus modulaire et de faciliter la maintenance et l'extension du projet.
// Question : Comment organiser les routes de manière cohérente ?
// Réponse: Organisez les routes en fonction de leur contexte ou de leur fonctionnalité, en les regroupant par domaine ou par type de ressource.

const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

// Routes pour les cours
router.post('/', courseController.createCourse);
router.get('/:id', courseController.getCourse);
router.get('/stats', courseController.getCourseStats);

module.exports = router;