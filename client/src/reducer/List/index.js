import { createAction, handleActions } from 'redux-actions';
import { createSelector  } from 'reselect';

const initialState = {
  createCardModal: false,
  listName: '',
  cardName: '',
  activeListId: '',
  createListModal: false,
  editListModal: false,
  loading_lists: false,
  boardLists: []
};

export const toggleEditListModal = createAction('TOGGLE_EDIT_LIST_MODAL');

export const toggleCreateModalList = createAction('TOGGLE_CREATE_MODAL_LIST');

export const startLoadList = createAction('START_LOAD_LIST');

export const startCreateList = createAction('START_CREATE_LIST');

export const startEditList = createAction('START_EDIT_LIST');

export const createList = createAction('CREATE_LIST', (listName, author) => ({
  listName,
  author
}));

export const deleteList = createAction('DELETE_LIST', list => ({ list }));

export const editList = createAction('EDIT_LIST', (activeListId, listName) => ({
  activeListId,
  listName
}));

export const changeListName = createAction('CHANGE_LIST_NAME', name => ({ name }));

export const changeActiveListId = createAction('CHANGE_ACTIVE_LIST_ID', value => ({ value }));

export const addList =  createAction('ADD_LIST', list => ({ list }));

export const loadingLists = createAction('LOADING_LISTS', value => ({ value }));

const selectBoard = state => state.board;

export const makeSelectBoard = createSelector(
  selectBoard,
  board => board.boardLists
);

export default handleActions({
   [toggleCreateModalList]: state => ({
    ...state,
    createListModal: !state.createListModal
  }),
  [loadingLists]: (state, { payload }) => ({
    ...state,
    loading_lists: payload.value
  }),
  [toggleEditListModal]: state => ({
    ...state,
    editListModal: !state.editListModal
  }),
  [addList]: (state, { payload }) => ({
    ...state,
    boardLists: payload.list
  }),
  [changeListName]: (state, { payload }) => ({
    ...state,
    listName: payload.name
  }),
  [changeActiveListId]: (state, { payload }) => ({
    ...state,
    activeListId: payload.value
  })
},
  initialState
);
