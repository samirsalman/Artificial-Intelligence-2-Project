import React from "react";
import { TextField } from "@material-ui/core";

export default class InProceedingsStructure extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  getFields = () => {
    var authors = [];
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
      if (
        document
          .getElementById("authorsField")
          .value.toString()
          .trimStart()
          .trimEnd().length > 0
      ) {
        authors = [document.getElementById("authorsField").value.toString()];
      }
    }

    return {
      type: "InProceedings",
      title: document.getElementById("titleField").value,
      year: document.getElementById("yearField").value,
      authors: authors,
      book: document.getElementById("bookField").value,
      publisher: document.getElementById("publisherField").value,
      editor: document.getElementById("editorField").value,
      isbn: document.getElementById("isbnField").value
    };
  };

  render() {
    return (
      <div>
        <TextField
          autoFocus
          margin="dense"
          id="titleField"
          label="Titolo*"
          fullWidth
        />
        <TextField margin="dense" id="yearField" label="Year*" fullWidth />
        <TextField
          margin="dense"
          id="authorsField"
          label="Autori*"
          fullWidth
          helperText="Aggiungi gli autori separati da virgole"
        />
        <TextField margin="dense" id="bookField" label="Book Title" fullWidth />
        <TextField margin="dense" id="editorField" label="Editor" fullWidth />
        <TextField margin="dense" id="isbnField" label="ISBN" fullWidth />

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
