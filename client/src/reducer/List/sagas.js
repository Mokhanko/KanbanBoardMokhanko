import { takeLatest, put, all, call } from 'redux-saga/effects';
import request from '../../services/axiosMethods';
import {
  startCreateList,
  toggleCreateModalList,
  toggleEditListModal,
  createList,
  addList,
  changeListName,
  deleteList,
  startLoadList,
  startEditList,
  editList,
  loadingLists
} from './index';
import { deleteAllCards } from '../Card';


export function* startLoadListSaga() {
  try {
    yield put(loadingLists(true));
    const { data, error } = yield call(request, ({
      url: '/list/get_lists'
    }));
    if(error) {
      console.warn(error);
    }else{
      yield put(addList(data));
    }
  } finally {
      yield put(loadingLists(false));
  }
}

export function* startCreateListSaga() {
  yield put(toggleCreateModalList());
}

export function* createListSaga(payload) {
  try{
    yield put(loadingLists(true));
    const { error } = yield call(request,({
      url:  '/list/create_list',
      method: 'POST',
      data: {
        title: payload.payload.listName,
        author: payload.payload.author
      }
    }));
    if(error) {
      console.warn(error);
    }
  }
  finally{
    yield put(loadingLists(false));
    yield put(changeListName(''));
    yield put(toggleCreateModalList());
    yield put(startLoadList());
  }
}

export function* startDeleteListSaga(payload) {
  try{
    yield put(loadingLists(true));
    const { error } = yield call(request,({
      url:  '/list/delete_list',
      method: 'POST',
      data: {
        _id: payload.payload.list
      }
    }));
    if(error) {
      console.warn(error);
    } else{
      yield put(deleteAllCards(payload.payload.list));
    }
  }
  finally{
    yield put(loadingLists(false));
    yield put(startLoadList());
  }
}

export function* startEditListSaga(){
  yield put(toggleEditListModal());
}

export function* editListSaga(payload){
  try{
    yield put(loadingLists(true));
    const { error } = yield call(request,({
      url:  '/list/update_list',
      method: 'PUT',
      data: {
        _id: payload.payload.activeListId,
        title: payload.payload.listName
      }
    }));
    if(error) {
      console.warn(error);
    }
  }
  finally{
    yield put(loadingLists(false));
    yield put(changeListName(''));
    yield put(toggleCreateModalList());
    yield put(startLoadList());
  }
}

export function* watchStartCreateList() {
  yield takeLatest(startCreateList, startCreateListSaga)
}

export function* watchStartLoadList() {
  yield takeLatest(startLoadList, startLoadListSaga)
}

export function* watchStartEditList(){
  yield takeLatest(startEditList, startEditListSaga)
}

export function* watchEditList(){
  yield takeLatest(editList, editListSaga)
}

export function* watchDeleteList() {
  yield takeLatest(deleteList, startDeleteListSaga)
}

export function* watchCreateList() {
  yield takeLatest(createList, createListSaga)
}

export function* boardSagas(){
  yield(all(
    [
      call(watchStartCreateList),
      call(watchCreateList),
      call(watchDeleteList),
      call(watchStartLoadList),
      call(watchStartEditList),
      call(watchEditList)
    ]
  ))
}
