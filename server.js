const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require('body-parser')
const users = require('./routes/api/users')
const profile = require('./routes/api/profile')
const posts = require('./routes/api/posts')
const passport = require('passport')

const app = express();

//konfiguracija middlewarea za Body Parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Koristenje passporta 
app.use(passport.initialize())

//passport config
require('./config/passport')(passport)
//Konfiguracija Baze
const db = require('./config/keys').mongoURL;

//Povezivanje sa bazom 
mongoose
  .connect(db, {useNewUrlParser: true})
  .then(() => console.log('Baza povezana'))
  .catch(err => console.log(err))
  
app.get('/', (req,res) => res.send('Hello world') )

//Omogucuje nam koristenje ruta
app.use('/api/users', users)
app.use('/api/profile', profile)
app.use('/api/posts', posts)


const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Slusam na portu ${PORT}`))