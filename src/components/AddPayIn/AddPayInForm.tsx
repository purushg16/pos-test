import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Flex,
  Heading,
  Box,
  Input,
  SimpleGrid,
  Text,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  InputGroup,
  InputLeftAddon,
  VStack,
  Spinner,
  InputLeftElement,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { Customer } from "../entities/Customer";
import useCustomerStore from "../../functions/store/customerStore";
import { BsSearch } from "react-icons/bs";
import useGetCustomers from "../../functions/hooks/useCustomers";
import usePayIn from "../../functions/hooks/usePayIn";

const AddPayInForm = () => {
  useGetCustomers();

  const [newPayIn, editPayIn] = useState({
    customerId: "",
    payIn: parseInt(""),
    mode: "",
    ref: "",
  });

  const [canSubmit, setSubmit] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();

  const { refetch } = usePayIn(newPayIn)!;
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);

    refetch().then((res) => {
      const { data, isError, isSuccess } = res;
      console.log(res);

      if (isSuccess) {
        toast({
          title: data.msg,
          status: "success",
          duration: 1000,
          isClosable: true,
          position: "top",
        });
        setLoading(false);
        editPayIn({
          customerId: "",
          payIn: parseInt(""),
          mode: "",
          ref: "",
        });
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

  const ref = useRef<HTMLInputElement>(null);
  const selectCustomers = useCustomerStore((s) => s.selectCustomers);
  const selectedCustomers = useCustomerStore((s) => s.selectedCustomers);
  const currentCustomer = useCustomerStore((s) => s.currentCustmer);
  const setCurrentCustomer = useCustomerStore((s) => s.setCurrentCustomer);

  useEffect(() => {
    if (
      newPayIn.customerId &&
      newPayIn.mode &&
      newPayIn.payIn &&
      newPayIn.ref &&
      currentCustomer
    )
      setSubmit(true);
    else setSubmit(false);
  }, [newPayIn, currentCustomer]);

  return (
    <Flex alignItems="center" justifyContent="center" height="100%">
      <Box width={600}>
        <Heading> Add PayIn </Heading>
        <form onSubmit={(event) => onSubmit(event)}>
          <SimpleGrid columnGap={10}>
            <Flex flexDirection="column" gap={10} marginY={7}>
              <SimpleGrid columns={2}>
                <Text fontSize="xl"> Customer: </Text>
                <Menu>
                  <MenuButton
                    as={Button}
                    rightIcon={<ChevronDownIcon />}
                    width="100%"
                    textAlign="left"
                  >
                    {currentCustomer?.name || "Select Customer"}
                  </MenuButton>

                  <MenuList>
                    <Box paddingX={2} marginY={2}>
                      <InputGroup width="100%">
                        <InputLeftElement children={<BsSearch />} />
                        <Input
                          ref={ref}
                          placeholder="Search Customer..."
                          variant={"filled"}
                          borderRadius={7}
                          onChange={() => {
                            if (ref.current) {
                              selectCustomers(ref.current.value);
                            }
                          }}
                        />
                      </InputGroup>
                    </Box>

                    {!selectedCustomers ? (
                      <Spinner />
                    ) : (
                      <Box maxHeight={500} overflowY="scroll">
                        <VStack marginX={3} gap={3}>
                          {selectedCustomers?.map(
                            (customer: Customer, index: number) => (
                              <Button
                                width="100%"
                                marginX={2}
                                key={index}
                                onClick={() => {
                                  setCurrentCustomer(customer);
                                  editPayIn({
                                    ...newPayIn,
                                    customerId: customer._id!,
                                  });
                                }}
                              >
                                {customer.name}
                                {!!customer.balance &&
                                  customer.balance !== 0 && (
                                    <Text
                                      pl={1}
                                      color={
                                        customer.balance! > 0 ? "green" : "red"
                                      }
                                    >
                                      ({customer.balance})
                                    </Text>
                                  )}
                              </Button>
                            )
                          )}
                        </VStack>
                      </Box>
                    )}
                  </MenuList>
                </Menu>
              </SimpleGrid>

              <SimpleGrid columns={2}>
                <Text fontSize="xl"> Decription: </Text>
                <Input
                  value={newPayIn.ref}
                  onChange={(event) => {
                    editPayIn({
                      ...newPayIn,
                      ref: event.target.value,
                    });
                  }}
                />
              </SimpleGrid>

              <SimpleGrid columns={2}>
                <Text fontSize="xl"> Amount Paid: </Text>
                <InputGroup>
                  <InputLeftAddon children="Rs." />
                  <Input
                    type="number"
                    value={newPayIn.payIn}
                    onChange={(event) => {
                      editPayIn({
                        ...newPayIn,
                        payIn: parseInt(event.target.value),
                      });
                    }}
                  />
                </InputGroup>
              </SimpleGrid>

              <SimpleGrid columns={2}>
                <Text fontSize="xl"> Payment Method: </Text>
                <Menu>
                  <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                    {newPayIn.mode}
                  </MenuButton>
                  <MenuList>
                    <MenuItem
                      onClick={() => editPayIn({ ...newPayIn, mode: "cash" })}
                    >
                      Cash
                    </MenuItem>
                    <MenuItem
                      onClick={() => editPayIn({ ...newPayIn, mode: "upi" })}
                    >
                      UPI
                    </MenuItem>
                  </MenuList>
                </Menu>
              </SimpleGrid>

              <Button
                type="submit"
                colorScheme="teal"
                isDisabled={!canSubmit}
                isLoading={isLoading}
              >
                Submit
              </Button>
            </Flex>
          </SimpleGrid>
        </form>
      </Box>
    </Flex>
  );
};

export default AddPayInForm;
