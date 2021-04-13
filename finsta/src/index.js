const express = require('express');
const morgan = require('morgan');
const path = require('path');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
uuidv4();
const { format } = require('timeago.js');

// Initialization
const app = express();
require('./database');

// Settings
 app.set('port', process.env.PORT || 3000);
 app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var fs = require('fs');
//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
const storage = multer.diskStorage({

    destination: path.join(__dirname, 'public/img/uploaded'),
    filename: (req, file, cb, filename) => {
			console.log(uuidv4());
        cb(null, file.originalname);
    }

});
app.use(multer({
    storage: storage
}).single('image'));


//Global variables
app.use((req, res, next) => {
	app.locals.format = format;
	next();
});

//Routes
app.use(require('./routes/index'));


//Static files
app.use(express.static(path.join(__dirname, 'public')));

//Start the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
})

/*app.post('/registrar', (req, res) => {
const {username, password} = req.body;

const user = new User({username, password});
user.save(err =>{
if(err){
res.status(500).send('ERROR AL REGISTRAR AL USUARIO');
}else{
	res.status(200).send('USUARIO REGISTRADO');
}
});
});

app.post('/autentificar', (req, res) => {
	const {username, password} = req.body;

	User.findOne({username}, (err, user) =>{
		if(err){
			res.status(500).send('ERROR AL AUNTENTIFICAR AL USUARIO');
		}else if(!user){
			res.status(500).send('USUARIO NO EXISTE');
		}else{
			user.isCorrect(password, (err, result) =>{
				if(err){
					res.status(500).send('ERROR AL AUNTENTIFICAR');
				}else if(!user){
					res.status(200).send('USUARIO Autentificado');
				}else{ 
					res.status(500).send('USUARIO O CONTRASEÑA INCORRECTOS');
				}
			});
		}
	})
});*/