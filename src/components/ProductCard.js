import { AddShoppingCartOutlined } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import React from "react";
import "./ProductCard.css";
<<<<<<< HEAD
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  card: {
    
    boxShadow: "0 5px 8px 0 rgba(0, 0, 0, 0.3)",
    backgroundColor: "#fafafa",
    paddingRight:'10px',
    paddingTop:"10px"
  },
  media: {
    height: 300,
  },
});

const ProductCard = ({ product, handleAddToCart }) => {
  const classes = useStyles();
  return (
    /*  <Card className="card">
      <CardMedia
        component="img"
        alt="green iguana" //  height="140"
        image={product.image}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}{" "}
        </Typography>
        <Typography variant="h5"> ${product.cost}</Typography>
      </CardContent>
      <Rating name="read-only" value={product.rating} readOnly />
      <CardActions>
        <Button variant="outlined">ADD TO CART</Button>
      </CardActions>
    </Card>
*/
    <Grid container>
      {product.map((p) => (   
        <Grid item xs={6} md={3}>            
            <Card className={`card ${classes.card}`}>
              <CardMedia
                className={classes.media}
                component="img"
                alt="green iguana"
                image={p.image}
              />
              <CardContent>
                <Typography color="primary" variant="h5">
                  {p.name}
                </Typography>
                <Typography color="textSecondary" variant="subtitle2">
                  ${p.cost}
                </Typography>
              </CardContent>
              <Rating name="read-only" value={p.rating} readOnly />
              <CardActions>
                <Button variant="outlined" fullWidth>ADD TO CART</Button>
              </CardActions>
            </Card>
               </Grid>
      ))}
    </Grid>
=======

const ProductCard = ({ product, handleAddToCart }) => {
  return (
    <Card className="card">
    </Card>
>>>>>>> e7ef4956fa0d9eed00ff1db4b4fed8bbb6626109
  );
};

export default ProductCard;
