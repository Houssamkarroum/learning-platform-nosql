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
    console.log(course);
    const result = await mongoService.insertOne('course', course);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create course' });
  }
}

async function getCourse(req, res) {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid course ID' });
    }
    let course = await redisService.getCachedData(id);
    console.log(course);
    course ? console.log('from cache') : console.log('from db');
    if (!course) {
      course = await mongoService.findOneById('course', id);
      console.log(course + 'from db');
      if (course) {
        await redisService.cacheData(id, course, 3600);
      }
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch course' });
    console.log(error);
  }
}

// get course stats like number of courses, average rating, etc.
async function getCourseStats(req, res) {
  try {
    const dbInstance = db.getdb();
    const collection = dbInstance.collection('course');

    // Get collection stats
    const stats = await dbInstance.command({ collStats: 'course' });
    // vous choisirez les statistiques qui vous intéress
    // par exemple, le nombre de documents, la taille, etc.
    // voila le code pour elle
    // const count = stats.count;
    // const size = stats.size;
    //   const avgObjSize = stats.avgObjSize;
    res.status(200).json({
      stats

    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch course stats' });
    console.error(error);
  }
}
// Export des contrôleurs
module.exports = {
  // TODO: Exporter les fonctions du contrôleur
  createCourse,
  getCourse,
  getCourseStats
};