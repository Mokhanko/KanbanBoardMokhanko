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

const CreateListWindow = ({
 createListModal, startCreateList, listName, createList, changeListName
}) => {

  return (
    <div>
      <Dialog open={createListModal} onClose={startCreateList} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create a new list, please enter a name
          </DialogContentText>
          <TextField
            autoFocus
            value={listName}
            margin="dense"
            id="name"
            label="List Name"
            type="text"
            fullWidth
            onChange={e => changeListName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={startCreateList} color="secondary">
            Cancel
          </Button>
          <Button color="primary" onClick={() => createList(listName)}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
};

export default CreateListWindow;
