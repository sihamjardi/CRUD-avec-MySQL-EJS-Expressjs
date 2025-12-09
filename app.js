const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const ejsLayouts = require('express-ejs-layouts');
require('dotenv').config();

// Initialisation de l'application
const app = express();
const PORT = process.env.PORT || 3000;

// Configuration du moteur de template EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(ejsLayouts);
app.set('layout', 'layout');

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Importation du contrôleur
const productController = require('./controllers/productController');

// Routes
app.get('/', (req, res) => {
  res.redirect('/products');
});

// Routes pour les produits
app.get('/products', productController.getAllProducts);
app.get('/products/create', productController.showCreateForm);
app.post('/products/create', productController.createProduct);
app.get('/products/:id', productController.getProductById);
app.get('/products/edit/:id', productController.showEditForm);
app.post('/products/:id/update', productController.updateProduct);
app.post('/products/:id/delete', productController.deleteProduct);

// Middleware pour gérer les routes non trouvées
app.use((req, res) => {
  res.status(404).render('error', { 
    title: 'Page non trouvée',
    message: 'La page que vous recherchez n\'existe pas.' 
  });
});

// Middleware pour gérer les erreurs
app.use((err, req, res, next) => {
  console.error(err); // Affiche l'erreur complète
  res.status(500).send(`<pre>${err.stack}</pre>`);
});


// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});