import React, { Component } from 'react';

import FormField from './FormField';
import PasswordField from './PasswordField';

class LoginForm extends Component {

  state = { fullname: false, password: false }

  fieldStateChanged = field => state => this.setState({ [field]: state.errors.length === 0 });

  fullnameChanged = this.fieldStateChanged('fullname');
  passwordChanged = this.fieldStateChanged('password');

  render() {
    const { fullname, password } = this.state;
    const formValidated = fullname && password;

    // validation function for the fullname
    // ensures that fullname contains at least two names separated with a space
    const validateFullname = value => {
      const regex = /^[a-z]{2,}(\s[a-z]{2,})+$/i;
      if (!regex.test(value)) throw new Error('Fullname is invalid');
    };

    return (
      <div className="form-container d-table-cell position-relative align-middle">
        <form action="/" method="POST" noValidate>

          <div className="d-flex flex-row justify-content-between align-items-center px-3 mb-5">
            <legend className="form-label mb-0">Login</legend>
            { formValidated && <button type="button" className="btn btn-primary text-uppercase px-3 py-2">Login</button> }
          </div>

          <div className="py-5 border-gray border-top border-bottom">
            <FormField type="text" fieldId="fullname" label="Full Name" placeholder="Enter Full Name" validator={validateFullname} onStateChanged={this.fullnameChanged} required />

            {/** Render the password field component using thresholdLength of 6 and minStrength of 3 **/}
            <PasswordField fieldId="password" label="Password" placeholder="Enter Password" onStateChanged={this.passwordChanged} thresholdLength={6} minStrength={3} required />
          </div>

        </form>
      </div>
    );
  }

}

export default LoginForm;