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
    baseURL: "https://padma-stores1.onrender.com/", // Replace with your API base URL
    headers: {
      // Set the Authorization header with the token
      Authorization: token ? token : undefined,
      // Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImFkbWluIiwiaWF0IjoxNzA0MDA4OTEyfQ.RpBL_MDwcDI7ubYDNGIMFjEi2kG-IdCKEZGRC57spm0",
    },
  });

  return axiosInstance;
};

// Now you can use createAxiosInstance() to get an instance with the token dynamically set
const instance = createAxiosInstance();

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
