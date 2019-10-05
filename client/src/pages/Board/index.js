import React from 'react';
import { connect } from 'react-redux';
import { compose, lifecycle, setPropTypes } from 'recompose';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import styled from 'styled-components';
import List from '../../components/List';
import {
  makeSelectBoard,
  startCreateList,
  createList,
  changeListName,
  deleteList,
  startCreateCard,
  changeCardProps,
  addCard
} from '../../reducer/List';
import CreateListWindow from '../../components/CreateListWindow';

const BoardContainer = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  border-radius: 15px;
`;

const TopBoard = styled.div`
  display: flex;
  width: 100%;
  height: 100px;
  align-items: center;
  border-bottom: 1px solid black;
`;

const ListBoard = styled.div`
  margin-top: 50px;
  display: flex;
  width: 100%;
  align-items: flex-start;
`;

const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

const Board = ({
  boardLists, createListModal, startCreateList, listName, createList, changeListName, deleteList, createCardModal,
  startCreateCard, changeCardProps, cardName, cardAuthor, addCard, activeListId
}) => {
  const classes = useStyles();

  return (
    <BoardContainer>
      <TopBoard>
        <Fab color="primary" aria-label="add" className={classes.fab} onClick={startCreateList}>
          <AddIcon />
        </Fab>
        <span>Add list</span>
      </TopBoard>
      <ListBoard>
        { boardLists.length ?
          (boardLists.map(list => (
            <List
              title={list.title}
              id={list.id}
              cards={list.cards}
              key={list.id}
              deleteList={deleteList}
              createCardModal={createCardModal}
              startCreateCard={startCreateCard}
              changeCardProps={changeCardProps}
              cardName={cardName}
              cardAuthor={cardAuthor}
              addCard={addCard}
              activeListId={activeListId}
            />
          )))
          :
          null
        }
      </ListBoard>
      <CreateListWindow
        createListModal={createListModal}
        startCreateList={startCreateList}
        listName={listName}
        createList={createList}
        changeListName={changeListName}
      />
    </BoardContainer>
  )
};

export default compose(
  connect(
    state => ({
      boardLists: makeSelectBoard(state),
      createListModal: state.board.createListModal,
      listName: state.board.listName,
      createCardModal: state.board.createCardModal,
      cardName: state.board.cardName,
      cardAuthor: state.board.cardAuthor,
      activeListId: state.board.activeListId
    }),
    {
      startCreateList,
      createList,
      changeListName,
      deleteList,
      startCreateCard,
      changeCardProps,
      addCard
    }
  )
)(Board);
