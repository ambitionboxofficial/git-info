const dev = process.env.NODE_ENV === "development";
export const API_URL = dev
  ? process.env.REACT_APP_DEV_API
  : process.env.REACT_APP_PROD_API;
