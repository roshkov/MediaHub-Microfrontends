import axios from "axios";
import { TWEETS_ENDPOINT } from "./utils/constants";
const fetchData = async () => {
  try {
    const response = await axios.get(`${TWEETS_ENDPOINT}`);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching data");
  }
};

export default fetchData;
