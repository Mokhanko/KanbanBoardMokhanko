import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { fork, all } from 'redux-saga/effects';
import logger from 'redux-logger';
import {createBrowserHistory} from 'history';
import boardReducer from '../reducer/List';
import userReducer from '../reducer/User';
import cardReducer from '../reducer/Card';
import { boardSagas } from '../reducer/List/sagas';
import { userSaga } from '../reducer/User/sagas';
import { cardSagas } from '../reducer/Card/sagas';

export const history = new createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ :
  compose;

const middlewares = [sagaMiddleware];

const rootReducer = combineReducers({
  board: boardReducer,
  user: userReducer,
  card: cardReducer
});

function* rootSaga(){
  yield all([
    fork(boardSagas),
    fork(userSaga),
    fork(cardSagas)
  ])
}

if(process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middlewares)));

sagaMiddleware.run(rootSaga);


export default store;
