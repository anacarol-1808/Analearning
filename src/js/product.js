import { setLocalStorage } from "./utils.mjs";
import { findProductById } from "./productData.mjs";

var items = [];
function addProductToCart(product) {
  const existing = localStorage.getItem("so-cart");
  const shoppingCart = [];
  if(existing) {
    try {
      shoppingCart.push(...JSON.parse(existing))
    } catch(err) {console.error("ERROR deserializing cart", err);}
    }
    shoppingCart.push(product);
    localStorage.setItem("so-cart", JSON.stringify(shoppingCart));
  }


// add to cart button event handler
async function addToCartHandler(e) {
  const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
