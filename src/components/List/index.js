import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  Typography,
  CardContent,
  Button,
  CardHeader
} from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import CardPreview from '../CardPreview';
import CreateCardWindow from '../CreateCardWindow';


const useStyles = makeStyles(theme => ({
  card: {
    minWidth: 275,
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
  title, id, cards, deleteList, createCardModal, startCreateCard, cardName, cardAuthor, changeCardProps, addCard,
  activeListId
}) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <CardHeader
          title={
            <Typography className={classes.title} color="textSecondary" gutterBottom>
            {title}
          </Typography>
          }
          action={
            <DeleteForeverIcon onClick={() => deleteList(id)}/>
          }
        />
        { cards.length ?
          (cards.map(card => (
            <CardPreview
              key={card.id}
              title={card.title}
              created={card.created}
              author={card.author}
              img={card.img}
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
        onClick={() => startCreateCard(id)}
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
            cardAuthor={cardAuthor}
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

export default List;
