import axios from "axios";

export async function getProducts() {
  try {
    const response = await axios.get(
      "https://s3-eu-west-1.amazonaws.com/fid-recruiting/fid-task-4-ffront-products.json"
    );
    const { data } = response;
    return data;
  } catch (error) {
    console.error(error);
  }
}
