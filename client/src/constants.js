const { NODE_ENV, REACT_APP_DEV_API, REACT_APP_PROD_API } = process.env;

const dev = NODE_ENV === "development";
const devAPI = REACT_APP_DEV_API ? REACT_APP_DEV_API : "";
const prodAPI = REACT_APP_PROD_API ? REACT_APP_PROD_API : "";

export const API_URL = dev ? devAPI : prodAPI;
