// Question : Pourquoi créer un module séparé pour les connexions aux bases de données ?

// Réponse : Centralisation et réutilisation : Code de connexion regroupé en un seul endroit, facilitant la maintenance et la réutilisation.
//Abstraction : Isolation du reste de l'application des détails spécifiques de la base de données, permettant un changement de SGBD plus aisé

// Question : Comment gérer proprement la fermeture des connexions ?

// Réponse : il faut :
// Fermeture explicite : Utiliser les fonctions close() ou équivalentes après utilisation.
// try...finally : Garantir la fermeture même en cas d'erreur.
// Pools de connexions : Gérer correctement la fermeture du pool en fin d'exécution.

const { MongoClient } = require('mongodb');
const redis = require('redis');
const config = require('./env');

let mongoClient, redisClient, db;

async function connectMongo() {
  // TODO: Implémenter la connexion MongoDB
  console.log(config.mongodb.uri);
  mongoClient = new MongoClient(config.mongodb.uri);
  try {
    await mongoClient.connect();
    db = mongoClient.db(config.mongodb.dbName);
    console.log("Connected to MongoDB");

    // databases to cnfirm that it's working
    const databasesList = await mongoClient.db().admin().listDatabases();
    console.log("Databases:", databasesList.databases);
  } catch (error) {
    console.log("not connected from bd.js");
  }
  // Gérer les erreurs et les retries     

}
// test
async function init() {
  await connectMongo();
  connectRedis();
}
init();
async function connectRedis() {
  // TODO: Implémenter la connexion Redis
  // Gérer les erreurs et les retries
  const redisClient = redis.createClient();
  try {
    await redisClient.connect({
      host: config.redis, port: config.port
    });
    const keys = await redisClient.keys('*');  // Returns all keys in Redis to test
    console.log(keys);
    console.log("data base connected");
  } catch (error) {
    console.log("data base not connected");
  } finally {
    // Make sure to close the Redis connection after using it
    await redisClient.quit();
  }


}

// Export des fonctions et clients
module.exports = {
  connectMongo,
  connectRedis
  // TODO: Exporter les clients et fonctions utiles
};