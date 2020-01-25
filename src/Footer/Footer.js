import React from "react";
import Grid from "@material-ui/core/Grid";

export default function Footer() {
  return (
    <div style={{ width: "100%" }}>
      <h2>Progetto IA2</h2>
      <p>Created by:</p>
      <br></br>

      <Grid container justify="space-evenly" alignItems="center">
        <Grid item>
          <b>
            <p style={{ fontSize: "16px" }}>Manuel Gallucci</p>
          </b>
        </Grid>
        <Grid item>
          <b>
            <p style={{ fontSize: "16px" }}>Matteo Domenico Lepore</p>
          </b>
        </Grid>
        <Grid item>
          <b>
            <p style={{ fontSize: "16px" }}>Simone Giorgioni</p>
          </b>
        </Grid>
        <Grid item>
          <b>
            <p style={{ fontSize: "16px" }}>Samir Salman</p>
          </b>
        </Grid>
      </Grid>
      <br></br>
      <b>
        <p>Prof. Armando Stellato</p>
      </b>

      <p style={{ fontSize: "14px", marginBottom: "24px" }}>A.A. 2019/2020</p>
    </div>
  );
}
