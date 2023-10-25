function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    console.log(res);
    throw new Error("Bad Response");
  }
}

export function getData(category = "tents") {
  return fetch(`../json/${category}.json`)
    .then(convertToJson)
    .then((data) => data);
}

export async function findProductById(id) {
  console.log('this is the products id: ' + id);
  const products = await getData();
  return products.find((item) => item.Id === id);
}
