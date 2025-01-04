const { findOneById } = require('./mongoService'); // Remplacez par le chemin de votre fichier utilitaire

async function testFindOneById() {
    try {
        // Remplacez l'ID par celui d'un document existant dans votre base de données
       
        if (result) {
            console.log("Document trouvé :", result);
        } else {
            console.log("Aucun document trouvé avec cet ID.");
        }
    } catch (error) {
        console.error("Erreur lors du test :", error);
    }
}

// Appel de la fonction de test
testFindOneById();
