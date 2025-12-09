const Product = require('../models/product');

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.render('products/index', { 
      title: 'Liste des produits', 
      products 
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des produits:', error);
    res.status(500).render('error', { 
      message: 'Erreur lors de la récupération des produits' 
    });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).render('error', { 
        message: 'Produit non trouvé' 
      });
    }
    res.render('products/details', { 
      title: product.name, 
      product 
    });
  } catch (error) {
    console.error('Erreur lors de la récupération du produit:', error);
    res.status(500).render('error', { 
      message: 'Erreur lors de la récupération du produit' 
    });
  }
};

exports.showCreateForm = (req, res) => {
  res.render('products/create', { 
    title: 'Ajouter un produit' 
  });
};

exports.createProduct = async (req, res) => {
  try {
    const { name, price, description } = req.body;
    await Product.create({ name, price, description });
    res.redirect('/products');
  } catch (error) {
    console.error('Erreur lors de la création du produit:', error);
    res.status(500).render('error', { 
      message: 'Erreur lors de la création du produit' 
    });
  }
};

exports.showEditForm = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).render('error', { 
        message: 'Produit non trouvé' 
      });
    }
    res.render('products/edit', { 
      title: 'Modifier le produit', 
      product 
    });
  } catch (error) {
    console.error('Erreur lors de la récupération du produit:', error);
    res.status(500).render('error', { 
      message: 'Erreur lors de la récupération du produit' 
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const updated = await Product.update(req.params.id, { 
      name, price, description 
    });
    if (updated) {
      res.redirect('/products');
    } else {
      res.status(404).render('error', { 
        message: 'Produit non trouvé' 
      });
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour du produit:', error);
    res.status(500).render('error', { 
      message: 'Erreur lors de la mise à jour du produit' 
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.delete(req.params.id);
    if (deleted) {
      res.redirect('/products');
    } else {
      res.status(404).render('error', { 
        message: 'Produit non trouvé' 
      });
    }
  } catch (error) {
    console.error('Erreur lors de la suppression du produit:', error);
    res.status(500).render('error', { 
      message: 'Erreur lors de la suppression du produit' 
    });
  }
};