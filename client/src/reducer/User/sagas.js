import { put, call, fork, all, takeEvery } from 'redux-saga/effects';
import request from '../../services/axiosMethods';
import { history } from '../../store';
import STORAGE from '../../services/localStore';
import {
  loginUser,
  loadingAuth,
  logOut,
  regUser,
  changeCurrUserName,
  changeCurrUserId,
  changePassword,
  changeRePassword,
  changeName,
  changeSurname,
  changeCheckRePassword
} from './';

function* fetchUserLogin(payload){
  try {
    console.log('LOGIN start');
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
      console.log('LOGIN SUCCESS',data);
      STORAGE.set('UserName', data.name);
      STORAGE.set('UserId', data._id);
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
      STORAGE.set('UserName', data.name);
      STORAGE.set('UserId', data._id);
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

function* fetchLogOut(){
  STORAGE.remove('UserName');
  STORAGE.remove('UserId');
  yield put(changeCurrUserName(''));
  yield put(changeCurrUserId(''));
  history.push('/auth');
}

function* watchFetchUser(){
  yield takeEvery(loginUser, fetchUserLogin)
}

function* watchFetchRegisterUser(){
  yield takeEvery(regUser, fetchUserRegistration)
}

function* watchLogOut(){
  yield takeEvery(logOut, fetchLogOut);
}

export function* userSaga() {
  yield all([
    fork(watchFetchUser),
    fork(watchFetchRegisterUser),
    fork(watchLogOut)
  ])
}
