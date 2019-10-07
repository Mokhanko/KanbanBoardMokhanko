import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {branch, compose, lifecycle, renderComponent, setPropTypes} from 'recompose';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  Typography,
  CardContent,
  Button,
  CardHeader
} from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import {
  addCard,
  changeActiveCardId,
  changeCardProps,
  delCard,
  editCard,
  startCreateCard,
  startEditCard,
  startLoadCard
} from '../../reducer/Card';
import CardPreview from '../CardPreview';
import CreateCardWindow from '../CreateCardWindow';
import Loader from '../../components/Loader';


const useStyles = makeStyles(theme => ({
  card: {
    minWidth: 320,
    marginRight: 20
  },
  title: {
    fontSize: 20,
    fontWeight: 900
  },
  pos: {
    marginBottom: 12,
  },
  button: {
    margin: theme.spacing(1),
  }
}));

const List = ({
  title, id, cards, deleteList, createCardModal, startCreateCard, cardName, curr_user_name, changeCardProps, addCard,
  activeListId, startEditList, startCreateList, changeActiveListId, delCard, startEditCard, editCardModal, activeCardId,
  changeActiveCardId, cardDescription, editCard
}) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <DeleteForeverIcon onClick={() => deleteList(id)}/>
        <EditIcon onClick={() => {startEditList(); startCreateList(); changeActiveListId(id)}}/>
        <CardHeader
          title={
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              {title}
            </Typography>
          }
        />
        { cards && cards.length ?
          (cards.map(card => (
            card.list === id &&
            <CardPreview
              key={card._id}
              cardId={card._id}
              title={card.title}
              author={card.author}
              img={card.img}
              description={card.description}
              createdAt={card.createdAt}
              updatedAt={card.updatedAt}
              delCard={delCard}
              startEditCard={startEditCard}
              editCardModal={editCardModal}
              changeActiveCardId={changeActiveCardId}
              activeCardId={activeCardId}
              cardName={cardName}
              changeCardProps={changeCardProps}
              cardDescription={cardDescription}
              editCard={editCard}
            />
          )))
          :
          null
        }
      </CardContent>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={() => {startCreateCard(id); changeActiveListId(id)}}
      >
        Add card
      </Button>
      {activeListId === id ?
        (
          <CreateCardWindow
            createCardModal={createCardModal}
            startCreateCard={startCreateCard}
            changeCardProps={changeCardProps}
            cardName={cardName}
            curr_user_name={curr_user_name}
            addCard={addCard}
            listId={id}
          />
        )
        :
        null
      }
    </Card>
  );
};

export default compose(
  connect(
    state => ({
      cards: state.card.cards,
      cardName: state.card.cardName,
      editCardModal: state.card.editCardModal,
      activeCardId: state.card.activeCardId,
      createCardModal: state.card.createCardModal,
      cardDescription: state.card.cardDescription,
      loading_cards: state.card.loading_cards
    }),
    {
      startLoadCard,
      delCard,
      startEditCard,
      changeActiveCardId,
      editCard,
      startCreateCard,
      changeCardProps,
      addCard
    }
  ),
  setPropTypes({
    editCardModal: PropTypes.bool,
    createCardModal: PropTypes.bool,
    loading_cards: PropTypes.bool,
    cards: PropTypes.array,
    cardName: PropTypes.string,
    activeCardId: PropTypes.string,
    cardDescription: PropTypes.string,
    startLoadCard: PropTypes.func,
    delCard: PropTypes.func,
    startEditCard: PropTypes.func,
    changeActiveCardId: PropTypes.func,
    editCard: PropTypes.func,
    startCreateCard: PropTypes.func,
    changeCardProps: PropTypes.func,
    addCard: PropTypes.func,
  }),
  lifecycle({
    componentDidMount(){
      this.props.startLoadCard();
    }
  }),
  branch(
    props => props.loading_cards,
    renderComponent(Loader)
  )
)(List);
