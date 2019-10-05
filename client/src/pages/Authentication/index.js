import React from 'react';
import { connect } from 'react-redux';
import { compose, setDisplayName, withHandlers, setPropTypes, withState, branch, renderComponent } from 'recompose';
import {
  changeCheckRePassword,
  changeSurname,
  changePassword,
  changeRePassword,
  changeName,
  regUser,
  changeIsInSignIn,
  loginUser
} from '../../reducer/User';
import SignIn from '../../components/SignIn';
import SignUp from '../../components/SignUp';

const Auth = ({
  isInSignIn, user_name, user_surname, user_password, user_rePassword, handleUserInput, check_rePassword, regUser,
  changeIsInSignIn, loginUser
}) => (
  isInSignIn
        ?
    <SignIn
      user_surname={user_surname}
      user_password={user_password}
      handleUserInput={handleUserInput}
      changeIsInSignIn={changeIsInSignIn}
      loginUser={loginUser}
    />
    :
    <SignUp
      user_name={user_name}
      user_surname={user_surname}
      user_password={user_password}
      user_rePassword={user_rePassword}
      handleUserInput={handleUserInput}
      check_rePassword={check_rePassword}
      regUser={regUser}
      changeIsInSignIn={changeIsInSignIn}
    />
);

export default compose(connect(
  state => ({
    isInSignIn: state.user.isInSignIn,
    user_name: state.user.user_name,
    user_surname: state.user.user_surname,
    user_password: state.user.user_password,
    user_rePassword: state.user.user_rePassword,
    check_rePassword: state.user.check_rePassword
  }),
  {
    changeCheckRePassword,
    changeSurname,
    changePassword,
    changeRePassword,
    changeName,
    regUser,
    changeIsInSignIn,
    loginUser
  }
),
  withHandlers({
    handleUserInput: props => (fieldname, value) => {
      switch (fieldname) {
        case 'name':
          props.changeName(value);
          break;
        case 'surname':
          props.changeSurname(value);
          break;
        case 'password':
          props.changePassword(value);
          break;
        case 'repassword':
          props.changeRePassword(value);
          if (props.user_password === value) {
            props.changeCheckRePassword(true);
          }
          break;
        default:
          break;
      }
    }
  }),
  setPropTypes({
    // email: PropTypes.string.isRequired,
    // password: PropTypes.string.isRequired,
    // repassword: PropTypes.string.isRequired,
    // name: PropTypes.string.isRequired,
    // signin_error: PropTypes.string,
    // check_email: PropTypes.bool.isRequired,
    // check_password: PropTypes.bool.isRequired,
    // check_repassword: PropTypes.bool.isRequired,
    // changeEmail: PropTypes.func.isRequired,
    // changePassword: PropTypes.func.isRequired,
    // changeRePassword: PropTypes.func.isRequired,
    // changeName: PropTypes.func.isRequired,
    // changeCheckEmail: PropTypes.func.isRequired,
    // changeCheckPassword: PropTypes.func.isRequired,
    // changeCheckRePassword: PropTypes.func.isRequired,
    // regUser: PropTypes.func.isRequired
  }),
)(Auth)
