import React from "react";
import { TextField } from "@material-ui/core";

export default class ArticleStructure extends React.Component {
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
      type: "Article",
      title: document.getElementById("titleField").value,
      year: document.getElementById("yearField").value,
      authors: authors,
      issn: document.getElementById("ISSNField").value,
      journal: document.getElementById("journalField").value
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
        <TextField margin="dense" id="ISSNField" label="ISSN" fullWidth />
        <TextField
          margin="dense"
          id="journalField"
          label="Journal Title"
          fullWidth
        />
      </div>
    );
  }
}
