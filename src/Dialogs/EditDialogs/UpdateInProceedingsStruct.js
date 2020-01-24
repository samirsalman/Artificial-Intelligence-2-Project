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

export default class UpdateInProceedingsStruct extends React.Component {
  constructor(props) {
    super(props);
  }

  updateReq = e => {
    let value = this.context;
    value.updateQuery(this.getFields(), this.props.document.uri.value);
    this.props.handleClose();
  };

  getFields = () => {
    var book =
      document.getElementById("bookField").value !==
      this.props.document.booktitle
        ? document.getElementById("bookField").value
        : null;

    var pub =
      document.getElementById("publisherField").value.trim() !==
      this.props.document.pub
        ? document.getElementById("publisherField").value
        : null;

    var isbn =
      document.getElementById("isbnField").value.trim() !==
      this.props.document.isbn
        ? document.getElementById("isbnField").value
        : null;

    var editor =
      document.getElementById("editorField").value.trim() !==
      this.props.document.edit
        ? document.getElementById("editorField").value
        : null;
    return {
      booktitle: book,
      type: "InProceedings",
      publisher: pub,
      isbn: isbn,
      editor: editor
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
              autoFocus
              margin="dense"
              id="titleField"
              label="Titolo"
              defaultValue={this.props.document.title}
              disabled
              fullWidth
            />
            <TextField
              disabled
              margin="dense"
              id="yearField"
              defaultValue={this.props.document.year}
              label="Year"
              fullWidth
            />
            <TextField
              disabled
              margin="dense"
              id="authorsField"
              defaultValue={this.props.document.authors}
              label="Autori"
              fullWidth
            />
            <TextField
              margin="dense"
              id="bookField"
              label="Book Title"
              fullWidth
              defaultValue={this.props.document.booktitle}
            />
            <TextField
              margin="dense"
              id="editorField"
              label="Editor"
              fullWidth
              defaultValue={this.props.document.edit}
            />
            <TextField
              margin="dense"
              id="isbnField"
              label="ISBN"
              fullWidth
              defaultValue={this.props.document.isbn}
            />

            <TextField
              margin="dense"
              id="publisherField"
              label="Publisher"
              defaultValue={this.props.document.pub}
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
UpdateInProceedingsStruct.contextType = GlobalContext;
