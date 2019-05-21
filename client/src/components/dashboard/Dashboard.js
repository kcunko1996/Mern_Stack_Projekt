import React, { Component } from 'react'
import propTypes from 'prop-types'

import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getCurrentProfile} from '../../actions/profileactions'
import Spinner from '../common/Spinner'
class Dashboard extends Component {
  componentDidMount(){
    this.props.getCurrentProfile()
  }
  render() {
    
    const {profile, loading} = this.props.profile
    const {user} = this.props.auth
    let dashContent 

    if(profile === null || loading){
        dashContent = <Spinner/>
    }
    else{
      //Ako korisnik ima profile podatke
      if(Object.keys(profile).length > 0) {
          dashContent = (<h4> Display profile</h4>)
      } else {
        dashContent = (<div>
          <p className="lead text-muted"> Dobrodosli {user.name}</p>
          <p>Jos niste napravili svoj profil, molimo dodajte ga</p>
          <Link to='/create-profile' className='btn btn-lg btn-info'>
          Napravite profil
          </Link>
        </div>)
      }
    }
    return (
      <div className='dashboard'>
      <div className="container">
      <div className="row">
      <div className="col-md-12">
      <h1 className="display-4">
    
      </h1>
      {dashContent}
      </div>
      </div>
      </div>
        <h1>Dashboard</h1>
      </div>
    )
  }
}

Dashboard.propTypes = {
  getCurrentProfile: propTypes.func.isRequired,
  auth: propTypes.object.isRequired,
  profile: propTypes.object.isRequired,
}
const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
})
export default connect(mapStateToProps, {getCurrentProfile}) (Dashboard)