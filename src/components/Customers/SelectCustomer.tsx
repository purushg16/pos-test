import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Text,
  Box,
  Menu,
  MenuButton,
  Button,
  MenuList,
  InputGroup,
  InputLeftElement,
  Input,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";
import { Customer } from "../entities/Customer";
import CustomerModal from "./CustomerModal";
import { useRef } from "react";
import useCustomerStore from "../../functions/store/customerStore";

const SelectCustomer = () => {
  const ref = useRef<HTMLInputElement>(null);
  const selectCustomers = useCustomerStore((s) => s.selectCustomers);
  const selectedCustomers = useCustomerStore((s) => s.selectedCustomers);
  const currentCustomer = useCustomerStore((s) => s.currentCustmer);
  const setCurrentCustomer = useCustomerStore((s) => s.setCurrentCustomer);

  return (
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
          <Box paddingX={2} marginY={2}>
            <CustomerModal />
          </Box>
        </Box>

        {!selectedCustomers ? (
          <Spinner />
        ) : (
          <Box maxHeight={300} overflowY="scroll">
            <VStack marginX={3} gap={3}>
              {selectedCustomers?.map((customer: Customer, index: number) => (
                <Button
                  width="100%"
                  marginX={2}
                  key={index}
                  onClick={() => {
                    setCurrentCustomer(customer);
                  }}
                >
                  {customer.name}
                  {!!customer.balance && customer.balance !== 0 && (
                    <Text
                      pl={1}
                      color={customer.balance! > 0 ? "green" : "red"}
                    >
                      ({customer.balance})
                    </Text>
                  )}
                </Button>
              ))}
            </VStack>
          </Box>
        )}
      </MenuList>
    </Menu>
  );
};

export default SelectCustomer;
