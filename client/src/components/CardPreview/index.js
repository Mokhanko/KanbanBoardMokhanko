import React from 'react';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import {
  Card,
  CardHeader,
  CardMedia,
  Avatar,
  Button,
  ButtonGroup,
  CardActions,
  IconButton,
  Collapse,
  CardContent,
  Typography
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { red } from '@material-ui/core/colors';
import EditCardWindow from '../CardEditWindow';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345,
    marginTop: 20
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  buttonGroup: {
    margin: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  }
}));

const CardPreview = ({ title, createdAt, updatedAt, author, img, cardId, delCard, editCardModal, startEditCard,
  changeActiveCardId, activeCardId, changeCardProps, cardName, description, cardDescription, editCard
}) => {

  const classes = useStyles();

  const date = moment(createdAt).format("YYYY-MM-DD hh:mm");
  const update = moment(updatedAt).format("YYYY-MM-DD hh:mm");

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {author[0]}
          </Avatar>
        }
        title={title}
        action={
          <CardActions disableSpacing>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
        }
      />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          { img &&
          (<CardMedia
            className={classes.media}
            image={img}
            title="Paella dish"
          />)
          }
          <Typography variant="body2" color="textSecondary" component="p">
            Created at {date}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Updated at {update}
          </Typography>
          { description ?
            <Typography variant="body2" color="textSecondary" component="p">
              {description}
            </Typography>
            :
            null
          }
          <ButtonGroup
            variant="contained"
            size="small" aria-label="small
            contained button group"
            className={classes.buttonGroup}
          >
            <Button
              color="primary"
              className={classes.button}
              onClick={() => {startEditCard(); changeActiveCardId(cardId)}}
            >
              Edit
            </Button>
            <Button
              color="secondary"
              className={classes.button}
              onClick={() => delCard(cardId)}
            >
              Delete
            </Button>
          </ButtonGroup>
        </CardContent>
      </Collapse>
      {
        activeCardId === cardId ?
        <EditCardWindow
          cardName={cardName}
          editCardModal={editCardModal}
          startEditCard={startEditCard}
          changeCardProps={changeCardProps}
          cardDescription={cardDescription}
          activeCardId={activeCardId}
          editCard={editCard}
        />
        :
        null
      }
    </Card>
  )
};

export default CardPreview;
