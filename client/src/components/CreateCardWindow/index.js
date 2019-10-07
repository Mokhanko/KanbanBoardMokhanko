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

const CreateCardWindow = ({
  cardName, curr_user_name, createCardModal, startCreateCard, changeCardProps, addCard, listId
}) => {
  return (
    <div>
      <Dialog open={createCardModal} onClose={startCreateCard} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create Card</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create a new card, please enter next values
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
        </DialogContent>
        <DialogActions>
          <Button onClick={startCreateCard} color="secondary">
            Cancel
          </Button>
          <Button color="primary" onClick={() => addCard(listId, cardName, curr_user_name)}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
};

export default CreateCardWindow;
