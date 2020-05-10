// Port
process.env.PORT = process.env.PORT || 3000;


// Enviroment
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// Database
let urlDB;

if(process.env.NODE_ENV == 'dev'){
    urlDB = 'mongodb://localhost:27017/coffee';
}else{
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;


// TOKEN exp
process.env.TOKEN_EXP = 60*60*24*30;


// SED Auth

process.env.SEED = process.env.SEED || 'seed-dev';

