import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";

import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import { Details } from "@material-ui/icons";

import Paper from "@material-ui/core/Paper";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";

export default class DetailsPage extends Component {
  constructor(props) {
    super(props);
  }
  Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  saveFile = () => {
    Axios.get(
      `http://localhost:3000/saveRdf/${this.props.document.uri.value}`
    ).then(res => {
      console.log(res);
    });
  };

  render() {
    return (
      <div>
        <Dialog
          fullScreen
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
              <Button autoFocus color="inherit" onClick={() => this.saveFile()}>
                save
              </Button>
            </Toolbar>
          </AppBar>
          <List>
            <ListItem button>
              <ListItemIcon>
                <Details></Details>
              </ListItemIcon>
              <ListItemText
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
                primary="TYPE"
                secondary={this.props.document["type"].value}
              />
            </ListItem>
            <Divider />
          </List>
        </Dialog>
      </div>
    );
  }
}
