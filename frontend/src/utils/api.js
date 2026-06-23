import axios from "axios";

/* -------------------------------------------------------------------------- */
/* Base URL Setup                                                             */
/* -------------------------------------------------------------------------- */

const ENV_API_URL =
  import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL;
const ENV_CANDIDATE_API_URL = import.meta.env.VITE_CANDIDATE_API_URL;
const DEFAULT_API_TIMEOUT = Number(import.meta.env.VITE_API_TIMEOUT || 30000);
const DEFAULT_API_PATH = "/api/v1";
const DEFAULT_CANDIDATE_URL = "https://candidate.quiphire.in";
const isDev = import.meta.env.MODE === "development";

// Default to same-origin /api/v1 so production can use Nginx proxying.
// Local Vite development proxies the same path to the backend server.
const CLIENT_BASE_URL = ENV_API_URL || DEFAULT_API_PATH;
const CANDIDATE_BASE_URL = ENV_CANDIDATE_API_URL || DEFAULT_CANDIDATE_URL;

if (isDev) {
  console.log("[API Configuration]");
  console.log("Environment:", import.meta.env.MODE);
  console.log("Main API URL:", CLIENT_BASE_URL);
  console.log("Candidate API URL:", CANDIDATE_BASE_URL);
}

/* -------------------------------------------------------------------------- */
/* Axios Instances                                                            */
/* -------------------------------------------------------------------------- */

const apiClient = axios.create({
  baseURL: CLIENT_BASE_URL,
  timeout: DEFAULT_API_TIMEOUT,
});

const candidateApiClient = axios.create({
  baseURL: CANDIDATE_BASE_URL,
  timeout: 100000,
});

/* -------------------------------------------------------------------------- */
/* Interceptors                                                               */
/* -------------------------------------------------------------------------- */

apiClient.interceptors.request.use(
  (config) => {
    const authData = localStorage.getItem("authData");
    const parsedAuth = authData ? JSON.parse(authData) : null;

    if (parsedAuth?.session) {
      config.headers["X-Session-Id"] = parsedAuth.session;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("authData");
      localStorage.removeItem("remoteConfig");
      localStorage.removeItem("bookingConfig");
    }

    return Promise.reject(error);
  }
);

/* -------------------------------------------------------------------------- */
/* Generic Request Handlers                                                   */
/* -------------------------------------------------------------------------- */

export const apiRequest = async ({
  url,
  method = "GET",
  data = null,
  params = null,
  headers = {},
  timeout,
}) => {
  try {
    const response = await apiClient({
      url,
      method,
      data,
      params,
      headers,
      timeout,
    });

    return response.data;
  } catch (error) {
    console.error("API request failed:", error);
    throw error.response?.data || error.message;
  }
};

export const apiGet = (url, params = null) =>
  apiRequest({ url, method: "GET", params });

export const apiPost = (url, data, params = null) =>
  apiRequest({ url, method: "POST", data, params });

export const apiPut = (url, data, params = null) =>
  apiRequest({ url, method: "PUT", data, params });

export const apiDelete = (url, params = null) =>
  apiRequest({ url, method: "DELETE", params });

const handleRequest = async (client, { url, method, data, params, headers }) => {
  try {
    const response = await client({ url, method, data, params, headers });
    return response.data;
  } catch (error) {
    console.error("API request failed:", error);
    throw error.response?.data || error.message;
  }
};

export const candidateRequest = (config) => handleRequest(candidateApiClient, config);
export const candidateGet = (url, params = null) =>
  candidateRequest({ url, method: "GET", params });
export const candidatePost = (url, data, params = null) =>
  candidateRequest({ url, method: "POST", data, params });
export const candidatePut = (url, data, params = null) =>
  candidateRequest({ url, method: "PUT", data, params });
export const candidateDelete = (url, params = null) =>
  candidateRequest({ url, method: "DELETE", params });

export default apiClient;
