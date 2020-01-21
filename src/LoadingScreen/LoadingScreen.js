import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Snackbar from "@material-ui/core/Snackbar";
import HomePage from "../HomePage/HomePage";
import Alert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import GlobalContext from "../Providers/Context";

export default class LoadingScreen extends Component {
  componentDidMount() {
    let value = this.context;
    value.initialRequest();
  }

  render() {
    return (
      <div>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={this.context.open}
          autoHideDuration={4000}
        >
          <Alert
            severity="error"
            variant="filled"
            style={{ width: window.innerWidth * 0.6 }}
          >
            Si è verificato un errore
          </Alert>
        </Snackbar>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: "100vh" }}
        >
          <Grid item xs={3}>
            <CircularProgress />
          </Grid>
        </Grid>
      </div>
    );
  }
}

LoadingScreen.contextType = GlobalContext;
