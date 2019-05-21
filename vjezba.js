const express = require('express')
const app = express();
const moongose = require('mongoose')
const User = moongose.model('users')
const bycrpt = require('bcryptjs')


app.get('/Register', (req,res) => {
  const email = req.body.email
      User.findOne({email})
        .then(user => {
          if(user){
            res.status(400).json({msg: 'korisnik vec postoji'})
          } else{
            const newUser = new User({
              name: req.body.name,
              email: req.body.email,
              password: req.body.password
            })
            bycrpt.genSalt(10, (err, salt) => {
              if(err) throw err

              bycrpt.hash(newUser.password, salt, (err, hash) => {
                if(err) res.status(400).json({msg: err})
                newUser.save()
              })
            })

          }
        })
})