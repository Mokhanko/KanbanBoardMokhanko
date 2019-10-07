import { takeLatest, put, all, call } from 'redux-saga/effects';
import request from '../../services/axiosMethods';
import {
  toggleCreateCardModal,
  startEditCard,
  startCreateCard,
  addCard,
  addCardsToList,
  startLoadCard,
  changeCardProps,
  delCard,
  toggleEditCardModal,
  editCard,
  deleteAllCards,
  loadingCards
} from './index';

export function* startLoadCardsSaga() {
  try {
    yield put(loadingCards(true));
    const { data, error } = yield call(request, ({
      url: '/card/get_cards'
    }));
    if(error) {
      console.warn(error);
    }else{
      yield put(addCardsToList(data));
    }
  } finally {
     yield put(loadingCards(false));
  }
}

export function* startCreateCardSaga() {
  yield put(toggleCreateCardModal());
}

export function* startEditCardSaga() {
  yield put(toggleEditCardModal());
}

export function* createCardSaga(payload) {
  try{
    yield put(loadingCards(true));
    const { error } = yield call(request,({
      url:  '/card/create_card',
      method: 'POST',
      data: {
        title: payload.payload.cardName,
        author: payload.payload.curr_user_name,
        list: payload.payload.listId
      }
    }));
    if(error) {
      console.warn(error);
    } else {
      yield put(startLoadCard());
    }
  }finally {
    yield put(loadingCards(true));
    yield put(toggleCreateCardModal());
    yield put(changeCardProps('cardName', ''));
    yield put(changeCardProps('cardAuthor', ''));
  }
}

export function* editCardSaga(payload) {
  try{
    yield put(loadingCards(true));
    const { error } = yield call(request,({
      url:  '/card/update_card',
      method: 'PUT',
      data: {
        _id: payload.payload.activeCardId,
        title: payload.payload.cardName,
        description: payload.payload.cardDescription
      }
    }));
    if(error) {
      console.warn(error);
    } else {
      yield put(startLoadCard());
    }
  }finally {
    yield put(loadingCards(true));
    yield put(toggleEditCardModal());
    yield put(changeCardProps('cardName', ''));
    yield put(changeCardProps('cardDescription', ''));
  }
}

export function* delCardSaga(payload){
  try{
    yield put(loadingCards(true));
    const { error } = yield call(request,({
      url:  '/card/delete_card',
      method: 'POST',
      data: {
        _id: payload.payload.cardId
      }
    }));
    if(error) {
      console.warn(error);
    }else {
      yield put(startLoadCard());
    }
  }finally{
    yield put(loadingCards(true));
  }
}

export function* delAllCardsSaga(payload){
  try{
    yield put(loadingCards(true));
    const { error } = yield call(request,({
      url:  '/card/delete_cards',
      method: 'POST',
      data: {
        listId: payload.payload.listId
      }
    }));
    if(error) {
      console.warn(error);
    } else {
      console.warn('delete cards success')
    }
  }finally{
    yield put(loadingCards(false));
  }
}

export function* watchLoadCards() {
  yield takeLatest(startLoadCard, startLoadCardsSaga)
}

export function* watchStartCreateCard() {
  yield takeLatest(startCreateCard, startCreateCardSaga)
}

export function* watchCreateCard() {
  yield takeLatest(addCard, createCardSaga)
}

export function* watchStartEditCard() {
  yield takeLatest(startEditCard, startEditCardSaga)
}

export function* watchEditCard() {
  yield takeLatest(editCard, editCardSaga)
}

export function* watchDeleteCardSaga(){
  yield takeLatest(delCard, delCardSaga)
}

export function* watchDeleteAllCardSaga(){
  yield takeLatest(deleteAllCards, delAllCardsSaga)
}

export function* cardSagas(){
  yield(all([
    call(watchStartCreateCard),
    call(watchCreateCard),
    call(watchLoadCards),
    call(watchDeleteCardSaga),
    call(watchStartEditCard),
    call(watchEditCard),
    call(watchDeleteAllCardSaga)
  ]));
}
