import { findProductById } from "./productData.mjs";
import { getLocalStorage, setLocalStorage } from "./utils.mjs";

let product = {};

// This function will become the entrypoint into our module and will make sure that everything happens in the right order. This function should be the default export.
export default async function productDetails(productId){
    product = await findProductById(productId);
    renderProductDetails();
    document.getElementById("addToCart").addEventListener("click", addToCart);
}

// This is the function that is currently in product.js. We need to move it here
function addToCart() {
  const existing = getLocalStorage("so-cart");
  const shoppingCart = [];
  if (existing) {
    try {
      shoppingCart.push(...existing);
    } catch (err) {
      console.error("ERROR deserializing cart", err);
    }
  }
  shoppingCart.push(product);
  setLocalStorage("so-cart", shoppingCart);
}


// Method to fill in the details for the current product in the HTML.
function renderProductDetails(){
    document.querySelector("#productName").innerText = product.Brand.Name;
    document.querySelector("#productNameWithoutBrand").innerText = product.NameWithoutBrand;
    document.querySelector("#productImage").src = product.Image;
    document.querySelector("#productImage").alt = product.Name;
    document.querySelector("#productFinalPrice").innerText = product.FinalPrice;
    document.querySelector("#productColorName").innerText = product.Colors[0].ColorName;
    document.querySelector("#productDescriptionHtmlSimple").innerHTML = product.DescriptionHtmlSimple;
    document.querySelector("#addToCart").dataset.id = product.Id;
}






