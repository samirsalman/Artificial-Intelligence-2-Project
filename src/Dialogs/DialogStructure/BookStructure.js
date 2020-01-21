import React from "react";
import { TextField } from "@material-ui/core";

export default class BookStructure extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  getFields = () => {
    var authors = "";
    if (
      document
        .getElementById("authorsField")
        .value.toString()
        .includes(",")
    ) {
      authors = document
        .getElementById("authorsField")
        .value.toString()
        .split(",");

      for (var i = 0; i < authors.length; i++) {
        authors[i] = authors[i]
          .toString()
          .trimStart()
          .trimEnd();
      }
    } else {
      authors = document.getElementById("authorsField").value.toString();
    }

    return {
      title: document.getElementById("titleField").value,
      year: document.getElementById("yearField").value,
      authors: authors,
      isbn: document.getElementById("ISBNField").value,
      publisher: document.getElementById("publisherField").value
    };
  };

  render() {
    return (
      <div>
        <TextField
          autoFocus
          margin="dense"
          id="titleField"
          label="Titolo"
          fullWidth
        />
        <TextField margin="dense" id="yearField" label="Year" fullWidth />
        <TextField margin="dense" id="authorsField" label="Autori" fullWidth />
        <TextField margin="dense" id="ISBNField" label="ISBN" fullWidth />
        <TextField
          margin="dense"
          id="publisherField"
          label="Publisher"
          fullWidth
        />
      </div>
    );
  }
}
