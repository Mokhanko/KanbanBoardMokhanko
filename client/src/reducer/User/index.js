import { createAction, handleActions } from 'redux-actions';

const initialState = {
  isInSignIn: false,
  user_surname: '',
  user_name: '',
  user_password: '',
  user_rePassword: '',
  curr_user_name: '',
  curr_user_id: '',
  curr_user_avatar: '',
  check_rePassword: false,
  loading_auth: false
};

export const changeIsInSignIn = createAction('CHANGE_IS_SIGN_IN');

export const loginUser = createAction('LOGIN_USER',(surname, password) => ({
  surname,
  password
}));

export const regUser = createAction('REGISTER_USER',(name, surname, password) => ({
  name,
  surname,
  password
}));

export const userLoggedActions = createAction('USER_LOGGED_ACTIONS',
(user_name, user_id, user_avatar) => ({
  user_name,
  user_id,
  user_avatar
}));

export const logOut = createAction('LOG_OUT');

export const changeSurname = createAction('CHANGE_SURNAME', surname => ({ surname }));

export const changeName = createAction('CHANGE_NAME', name => ({ name }));

export const changePassword = createAction('CHANGE_PASSWORD', password => ({ password }));

export const changeRePassword = createAction('CHANGE_REPASSWORD', repassword => ({ repassword }));

export const changeCheckRePassword = createAction('CHANGE_CHECK_REPASSWORD', check_rePassword => (
  { check_rePassword }));

export const loadingAuth = createAction('LOADING_AUTH', loading_auth => ({ loading_auth }));

export const changeCurrUserName = createAction('CHANGE_SHOWNAME', curr_user_name => (
  { curr_user_name }));

export const changeCurrUserId = createAction('CHANGE_CURRUSERID', curr_user_id => (
  { curr_user_id }));

export const changeCurrUserAvatar = createAction('CHANGE_CURRUSER_AVATAR', curr_user_avatar => (
  { curr_user_avatar }));

export default handleActions({
    [changeIsInSignIn]: state => ({
      ...state,
      isInSignIn: !state.isInSignIn
    }),
    [changeSurname]: (state, { payload }) => ({
      ...state,
      user_surname: payload.surname
    }),
    [changeName]: (state, { payload }) => ({
      ...state,
      user_name: payload.name
    }),
    [changePassword]: (state, { payload }) => ({
      ...state,
      user_password: payload.password
    }),
    [changeRePassword]: (state, { payload }) => ({
      ...state,
      user_rePassword: payload.repassword
    }),
    [changeCheckRePassword]: (state, { payload }) => ({
      ...state,
      check_rePassword: payload.check_rePassword
    }),
    [loadingAuth]: state => ({
      ...state,
      loadingAuth: !state.loadingAuth
    }),
    [changeCurrUserName]: (state, { payload }) => ({
      ...state,
      curr_user_name: payload.curr_user_name
    }),
    [changeCurrUserId]: (state, { payload }) => ({
      ...state,
      curr_user_id: payload.curr_user_id
    }),
    [changeCurrUserAvatar]: (state, { payload }) => ({
      ...state,
      curr_user_avatar: payload.curr_user_avatar
    })
  },
  initialState
)
