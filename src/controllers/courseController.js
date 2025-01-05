// Question: Quelle est la différence entre un contrôleur et une route ?
// Réponse:
// Question : Pourquoi séparer la logique métier des routes ?
// Réponse :

const { ObjectId } = require('mongodb');
const db = require('../config/db');
const mongoService = require('../services/mongoService');
const redisService = require('../services/redisService');

async function createCourse(req, res) {
  // TODO: Implémenter la création d'un cours
  // Utiliser les services pour la logique réutilisable
  try {
    const course = req.body;
    const result = await mongoService.insertOne('courses', course);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create course' });
  }
}

async function getCourse(req, res) {
  try {
    const { id } = req.params;
    let course = await redisService.getCachedData(id);
    if (!course) {
      course = await mongoService.findOneById('courses', id);
      if (course) {
        await redisService.cacheData(id, course, 3600);
      }
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch course' });
  }
}

// get course stats
async function getCourseStats(req, res) {
  try {
    const stats = await mongoService.getCourseStats();
    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch course stats' });
  }
}
// Export des contrôleurs
module.exports = {
  // TODO: Exporter les fonctions du contrôleur
  createCourse,
  getCourse,
  getCourseStats
};