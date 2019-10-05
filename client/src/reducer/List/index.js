import { createAction, handleActions } from 'redux-actions';
import { createSelector  } from 'reselect';
import img from '../../images/test.jpg';

const initialState = {
  createCardModal: false,
  listName: '',
  cardName: '',
  cardAuthor:'',
  activeListId: '',
  createListModal: false,
  boardLists: [
    {
      title: 'Test',
      id: '1',
      cards: [
        {
          title: '1 card',
          created: Date.now(),
          author: 'Dima',
          img: img,
          id: 1
        },
        {
          title: '2 card',
          created: Date.now(),
          author: 'Dima',
          img: img,
          id: 2
        },
        {
          title: '3 card',
          created: Date.now(),
          author: 'Dima',
          img: img,
          id: 3
        }
      ]
    },
    {
      title: 'Test2',
      id: '2',
      cards: []
    },
    {
      title: 'Test3',
      id: '3',
      cards: []
    }
  ]
};

export const toggleCreateCardModal = createAction('TOGGLE_CREATE_CARD_MODAL');

export const toggleCreateModalList = createAction('TOGGLE_CREATE_MODAL_LIST');

export const startCreateList = createAction('START_CREATE_LIST');

export const startCreateCard = createAction('START_CREATE_CARD');

export const createList = createAction('CREATE_LIST');

export const deleteList = createAction('DELETE_LIST');

export const changeListName = createAction('CHANGE_LIST_NAME', name => ({ name }));

export const changeActiveListId = createAction('CHANGE_ACTIVE_LIST_ID', value => ({ value }));

export const addList =  createAction('ADD_LIST', list => ({ list }));

export const deleteListFromBoard = createAction('DELETE_LIST_FROM_BOARD', listId => ({ listId }));

export const addCard = createAction('ADD_CARD');

export const addCardToList = createAction('ADD_CARD_TO_LIST');

export const changeCardProps = createAction('CHANGE_CARD_PROPS', (field, value) => ({
  field,
  value
}));

const removeList = (boardLists, listIdToRemove) => {
  const existingBoardItem = boardLists.find(
    boardList => boardList.id === listIdToRemove.payload
  );

  if(existingBoardItem) {
    return boardLists.filter(boardList =>
      boardList.id !== listIdToRemove.payload
    )
  }
};

const cardToList = (boardLists, listId, card) => {
  const existingCartItem = boardLists.find(
    boardList => boardList.id === listId
  );

  if(existingCartItem) {
    return boardLists.map(boardList =>
      boardList.id === listId ? {
          ...boardList,
          cards: [...boardList.cards, card]
        }
        :
        boardList
    )
  }
};

const selectBoard = state => state.board;

export const makeSelectBoard = createSelector(
  selectBoard,
  board => board.boardLists
);

export default handleActions({
  [toggleCreateCardModal]: state => ({
    ...state,
    createCardModal: !state.createCardModal
  }),
  [toggleCreateModalList]: state => ({
    ...state,
    createListModal: !state.createListModal
  }),
  [addList]: (state, { payload }) => ({
    ...state,
    boardLists: [...state.boardLists, payload.list]
  }),
  [changeListName]: (state, { payload }) => ({
    ...state,
    listName: payload.name
  }),
  [changeActiveListId]: (state, { payload }) => ({
    ...state,
    activeListId: payload.value
  }),
  [deleteListFromBoard]: (state, { payload }) => ({
    ...state,
    boardLists: removeList(state.boardLists, payload.listId)
  }),
  [addCardToList]: (state, { payload }) => ({
    ...state,
    boardLists: cardToList(state.boardLists, payload.listId, payload.card)
  }),
  [changeCardProps]: (state, { payload }) => ({
      ...state,
      [payload.field]: payload.value
  })
},
  initialState
);
