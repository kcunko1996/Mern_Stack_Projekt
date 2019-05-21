import React, { Component } from 'react'
import propTypes from 'prop-types'
import {connect} from 'react-redux'
import {userRegister} from '../../actions/authActions'
import {withRouter} from 'react-router-dom'
import TextFieldGroup from '../common/TextFieldGroup'

 class Register extends Component {
  constructor(){
    super()
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {}
    }

    
  }


   onChange = (evt) => {
      this.setState({[evt.target.name]: evt.target.value})
  }
  onSubmit = (evt) => {
    evt.preventDefault()
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      passwor: this.state.password,
      passwor2: this.state.password2,
      errors: this.state.errors,
    }
   this.props.userRegister(newUser, this.props.history)
        }

        componentDidMount(){
          if(this.props.auth.isAuthenticated){
            this.props.history.push('/dashboard')
          }
        }

      componentWillReceiveProps(nextProps){
          if(nextProps.errors){
            this.setState({errors: nextProps.errors})
          }
      }
  render() {
    const { errors } = this.state
    return (
      
      <div className="register">
   
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Registracija</h1>
            <p className="lead text-center">Napravite svoj DevMeet korisnički račun</p>
            <form noValidate onSubmit={(evt) => this.onSubmit(evt)}>
                    <TextFieldGroup
                name='name'
                placeholder="Ime"
                value= {this.state.name}
                onChange={e => this.onChange(e)}
                error={errors.name}
                />
              
              <TextFieldGroup
                name='email'
                placeholder="Email"
                value= {this.state.email}
                onChange={e => this.onChange(e)}
                error={errors.email}
                />
               <TextFieldGroup
                name='password'
                placeholder="Lozinka"
                value= {this.state.password}
                onChange={e => this.onChange(e)}
                error={errors.passwor}
                />
               <TextFieldGroup
                name='password2'
                placeholder="Ponovite lozinku"
                value= {this.state.password2}
                onChange={e => this.onChange(e)}
                error={errors.passwor2}
                />
              <input type="submit" className="btn btn-info btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
    )
  }
}
Register.propTypes = {
  userRegister: propTypes.func.isRequired,
  auth: propTypes.object.isRequired,
  errors: propTypes.object.isRequired
}
const mapStateToProps = (state) =>({
  auth: state.auth,
  errors: state.errors

})
export default connect(mapStateToProps, {userRegister})(withRouter( Register));
