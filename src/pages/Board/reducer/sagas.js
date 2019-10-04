import { takeLatest, put, all, call } from 'redux-saga/effects';
import {
  startCreateList,
  toggleCreateCardModal,
  toggleCreateModalList,
  createList,
  addList,
  changeListName,
  deleteList,
  deleteListFromBoard,
  startCreateCard,
  addCard,
  changeActiveListId,
  addCardToList,
  changeCardProps
} from './index';

export function* startCreateListSaga() {
  yield put(toggleCreateModalList());
}

export function* createListSaga(listName) {
  const item = {
    title: listName.payload,
    id: Math.random(),
    cards: []
  };
  yield put(addList(item));
  yield put(changeListName(''));
  yield put(toggleCreateModalList());
}

export function* startDeleteListSaga(list) {
  yield put(deleteListFromBoard(list));
}

export function* startStartCreateCardSaga(listId) {
  yield put(changeActiveListId(listId.payload));
  yield put(toggleCreateCardModal());
}

export function* startCreateCardSaga({ payload }) {
  const { listId, cardName, cardAuthor } = payload;
  const card = {
    title: cardName,
    author: cardAuthor,
    created: Date.now(),
    img: null,
    id: Math.random()
  };
  yield put(addCardToList({listId, card}));
  yield put(toggleCreateCardModal());
  yield put(changeActiveListId(''));
  yield put(changeCardProps('cardName', ''));
  yield put(changeCardProps('cardAuthor', ''));
}

export function* watchStartCreateList() {
  yield takeLatest(startCreateList, startCreateListSaga)
}

export function* watchDeleteList() {
  yield takeLatest(deleteList, startDeleteListSaga)
}

export function* watchCreateList() {
  yield takeLatest(createList, createListSaga)
}

export function* watchStartCreateCard() {
  yield takeLatest(startCreateCard, startStartCreateCardSaga)
}

export function* watchCreateCard() {
  yield takeLatest(addCard, startCreateCardSaga)
}

export function* boardSagas(){
  yield(all(
    [
      call(watchStartCreateList),
      call(watchCreateList),
      call(watchDeleteList),
      call(watchStartCreateCard),
      call(watchCreateCard)
    ]
  ))
}
