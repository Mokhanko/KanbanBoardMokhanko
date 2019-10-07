import React from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core';

const EditCardWindow = ({
  cardName, editCardModal, startEditCard, changeCardProps, cardDescription, activeCardId, editCard
}) => {
  return (
    <div>
      <Dialog open={editCardModal} onClose={startEditCard} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit Card</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Only title and description
          </DialogContentText>
          <TextField
            autoFocus
            value={cardName}
            margin="dense"
            id="cardName"
            label="Card Title"
            type="text"
            fullWidth
            onChange={e => changeCardProps(e.target.id, e.target.value)}
          />
          <TextField
            autoFocus
            value={cardDescription}
            margin="dense"
            id="cardDescription"
            label="Card Descrition"
            type="text"
            fullWidth
            onChange={e => changeCardProps(e.target.id, e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={startEditCard} color="secondary">
            Cancel
          </Button>
          <Button color="primary" onClick={() => editCard(activeCardId, cardName, cardDescription)}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
};

export default EditCardWindow;
