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

export default class UpdateArticleStruct extends React.Component {
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
    var journal =
      document.getElementById("journalField").value.trim() !==
      this.props.document.journ
        ? document.getElementById("journalField").value
        : null;

    var issn =
      document.getElementById("ISSNField").value.trim() !==
      this.props.document.issn
        ? document.getElementById("ISSNField").value
        : null;
    return {
      journal: journal,
      issn: issn,
      type: "Article"
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
              defaultValue={this.props.document.year}
              margin="dense"
              id="yearField"
              label="Year"
              fullWidth
            />
            <TextField
              margin="dense"
              defaultValue={this.props.document.authors}
              id="authorsField"
              label="Autori"
              fullWidth
              disabled
              helperText="Aggiungi gli autori separati da virgole"
            />
            <TextField
              margin="dense"
              id="ISSNField"
              label="ISSN"
              defaultValue={this.props.document.issn}
              fullWidth
            />
            <TextField
              margin="dense"
              id="journalField"
              label="Journal Title"
              defaultValue={this.props.document.journal}
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
UpdateArticleStruct.contextType = GlobalContext;
