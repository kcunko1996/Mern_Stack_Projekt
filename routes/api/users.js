const express = require('express');
const router = express.Router();
const User = require('../../models/User')
const keys = require('../../config/keys')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const passport = require('passport')

//Validacija
const validateRegisterInput = require('../../validation/register')

//Validacija
const validateLoginInput = require('../../validation/login')

// @ruta    GET zahtjev api/posts/test
//@opis     Testira test rutu u users 
//@pristup  Javna ruta
router.get('/test',(req,res) => {
  res.json({msg: 'Useri rade'})
});

// @ruta    GET zahtjev api/posts/Register
//@opis     Registrira korisnike
//@pristup  Javna ruta
router.post('/Register',(req,res) => {
  console.log(req.body)

  const {error, isValid} = validateRegisterInput(req.body)

  //Provjera validacije
  if(!isValid){
    return res.status(400).json(error)
  }
  User.findOne({email: req.body.email}).then(user => {
    if(user){
      res.status(400).json({email: 'Email vec postoji u bazi'})
    } else{
      const avatar = gravatar.url(req.body.email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      })
      //Ubacijvanja podataka u User model 
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.passwor,
        avatar
      })
      //Kreiranje hash sifre pomocu bcrypta
      bcrypt.genSalt(10,(err, salt) => {
        if(err){
          res.status(404).json({email: err})
        }
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err){
              res.status(400).json({email: err})
            }
            newUser.password = hash;
            newUser.save()
              .then( user => res.json(user))
              .catch(err => console.log(err))
        })
      })
    }
  })
});

// @ruta    GET zahtjev api/posts/login
//@opis     Login korisnika, davanje pristupnog tokena 
//@pristup  Javna ruta

router.post('/login', (req,res) => {
  const email = req.body.email
  const password = req.body.passwor

  const {error, isValid} = validateLoginInput(req.body)
  if(!isValid){
    return res.status(400).json(error)
  }

  //Provjera dali korisnik postoji
  User.findOne({email})
    .then(user => {
      if(!user){
        res.status(400).json({email: 'Korisnik nije pronaden'})
      } else{
        bcrypt.compare(password, user.password)
          .then(isMatch => {
            if(isMatch){
              const payload = {
                id: user.id,
                name: user.name,
                email: user.email,
                kurac: 'kurcic'
              }
              jwt.sign(payload,
                keys.secretOrKey,
                {expiresIn: 3600},
                (err,token) => {
                  if(err){
                    res.status(400).json(err)
                  }
                  return res.json({
                    succes: true,
                    token: 'Bearer ' + token})

                })
            } else{
              return res.status(400).json({passwor: 'Upisali ste krivu lozinku '})
            }
          })
      }
    })
})

// @ruta    GET zahtjev api/posts/current
//@opis     Vracanje trnutackog korisnika 
//@pristup  Privatna ruta
router.get('/current', passport.authenticate('jwt',{session:false } ),(req,res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email
  })
})

module.exports = router;