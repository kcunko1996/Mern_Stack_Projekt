import React, { Component } from 'react'
import propTypes from 'prop-types'
import {connect} from 'react-redux'
import {userlogin} from '../../actions/authActions'
import TextFieldGroup from '../common/TextFieldGroup'
 class Login extends Component {
   constructor(){
     super()
     this.state = {
       email: '',
       password: '',
       errors: {}
     }
    }
    onChange(e) {
      this.setState({[e.target.name]: e.target.value})
    }
    onSubmit(e){
      e.preventDefault()
      const newUserLogin ={
        email: this.state.email,
        passwor: this.state.password
      }
      this.props.userlogin(newUserLogin)
      
    }

    componentDidMount(){
      if(this.props.auth.isAuthenticated){
        this.props.history.push('/dashboard')
      }
    }
    componentWillReceiveProps(nextprops) {

      if(nextprops.auth.isAuthenticated){
        this.props.history.push('/dashboard')
      }

      if(nextprops.errors){
        this.setState({errors: nextprops.errors})
        
      }
    }
  render() {
    const { errors } = this.state
    
    return (
      <div className='container'>
        <h1 className="display-4 text-center">
        Login
        </h1>
        <p className="lead text-center">
        Prijavite se na svoj račun
        </p>
        <div className="row">
        <div className="col-md-8 m-auto">
        <form onSubmit = {(e) => this.onSubmit(e)}>
        <TextFieldGroup
        name='email'
        placeholder="Email"
        value= {this.state.email}
        type='email'
        onChange={e => this.onChange(e)}
        error={errors.email}
        />
       
        <TextFieldGroup
        name='password'
        placeholder="Password"
        value= {this.state.password}
        type='password'
        onChange={e => this.onChange(e)}
        error={errors.passwor}
        />
        <input type="submit"  className="btn btn-block btn-info mt-4" value="Prijavi se"/>
        </form>
        </div>
        </div>
      </div>
    )
  }
}
Login.propTypes = {
  userlogin: propTypes.func.isRequired,
  auth: propTypes.object.isRequired,
  errors: propTypes.object.isRequired
}
const mapStateToProps = (state) =>({
  auth: state.auth,
  errors: state.errors

})

export default connect(mapStateToProps, {userlogin})(Login);
