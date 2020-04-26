// Port
process.env.PORT = process.env.PORT || 3000;


// Enviroment
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// Database
let urlDB;

if(process.env.NODE_ENV == 'dev'){
    urlDB = 'mongodb://localhost:27017/coffee';
}else{
    urlDB = 'mongodb+srv://yolberjp:d4d8JfEVx1W62qbn@cluster0-s5njb.mongodb.net/coffee';
}

process.env.URLDB = urlDB;

