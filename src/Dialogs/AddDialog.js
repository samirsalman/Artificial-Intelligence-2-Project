import React, { useState } from "react";
import GlobalContext from "../Providers/Context.js";
import {
  withStyles,
  makeStyles,
  ThemeProvider,
  useTheme
} from "@material-ui/core/styles";
import {
  Dialog,
  Button,
  DialogTitle,
  DialogContentText,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  TextField,
  DialogContent,
  DialogActions
} from "@material-ui/core";
import BookStructure from "./DialogStructure/BookStructure.js";

export default function AddDialog() {
  const [type, setType] = useState("Book");

  const handleChange = e => {
    setType(e.target.value);
  };

  var bookStruct = new BookStructure();

  return (
    <GlobalContext.Consumer>
      {context => (
        <Dialog
          open={context.openDialog}
          onClose={e => context.closeAddDialog(e)}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Aggiungi {type} </DialogTitle>
          <DialogContent>
            <InputLabel id="demo-simple-select-label">
              Cosa vuoi inserire?
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={type}
              onChange={handleChange}
            >
              <MenuItem value={"Book"}>Book</MenuItem>
              <MenuItem value={"Article"}>Article</MenuItem>
              <MenuItem value={"InProceedings"}>InProceedings</MenuItem>
            </Select>

            {type === "Book" ? bookStruct.render() : null}

            <DialogContentText>
              Aggiungi le informazioni sul {type}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={e => context.closeAddDialog(e, bookStruct.getFields())}
              color="primary"
            >
              Conferma
            </Button>
            <Button onClick={e => context.closeAddDialog(e)} color="primary">
              Annulla
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </GlobalContext.Consumer>
  );
}
