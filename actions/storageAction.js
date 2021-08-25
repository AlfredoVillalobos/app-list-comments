import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const STORAGE_DATA = "@storage_key";
const url = "https://hn.algolia.com/api/v1/search_by_date";

export const fetchComments = async () => {
  try {
    const storage = await AsyncStorage.getItem(STORAGE_DATA);
    if (storage === null || storage === undefined) {
      const comments = await axios.get(url);
      setStorageData(comments.data);
    }
  } catch (error) {
    console.error("Error in promise fetchComments", error);
  }
};

export const setStorageData = async (values) => {
  try {
    const data = await formatData(values.hits);
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem(STORAGE_DATA, jsonValue);
  } catch (e) {
    console.error("Error in storageData | error: ", e);
  }
};

export const removeItemStorage = async (key) => {
  try {
    let data = await AsyncStorage.getItem(STORAGE_DATA);
    let comments = JSON.parse(data);
    const alteredComments = comments.filter((comment) => comment.key !== key);
    await AsyncStorage.setItem(STORAGE_DATA, JSON.stringify(alteredComments));
  } catch (e) {
    console.error("Error when try remove comment in storage");
  }
};

const formatData = async (values) => {
  try {
    if ((values && values !== null) || (values && values !== undefined)) {
      return values.map((comment, index) => ({
        key: `${index}`,
        objectID: comment.objectID,
        title: comment.title || "Sin titulo",
        url: comment.url,
        author: comment.author,
        createdAt: comment.created_at,
      }));
    }
  } catch (error) {
    console.error("Error when try format data", error);
  }
};
