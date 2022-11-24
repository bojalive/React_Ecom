import {
  AddOutlined,
  RemoveOutlined,
  ShoppingCart,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { Button, IconButton, Stack } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React from "react";
import { useHistory , useNavigate} from "react-router-dom";
import "./Cart.css";
import { useState } from "react";

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

/**
 * @typedef {Object} CartItem -  - Data on product added to cart
 *
 * @property {string} name - The name or title of the product in cart
 * @property {string} qty - The quantity of product added to cart
 * @property {string} category - The category that the product belongs to
 * @property {number} cost - The price to buy the product
 * @property {number} rating - The aggregate rating of the product (integer out of five)
 * @property {string} image - Contains URL for the product image
 * @property {string} productId - Unique ID for the product
 */

/**
 * Returns the complete data on all products in cartData by searching in productsData
 *
 * @param { Array.<{ productId: String, qty: Number }> } cartData
 *    Array of objects with productId and quantity of products in cart
 *
 * @param { Array.<Product> } productsData
 *    Array of objects with complete data on all available products
 *
 * @returns { Array.<CartItem> }
 *    Array of objects with complete data on products in cart
 *
 */
export const generateCartItemsFrom =  (cartData, productsData) => {
  const array = [];
  for (let i = 0; i < cartData.length; i++) {
    for (let j = 0; j < productsData.length; j++) {
      if (cartData[i].productId === productsData[j]._id) {
        let tempProductData = productsData[j];
        tempProductData.qty = cartData[i].qty;
        // tempProductData.productId = cartData[i].productId
        array.push(tempProductData);
      }
    }
  }
/*
  const url = "http://localhost:8082/api/v1/cart";
   const shit1 = cartData[0]
  
  axios
    .post(url,
      shit1,
      {
        headers: {
          Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJvamFyYWp1IiwiaWF0IjoxNjY5MjczNjI1LCJleHAiOjE2NjkyOTUyMjV9.9w4wYCuAGGCYTMB46UllCssW5OlufX-vB0EIbj1joWI"}`,
               
        },
      },
    
    )
    .then((res) => {
      // console.log('st')
      // console.log(res.data)
    });
  //console.log("shit")
  //console.log(array)*/
  return array;
};

/**
 * Get the total value of all products added to the cart
 *
 * @param { Array.<CartItem> } items
 *    Array of objects with complete data on products added to the cart
 *
 * @returns { Number }
 *    Value of all items in the cart
 *
 */
export const getTotalCartValue = (items = []) => {
  let totalCost = 0 
  for (let i = 0; i < items.length; i++) {
    totalCost  = totalCost+(parseInt(items[i].cost) * parseInt( items[i].qty))
    //console.log(items[i].cost)
  }
return totalCost
};

/**
 * Component to display the current quantity for a product and + and - buttons to update product quantity on cart
 *
 * @param {Number} value
 *    Current quantity of product in cart
 *
 * @param {Function} handleAdd
 *    Handler function which adds 1 more of a product to cart
 *
 * @param {Function} handleDelete
 *    Handler function which reduces the quantity of a product in cart by 1
 *
 *
 */


const ItemQuantity = ({ value, handleAdd, data }) => {
  const [cartQty, setcartQty] = useState(value)
  
  return (
    <Stack direction="row" alignItems="center">
      <IconButton size="small" color="primary" onClick={event=>handleAdd(0,data,setcartQty)}>
        <RemoveOutlined />
      </IconButton>
      <Box padding="0.5rem" data-testid="item-qty">
        {value}
      </Box>
      <IconButton size="small" color="primary"  onClick={event=>handleAdd(1,data,setcartQty)}>
        <AddOutlined />
      </IconButton>
    </Stack>
  );
};

/**
 * Component to display the Cart view
 *
 * @param { Array.<Product> } products
 *    Array of objects with complete data of all available products
 *
 * @param { Array.<Product> } items
 *    Array of objects with complete data on products in cart
 *
 * @param {Function} handleDelete
 *    Current quantity of product in cart
 *
 *
 */

const Cart = ({
  products,
  items = [
    {
      productId: "PmInA797xJhMIPti",
      qty: 3,
    },
    {
      productId: "TwMM4OAhmK0VQ93S",
      qty: 1,
    },
    {
      productId: "PmInA797xJhMIPti",
      qty: 4,
    },
  ],
  handleQuantity,
}) => {
 
  const navigate = useNavigate();
  const fullCartDetails =  generateCartItemsFrom(items, products);
  //console.log(products);
  if (!items.length) {
    return (
      <Box className="cart empty">
        <ShoppingCartOutlined className="empty-cart-icon" />
        <Box color="#aaa" textAlign="center">
          Cart is empty. Add more items to the cart to checkout.
        </Box>
      </Box>
    );
  }

  return (
    <>
      <Box className="cart">
      {fullCartDetails.map((element, index) => (
            <Box display="flex" alignItems="flex-start" padding="1rem" key={index}>
              <Box className="image-container">
                <img
                  // Add product image
                  src={element.image}
                  // Add product name as alt eext
                  alt={element.name}
                  width="100%"
                  height="100%"
                />
                {/*console.log(`sdasda`)*/}
                {/*console.log(element.name)*/}
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                height="6rem"
                paddingX="1rem"
              >
                <div>{element.name}</div>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <ItemQuantity
                 value={element.qty} 
                 handleAdd={handleQuantity}
                 data={element}
                  />
                  <Box padding="0.5rem" fontWeight="700">
                    ${element.cost}
                  </Box>
                </Box>
              </Box>
            </Box>
          ))}
        <Box
          padding="1rem"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box color="#3C3C3C" alignSelf="center">
            Order total
          </Box>

          <Box
            color="#3C3C3C"
            fontWeight="700"
            fontSize="1.5rem"
            alignSelf="center"
            data-testid="cart-total"
          >
            ${getTotalCartValue(fullCartDetails)}
          </Box>
        </Box>

        <Box display="flex" justifyContent="flex-end" className="cart-footer">
          <Button
            color="primary"
            variant="contained"
            startIcon={<ShoppingCart />}
            className="checkout-btn"
            onClick={()=>{navigate('Checkout')}}
          >
            Checkout
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Cart;
