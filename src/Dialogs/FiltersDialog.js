import React, { useState } from "react";
import GlobalContext from "../Providers/Context.js";
import {
  Dialog,
  Button,
  DialogTitle,
  DialogContentText,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  DialogContent,
  DialogActions
} from "@material-ui/core";

export default function FiltersDialog() {
  const [year, setYear] = useState([1970, 2020]);
  const [type, setType] = useState("All");

  var handleChange = (event, newValue) => {
    console.log(newValue);

    setYear(newValue);
  };

  var handleChangeType = event => {
    console.log(event.target.value);

    setType(event.target.value);
  };

  return (
    <GlobalContext.Consumer>
      {context => (
        <Dialog
          open={context.filtersOpen}
          onClose={e => context.closeFilters(null, null, false)}
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
              min={1970}
              max={2020}
            />

            <InputLabel id="type-label">Tipo</InputLabel>
            <Select
              autoWidth={true}
              labelId="type-menu"
              id="type-select"
              value={type}
              onChange={handleChangeType}
            >
              <MenuItem value={"All"}>All</MenuItem>
              <MenuItem value={"Book"}>Book</MenuItem>
              <MenuItem value={"Article"}>Article</MenuItem>
              <MenuItem value={"InProceedings"}>InProceedings</MenuItem>
            </Select>
          </DialogContent>
          <DialogActions>
            <Button
              color="primary"
              onClick={() => context.closeFilters(year, type)}
            >
              Conferma
            </Button>
            <Button color="primary" onClick={e => context.closeWindow(e)}>
              Annulla
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </GlobalContext.Consumer>
  );
}
