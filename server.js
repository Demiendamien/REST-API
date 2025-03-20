const express = require('express'); // Framework Express
const mongoose = require('mongoose'); // ORM MongoDB
const dotenv = require('dotenv'); // Chargement des variables d'environnement
const User = require('./models/User'); // Modèle utilisateur
// Charger les variables d'environnement
dotenv.config();

const URI = process.env.MONGO_URI; // URI de connexion à la base de données

// Initialiser Express
const app = express();
app.use(express.json());


const PORT = process.env.PORT || 5000; // Port d'accueil


// Connexion à MongoDB
mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true }) // Paramètres de connexion
    .then(() => console.log('Connexion à la base de données réussie')) // Message de connexion à la base de données
    .catch(err => console.error('Erreur de connexion à la base de données :', err)); // Message d'erreur de connexion à la base de données



//GET : Récupérer tous les utilisateurs
app.get('/users/all', async (req, res) => { // Paramètres de recherche
    try {
        const users = await User.find(); // Récupérer tous les utilisateurs
        res.json(users); // Récupérer tous les utilisateurs
    } catch (err) {
        res.status(500).json({ message: err.message }); // Message d'erreur
    }
});


//POST : Créer un nouvel utilisateur
app.post('/users/create', async (req, res) => { // Paramètres de création
    try {
        const newUser = new User(req.body); // Créer un nouvel utilisateur
        const savedUser = await newUser.save();  // Enregistrer l'utilisateur
        res.status(201).json(savedUser); // Récupérer l'utilisateur créé
    } catch (err) {
        res.status(400).json({ message: err.message }); // Message d'erreur
    }
    
});


//PUT : Modifier un utilisateur
app.put('/users/:id/update', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Paramètres de mise à jour
        res.json(updatedUser); // Récupérer l'utilisateur mis à jour
    } catch (err) {
        res.status(400).json({ message: err.message }); // Message d'erreur
    }
});


//DELETE : Supprimer un utilisateur
app.delete('/users/:id/delete', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndRemove(req.params.id); // Paramètres de suppression
        res.json(deletedUser); // Récupérer l'utilisateur supprimé
    } catch (err) {
        res.status(400).json({ message: err.message }); // Message d'erreur
    }
});





// Lancer le serveur
app.listen(PORT, () => {
    console.log(`Le serveur écoute sur le PORT http://localhost:${PORT}`);
});
