import React, { useState } from "react";
import GlobalContext from "../Providers/Context.js";

import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import {
  Dialog,
  Button,
  DialogTitle,
  DialogContentText,
  InputLabel,
  Select,
  Grid,
  CircularProgress,
  MenuItem,
  DialogContent,
  DialogActions
} from "@material-ui/core";
import BookStructure from "./DialogStructure/BookStructure.js";
import ArticleStructure from "./DialogStructure/ArticleStructure.js";
import InProceedings from "./DialogStructure/InProceedingsStructure";

export default function AddDialog() {
  const [type, setType] = useState("Book");

  const handleChange = e => {
    setType(e.target.value);
  };

  var bookStruct = new BookStructure();
  var articleStruct = new ArticleStructure();
  var inProceedingsStruct = new InProceedings();

  return (
    <GlobalContext.Consumer>
      {context =>
        context.loading ? (
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: "100vh" }}
          >
            <Grid item xs={3}>
              <CircularProgress />
            </Grid>
          </Grid>
        ) : context.success ? (
          <Snackbar open={context.success} autoHideDuration={5000}>
            <Alert severity="success">Documento inserito con successo</Alert>
          </Snackbar>
        ) : context.error ? (
          <Snackbar open={context.error} autoHideDuration={5000}>
            <Alert severity="error">Si è verificato un errore</Alert>
          </Snackbar>
        ) : (
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

              {type === "Book"
                ? bookStruct.render()
                : type === "Article"
                ? articleStruct.render()
                : inProceedingsStruct.render()}

              <DialogContentText>
                I campi contrassegnati con * sono obbligatori
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={
                  type === "Book"
                    ? e => context.closeAddDialog(e, bookStruct.getFields())
                    : type === "Article"
                    ? e => context.closeAddDialog(e, articleStruct.getFields())
                    : e =>
                        context.closeAddDialog(
                          e,
                          inProceedingsStruct.getFields()
                        )
                }
                color="primary"
              >
                Conferma
              </Button>
              <Button onClick={e => context.closeAddDialog(e)} color="primary">
                Annulla
              </Button>
            </DialogActions>
          </Dialog>
        )
      }
    </GlobalContext.Consumer>
  );
}
