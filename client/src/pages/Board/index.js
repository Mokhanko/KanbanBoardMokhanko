import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { branch, compose, lifecycle, renderComponent, setPropTypes } from 'recompose';
import { makeStyles } from '@material-ui/core/styles';
import { Fab, Grid } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import styled from 'styled-components';
import List from '../../components/List';
import {
  makeSelectBoard,
  startCreateList,
  createList,
  changeListName,
  deleteList,
  startLoadList,
  startEditList,
  editList,
  changeActiveListId
} from '../../reducer/List';
import CreateListWindow from '../../components/CreateListWindow';
import Loader from '../../components/Loader';

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
  boardLists, createListModal, startCreateList, listName, createList, changeListName, deleteList, activeListId,
  curr_user_name, editListModal, startEditList, editList, changeActiveListId
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
      <Grid container style={{ flexGrow: 1 }} spacing={4}>
        {boardLists.length ?
          (boardLists.map(list => (
            <Grid item key={list._id} xs={12} sm={12} md={6} lg={4}>
              <List
                title={list.title}
                id={list._id}
                deleteList={deleteList}
                activeListId={activeListId}
                startEditList={startEditList}
                startCreateList={startCreateList}
                changeActiveListId={changeActiveListId}
                curr_user_name={curr_user_name}
              />
            </Grid>
          )))
          :
          null
        }
      </Grid>
      <CreateListWindow
        activeListId={activeListId}
        createListModal={createListModal}
        startCreateList={startCreateList}
        listName={listName}
        createList={createList}
        changeListName={changeListName}
        curr_user_name={curr_user_name}
        editListModal={editListModal}
        editList={editList}
      />
    </BoardContainer>
  )
};

export default compose(
  connect(
    state => ({
      curr_user_name: state.user.curr_user_name,
      boardLists: makeSelectBoard(state),
      createListModal: state.board.createListModal,
      listName: state.board.listName,
      activeListId: state.board.activeListId,
      editListModal: state.board.editListModal,
      loading_lists: state.board.loading_lists
    }),
    {
      startCreateList,
      createList,
      changeListName,
      deleteList,
      startLoadList,
      startEditList,
      editList,
      changeActiveListId
    }
  ),
  setPropTypes({
    createCardModal: PropTypes.bool,
    loading_lists: PropTypes.bool,
    boardLists: PropTypes.array,
    curr_user_name: PropTypes.string,
    editListModal: PropTypes.bool,
    listName: PropTypes.string,
    activeListId: PropTypes.string,
    startCreateList: PropTypes.func,
    createList: PropTypes.func,
    deleteList: PropTypes.func,
    startLoadList: PropTypes.func,
    startEditList: PropTypes.func,
    editList: PropTypes.func,
    changeActiveListId: PropTypes.func
  }),
  lifecycle({
    componentDidMount(){
      this.props.startLoadList();
    }
  }),
  branch(
    props => props.loading_lists,
    renderComponent(Loader)
  )
)(Board);
