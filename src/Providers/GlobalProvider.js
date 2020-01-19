import GlobalContext from "./Context";

import React, { Component } from "react";
import Axios from "axios";

export default class GlobalProvider extends Component {
  state = {
    ready: false,
    dark: false,
    open: false,
    orderBy: 0,
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

  queryRequest = (e, search) => {
    e.preventDefault();
    if (search !== "") {
      console.log(e);
      this.setState({
        results: []
      });
      if (this.state.orderBy !== 0) {
        var orderOption = this.state.orderBy;
      }
      console.log("REQUest");
      if (this.state.current === 0) {
        Axios.get(
          `http://localhost:3000/query/searchByTitle/${search}/${orderOption}`
        ).then(res => {
          console.log(res);
          this.setState({
            results: res.data
          });
        });
      } else if (this.state.current === 1) {
        Axios.get(
          `http://localhost:3000/query/searchByAuthor/${search}/${orderOption}`
        ).then(res => {
          console.log(res);
          this.setState({
            results: res.data
          });
        });
      } else {
        Axios.get(
          `http://localhost:3000/query/searchByIsbn/${search}/${orderOption}`
        ).then(res => {
          console.log(res);
          this.setState({
            results: res.data
          });
        });
      }
    } else {
      this.setState({
        results: this.state.all
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
    console.log(event.target.value);

    this.setState({ orderBy: event.target.value });
  };

  render() {
    return (
      <GlobalContext.Provider
        value={{
          all: this.state.all,
          results: this.state.results,
          dark: this.state.dark,
          ready: this.state.ready,
          current: this.state.current,
          orderBy: this.state.orderBy,
          initialRequest: e => this.initialRequest(e),

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
