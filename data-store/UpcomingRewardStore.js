import React from "react";
import StorageService from "../services/StorageService";
import { API_GetRewards } from "../components/Endpoints";

class RewardsStore extends StorageService {
  constructor(storageKey) {
    super(storageKey);
  }

  async getRewardsFromServerAsync(queryParams) {
    try {
      let rewardsArray = await API_GetRewards(queryParams);

      await this.addItemsAsync(rewardsArray);
      console.log("Added to cache (RewardsStore.js): ", rewardsArray);

      return Promise.resolve(rewardsArray);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

const UpcomingRewards = new RewardsStore("user_rewards_upcoming");

export default UpcomingRewards;
