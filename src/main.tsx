import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, Heading } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import theme from "./theme";
import { RouterProvider } from "react-router-dom";
import router from "./routing/router";

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <Heading> This app does not exists! </Heading>
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={client}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>
);
