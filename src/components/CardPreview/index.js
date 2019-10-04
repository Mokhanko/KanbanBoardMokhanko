import React from 'react';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardHeader,
  CardMedia,
  Avatar
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345,
    marginTop: 30
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
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
}));

const CardPreview = ({ title, created, author, img }) => {
  const classes = useStyles();
  const date = moment(created).format("YYYY-MM-DD hh:mm:ss");
  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {author}
          </Avatar>
        }
        title={title}
        subheader={date}
      />
      { img &&
      (<CardMedia
        className={classes.media}
        image={img}
        title="Paella dish"
      />)
      }
    </Card>
  )
};

export default CardPreview;
