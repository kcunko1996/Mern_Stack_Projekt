const express = require('express');
const router = express.Router();

// @ruta    GET zahtjev api/posts/test
//@opis     Testira test rutu u Profile 
//@pristup  Javna ruta
router.get('/test',(req,res) => {
  res.json({msg: 'Profili rade'})
})

module.exports = router;