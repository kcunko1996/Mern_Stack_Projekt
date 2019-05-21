import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import propTypes from 'prop-types'
import {connect} from 'react-redux'

 class Landing extends Component {

  componentDidMount(){
    if(this.props.auth.isAuthenticated){
      this.props.history.push('/dashboard')
    }
  }
  render() {
    return (
      <div className="landing">
      <div className="dark-overlay  text-light">
        <div className="container">
          <div className="row landing-inner">
            <div className="col-md-12 m-auto text-center">
              <h1 className="display-3 mb-3"><b>Developer </b>Meet
              </h1>
              <p className="lead"> Napravite svoj <b>portifolio ili profil</b>, te dijelite svoja iskustva sa drugim <b>developerima</b> </p>
              <hr />
              <Link to="/register" className="btn btn-lg btn-info mr-3 ">Registriraj se</Link>
              <Link to="/login" className="btn btn-lg btn-light ">Prijavi se</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

Landing.propTypes = {
  auth:propTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})
export default connect(mapStateToProps) (Landing)