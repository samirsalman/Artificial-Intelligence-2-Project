import React from "react";
import {
  TextField,
  DialogContent,
  DialogActions,
  Dialog,
  DialogTitle,
  Button
} from "@material-ui/core";
import GlobalContext from "../../Providers/Context";

export default class UpdateBookStruct extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  updateReq = e => {
    let value = this.context;
    value.updateQuery(this.getFields(), this.props.document.uri.value);
    this.props.handleClose();
  };

  getFields = () => {
    var isbn =
      document.getElementById("ISBNField").value !== this.props.document.isbn
        ? document.getElementById("ISBNField").value
        : null;

    var publisher =
      document.getElementById("publisherField").value !==
      this.props.document.pub
        ? document.getElementById("publisherField").value
        : null;
    return {
      isbn: isbn,
      publisher: publisher,
      type: "Book"
    };
  };

  render() {
    return (
      <div>
        <Dialog
          open={this.props.open}
          aria-labelledby="form-dialog-title"
          onClose={this.props.handleClose}
        >
          <DialogTitle id="form-dialog-title">
            Aggiorna i campi di " {this.props.document.title} "
          </DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              id="titleField"
              label="Titolo"
              defaultValue={this.props.document.title}
              fullWidth
              disabled
            />
            <TextField
              margin="dense"
              id="yearField"
              defaultValue={this.props.document.year}
              label="Year"
              fullWidth
              disabled
            />
            <TextField
              margin="dense"
              id="authorsField"
              defaultValue={this.props.document.authors}
              label="Autori"
              disabled
              fullWidth
            />
            <TextField
              margin="dense"
              id="ISBNField"
              label="ISBN"
              defaultValue={this.props.document.isbn}
              fullWidth
            />
            <TextField
              margin="dense"
              defaultValue={this.props.document.pub}
              id="publisherField"
              label="Publisher"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={e => this.updateReq(e)} color="primary">
              Conferma
            </Button>
            <Button onClick={this.props.handleClose} color="primary">
              Annulla
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
UpdateBookStruct.contextType = GlobalContext;
