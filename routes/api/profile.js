const express = require('express');
const router = express.Router();
const moongose = require('mongoose')
const passport = require('passport')
const validateProfileInput = require('../../validation/profile')
const ValidateExperienceInput = require('../../validation/experience')
const ValidateEducationInput = require('../../validation/education')


moongose.set('useFindAndModify', false);
//Dohvacanje Profile Modela
const Profile = require('../../models/Profile')

//Dohvacanje User Modela
const User = require('../../models/User')

// @ruta    GET zahtjev api/posts/test
//@opis     Testira test rutu u Profile 
//@pristup  Javna ruta
router.get('/test',(req,res) => {
  res.json({msg: 'Profili rade'})
})


// @ruta    GET zahtjev api/profile
//@opis     Dohvati profil korisnika 
//@pristup  Privatna ruta
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id})
      .populate('user', ['name', 'avatar'])
      .then(profile => {
        if (!profile) {
          errors.noprofile = 'Profil ne postoji';
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json({profile: 'Profil ne postoji'}));
  }
);
// @ruta    GET zahtjev api/profile/:all
//@opis     Dohvati profil svih korisnika 
//@pristup  Privatna ruta
router.get('/all',  (req,res) => {
  Profile.find()
         .populate('user', ['name', 'avatar'])
         .then(profile => {
           if(!profile){
             return res.status(404).json('Ne postoji niti jedan profil')
           }
           res.json(profile)
         })
         .catch(err => res.status(404).json({profile: 'Profil ne postoji'}))
})

// @ruta    GET zahtjev api/profil/handle/:handle
//@opis     Dohvacanje profila sa handleom  
//@pristup  Javna ruta
router.get('/handle/:handle', (req,res) => {
  Profile.findOne({handle: req.params.handle})
         .populate('user', ['name', 'avatar'])
         .then(profile => {
           if(!profile){
             errors.noprofile = 'Profil ne postoji'
             res.status(404).json(errors)
           }
          res.json(profile)
         })
         .catch(err => res.status(404).json({profile: 'Profil ne postoji'}))
})

// @ruta    GET zahtjev api/profil/user/id
//@opis     Dohvacanje profila sa user id
//@pristup  Javna ruta
router.get('/user/:id', (req,res) => {
  Profile.findOne({user: req.params.id})
         .populate('user', ['name', 'avatar'])
         .then(profile => {
           if(!profile){
             errors.noprofile = 'Profil ne postoji'
             res.status(404).json(errors)
           }
          res.json(profile)
         })
         .catch(err => res.status(404).json(err))
})


// @ruta    POST zahtjev api/profile
//@opis     Izgradi ili izmjeni profil korisnika 
//@pristup  Privatna ruta
router.post('/',passport.authenticate('jwt',{session: false}), (req,res) => {
  const {errors,isValid} = validateProfileInput(req.body)


  //Provjera Validacije
  if(!isValid){
      return res.status(400).json(errors)
  }

  const profileFields = {}
  profileFields.user = req.user.id
  if(req.body.handle) profileFields.handle = req.body.handle
  if(req.body.company) profileFields.company = req.body.company
  if(req.body.website) profileFields.website = req.body.website
  if(req.body.location) profileFields.location = req.body.location
  if(req.body.bio) profileFields.bio = req.body.bio
  if(req.body.status) profileFields.status = req.body.status
  if(req.body.githubusernam) profileFields.githubusernam = req.body.githubusernam

  if(typeof req.body.skills !== 'undefined'){
    profileFields.skills = req.body.skills.split(',')
  }

  profileFields.social = {};
  if(req.body.youtube) profileFields.social.youtube = req.body.youtube
  if(req.body.facebook) profileFields.social.facebook = req.body.facebook
  if(req.body.twitter) profileFields.social.twitter = req.body.twitter
  if(req.body.linkedin) profileFields.social.linkedin = req.body.linkedin
  if(req.body.instagram) profileFields.social.instagram = req.body.instagram

 Profile.findOne({user: req.user.id})
        .then(profile => {
          if(profile){
           
            Profile.findOneAndUpdate({user: req.user.id}, {$set: profileFields}, {new: true})
                    .then(profile => res.json(profile)).catch(err => res.status(400).json(err))
                    
          }

          //Izgradi
          else{
              Profile.findOne({handle: profileFields.handle})
                      .then(profile => {
                        if(profile){
                          res.status(400).json('Handle vec postoji')
                        }
                        
                        new Profile(profileFields).save().then( profile => res.json(profile))

                      }).catch(err => res.status(400).json('error'))
          }
        })
        .catch(err => res.status(400).json(err))

        
})


