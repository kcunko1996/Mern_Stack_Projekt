import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import propTypes from 'prop-types'
import {connect} from 'react-redux'
import {logoutuser} from '../../actions/authActions'
import {clearCurrentProfile} from '../../actions/profileactions'
import {withRouter} from 'react-router-dom'
class Navbar extends Component {

  onLogout = (e) =>{
    e.preventDefault()
    this.props.clearCurrentProfile()
    this.props.logoutuser(this.props.history)
}
  render() {

    const { isAuthenticated, user } = this.props.auth
    
    //Prikaz navigacije prijavljenom korisniku
    const authLinks = ( <ul className="navbar-nav ml-auto">
            
            <li className="nav-item">
              <a href="" className="nav-link" onClick={ e => this.onLogout(e)}> 
              <img src={user.avatar} className='rounded-circle' alt={user.name} style={{width: '25px', marginRight: '6px'}}/>
              Logout
               </a>
            </li>
          </ul>)


   //Prikaz navigacije neprijavljenom korisniku       
   const gusetLinks = ( <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/register">Sign Up</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
          </ul>)


    

    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
      <div className="container">
        <Link className="navbar-brand" to="/">
        DevMeet</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
          <span className="navbar-toggler-icon"></span>
        </button>
  
        <div className="collapse navbar-collapse" id="mobile-nav">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/profile"> Developers
              </Link>
            </li>
          </ul>
          {isAuthenticated ? authLinks : gusetLinks}
         
        </div>
      </div>
    </nav>
    )
  }
}
Navbar.propTypes = {
  logoutuser: propTypes.func.isRequired,
  auth: propTypes.object.isRequired
 
}
const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, {logoutuser,clearCurrentProfile})(withRouter( Navbar)); 