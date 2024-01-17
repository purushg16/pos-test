import { DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { postNewCustomer } from "../../functions/hooks/useCustomers";

interface Props {
  done?: (status: boolean) => void;
}

const CustomerForm = ({ done = () => {} }: Props) => {
  const [newCustomer, editCustomer] = useState({
    name: "",
    phone: parseInt(""),
    // balance: parseInt(""),
  });
  const [canSubmit, setSubmit] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const { mutate } = postNewCustomer((yes, success) => {
    setLoading(yes);
    done(success);
  });

  const onSubmit = () => {
    setLoading(true);
    mutate(newCustomer);
  };

  const clearForm = () => editCustomer({ name: "", phone: parseInt("") });

  useEffect(() => {
    if (newCustomer.name && newCustomer.phone) setSubmit(true);
    else setSubmit(false);
  }, [newCustomer]);

  return (
    <Flex alignItems="center" justifyContent="center" height="100%">
      <Box width={500}>
        <Heading> Add Customer </Heading>

        <Flex flexDirection="column" gap={5} marginY={7}>
          <Box>
            <Text>Customer Name</Text>
            <Input
              focusBorderColor="teal"
              variant="flushed"
              value={newCustomer.name}
              onChange={(event) => {
                editCustomer({
                  ...newCustomer,
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
              value={newCustomer.phone}
              onChange={(event) => {
                editCustomer({
                  ...newCustomer,
                  phone: parseInt(event.target.value),
                });
              }}
            />
          </Box>

          {/* <Box>
              <Text>
                Pending Balance <small>(optional)</small>
              </Text>
              <Input
                focusBorderColor="teal"
                variant="flushed"
                type="number"
                value={newCustomer.balance}
                onChange={(event) => {
                  editCustomer({
                    ...newCustomer,
                    balance: parseFloat(event.target.value),
                  });
                }}
              />
            </Box> */}

          <Grid templateColumns={"1fr 5%"} gap={4} alignItems="center">
            <Button
              onClick={onSubmit}
              colorScheme="teal"
              type="submit"
              my={2}
              isLoading={isLoading}
              isDisabled={!canSubmit}
              loadingText="Adding Customer..."
            >
              Add Customer
            </Button>
            <Button onClick={clearForm}>
              <DeleteIcon />
            </Button>
          </Grid>
        </Flex>
      </Box>
    </Flex>
  );
};

export default CustomerForm;
