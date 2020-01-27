import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import FileDownload from "js-file-download";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import { Details } from "@material-ui/icons";
import SingleLineGridList from "./SingleLineGridList";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import Copy from "copy-to-clipboard";

export default class DetailsPage extends Component {
  constructor(props) {
    super(props);
    this.state = { openSnack: false };
  }

  openSnackbar = el => {
    this.setState({ openSnack: true });
    if (typeof this.props.document[el] === "string") {
      Copy(this.props.document[el]);
    } else {
      Copy(this.props.document[el].value);
    }
  };

  closeSnackbar = () => {
    this.setState({ openSnack: false });
  };

  Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  saveFile = () => {
    var uri = encodeURIComponent(this.props.document.uri.value);
    console.log(uri);

    Axios.get(`http://localhost:3000/query/download/${uri}`).then(res => {
      console.log(res);
      FileDownload(res.data, "result.rdf");
    });
  };

  render() {
    return (
      <div>
        <Snackbar
          open={this.state.openSnack}
          autoHideDuration={2000}
          onClose={() => this.closeSnackbar()}
        >
          <Alert onClose={() => this.closeSnackbar()} severity="success">
            TEXT COPIED TO CLIPBOARD!
          </Alert>
        </Snackbar>
        <Dialog
          fullScreen
          scroll="body"
          open={this.props.open}
          TransitionComponent={this.Transition}
          onClose={() => this.props.onClose()}
        >
          <AppBar style={{ position: "relative" }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="close"
                onClick={() => this.props.onClose()}
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h6">Details</Typography>
              <Button
                autoFocus
                style={{ right: "12px", position: "absolute" }}
                color="inherit"
                onClick={() => this.saveFile()}
              >
                save RDF
              </Button>
            </Toolbar>
          </AppBar>
          <List>
            <ListItem button>
              <ListItemIcon>
                <Details></Details>
              </ListItemIcon>
              <ListItemText
                onClick={() => this.openSnackbar("uri")}
                primary="URI"
                secondary={this.props.document["uri"].value}
              />
            </ListItem>
            <Divider />

            {Object.keys(this.props.document).map(el =>
              this.props.document[el] !== "" &&
              el !== "type" &&
              el !== "uri" ? (
                <div>
                  <ListItem button>
                    <ListItemIcon>
                      <Details></Details>
                    </ListItemIcon>
                    <ListItemText
                      onClick={() => this.openSnackbar(el)}
                      primary={el.toUpperCase()}
                      secondary={this.props.document[el].toString()}
                    />
                  </ListItem>
                  <Divider />
                </div>
              ) : null
            )}
            <ListItem button>
              <ListItemIcon>
                <Details></Details>
              </ListItemIcon>
              <ListItemText
                onClick={() => this.openSnackbar("type")}
                primary="TYPE"
                secondary={this.props.document["type"].value}
              />
            </ListItem>
            <Divider />
          </List>
          <h3 style={{ margin: "24px" }}>
            Forse Pottrebbe interessarti anche:{" "}
          </h3>
          <SingleLineGridList
            style={{
              marginBottom: "32px"
            }}
            document={this.props.document}
          ></SingleLineGridList>
        </Dialog>
      </div>
    );
  }
}
