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
  TextField,
  Slider,
  DialogContent,
  DialogActions
} from "@material-ui/core";

export default function FiltersDialog() {
  const [year, setYear] = useState([1920, 2020]);

  var handleChange = (event, newValue) => {
    console.log(newValue);

    setYear(newValue);
  };

  return (
    <GlobalContext.Consumer>
      {context => (
        <Dialog
          open={context.filtersOpen}
          onClose={context.closeFilters}
          aria-labelledby="filters"
          id="filters"
        >
          <DialogTitle>Aggiungi Filtri</DialogTitle>
          <DialogContent style={{ marginRight: "12px", overflow: "hidden" }}>
            <DialogContentText>
              Aggiungi i filtri da inserire nella ricerca
            </DialogContentText>
            <p>
              Dal: {year[0]} al {year[1]}
            </p>
            <Slider
              valueLabelDisplay="auto"
              value={year}
              onChange={(e, v) => handleChange(e, v)}
              aria-labelledby="range-slider"
              min={1900}
              max={2020}
            />
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={e => context.closeFilters(year)}>
              Conferma
            </Button>
            <Button color="primary" onClick={context.closeFilters}>
              Annulla
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </GlobalContext.Consumer>
  );
}
