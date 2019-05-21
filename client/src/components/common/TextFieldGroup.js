import React from 'react'
import propTypes from 'prop-types'
import classnames from 'classnames'
const TextFieldGroup = ({name, placeholder, value, error, info, type, onChange, disabled}) => {
  
  return (
    <div className="form-group">
        <input type={type} placeholder={placeholder} name={name}  className={classnames('form-control form-control-lg' , {'is-invalid': error})} value={value} onChange = {onChange} disabled={disabled}/>
        {info && <small className='form-text text-muted'>{info}</small>}
        {error && (<div className="invalid-feedback">{error}</div>) }

        </div>
  )
}
TextFieldGroup.propTypes = {
  name: propTypes.string.isRequired,
  placeholder: propTypes.string,
  value: propTypes.string.isRequired,
  info: propTypes.string,
  error: propTypes.string,
  type: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired,
  disabled: propTypes.string
}
TextFieldGroup.defaultProps = {
  type: 'text'
}
export default TextFieldGroup