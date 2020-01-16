import React, { useState, useContext } from "react";
import GlobalContext from "./Providers/Context.js";

import HomePage from "./HomePage/HomePage";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import LoadingScreen from "./LoadingScreen/LoadingScreen.js";

export default function App() {
  let value = useContext(GlobalContext);

  const theme = createMuiTheme({
    palette: {
      type: value.dark ? "dark" : "light",
      primary: { main: "#2589BD" },
      secondary: { main: "#38686A" }
    },
    status: {
      danger: "orange"
    }
  });
  return (
    <ThemeProvider theme={theme}>
      <GlobalContext.Consumer>
        {context => {
          context.dark
            ? (document.body.style = "background: #201f1f;")
            : (document.body.style = "background: white;");
          return context.ready ? (
            <div>
              <HomePage></HomePage>
              <footer className="vs"></footer>
            </div>
          ) : (
            <LoadingScreen></LoadingScreen>
          );
        }}
      </GlobalContext.Consumer>
    </ThemeProvider>
  );
}
