import GlobalContext from "./Context";

import React, { Component } from "react";
import Axios from "axios";

export default class GlobalProvider extends Component {
  state = {
    ready: false,
    dark: false,
    open: false,
    orderBy: 0,
    year: null,
    lastSearch: "",
    filtersOpen: false,
    all: [],
    current: 0,
    results: [],
    favorites: []
  };

  componentDidMount() {
    var theme = localStorage.getItem("theme");
    if (theme != null) {
      this.setState({
        dark: theme
      });
    }
  }

  changeTheme = e => {
    this.setState({ dark: !this.state.dark });
    localStorage.setItem("theme", this.state.dark);
  };

  handleTabChange = (e, id) => {
    console.log(e);
    console.log(id);

    this.setState({ current: id });
  };

  resetResults = () => {
    this.setState({ results: this.state.all });
  };

  queryRequest = (e, search, functional = false) => {
    if (e !== null) {
      e.preventDefault();
    }
    if (!functional) {
      var options = "";
      if (this.state.orderBy !== 0) {
        options = `?orderBy=${this.state.orderBy}`;
      }
      if (this.state.year !== null) {
        if (this.state.orderBy === 0) {
          options = options + `?year=${this.state.year}`;
        } else {
          options = options + `&year=${this.state.year}`;
        }
      }
      if (search !== "") {
        console.log(e);
        this.setState({
          results: []
        });

        console.log("REQUest");
        if (this.state.current === 0) {
          this.setState({
            lastSearch: `http://localhost:3000/query/searchByTitle/${search}${options}`
          });

          Axios.get(
            `http://localhost:3000/query/searchByTitle/${search}${options}`
          ).then(res => {
            console.log(res);
            this.setState({
              results: res.data
            });
          });
        } else if (this.state.current === 1) {
          this.setState({
            lastSearch: `http://localhost:3000/query/searchByAuthor/${search}${options}`
          });

          Axios.get(
            `http://localhost:3000/query/searchByAuthor/${search}${options}`
          ).then(res => {
            console.log(res);
            this.setState({
              results: res.data
            });
          });
        } else {
          this.setState({
            lastSearch: `http://localhost:3000/query/searchByIsbn/${search}${options}`
          });

          Axios.get(
            `http://localhost:3000/query/searchByIsbn/${search}${options}`
          ).then(res => {
            console.log(res);
            this.setState({
              results: res.data
            });
          });
        }
      } else {
        this.setState({
          lastSearch: `http://localhost:3000/query/all`,
          results: this.state.all
        });
      }
    } else {
      console.log(search);

      Axios.get(search).then(res => {
        console.log(res);
        this.setState({
          results: res.data
        });
      });
    }
  };

  initialRequest = e => {
    Axios.get(`http://localhost:3000/query/all`)
      .then(res => {
        this.setState({
          results: res.data,
          all: res.data
        });
        setTimeout(() => {
          this.setState({
            ready: true
          });
        }, 1000);
      })
      .catch(error => {
        console.log(error);

        this.setState({
          open: true
        });
        return;
      });
  };
  handleChange = event => {
    this.setState({ orderBy: event.target.value });
  };

  openFilters = event => {
    this.setState({ filtersOpen: true });
    console.log(this.state.filtersOpen);
  };

  closeFilters = event => {
    if (typeof event == "number") {
      this.state.year = event;
      var temp = "";
      console.log(this.state.year);

      if (this.state.lastSearch.includes("year=")) {
        var ls = this.state.lastSearch;
        ls.replace("year=", `year=${event}`);
        temp = ls.substring(0, ls.length - 3);
        if (this.state.lastSearch.includes("orderBy=")) {
          temp = `${this.state.lastSearch}&year=${event}`;
        }
      } else {
        if (this.state.lastSearch.includes("orderBy=")) {
          temp = `${this.state.lastSearch}&year=${event}`;
        } else {
          temp = `${this.state.lastSearch}?year=${event}`;

          console.log("EVENT= ", `${temp}?year=${event}`);
        }
      }
      this.queryRequest(null, temp, true);
    }
    this.setState({
      filtersOpen: false
    });
  };

  removeYear = e => {
    console.log("REMOVE");

    this.setState({
      year: null
    });
    console.log(this.state.lastSearch);

    this.queryRequest(null, this.state.lastSearch, true);
  };

  render() {
    return (
      <GlobalContext.Provider
        value={{
          all: this.state.all,
          results: this.state.results,
          dark: this.state.dark,
          year: this.state.year,
          ready: this.state.ready,
          current: this.state.current,
          orderBy: this.state.orderBy,
          filtersOpen: this.state.filtersOpen,
          initialRequest: e => this.initialRequest(e),
          removeYear: e => this.removeYear(e),
          closeFilters: e => this.closeFilters(e),
          openFilters: e => this.openFilters(e),
          handleChange: e => this.handleChange(e),
          queryRequest: (e, query) => this.queryRequest(e, query),
          handleTabChange: (e, id) => this.handleTabChange(e, id),
          changeTheme: e => this.changeTheme(e),
          resetResults: () => this.resetResults()
        }}
      >
        {this.props.children}
      </GlobalContext.Provider>
    );
  }
}
