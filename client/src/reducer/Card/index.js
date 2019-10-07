import { createAction, handleActions } from 'redux-actions';

const initialState = {
  cards:[],
  createCardModal: false,
  editCardModal: false,
  loading_cards: false,
  activeCardId: '',
  cardName: '',
  cardDescription: '',
  cardImage: null
};

export const toggleCreateCardModal = createAction('TOGGLE_CREATE_CARD_MODAL');

export const toggleEditCardModal = createAction('TOGGLE_EDIT_CARD_MODAL');

export const loadingCards = createAction('LOADING_CARDS', value => ({ value }));

export const startCreateCard = createAction('START_CREATE_CARD');

export const startLoadCard = createAction('START_LOAD_CARD');

export const startEditCard = createAction('START_EDIT_CARD');

export const addCard = createAction('ADD_CARD', (listId, cardName, curr_user_name) => ({
  listId,
  cardName,
  curr_user_name
}));

export const editCard = createAction('EDIT_CARD', (activeCardId, cardName, cardDescription) => ({
  activeCardId,
  cardName,
  cardDescription
}));

export const delCard = createAction('DEL_CARD', cardId => ({ cardId }));

export const deleteAllCards = createAction('DELETE_ALL_CARDS', listId => ({ listId }));

export const addCardsToList = createAction('ADD_CARD_TO_LIST', cards => ({ cards }));

export const changeCardProps = createAction('CHANGE_CARD_PROPS', (field, value) => ({
  field,
  value
}));

export const changeActiveCardId = createAction('CHANGE_ACTIVE_CARD_ID', value => ({ value }));

export default handleActions({
  [toggleCreateCardModal]: state => ({
    ...state,
    createCardModal: !state.createCardModal
  }),
  [toggleEditCardModal]: state => ({
    ...state,
    editCardModal: !state.editCardModal
  }),
  [loadingCards]: (state, { payload }) => ({
    ...state,
    loading_cards: payload.value
  }),
  [addCardsToList]: (state, { payload }) => ({
    ...state,
    cards: payload.cards
  }),
  [changeCardProps]: (state, { payload }) => ({
    ...state,
    [payload.field]: payload.value
  }),
  [changeActiveCardId]: (state, { payload }) => ({
    ...state,
    activeCardId: payload.value
  })
},
  initialState
)
