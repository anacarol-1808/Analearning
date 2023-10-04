import { findProductById } from "./productData.mjs";
import { getLocalStorage, setLocalStorage } from "./utils.mjs";

// This function will become the entrypoint into our module and will make sure that everything happens in the right order. This function should be the default export.
export async function productDetails(productId){
    let productData = await findProductById(productId);
    renderProductDetails(productData);

}


// This is the function that is currently in product.js. We need to move it here
function addProductToCart(product) {
    const existing = localStorage.getItem("so-cart");
    const shoppingCart = [];
    if (existing) {
      try {
        shoppingCart.push(...JSON.parse(existing));
      } catch (err) {
        console.error("ERROR deserializing cart", err);
      }
    }
    shoppingCart.push(product);
    localStorage.setItem("so-cart", JSON.stringify(shoppingCart));
  }

// Method to fill in the details for the current product in the HTML.
function renderProductDetails(productData){
    console.log(productData);

    // Product Name
    document.getElementById('productName').textContent = productData.NameWithoutBrand;

    // Image
    const img = document.getElementById('productImg')
    img.setAttribute('src', productData.Image)
    img.setAttribute('alt', productData.Name)

}

//You will also need somewhere to store the product data that we will lookup. You can just declare a variable in the module file for this.
let productData;

  // add to cart button event handler
  async function addToCartHandler(e) {
    const product = await findProductById(e.target.dataset.id);
    addProductToCart(product);
  }

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);


