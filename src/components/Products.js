import { Search, SentimentDissatisfied } from "@mui/icons-material";
import {
  CircularProgress,
  Grid,
  InputAdornment,
  TextField,
  IconButton,
  Paper,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Products.css";
import ProductCard from "./ProductCard";
import Cart,{generateCartItemsFrom} from "./Cart";
//import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
//import { Search } from "@mui/icons-material";

// Definition of Data Structures used
/**
 * @typedef {Object} Product - Data on product available to buy
 *
 * @property {string} name - The name or title of the product
 * @property {string} category - The category that the product belongs to
 * @property {number} cost - The price to buy the product
 * @property {number} rating - The aggregate rating of the product (integer out of five)
 * @property {string} image - Contains URL for the product image
 * @property {string} _id - Unique ID for the product
 */

const Products = () => {
  const [productData, setproductData] = useState([]);
  const [search, setsearch] = useState("");
  const enqueueSnackbar = useSnackbar();
  const [cardData, setcardData] = useState([]);
  

  // TODO: CRIO_TASK_MODULE_PRODUCTS - Fetch products data and store it
  /**
   * Make API call to get the products list and store it to display the products
   *
   * @returns { Array.<Product> }
   *      Array of objects with complete data on all available products
   *
   * API endpoint - "GET /products"
   *
   * Example for successful response from backend:
   * HTTP 200
   * [
   *      {
   *          "name": "iPhone XR",
   *          "category": "Phones",
   *          "cost": 100,
   *          "rating": 4,
   *          "image": "https://i.imgur.com/lulqWzW.jpg",
   *          "_id": "v4sLtEcMpzabRyfx"
   *      },
   *      {
   *          "name": "Basketball",
   *          "category": "Sports",
   *          "cost": 100,
   *          "rating": 5,
   *          "image": "https://i.imgur.com/lulqWzW.jpg",
   *          "_id": "upLK9JbQ4rMhTwt4"
   *      }
   * ]
   *
   * Example for failed response from backend:
   * HTTP 500
   * {
   *      "success": false,
   *      "message": "Something went wrong. Check the backend console for more details"
   * }
   */

  useEffect(() => performAPICall(), []);
  useEffect(() => fetchCart(), [cardData]);

  const performAPICall = async () => {
    const url = `${config.endpoint}/products`;

    const res = await axios.get(url).then((resp) => {
      setproductData(resp.data);

      //console.log(resp.data);
    });
  };

  // TODO: CRIO_TASK_MODULE_PRODUCTS - Implement search logic
  /**
   * Definition for search handler
   * This is the function that is called on adding new search keys
   *
   * @param {string} text
   *    Text user types in the search bar. To filter the displayed products based on this text.
   *
   * @returns { Array.<Product> }
   *      Array of objects with complete data on filtered set of products
   *
   * API endpoint - "GET /products/search?value=<search-query>"
   *
   */
  const performSearch = async (e) => {
    e.preventDefault();
    const urlSearch = `${config.endpoint}/products/search?value=${search}`;
    try {
      await axios.get(urlSearch).then((res) => {
        //console.log(res.data);
        setproductData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  // TODO: CRIO_TASK_MODULE_PRODUCTS - Optimise API calls with debounce search implementation
  /**
   * Definition for debounce handler
   * With debounce, this is the function to be called whenever the user types text in the searchbar field
   *
   * @param {{ target: { value: string } }} event
   *    JS event object emitted from the search input field
   *
   * @param {NodeJS.Timeout} debounceTimeout
   *    Timer id set for the previous debounce call
   *
   */
  const debounceSearch = (event, debounceTimeout) => {};
  const shit = () => {
    return (
      <Paper
        component="form"
        onSubmit={performSearch}
        sx={{
          borderRadius: 20,
          border: "1px solid #e3e3e3",
          pl: 2,
          boxShadowL: "none",
          mr: { sm: 5 },
        }}
      >
        <input
          className="search-bar"
          placeholder="Search..."
          value={search}
          onChange={(e) => {
            setsearch(e.target.value);
          }}
        />
        <IconButton
          type="submit"
          sx={{
            p: "10px",
            color: "green",
          }}
        >
          <Search />
        </IconButton>
      </Paper>
    );
  };

  /*
   * Perform the API call to fetch the user's cart and return the response
   *
   * @param {string} token - Authentication token returned on login
   *
   * @returns { Array.<{ productId: string, qty: number }> | null }
   *    The response JSON object
   *
   * Example for successful response from backend:
   * HTTP 200
   * [
   *      {
   *          "productId": "KCRwjF7lN97HnEaY",
   *          "qty": 3
   *      },
   *      {
   *          "productId": "BW0jAAeDJmlZCF8i",
   *          "qty": 1
   *      }
   * ]
   *
   * Example for failed response from backend:
   * HTTP 401
   * {
   *      "success": false,
   *      "message": "Protected route, Oauth2 Bearer token not found"
   * }
   */

  const fetchCart = async () => {
    const cartURL = `${config.endpoint}/cart`;
    const token = localStorage.getItem('token')
   
    if (!token) return;
    try {
      // TODO: CRIO_TASK_MODULE_CART - Pass Bearer token inside "Authorization" header to get data from "GET /cart" API and return the response data
      const cartData = await axios
        .get(cartURL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setcardData(generateCartItemsFrom(res.data, productData));
          
        });
      //return await cartData
    } catch (e) {
      if (e.response && e.response.status === 400) {
        enqueueSnackbar(e.response.data.message, { variant: "error" });
      } else {
        enqueueSnackbar(
          "Could not fetch cart details. Check that the backend is running, reachable and returns valid JSON.",
          {
            variant: "error",
          }
        );
      }
      return null;
    }
  };

  // TODO: CRIO_TASK_MODULE_CART - Return if a product already exists in the cart
  /**
   * Return if a product already is present in the cart
   *
   * @param { Array.<{ productId: String, quantity: Number }> } items
   *    Array of objects with productId and quantity of products in cart
   * @param { String } productId
   *    Id of a product to be checked
   *
   * @returns { Boolean }
   *    Whether a product of given "productId" exists in the "items" array
   *
   */
  const isItemInCart = (items, productId) => {};

  /**
   * Perform the API call to add or update items in the user's cart and update local cart data to display the latest cart
   *
   * @param {string} token
   *    Authentication token returned on login
   * @param { Array.<{ productId: String, quantity: Number }> } items
   *    Array of objects with productId and quantity of products in cart
   * @param { Array.<Product> } products
   *    Array of objects with complete data on all available products
   * @param {string} productId
   *    ID of the product that is to be added or updated in cart
   * @param {number} qty
   *    How many of the product should be in the cart
   * @param {boolean} options
   *    If this function was triggered from the product card's "Add to Cart" button
   *
   * Example for successful response from backend:
   * HTTP 200 - Updated list of cart items
   * [
   *      {
   *          "productId": "KCRwjF7lN97HnEaY",
   *          "qty": 3
   *      },
   *      {
   *          "productId": "BW0jAAeDJmlZCF8i",
   *          "qty": 1
   *      }
   * ]
   *
   * Example for failed response from backend:
   * HTTP 404 - On invalid productId
   * {
   *      "success": false,
   *      "message": "Product doesn't exist"
   * }
   */
  const addToCart = async (
    p,
    qty,
    token =  localStorage.getItem('token'),
    items,
    products,
    productId,
    
    options = { preventDuplicate: false }
  ) => {
    const url =`${config.endpoint}/cart`;
    console.log(p);
    //const token = localStorage.getItem('token')
    axios
      .post(
        url,
        {
          productId: p._id,
          qty: qty,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        // console.log('st')
        // console.log(res.data)
      });
  };

  const handlerSnackBar = () => {
   // enqueueSnackbar(`Successful.`, { variant: "success" });
};

  const handleAddToCart = (p) => {
  /* if ( cardData.filter(i=>i.productId==p._id).length===0 ) {
    addToCart(p,1)
   } else {
    handlerSnackBar();
   }*/
    cardData.filter(i=>i.productId==p._id).length===0 ? addToCart(p,1)  : handlerSnackBar()
   
  };

  const handleButton =(flag,p,setcartQty)=>{
    if (flag === 0) {
      const minQty = p.qty-1
      //setcartQty(p.qty-1)
      addToCart(p,minQty)

    } else {
      const maxQty = p.qty+1
     // setcartQty(p.qty+1)
      addToCart(p,maxQty)
    }
    
      //addToCart(p)
  }
  let checkLogin = false;
  const checkLogged = () => {
    const userName = localStorage.getItem("token");
    if (userName !== null) {
      checkLogin = true;
    }
  };
  checkLogged();
  //fetchCart
  return (
    <div>
      <Header children={shit()}></Header>

      <TextField
        className="search-mobile"
        size="small"
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Search color="primary" />
            </InputAdornment>
          ),
        }}
        placeholder="Search for items/categories"
        name="search"
      />
      <Grid container spacing={2}>
        <Grid item className="product-grid" xs={12} md={9}>
          <Box className="hero">
            <p className="hero-heading">
              India’s <span className="hero-highlight">FASTEST DELIVERY</span>{" "}
              to your door step
            </p>
          </Box>
          <ProductCard
            product={productData}
            handleAddToCart={handleAddToCart}
          />
        </Grid>
        {checkLogin && (
          <Grid className="cartShit" item xs={12} md={3}>
            {console.log(productData)}
            <Cart products={productData} items={cardData} handleQuantity={handleButton} />
          </Grid>
        )}
      </Grid>

      <Footer />
    </div>
  );
};

export default Products;
/* return (
    
      <Header children={shit()}></Header>/*/
