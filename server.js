const express = require("express")
const mongoose = require("mongoose")

//Dohvacanje podataka sa skripti users,profile,posts
const users = require('./routes/api/users')
const profile = require('./routes/api/profile')
const posts = require('./routes/api/posts')

const app = express();

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