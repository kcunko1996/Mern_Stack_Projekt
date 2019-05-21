//Dohvacanje potrebnih stavki
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const passport = require('passport')

//Dohvacanje modela
const Profile = require('../../models/Profile')
const Post = require('../../models/Post')

//Dohvacanje potrebne validacije
const PostValidationInput = require('../../validation/post')

// @ruta    GET zahtjev api/posts/test
//@opis     Testira test rutu u posts 
//@pristup  Javna ruta
router.get('/test',(req,res) => {
  res.json({msg: 'Posts rade'})
})

// @ruta    POST zahtjev api/posts
//@opis     Kreira novi post korisnika 
//@pristup  Privatna ruta
router.post('/', passport.authenticate('jwt',{session: false}), (req,res) => {

  const {errors,isValid} = PostValidationInput(req.body)
  //Provjera Validacije
  if(!isValid){
    return res.status(400).json(errors)
}

  const newPost = new Post( {
    text: req.body.text,
    name: req.body.name,
    avatar: req.body.avatar,
    user: req.user.id
  })

  newPost.save().then(post => res.json(post))
})

// @ruta    GET zahtjev api/posts
//@opis     Dohavaca objave
//@pristup  Javna ruta
router.get('/', (req,res) => {
  Post.find().sort({date: -1})
      .then(post => res.json(post))
      .catch(() => res.status(404).json({nopost: 'Neuspjesno dohvacanje postova'}))
})

// @ruta    GET zahtjev api/posts
//@opis     Dohavaca jednu objava uz pomoc id
//@pristup  Javna ruta
router.get('/:id', (req,res) => {
  Post.findById(req.params.id)
      .then(post => res.json(post))
      .catch(() => res.status(404).json({nopost: 'Ta objava ne postoji'}))
})

// @ruta    Delete zahtjev api/posts
//@opis     Brise objavu uz pomoc ida
//@pristup  private ruta
router.delete('/:id', passport.authenticate('jwt',{session: false}), (req,res) => {
 Profile.findOne({user: req.user.id})
        .then(profile => {
          Post.findById(req.params.id)
              .then(post => {
               post.remove().then(() => res.json({profilefound: 'Objava je uspjesno izbrisana'}))
              })
              .catch(() => res.status(404).json({profilenotfound: 'Objava nije pronadena'}))
        })
})

// @ruta    POST zahtjev api/posts/like//:id
//@opis     Omogucava korisniku lajkati obajvu
//@pristup  private ruta
router.post('/like/:id', passport.authenticate('jwt',{session: false}), (req,res) => {
  Profile.findOne({user: req.user.id})
         .then(profile => {
           Post.findById(req.params.id)
               .then(post => {
                if(
                  post.likes.filter(like => like.user.toString() === req.user.id).length > 0
                  ){
                  return res.status(400).json({alreadyliked: 'Korisnik je vec lajkao objavu'})
                }
                post.likes.unshift({user: req.user.id})
                post.save().then(post => res.json(post))
               })
               .catch(() => res.status(404).json({profilenotfound: 'Objava nije pronadena'}))
         })
 })

 // @ruta    POST zahtjev api/posts/unlike/:id
//@opis     Omogucava korinsiku unlike objavu 
//@pristup  private ruta
router.post('/unlike/:id', passport.authenticate('jwt',{session: false}), (req,res) => {
  Profile.findOne({user: req.user.id})
         .then(profile => {
           Post.findById(req.params.id)
               .then(post => {
                if(
                  post.likes.filter(like => like.user.toString() === req.user.id).length === 0
                  ){
                  return res.status(400).json({alreadyliked: 'Jos niste lajkali post'})
                }

                const remove = post.likes.map(item => item.id).indexOf(req.user.id)
                post.likes.splice(remove, 1)
                post.save().then(post => res.json(post))
               })
               .catch(() => res.status(404).json({postnotfound: 'Objava nije pronadena'}))
         })
         .catch(() => res.status(404).json({profilenotfound: 'Objava nije pronadena'}))
 })
 
  // @ruta    POST zahtjev api/posts/commnent/:id
//@opis     Omogucavanje komentiranja 
//@pristup  private ruta
router.post('/comment/:id', passport.authenticate('jwt',{session: false}), (req,res) => {

  const {errors,isValid} = PostValidationInput(req.body)
  //Provjera Validacije
  if(!isValid){
    return res.status(400).json(errors)
}
      Profile.find({user: req.user.id})
              .then(() => {
                Post.findById(req.params.id)
                    .then(post => {
                      const newComment = {
                        text: req.body.text,
                        name: req.body.name,
                        avatar: req.body.avatar,
                        user: req.body.user,
                      }

                      post.comments.unshift(newComment);

                      post.save().then(post => res.json(post))
                    })
                    .catch(() => res.status(404).json({postnotfound: 'Objava nije pronadena'}))
              })
              .catch(() => res.status(404).json({Profilenotfound: 'Profil nije pronadena'}))
})

  // @ruta    DELETE zahtjev api/posts/commnent/:id
//@opis     Omogucavanje komentiranja 
//@pristup  private ruta
router.delete('/comment/:id/:comment_id', passport.authenticate('jwt',{session: false}), (req,res) => {

      Profile.find({user: req.user.id})
              .then(() => {
                Post.findById(req.params.id)
                    .then(post => {
                      if(post.comments.filter(comment => comment.id === req.params.comment_id).length === 0){
                        return res.status(404).json({commentnotexists: 'Comment does not exist'})
                      }

                      const remove = post.comments.map(item => item.id).indexOf(req.params.comment_id)
                      post.comments.splice(remove,1)
                      post.save().then(post => res.json(post))
                    })
                    .catch(() => res.status(404).json({postnotfound: 'Objava nije pronadena'}))
              })
              .catch(() => res.status(404).json({Profilenotfound: 'Profil nije pronadena'}))
})


module.exports = router;