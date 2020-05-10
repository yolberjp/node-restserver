const express = require('express');

const User = require('../models/user');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();

app.post('/login', (req, res)=>{


    let body = req.body;

    User.findOne({email: body.email}, (err, userDB)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                err
            });
        }

        if(!userDB){
            return res.status(400).json({
                ok:false,
                err:{
                    message: '(Usuario) o contraseña incorrecto'
                }
            });
        }

        if(!bcrypt.compareSync(body.password, userDB.password)){
            return res.status(400).json({
                ok:false,
                err:{
                    message: 'Usuario o (contraseña) incorrecto'
                }
            });
        }

        let token = jwt.sign({
            user: userDB,
        },process.env.SEED , {expiresIn: process.env.TOKEN_EXP});

        res.json({
            ok: true,
            user: userDB,
            token
        });

    })

    

});



module.exports = app;