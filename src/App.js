import React, { useContext } from "react";
import GlobalContext from "./Providers/Context.js";
import HomePage from "./HomePage/HomePage";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import LoadingScreen from "./LoadingScreen/LoadingScreen.js";
import DetailsPage from "./DetailsPage/DetailsPage";

export default function App() {
  let value = useContext(GlobalContext);

  const theme = createMuiTheme({
    palette: {
      type: value.dark ? "dark" : "light",
      primary: { main: "#2589BD" },
      secondary: { main: "#38686A" },
      borderRadius: 3
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
          return context.ready && context.selectedDetails === null ? (
            <div>
              <HomePage></HomePage>
              <footer className="vs"></footer>
            </div>
          ) : context.ready && context.selectedDetails !== null ? (
            <DetailsPage document={context.selectedDetails}></DetailsPage>
          ) : (
            <LoadingScreen></LoadingScreen>
          );
        }}
      </GlobalContext.Consumer>
    </ThemeProvider>
  );
}
