const { Router } = require('express');
const image = require('../models/image');
const router = Router();
//modulo de eliminar de la carpeta, solo usamos una parte de la libreria.
//Este recibe un parametro de la direccion de la foto a eliminar
//path import porque trabajamos con rutas.
const path = require('path');
const { unlink } = require('fs-extra');

const Image = require('../models/image');
const User = require('../models/user');

router.get('/', async (req, res) => {
  const images = await image.find();
    res.render('index', { images });
});

router.get('/upload', (req, res) => {
    res.render('upload');
});

/*router.get('/login', (req, res) => {
	res.render('login');
});

router.get('/registrar', (req, res) => {
	res.render('registrar');
});*/


router.post('/upload', async (req, res) => {
    
    const image = new Image();
    image.title = req.body.title;
    image.description = req.body.description;
    image.filename = req.file.fieldname;
    image.path = '/img/uploaded/';
    image.originalname = req.file.originalname;
    image.mimetype = req.file.mimetype;
    image.size = req.file.size;

    await image.save();
    res.redirect('/')
});

router.get('/image/:id', async (req, res) => {
   const { id } = req.params;
	 const image = await Image.findById(id);
	 res.render('profile', { image });
});

router.get('/image/:id/delete', async (req, res) => {
	const { id } = req.params;
	console.log(id);
	const image = await Image.findByIdAndDelete(id);
	await unlink(path.resolve('./src/public/' + image.path));
  res.redirect('/');
});

module.exports = router;