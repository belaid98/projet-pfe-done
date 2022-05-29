import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import PropTypes from "prop-types";
import "./CustomCard.css";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function CustomCard(props) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const { show, item, children, classes, image_path, ...other } = props;

  return (
    <Card sx={{ maxWidth: 345 }} elevation={5} className={classes} {...other}>
      <div className="flip-box">
        <div className="flip-box-inner">
          <div className="flip-box-front">
            {item.front_image ? (
              <CardMedia
                component="img"
                height="194"
                image={item.url + item.front_image}
                alt={item.libele}
              />
            ) : (
              <CardMedia
                component="img"
                height="194"
                image={"./assets/placeholder.png"}
                alt={"placeholder"}
              />
            )}
          </div>
          <div className="flip-box-back">
            {item.back_image ? (
              <CardMedia
                component="img"
                height="194"
                image={item.url + item.back_image}
                alt={item.libele}
              />
            ) : (
              <CardMedia
                component="img"
                height="194"
                image={"./assets/placeholder.png"}
                alt={"placeholder"}
              />
            )}
          </div>
        </div>
      </div>

      <CardHeader title={item.libele} subheader={item.prix + " DT"} />

      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={show}>
          <AddShoppingCartIcon />
        </IconButton>
        {/* <IconButton aria-label="info">
          <InfoIcon />
        </IconButton> */}
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Description:</Typography>
          <Typography paragraph>{item.description}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
CustomCard.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.string,
};
CustomCard.defaultProps = {
  classes: "",
};
