import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import Axios from "axios";
import DetailsPage from "../DetailsPage/DetailsPage";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)"
  },
  title: {
    color: theme.palette.primary.light
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)"
  }
}));

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
export default class SingleLineGridList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      related: [],
      detailsDialog: false,
      document: this.props.document
    };
  }

  openDetails = doc => {
    console.log("DETAILS :)", doc);

    this.setState({ document: doc, detailsDialog: true });
  };

  classes = () => useStyles();
  closeDetails = () => {
    this.setState({
      detailsDialog: false
    });
  };

  componentDidMount() {
    Axios.get(
      `http://localhost:3000/query/searchRelated/${this.props.document.title}`
    ).then(res => {
      console.log(res);
      this.setState({
        related: res.data
      });
    });
  }

  render() {
    return (
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          overflow: "hidden"
        }}
      >
        <DetailsPage
          open={this.state.detailsDialog}
          onClose={() => this.closeDetails()}
          document={this.state.document}
        ></DetailsPage>
        <GridList
          style={{
            overflow: "auto !important",
            flexWrap: "nowrap",
            // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
            transform: "translateZ(0)"
          }}
          cols={2.5}
        >
          {this.state.related.map(tile => (
            <GridListTile
              key={tile.title}
              onClick={() => this.openDetails(tile)}
            >
              <img
                src="https://www.atala.it/wp-content/plugins/accelerated-mobile-pages/images/SD-default-image.png"
                alt={tile.title}
              ></img>
              <GridListTileBar
                title={tile.title}
                subtitle={tile.authors}
                style={{ background: "#2589bd" }}
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
    );
  }
}
