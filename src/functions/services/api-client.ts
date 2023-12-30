import axios, { AxiosRequestConfig } from "axios";

export interface FetchResponse<T> {
  data: T[];
}

// Function to create Axios instance with dynamic token
const createAxiosInstance = () => {
  // Retrieve the token synchronously
  const token = localStorage.getItem("token");

  // Create a base Axios instance without headers
  const axiosInstance = axios.create({
    baseURL: "https://padma-stores.onrender.com/", // Replace with your API base URL
    headers: {
      // Set the Authorization header with the token
      Authorization: token ? token : undefined,
    },
  });

  return axiosInstance;
};

// Now you can use createAxiosInstance() to get an instance with the token dynamically set
const instance = createAxiosInstance();

// const axiosInstance = axios.create({
//   baseURL: "https://pos-svn4.onrender.com/",
//   // headers: {
//   //   Authorization: localStorage.getItem("token"),
//   // },
// });

export class APIGetClient<T> {
  // class attributes
  endpoint: string;

  // constructor
  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = () => {
    return createAxiosInstance()
      .get<FetchResponse<T>>(this.endpoint)
      .then((res) => res.data);
  };

  getWithParams = (config: AxiosRequestConfig) => {
    return createAxiosInstance()
      .get<FetchResponse<T>>(this.endpoint, config)
      .then((res) => res.data);
  };
}

export class APIPostClient<T> {
  // class attributes
  endpoint: string;

  // constructor
  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  login = (data: T) => {
    return instance.post(this.endpoint, data).then((res) => {
      instance.defaults.headers.common["Authorization"] = res.data.token;
      return res.data;
    });
  };

  postData = (data: T) => {
    return createAxiosInstance()
      .post(this.endpoint, data)
      .then((res) => res.data);
  };
}
