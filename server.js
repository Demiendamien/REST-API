const express = require('express'); // Framework Express
const mongoose = require('mongoose'); // ORM MongoDB
const dotenv = require('dotenv'); // Chargement des variables d'environnement
const User = require('./models/User'); // Modèle utilisateur
// Charger les variables d'environnement
dotenv.config();

const URI = process.env.MONGO_URI;

// Initialiser Express
const app = express();
app.use(express.json());


const PORT = process.env.PORT || 5000;


// Connexion à MongoDB
mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true }) // Paramètres de connexion
    .then(() => console.log('Connexion à la base de données réussie')) // Message de connexion à la base de données
    .catch(err => console.error('Erreur de connexion à la base de données :', err)); // Message d'erreur de connexion à la base de données



//GET : Récupérer tous les utilisateurs
app.get('/users/all', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


//POST : Créer un nouvel utilisateur
app.post('/users/create', async (req, res) => {
    try {
        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
    
});


//PUT : Modifier un utilisateur
app.put('/users/:id/update', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


//DELETE : Supprimer un utilisateur
app.delete('/users/:id/delete', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndRemove(req.params.id);
        res.json(deletedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});





// Lancer le serveur
app.listen(PORT, () => {
    console.log(`Le serveur écoute sur le PORT http://localhost:${PORT}`);
});
