import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer' 
import Landing from './components/layout/Landing' 
import Register from './components/authorization/Register';
import Login from './components/authorization/Login';
import {Provider} from 'react-redux'
import jwt_decode from 'jwt-decode'
import {setAuthToken} from './utils/setAuthToken'
import {setCurrentUser, logoutuser} from './actions/authActions'
import {clearCurrentProfile} from './actions/profileactions'
import store from './store'
import Dashboard from './components/dashboard/Dashboard'

function App() {
  if(localStorage.jwtToken){
    //POstavi token u header
    setAuthToken(localStorage.jwtToken)
    //Dekoidiraj token pomocu knjizice jwt_decode
    const decode = jwt_decode(localStorage.jwtToken)
    
    store.dispatch(setCurrentUser(decode))

    const currentTime = Date.now() / 1000
    if(decode.exp < currentTime) {
      store.dispatch(logoutuser())
    store.dispatch(clearCurrentProfile())

      window.location.href = '/login'
    }
  }
  return (
    <Provider store = {store}>
    <Router>
    <div className="App">
    <Navbar />
    <Route exact path='/' component= { Landing } />
    
    <Route exact path="/register" component={Register}></Route>
    <Route exact path="/login" component={Login}></Route>
    <Route exact path="/dashboard" component={Dashboard}></Route>
    
    <Footer/>
      
    </div>
    </Router>
    </Provider>
  );
}

export default App;
