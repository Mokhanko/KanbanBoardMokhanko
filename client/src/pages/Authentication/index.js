import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose, withHandlers, setPropTypes, branch, renderComponent } from 'recompose';
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
import Loader from '../../components/Loader';

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
    check_rePassword: state.user.check_rePassword,
    loading_auth: state.user.loading_auth
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
    curr_user_name: PropTypes.string,
    user_name: PropTypes.string,
    user_surname: PropTypes.string,
    user_password: PropTypes.string,
    user_rePassword: PropTypes.string,
    isInSignIn: PropTypes.bool,
    check_rePassword: PropTypes.bool,
    loading_auth: PropTypes.bool,
    changeCheckRePassword: PropTypes.func,
    changeSurname: PropTypes.func,
    changePassword: PropTypes.func,
    changeRePassword: PropTypes.func,
    changeName: PropTypes.func,
    regUser: PropTypes.func,
    changeIsInSignIn: PropTypes.func,
    loginUser: PropTypes.func,
  }),
  branch(
    props => props.loading_auth,
    renderComponent(Loader)
  )
)(Auth)
