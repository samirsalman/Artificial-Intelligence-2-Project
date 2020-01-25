import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { Link } from "react-router-dom";

import "../App.css";
import GlobalContext from "../Providers/Context.js";
import DeleteDialog from "../Dialogs/DeleteDialog";
import { Avatar } from "@material-ui/core";
import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import UpdateInProceedingsStruct from "../Dialogs/EditDialogs/UpdateInProceedingsStruct.js";
import UpdateArticleStruct from "../Dialogs/EditDialogs/UpdateArticleStruct.js";
import UpdateBookStruct from "../Dialogs/EditDialogs/UpdateBookStruct";
import DetailsPage from "../DetailsPage/DetailsPage";

//CAMBIARE OGGETTO

export default class QueryDocument extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      deleteDialog: false,
      detailsDialog: false,
      editDialog: false
    };
    console.log(this.props.document.uri.value);

    this.handleClose.bind(this);
    this.openDialog.bind(this);
  }

  handleClose = () => {
    console.log(document.getElementById("titleField").value);

    this.setState({
      open: false
    });
  };

  closeDetails = () => {
    this.setState({
      detailsDialog: false
    });
  };

  openDialog = document => {
    this.setState({
      open: true
    });
  };

  closeEditDialog = document => {
    this.setState({
      editDialog: false
    });
  };

  openDelete = e => {
    this.setState({
      deleteDialog: true
    });
  };

  openDetails = e => {
    console.log("DETAILS :)");

    this.setState({ detailsDialog: true });
  };

  render() {
    console.log(this.props.document.type.value.split("/").slice(-1)[0]);

    if (this.state.deleteDialog) {
      return (
        <GlobalContext.Consumer>
          {context => (
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
              <DetailsPage
                open={this.state.detailsDialog}
                onClose={() => this.closeDetails()}
                document={this.props.document}
              ></DetailsPage>
              {this.props.document.type.value.split("/").slice(-1)[0] ===
              "Book" ? (
                <UpdateBookStruct
                  open={this.state.editDialog}
                  handleClose={e => this.closeEditDialog(e)}
                  document={this.props.document}
                ></UpdateBookStruct>
              ) : this.props.document.type.value.split("/").slice(-1)[0] ===
                "Article" ? (
                <UpdateArticleStruct
                  open={this.state.editDialog}
                  handleClose={e => this.closeEditDialog(e)}
                  document={this.props.document}
                ></UpdateArticleStruct>
              ) : (
                <UpdateInProceedingsStruct
                  open={this.state.editDialog}
                  handleClose={e => this.closeEditDialog(e)}
                  document={this.props.document}
                ></UpdateInProceedingsStruct>
              )}

              <DeleteDialog
                open={this.state.deleteDialog}
                title={this.props.document.title}
                uri={this.props.document.uri.value}
              ></DeleteDialog>
              <Card style={{ margin: "24px", width: "340px" }}>
                <Link
                  onClick={e => this.openDetails()}
                  style={{ color: context.dark ? "#fff" : "#2589bd" }}
                >
                  <CardContent style={{ height: "300px" }}>
                    <Avatar
                      src={
                        this.props.document.authors === "Stellato Armando" ||
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
                    {this.props.document.isbn !== "" ? (
                      <p>ISBN: {this.props.document.isbn}</p>
                    ) : this.props.document.issn !== "" ? (
                      <p>ISSN: {this.props.document.issn}</p>
                    ) : null}
                    {this.props.document.year !== "" ? (
                      <p>Anno: {this.props.document.year}</p>
                    ) : null}
                  </CardContent>
                </Link>

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
                      style={{
                        margin: "12px",
                        background: "red",
                        color: "white"
                      }}
                      onClick={e => this.openDelete(e)}
                    >
                      Delete
                    </Button>
                  </Grid>
                </CardActions>
              </Card>
            </Grid>
          )}
        </GlobalContext.Consumer>
      );
    } else {
      return (
        <GlobalContext.Consumer>
          {context => (
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
              <DetailsPage
                open={this.state.detailsDialog}
                onClose={() => this.closeDetails()}
                document={this.props.document}
              ></DetailsPage>

              {this.props.document.type.value.split("/").slice(-1)[0] ===
              "Book" ? (
                <UpdateBookStruct
                  open={this.state.editDialog}
                  handleClose={e => this.closeEditDialog(e)}
                  document={this.props.document}
                ></UpdateBookStruct>
              ) : this.props.document.type.value.split("/").slice(-1)[0] ===
                "Article" ? (
                <UpdateArticleStruct
                  open={this.state.editDialog}
                  handleClose={e => this.closeEditDialog(e)}
                  document={this.props.document}
                ></UpdateArticleStruct>
              ) : (
                <UpdateInProceedingsStruct
                  open={this.state.editDialog}
                  handleClose={e => this.closeEditDialog(e)}
                  document={this.props.document}
                ></UpdateInProceedingsStruct>
              )}
              <Card style={{ margin: "24px", width: "340px" }}>
                <Link
                  onClick={e => this.openDetails()}
                  style={{ color: context.dark ? "#fff" : "#2589bd" }}
                >
                  <CardContent style={{ height: "300px" }}>
                    <Avatar
                      src={
                        this.props.document.authors === "Stellato Armando" ||
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
                    {this.props.document.isbn !== "" ? (
                      <p>ISBN: {this.props.document.isbn}</p>
                    ) : this.props.document.issn !== "" ? (
                      <p>ISSN: {this.props.document.issn}</p>
                    ) : null}

                    {this.props.document.year !== "" ? (
                      <p>Anno: {this.props.document.year}</p>
                    ) : null}
                  </CardContent>
                </Link>

                <CardActions>
                  <Grid container alignItems="center" justify="center">
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ margin: "12px" }}
                      onClick={e =>
                        this.setState({
                          editDialog: true
                        })
                      }
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      style={{
                        margin: "12px",
                        background: "red",
                        color: "white"
                      }}
                      onClick={e => this.openDelete(e)}
                    >
                      Delete
                    </Button>
                  </Grid>
                </CardActions>
              </Card>
            </Grid>
          )}
        </GlobalContext.Consumer>
      );
    }
  }
}
