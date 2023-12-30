import { Box, Button, HStack, Heading, VStack } from "@chakra-ui/react";
import { useState } from "react";
import PayInList from "./PayInList";
import AddPayInForm from "./AddPayInForm";

const PayInHome = () => {
  const [show, showWhat] = useState("form");

  return (
    <Box padding={10}>
      <Heading>
        Pay In<small>(s)</small>
      </Heading>
      <HStack my={3}>
        <Button
          colorScheme="yellow"
          isDisabled={show === "form"}
          onClick={() => {
            showWhat("form");
          }}
        >
          Add PayIn
        </Button>
        <Button
          colorScheme="green"
          isDisabled={show === "list"}
          onClick={() => {
            showWhat("list");
          }}
        >
          PayIn List
        </Button>
      </HStack>

      <Box padding={10}>
        {show === "list" && <PayInList />}
        {show === "form" && <AddPayInForm />}
      </Box>
    </Box>
  );
};

export default PayInHome;
