import React from "react";
import StorageService from "../services/StorageService";
import { API_GetPoints } from "../components/Endpoints";

class PointsStore extends StorageService {
  constructor(storageKey) {
    super(storageKey);
  }

  async getPointsFromServerAsync(searchQuery) {
    try {
      let pointsArray = await API_GetPoints(searchQuery);

      console.log("PA", pointsArray);
      pointsArray.forEach(async customer => {
        await this.addItemsAsync(customer);
      });

      // console.log("Added to cache (CustomerStore.js): ", customersArray);

      return Promise.resolve(pointsArray);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

const Points = new PointsStore("user_points");

export default Points;
