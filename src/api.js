import axios from "axios";

import { HEADER, BASE_URL } from "./constants";
import { getAuthToken } from "./authentication";

export const getEvents = async (filters, page, type = null) => {
  const authToken = await getAuthToken();

  const startDate = filters.startDate;
  const endDate = filters.endDate;
  let specieList = [];
  let cameraList = [];
  filters.specie.forEach((specie) => {
    specieList.push(specie.id);
  });
  filters.camera.forEach((camera) => {
    cameraList.push(camera.id);
  });
  const species = specieList.join(",");
  const cameras = cameraList.join(",");

  HEADER["Authorization"] = `Token ${authToken}`;
  const config = {
    headers: HEADER,
    params: {
      date_gte: startDate ? startDate.getFullYear() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getDate() : startDate,
      date_lte: endDate ? endDate.getFullYear() + "-" + (endDate.getMonth() + 1) + "-" + endDate.getDate() : endDate,
      cameras: cameras,
      species: species,
      page: page,
      status: type,
    },
  };
  try {
    const res = await axios.get(`${BASE_URL}/core/api/event/`, config);
    const results = res.data.results
    return results;
  } catch (err) {
    return [];
  }
};

export const updateEventStatus = async (eventIds, action) => {
  const authToken = await getAuthToken();
  HEADER["Authorization"] = `Token ${authToken}`;
  const config = {
    headers: HEADER,
  };

  const data = {
    "archived": action === "archive" ? eventIds : [],
    "featured": action === "feature" ? eventIds : [],
    "restore": action === "restore" ? eventIds : [],
  }

  try {
    const res = await axios.post(`${BASE_URL}/core/api/event/batch_update/`, data, config);
    return res.data.message === "Events Updated" ? true : false;
  } catch (err) {
    return false;
  }
}

export const getCameraStatus = async () => {
  const authToken = await getAuthToken();
  HEADER["Authorization"] = `Token ${authToken}`;
  const config = {
    headers: HEADER,
  };
  try {
    const res = await axios.get(`${BASE_URL}/core/api/camera/`, config);
    return res.data.results;
  } catch (err) {
    return [];
  }
};

export const getOrganizationDetails = async () => {
  const authToken = await getAuthToken();
  HEADER["Authorization"] = `Token ${authToken}`;
  const config = {
    headers: HEADER,
  };
  try {
    const res = await axios.get(`${BASE_URL}/core/api/organization/`, config);
    return res.data;
  } catch (err) {
    return [];
  }
};

export const sendNotifToken = async (token) => {
  const authToken = await getAuthToken();
  HEADER["Authorization"] = `Token ${authToken}`;
  const config = {
    headers: HEADER,
    params: {
      notifToken: token,
    }
  }
  try {
    await axios.post(`${BASE_URL}/core/api/notif/add/`, config);
  } catch {
    console.log("Error sending notif token");
  }
}
