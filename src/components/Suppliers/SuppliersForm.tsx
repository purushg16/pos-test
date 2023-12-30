import {
  Flex,
  Heading,
  Input,
  Button,
  Box,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import useSuppliers from "../../functions/hooks/useSuppliers";

export const SuppliersForm = () => {
  const [newSupplier, editSupplier] = useState({
    name: "",
    phone: parseInt(""),
  });
  const [canSubmit, setSubmit] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();

  const { refetch } = useSuppliers({ type: "POST", supplier: newSupplier });

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    refetch().then((res) => {
      const { data, isSuccess, isError } = res;

      if (isSuccess) {
        toast({
          title: data.msg,
          status: "success",
          duration: 1000,
          isClosable: true,
          position: "top",
        });
        setLoading(false);
        editSupplier({ name: "", phone: parseInt("") });
      } else if (isError) {
        toast({
          title: data.message,
          status: "error",
          duration: 1000,
          isClosable: true,
          position: "top",
        });
      }
    });
  };

  useEffect(() => {
    if (newSupplier.name && newSupplier.phone) setSubmit(true);
  }, [newSupplier]);

  return (
    <Flex alignItems="center" justifyContent="center" height="100%">
      <Box width={500}>
        <Heading> Add Supplier </Heading>

        <form onSubmit={(event) => onSubmit(event)}>
          <Flex flexDirection="column" gap={5} marginY={7}>
            <Box>
              <Text>Supplier Name</Text>
              <Input
                focusBorderColor="teal"
                variant="flushed"
                value={newSupplier.name}
                onChange={(event) => {
                  editSupplier({
                    ...newSupplier,
                    name: event.target.value,
                  });
                }}
              />
            </Box>

            <Box>
              <Text>Phone Number</Text>
              <Input
                focusBorderColor="teal"
                variant="flushed"
                type="number"
                value={newSupplier.phone}
                onChange={(event) => {
                  editSupplier({
                    ...newSupplier,
                    phone: parseInt(event.target.value),
                  });
                }}
              />
            </Box>

            <Button
              colorScheme="teal"
              type="submit"
              my={2}
              isLoading={isLoading}
              isDisabled={!canSubmit}
              loadingText="Adding Supplier..."
            >
              Add Supplier
            </Button>
          </Flex>
        </form>
      </Box>
    </Flex>
  );
};
