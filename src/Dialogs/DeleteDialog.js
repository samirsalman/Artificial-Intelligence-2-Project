import React from "react";
import GlobalContext from "../Providers/Context.js";
import Axios from "axios";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import {
  Dialog,
  Button,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions
} from "@material-ui/core";

export default class DeleteDialog extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.open);

    this.state = {
      open: this.props.open,
      error: false,
      success: false
    };
  }

  closeDeleteDialog = uriParam => {
    let value = this.context;
    console.log("CLOSE DELETE DIALOG");
    console.log("URIPARAM", uriParam);

    if (uriParam !== null) {
      if (uriParam !== false) {
        var splitted = uriParam.split("/");
        console.log("URIPARAM", uriParam);

        Axios.delete(
          `http://localhost:3000/delete/${splitted[splitted.length - 1]}`
        ).then(res => {
          console.log(res);
          if (res.status === 200) {
            this.setState({
              success: true,
              error: false,
              open: false
            });
          } else {
            this.setState({
              success: false,
              error: true,
              open: false
            });
          }
          var temp = value.buildQuery().split("/");
          value.queryRequest(null, temp[temp.length - 1], true);
        });
      } else {
        this.setState({
          error: true
        });
      }
    }

    this.setState({
      open: false
    });
  };

  render() {
    return (
      <GlobalContext.Consumer>
        {context =>
          this.state.success ? (
            <Snackbar open={this.state.success} autoHideDuration={5000}>
              <Alert severity="success">Documento eliminato con successo</Alert>
            </Snackbar>
          ) : context.error ? (
            <Snackbar open={this.state.error} autoHideDuration={5000}>
              <Alert severity="error">Si è verificato un errore</Alert>
            </Snackbar>
          ) : (
            <Dialog
              open={this.state.open}
              onClose={e => this.closeDeleteDialog(null)}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="alert-dialog-title">
                {'Eliminare "' + this.props.title + '"?'}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Sei Sicuro di volerlo cancellare dall'Ontologia? L'operazione
                  sarà definitiva
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={e => this.closeDeleteDialog(this.props.uri)}
                  color="primary"
                >
                  Si
                </Button>
                <Button
                  onClick={e => this.closeDeleteDialog(false)}
                  color="primary"
                >
                  No
                </Button>
              </DialogActions>
            </Dialog>
          )
        }
      </GlobalContext.Consumer>
    );
  }
}
DeleteDialog.contextType = GlobalContext;
