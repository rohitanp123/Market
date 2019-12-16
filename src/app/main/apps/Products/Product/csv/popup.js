import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Uploadcsv from './upload';


class ScrollDialog extends React.Component {
  state = {
    open: false,
    scroll: 'paper',
  };

  handleClickOpen = scroll => () => {
    this.setState({ open: true, scroll });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>        
        <Dialog
          open={this.props.open}
          onClose={this.props.onClose}
          scroll={this.state.scroll}
          fullWidth = { true }
          maxWidth = { 'md' }
          aria-labelledby="scroll-dialog-title"
        >
          <DialogTitle id="scroll-dialog-title">CSV Upload</DialogTitle>
          <DialogContent>
            <DialogContentText>
                    <Uploadcsv closeCSV = { () => this.props.onClose() }/>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.onClose} variant="contained" color="primary" autoFocus>
              Cancel
            </Button>            
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default ScrollDialog;
