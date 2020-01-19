import React, { useState, useContext } from "react";
import { ReactComponent as Moon } from "../assets/moon.svg";
import "../App.css";
import GlobalContext from "../Providers/Context";
import SearchBar from "../SearchBar/SearchBar";
import {
  Tabs,
  Tab,
  SvgIcon,
  InputBase,
  IconButton,
  Paper
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { WbSunny, Search, Add } from "@material-ui/icons";
import QueryDocument from "../Document/QueryDocument";

export default function HomePage() {
  let value = useContext(GlobalContext);

  const [search, setSearch] = useState("");

  var i = 0;

  var onSearchChange = text => {
    if (text.target.value.length === 0) {
      value.resetResults();
    }
    setSearch(text.target.value);
  };

  return (
    <GlobalContext.Consumer>
      {context => (
        <div
          className="App"
          style={{ background: context.dark ? "#201f1f" : "#fff" }}
        >
          <header className="App-header">
            <Button
              onClick={context.changeTheme}
              aria-label="theme"
              style={{
                position: "absolute",
                top: 8,
                right: 8,
                color: "#fff"
              }}
            >
              {!context.dark ? (
                <SvgIcon component={Moon}></SvgIcon>
              ) : (
                <WbSunny></WbSunny>
              )}
            </Button>
            <Button
              onClick={context.changeTheme}
              aria-label="add"
              style={{
                position: "absolute",
                top: 8,
                left: 8,
                color: "#fff"
              }}
            >
              <Add></Add>
            </Button>
            <h1>Authors Knowledge</h1>
            <p>Find your documents</p>

            <Paper
              component="form"
              onSubmit={e =>
                context.queryRequest(
                  e,
                  document.getElementById("inputBaseSearch").value
                )
              }
            >
              <IconButton type="submit" aria-label="search">
                <Search />
              </IconButton>

              <InputBase id="inputBaseSearch" />
            </Paper>
            <Tabs
              value={context.current}
              onChange={(e, id) => context.handleTabChange(e, id)}
              indicatorColor="secondary"
              centered
            >
              <Tab label="title" value={0} />
              <Tab label="author" value={1} />
              <Tab label="isbn" value={2} />
            </Tabs>
          </header>
          <SearchBar></SearchBar>

          <Grid container alignItems="center" justify="space-between">
            {context.results.map(e => (
              <QueryDocument key={i++} document={e}></QueryDocument>
            ))}
          </Grid>
        </div>
      )}
    </GlobalContext.Consumer>
  );
}
