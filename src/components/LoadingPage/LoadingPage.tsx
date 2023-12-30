import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const LoadingPage = ({ children }: Props) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      height="100vh"
      alignItems="center"
    >
      {children}
    </Box>
  );
};

export default LoadingPage;
