import axios from "axios";
import EncryptedStorage from "react-native-encrypted-storage";

import { HEADER, BASE_URL } from "./constants";

export const login = async (user) => {
  try {
    const res = await axios.post(`${BASE_URL}/accounts/api/token/login/`, user, { headers: HEADER });
    const data = res.data;
    await storeAuthToken(data.auth_token);
    await storeUserInfo(data.user);
    console.log(data)
    return data;
  } catch (err) {
    return undefined;
  }
};

export const getAuthToken = async () => {
  try {
    const authToken = await EncryptedStorage.getItem("auth_token");
    return authToken;
  } catch {
    return undefined;
  }
};

export const clearAuthToken = async () => {
  try {
    await EncryptedStorage.removeItem("auth_token");
  } catch {
    console.log("Error");
  }
};

const storeAuthToken = async (authToken) => {
  try {
    await EncryptedStorage.setItem("auth_token", authToken);
  } catch {
    console.log("Key could not be stored");
  }
};

const storeUserInfo = async (userInfo) => {
  try {
    await EncryptedStorage.setItem("user", JSON.stringify(userInfo));
  } catch {
    console.log("User info could not be stored");
  }
};

export const getUserInfo = async () => {
  try {
    const userInfo = await EncryptedStorage.getItem("user");
    return JSON.parse(userInfo);
  } catch {
    console.log("User info could not be retrieved");
    return undefined;
  }
};
