import axios from 'axios';

export const productsWrapper = {
  getProductList,
  getStatistics
};

async function getProductList() {
  const response = await axios.get("http://localhost:8000/productList");
  console.log(response)
  return response;
}

async function getStatistics() {
  const response = await axios.get("http://localhost:8000/statistics");
  console.log(response)
  return response;
}