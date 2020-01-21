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
    type: null,
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
            lastSearch: `http://localhost:3000/query/searchByTitle/${search}`
          });

          Axios.get(`http://localhost:3000/query/searchByTitle/${search}`).then(
            res => {
              console.log(res);
              this.setState({
                results: res.data
              });
            }
          );
        } else if (this.state.current === 1) {
          this.setState({
            lastSearch: `http://localhost:3000/query/searchByAuthor/${search}`
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
            lastSearch: `http://localhost:3000/query/searchByIsbn/${search}`
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
          lastSearch: `http://localhost:3000/query/all`,
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

  closeFilters = (yearRange, type) => {
    var event = yearRange[0] + "-" + yearRange[1];
    console.log(type);
    console.log("YEAR RANGE", yearRange);

    if (type === "All") {
      this.state.type = null;
    } else {
      this.state.type = type;
    }

    if (yearRange[0] === 1970 && yearRange[1] === 2020) {
      this.state.year = null;
    } else {
      this.state.year = event;
    }
    var temp = this.state.lastSearch;

    temp += "?";
    if (this.state.year !== null) {
      if (this.state.year[0] !== undefined) {
        temp += `year=${event}&`;
      }
    }
    if (this.state.orderBy !== 0) {
      temp += `orderBy=${this.state.orderBy}&`;
    }
    if (this.state.type !== null) {
      temp += `type=${this.state.type}`;
    }

    console.log(temp);
    this.queryRequest(null, temp, true);

    this.setState({
      filtersOpen: false
    });
  };

  closeWindow = e => {
    this.setState({
      filtersOpen: false
    });
  };

  removeYear = e => {
    this.state.year = null;
    var temp = this.buildQuery();
    this.queryRequest(null, temp, true);
  };

  removeType = e => {
    this.state.type = null;
    var temp = this.buildQuery();
    this.queryRequest(null, temp, true);
  };

  buildQuery = () => {
    var temp = this.state.lastSearch;
    temp += "?";
    if (this.state.year !== null) {
      if (this.state.year[0] !== undefined) {
        temp += `year=${this.state.year}&`;
      }
    }
    if (this.state.orderBy !== 0) {
      temp += `orderBy=${this.state.orderBy}&`;
    }
    if (this.state.type !== null) {
      temp += `type=${this.state.type}&`;
    }
    return temp;
  };

  render() {
    return (
      <GlobalContext.Provider
        value={{
          all: this.state.all,
          results: this.state.results,
          dark: this.state.dark,
          type: this.state.type,
          year: this.state.year,
          ready: this.state.ready,
          current: this.state.current,
          orderBy: this.state.orderBy,
          filtersOpen: this.state.filtersOpen,
          removeType: e => this.removeType(e),
          closeWindow: e => this.closeWindow(e),

          initialRequest: e => this.initialRequest(e),
          removeYear: e => this.removeYear(e),
          closeFilters: (y, t) => this.closeFilters(y, t),
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
