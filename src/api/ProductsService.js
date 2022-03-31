import axios from 'axios';

export const productsWrapper = {
  get,
};

async function get() {
  const response = await axios.get(process.env.REACT_APP_SCHEDULER_URL);
  return response;
}