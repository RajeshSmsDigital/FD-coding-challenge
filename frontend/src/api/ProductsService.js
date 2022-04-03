import axios from 'axios';

export const productsWrapper = {
  get,
};

async function get() {
  const response = await axios.get("http://localhost:8000/productList");
  console.log(response)
  return response;
}