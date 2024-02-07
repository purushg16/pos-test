import { Box, Button, Flex, Heading, Input, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { usePostSupplier } from "../../functions/hooks/useSuppliers";

interface Props {
  done?: (status: boolean) => void;
}

export const SuppliersForm = ({ done = () => {} }: Props) => {
  const [newSupplier, editSupplier] = useState({
    name: "",
    phone: parseInt(""),
  });
  const [canSubmit, setSubmit] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const { mutate } = usePostSupplier((yes, success) => {
    setLoading(yes);
    done(yes);
  });

  const onSubmit = () => {
    setLoading(true);
    mutate(newSupplier);
  };

  useEffect(() => {
    if (newSupplier.name && newSupplier.phone) setSubmit(true);
  }, [newSupplier]);

  return (
    <Flex alignItems="center" justifyContent="center" height="100%">
      <Box width={500}>
        <Heading> Add Supplier </Heading>

        <form onSubmit={onSubmit}>
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
