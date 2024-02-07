import { Box, Heading, Spinner } from "@chakra-ui/react";
import { ReactNode } from "react";

const LoadingPage = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      height="100vh"
      alignItems="center"
    >
      <Spinner mr={3} />
      <Heading> Loading... </Heading>
    </Box>
  );
};

export default LoadingPage;
