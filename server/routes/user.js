const express = require('express');
const User = require('../models/user');

const bcrypt = require('bcrypt');
const _ = require('underscore');


const app = express();


// GET
app.get('/users', function (req, res) {
    
    let start = req.query.start || 0;
    start = Number(start);

    let limit = req.query.limit || 0;
    limit = Number(limit);

    User.find({status: true}, 'name email role google status img')
    .skip(start)
    .limit(limit)
    .exec((err, users)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                err
            });
        }

        User.count({status: true}, (err, conutRegister)=>{
            res.json({
                ok:true,
                users,
                count: conutRegister

            })
        })

        

    })

  });
  
  
  // POST
app.post('/user', function(req, res){

    let body = req.body;

    let user = new User({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    user.save((err, userDB)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                err
            });
        }

        res.json({
            ok: true,
            user: userDB
        });

    });

});
  
  
  // PUT
  app.put('/user/:id', function (req, res) {
  
      let id = req.params.id;
      let body = _.pick(req.body, ['name','email','img','role','estado']);

      User.findByIdAndUpdate(id, body, {new: true, runValidators: true},(err, userDB)=>{

        if(err){
            return res.status(400).json({
                ok:false,
                err
            });
        }

        res.json({
            ok: true,
            user: userDB
        });

      });

  });
  
  
  // DELETE
  app.delete('/user/:id', function (req, res) {

    let id = req.params.id;

    let changeStatus = {
        status: false
    }

    // User.findByIdAndRemove(id, (err, deleteUser)=>{
    User.findByIdAndUpdate(id, changeStatus,(err, deleteUser)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                err
            });
        }

        if(!deleteUser){
            return res.status(400).json({
                ok: true,
                err: {
                    message: 'Usuario no encontrado'
                }
            })
        }

        res.json({
            ok:true,
            usuario: deleteUser
        })

    });
  });

  module.exports = app;
  