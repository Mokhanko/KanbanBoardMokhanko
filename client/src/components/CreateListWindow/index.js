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
 createListModal, startCreateList, listName, createList, changeListName, curr_user_name, editListModal, activeListId,
 editList
}) => {

  return (
    <div>
      <Dialog open={createListModal} onClose={startCreateList} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          { editListModal ?
           ( <DialogContentText>
              Edit list Title only
            </DialogContentText>)
            :
           ( <DialogContentText>
              To create a new list, please enter a name
            </DialogContentText>)
          }
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
          { editListModal ?
            <Button color="primary" onClick={() => editList(activeListId, listName)}>
              Save
            </Button>
            :
            <Button color="primary" onClick={() => createList(listName, curr_user_name)}>
              Create
            </Button>
          }
        </DialogActions>
      </Dialog>
    </div>
  )
};

export default CreateListWindow;
