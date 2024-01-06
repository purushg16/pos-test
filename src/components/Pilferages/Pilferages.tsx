import { Heading, HStack, Button, Box } from "@chakra-ui/react";
import { useState } from "react";
import AddPayInForm from "../AddPayIn/AddPayInForm";
import PayInList from "../AddPayIn/PayInList";
import PilferageForm from "./PilferageForm";
import PilferageList from "./PilferageList";

const Pilferages = () => {
  const [show, showWhat] = useState("form");

  return (
    <Box padding={10}>
      <Heading>Pilferages</Heading>
      <HStack my={3}>
        <Button
          colorScheme="yellow"
          isDisabled={show === "form"}
          onClick={() => {
            showWhat("form");
          }}
        >
          Add Pilferage
        </Button>
        <Button
          colorScheme="green"
          isDisabled={show === "list"}
          onClick={() => {
            showWhat("list");
          }}
        >
          Pilferage List
        </Button>
      </HStack>

      <Box padding={10}>
        {show === "list" && <PilferageList />}
        {show === "form" && <PilferageForm />}
      </Box>
    </Box>
  );
};

export default Pilferages;
