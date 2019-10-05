import { put, call, fork, all, takeEvery } from 'redux-saga/effects';
import request from '../../services/axiosMethods';
import { history } from '../../store';
import {
  loginUser,
  loadingAuth,
  logOut,
  userLoggedActions,
  regUser,
  changeCurrUserName,
  changeCurrUserId,
  changeCurrUserAvatar,
  changePassword,
  changeRePassword,
  changeName,
  changeSurname,
  changeCheckRePassword
} from './';

function* fetchUserLogin(payload){
  try {
    yield put(loadingAuth(true));
    const {data, error} = yield call(request,({
      url:  '/auth/sign_in',
      method: 'POST',
      data: {
        surname: payload.payload.surname,
        password: payload.payload.password
      }
    }));
    if(error){
      console.warn(error);
    }else{
      yield put(changeCurrUserName(data.name));
      yield put(changeCurrUserId(data._id));
      history.push('/');
    }
  }
  finally {
    yield put(loadingAuth(false));
    yield put(changeName(''));
    yield put(changeSurname(''));
    yield put(changePassword(''));
    yield put(changeRePassword(''));
    yield put(changeCheckRePassword(''));
  }
}

function* fetchUserRegistration(payload){
  try{
    yield put(loadingAuth(true));
    const { data, error } = yield call(request,({
      url:  '/auth/register',
      method: 'POST',
      data: {
        name: payload.payload.name,
        surname: payload.payload.surname,
        password: payload.payload.password
      }
    }));
    if(error){
      console.warn(error);
    }else{
      yield put(changeCurrUserName(data.name));
      yield put(changeCurrUserId(data._id));
      history.push('/');
    }
  }
  finally{
    yield put(loadingAuth(false));
    yield put(changeName(''));
    yield put(changeSurname(''));
    yield put(changePassword(''));
    yield put(changeRePassword(''));
    yield put(changeCheckRePassword(''));
  }
}

function* fetchIsUserLog(){
  try{
    yield put(loadingAuth(true));
    const {data, error} = yield call(request,({
      url: '/auth/sign_in',
      method: 'POST'
    }));
    if(error){

    }else{
      yield put(userLoggedActions(data.name, data._id));
    }
  }
  finally {
    yield put(loadingAuth(false));
  }
}

// function* fetchLogOut(){
//   yield put(logOutActions());
// }
//
// function* watchUserLogged(){
//   yield takeEvery(isUserLogged, fetchIsUserLog)
// }

function* watchFetchUser(){
  yield takeEvery(loginUser, fetchUserLogin)
}

function* watchFetchRegisterUser(){
  yield takeEvery(regUser, fetchUserRegistration)
}

// function* watchLogOut(){
//   yield takeEvery(logOut, fetchLogOut);
// }

export function* userSaga() {
  yield all([
    fork(watchFetchUser),
    fork(watchFetchRegisterUser)
    // fork(watchUserLogged),
    // fork(watchLogOut)
  ])
}