// @ruta    POST zahtjev api/profile/experience
//@opis     Dodaj iskustvo u profil korisnika
//@pristup  Privatna ruta

router.post('/experience', passport.authenticate('jwt',{session: false}), (req,res) => {
  const {errors,isValid} = ValidateExperienceInput(req.body)
  //Provjera Validacije
  if(!isValid){
    return res.status(400).json(errors)
}

  Profile.findOne({user: req.user.id})
         .then(profile => {
           if(!profile){
             res.status(404).json({profile: 'Korisnik ne postoji'})
           }
           const newExp = {
             title: req.body.title,
             company: req.body.company,
             loaction: req.body.loaction,
             from: req.body.from,
             to: req.body.to,
             current: req.body.current,
             description: req.body.description,
           }

           profile.experience.unshift(newExp)

           profile.save().then(profile => res.json(profile))
         })
})

// @ruta    POST zahtjev api/profile/education
//@opis     Dodaj priajsnju edukaciju u profil korisnika
//@pristup  Privatna ruta

router.post('/education', passport.authenticate('jwt',{session: false}), (req,res) => {
  const {errors,isValid} = ValidateEducationInput(req.body)
  //Provjera Validacije
  if(!isValid){
    return res.status(400).json(errors)
}

  Profile.findOne({user: req.user.id})
         .then(profile => {
           if(!profile){
             res.status(404).json({profile: 'Korisnik ne postoji'})
           }
           const newEdu = {
             school: req.body.school,
             degree: req.body.degree,
             fieldofstudy: req.body.fieldofstudy,
             from: req.body.from,
             to: req.body.to,
             current: req.body.current,
             description: req.body.description,
           }

           profile.education.unshift(newEdu)

           profile.save().then(profile => res.json(profile))
         })
})


// @ruta    DELETE zahtjev api/profile/experience/:exp_id
//@opis     Omogucuje korisniku brisanje iz experience polja
//@pristup  Privatna ruta

router.delete('/experience/:exp_id', passport.authenticate('jwt',{session: false}), (req,res) => {

  Profile.findOne({user: req.user.id})
         .then(profile => {
           if(!profile){
             res.status(404).json({profile: 'Korisnik ne postoji'})
           }
           const remove = profile.experience.map(item => item.id).indexOf(req.params.exp_id)

           profile.experience.splice(remove,1)

           profile.save().then(profile => res.json(profile))
         })
         .catch(err => res.json({profile: 'Profil ne postoji'}))
})

// @ruta    DELETE zahtjev api/profile/education/:edu_id
//@opis     Omogucava korisniku brisanje stavki iz edukacije
//@pristup  Privatna ruta

router.delete('/education/:edu_id', passport.authenticate('jwt',{session: false}), (req,res) => {

  Profile.findOne({user: req.user.id})
         .then(profile => {
           if(!profile){
             res.status(404).json({profile: 'Korisnik ne postoji'})
           }
           const remove = profile.education.map(item => item.id).indexOf(req.params.edu_id)

           profile.education.splice(remove,1)

           profile.save().then(profile => res.json(profile))
         })
         .catch(err => res.json({profile: 'Profil ne postoji'}))
})


// @ruta    DELETE zahtjev api/profile
//@opis     Omogucava korisniku brisanje user i profil stavke iz baze
//@pristup  Privatna ruta

router.delete('/', passport.authenticate('jwt',{session: false}), (req,res) => {
  Profile.findOneAndDelete({user: req.user.id})
         .then(() => {
           User.findOneAndRemove({_id: req.user.id})
           .then(() => res.json({success: 'true'}))
           .catch(() => res.status(400).json({success: 'false '}))
         })
         .catch(() => res.status(400).json({success: 'false '}))
})
module.exports = router;