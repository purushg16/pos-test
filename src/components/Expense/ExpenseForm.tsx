import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Flex,
  Box,
  Heading,
  Input,
  Text,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  SimpleGrid,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useExpense from "../../functions/hooks/useExpense";

const ExpenseForm = () => {
  const [newExpense, editNewExpense] = useState({
    mode: "",
    amount: parseInt(""),
    ref: "",
  });

  const [canSubmit, setSubmit] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();

  const { refetch } = useExpense(newExpense);

  useEffect(() => {
    if (newExpense.amount && newExpense.mode && newExpense.ref) setSubmit(true);
    else setSubmit(false);
  }, [newExpense]);

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
        editNewExpense({ mode: "", amount: parseInt(""), ref: "" });
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

  return (
    <Flex alignItems="center" justifyContent="center" height="100%">
      <Box width={500}>
        <Heading my={5}> Add New Expense </Heading>

        <form onSubmit={(event) => onSubmit(event)}>
          <Flex flexDirection="column" gap={5} marginY={7}>
            <Box>
              <Text> Description </Text>
              <Input
                focusBorderColor="teal"
                variant="flushed"
                value={newExpense.ref}
                onChange={(event) => {
                  editNewExpense({
                    ...newExpense,
                    ref: event.target.value,
                  });
                }}
              />
            </Box>

            <Box>
              <Text> Amount </Text>
              <Input
                focusBorderColor="teal"
                variant="flushed"
                type="number"
                value={newExpense.amount}
                onChange={(event) => {
                  editNewExpense({
                    ...newExpense,
                    amount: parseInt(event.target.value),
                  });
                }}
              />
            </Box>

            <Box>
              <SimpleGrid columns={2}>
                <Text> Payment Mode: </Text>
                <Menu>
                  <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                    {newExpense.mode || "Mode"}
                  </MenuButton>
                  <MenuList>
                    <MenuItem
                      onClick={() => {
                        editNewExpense({ ...newExpense, mode: "upi" });
                      }}
                    >
                      UPI
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        editNewExpense({ ...newExpense, mode: "cash" });
                      }}
                    >
                      Cash
                    </MenuItem>
                  </MenuList>
                </Menu>
              </SimpleGrid>
            </Box>
            <Button
              type="submit"
              colorScheme="teal"
              my={2}
              isDisabled={!canSubmit}
              isLoading={isLoading}
            >
              Submit
            </Button>
          </Flex>
        </form>
      </Box>
    </Flex>
  );
};

export default ExpenseForm;
