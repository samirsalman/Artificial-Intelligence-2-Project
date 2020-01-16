import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import {
  Avatar,
  Dialog,
  DialogTitle,
  DialogContentText,
  TextField,
  DialogContent,
  DialogActions
} from "@material-ui/core";
import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

//CAMBIARE OGGETTO

export default class QueryDocument extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.handleClose.bind(this);
    this.openDialog.bind(this);
  }

  handleClose = () => {
    console.log(document.getElementById("titleField").value);

    this.setState({
      open: false
    });
  };

  openDialog = document => {
    this.setState({
      open: true
    });
  };

  render() {
    return (
      <Grid
        item
        container
        xs={12}
        sm={6}
        md={6}
        lg={4}
        justify="center"
        alignItems="center"
      >
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Modifica Documento</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Modifica le tue voci e salva tutto nell'ontologia
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="titleField"
              label="Titolo"
              defaultValue={this.props.document.title}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="authorsField"
              label="Autori"
              defaultValue={this.props.document.authors}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="ISBNField"
              label="ISBN"
              defaultValue={this.props.document.isbn}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Conferma
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Annulla
            </Button>
          </DialogActions>
        </Dialog>
        <Card style={{ margin: "24px", width: "340px" }}>
          <CardContent style={{ height: "300px" }}>
            <Avatar
              src={
                this.props.document.authors === "Stellato, Armando" ||
                this.props.document.authors === "Armando Stellato"
                  ? require("../assets/stellato.jpg")
                  : null
              }
              style={{
                textAlign: "center",
                margin: "0 auto",
                width: "60px",
                height: "60px"
              }}
            >
              DOC
            </Avatar>
            <h3>{this.props.document.title}</h3>

            <p>{this.props.document.authors}</p>
            <p>ISBN: {this.props.document.isbn}</p>
          </CardContent>
          <CardActions>
            <Grid container alignItems="center" justify="center">
              <Button
                variant="contained"
                color="primary"
                style={{ margin: "12px" }}
                onClick={this.openDialog}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                style={{ margin: "12px", background: "red", color: "white" }}
              >
                Delete
              </Button>
            </Grid>
          </CardActions>
        </Card>
      </Grid>
    );
  }
}
