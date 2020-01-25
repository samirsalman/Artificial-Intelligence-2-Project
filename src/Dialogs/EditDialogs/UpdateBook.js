import React from "react";
import {
  Dialog,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@material-ui/core";
import UpdateBookStruct from "../EditDialogs/UpdateBookStruct";
import GlobalContext from "../../Providers/GlobalProvider";
import UpdateArticleStruct from "../EditDialogs/UpdateArticleStruct";
import UpdateInProceedingsStruct from "../EditDialogs/UpdateInProceedingsStruct";

export default class UpdateBook extends React.Component {
  updateReq = obj => {
    let value = this.context;
    value.updateQuery(obj, this.props.document.uri);
    this.props.handleClose();
  };

  render() {
    console.log(this.props.document);

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
            {this.props.document.type.value.split("/")[
              this.props.document.type.value.split("/").length - 1
            ] === "Book" ? (
              <UpdateBookStruct
                document={this.props.document}
              ></UpdateBookStruct>
            ) : this.props.document.type.value.split("/")[
                this.props.document.type.value.split("/").length - 1
              ] === "Article" ? (
              <UpdateArticleStruct
                document={this.props.document}
              ></UpdateArticleStruct>
            ) : (
              <UpdateInProceedingsStruct
                document={this.props.document}
              ></UpdateInProceedingsStruct>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={e => this.updateReq()} color="primary">
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
UpdateBook.contextType = GlobalContext;
