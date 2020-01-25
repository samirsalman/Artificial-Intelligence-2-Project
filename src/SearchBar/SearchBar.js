import React from "react";
import GlobalContext from "../Providers/Context.js";
import {
  FormControl,
  Grid,
  FormControlLabel,
  RadioGroup,
  Radio
} from "@material-ui/core";

export default function SearchBar() {
  return (
    <GlobalContext.Consumer>
      {context => (
        <FormControl
          component="fieldset"
          style={{
            padding: "12px",
            margin: "16px",
            width: window.innerWidth - 64,
            color: context.dark ? "white" : "black",
            background: context.dark ? "#424242" : "#CFDEE7"
          }}
        >
          <p>OrderBy</p>
          <RadioGroup
            aria-label="orderBy"
            name="order-by"
            value={context.orderBy}
            onChange={context.handleChange}
          >
            <Grid
              container
              direction="row"
              justify="space-evenly"
              alignItems="center"
            >
              <FormControlLabel
                value="title"
                control={<Radio color="primary" />}
                label="Title"
              />
              <FormControlLabel
                value="isbn"
                control={<Radio color="primary" />}
                label="ISBN"
              />
              <FormControlLabel
                value="name"
                control={<Radio color="primary" />}
                label="Author"
              />
              <FormControlLabel
                value="year"
                control={<Radio color="primary" />}
                label="Year"
              />
            </Grid>
          </RadioGroup>
        </FormControl>
      )}
    </GlobalContext.Consumer>
  );
}
