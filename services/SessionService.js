// import React from "react";
// import { AsyncStorage } from "react-native";
import * as SecureStorage from "expo-secure-store";
import _ from "lodash";

const storageKeys = {
  auth: "authObject"
};

const state = {
  initialized: false,
  exists: false,
  authTokenKey: null,
  authToken: null,
  userId: null,
  user: null,
  activated: null
};

const create = async sessionObject => {
  await SecureStorage.setItemAsync(
    storageKeys.auth,
    JSON.stringify(sessionObject)
  );
  // await AsyncStorage.setItem(storageKeys.auth, JSON.stringify(sessionObject));
  return await initialize();
};

const createWithTokenAndUser = async (authToken, userData) => {
  let sessionObject = { ...userData };
  sessionObject.authToken = authToken;

  await SecureStorage.setItemAsync(
    storageKeys.auth,
    JSON.stringify(sessionObject)
  );

  return await initialize();
};

const destroy = async () => {
  return await SecureStorage.deleteItemAsync(storageKeys.auth);
  // return await AsyncStorage.clear();
};

const update = async userData => {
  // const authObject = await AsyncStorage.getItem(storageKeys.auth);
  const authObject = await SecureStorage.getItemAsync(storageKeys.auth);

  if (authObject) {
    let updatedUserData = JSON.parse(authObject);
    _.merge(updatedUserData, userData);
    updatedUserData.authToken = state.authTokenKey;
    await create(updatedUserData);
  }
};

const initialize = async () => {
  // const authObject = await AsyncStorage.getItem(storageKeys.auth);
  const authObject = await SecureStorage.getItemAsync(storageKeys.auth);

  state.initialized = true;

  if (authObject) {
    const authObjectJSON = JSON.parse(authObject);

    state.exists = true;
    state.authTokenKey = authObjectJSON.authToken;
    state.authToken = "Bearer " + authObjectJSON.authToken;
    state.activated = authObjectJSON.activationStatus;
    state.userId = authObjectJSON.id;
    state.user = authObjectJSON;

    return state;
  }

  return false;
};

const SessionService = {
  initialize: initialize,
  create: create,
  destroy: destroy,
  update: update,
  createWithTokenAndUser: createWithTokenAndUser
};

Object.defineProperty(SessionService, "authToken", {
  get: function() {
    return state.authToken;
  }
});

Object.defineProperty(SessionService, "user", {
  get: function() {
    return state.user;
  }
});

Object.defineProperty(SessionService, "userId", {
  get: function() {
    return state.userId;
  }
});

Object.defineProperty(SessionService, "exists", {
  get: function() {
    return state.exists;
  }
});

Object.defineProperty(SessionService, "activationStatus", {
  get: function() {
    return state.activated;
  }
});

export default SessionService;
