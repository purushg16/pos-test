import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SimpleGrid,
  Switch,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import useCustomers from "../../functions/hooks/useCustomers";
import useEmployee from "../../functions/hooks/useEmployee";
import useGST from "../../functions/hooks/useGST";
import useBillStore from "../../functions/store/billStore";
import useTokenStore from "../../functions/store/token";
import SelectCustomer from "../Customers/SelectCustomer";
import KeyBoard from "../VirtualKeyBoard/VirtualKeyBoard";
import { BillingEntry } from "../entities/BillingEntry";
import BillPaymentModal from "./BillPaymentModal";
import EmployeSelector from "./EmployeSelector";
import GSTSelector from "./GSTSelector";
import HandlerSelector from "./HandlerSelector";

export const BillingDetails = () => {
  const BillEntries = useBillStore((s) => s.BillEntries);
  const billType = useBillStore((s) => s.billType);

  const setBillType = useBillStore((s) => s.setBillType);
  const itemHandled = useBillStore((s) => s.itemHandled);
  const setItemHandled = useBillStore((s) => s.setItemHandled);

  const itemDelivered = useBillStore((s) => s.itemDelivered);
  const setItemDelievered = useBillStore((s) => s.setItemDelieverd);
  const currentUserType = useTokenStore((s) => s.currentUserType);

  useCustomers({ type: "GET" });
  useEmployee({ type: "GET" });
  useGST({ type: "GET" });
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex flexDirection={"column"} gap={2} height="95vh">
      <Box padding={2} border="1px solid #80808030" borderRadius={7}>
        <Heading size="1xl" mb={2}>
          Customer Details
        </Heading>
        <SelectCustomer />
        {/* <Menu>
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
                  {selectedCustomers?.map(
                    (customer: Customer, index: number) => (
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
                    )
                  )}
                </VStack>
              </Box>
            )}
          </MenuList>
        </Menu> */}
      </Box>
      <Box padding={2} border="1px solid #80808030" borderRadius={7} flex="1">
        {BillEntries.length > 0 && (
          <React.Fragment>
            <SimpleGrid columns={2} my={2}>
              <Text size={"sm"}>Sub Total: </Text>
              <Text size={"sm"} textAlign="right">
                &#8377;{" "}
                {BillEntries.reduce((acc, entry: BillingEntry) => {
                  return acc + entry.priceWithoutTax;
                }, 0).toFixed(2)}
              </Text>
            </SimpleGrid>

            <SimpleGrid columns={2} my={2}>
              <Text size={"sm"}>Tax: </Text>
              <Text size={"sm"} textAlign="right">
                &#8377;{" "}
                {BillEntries.reduce((acc, entry: BillingEntry) => {
                  return acc + entry.taxPrice;
                }, 0).toFixed(2)}
              </Text>
            </SimpleGrid>

            <hr />

            <SimpleGrid columns={2} my={4}>
              <Heading size={"sm"}>
                Total:{" "}
                <small>
                  (items: {BillEntries.length}) (Quantity:
                  {BillEntries.reduce((acc, entry: BillingEntry) => {
                    return acc + entry.quantity;
                  }, 0)}
                  )
                </small>
              </Heading>
              <Text size={"sm"} textAlign="right">
                &#8377;
                {BillEntries.reduce((acc, entry: BillingEntry) => {
                  return acc + entry.total;
                }, 0).toFixed(2)}
              </Text>
            </SimpleGrid>
          </React.Fragment>
        )}
      </Box>

      <KeyBoard />

      <Box padding={2} border="1px solid #80808030" borderRadius={7} flex={1}>
        {/* GST */}
        <SimpleGrid columns={2} alignItems="baseline" my={2}>
          <Text>GST:</Text>
          <GSTSelector />
        </SimpleGrid>

        {/* Biller */}
        <SimpleGrid columns={1} my={2}>
          <SimpleGrid columns={2} alignItems="baseline">
            <Text>Biller Name:</Text>
            <EmployeSelector />
          </SimpleGrid>

          {/* Handler */}
          <SimpleGrid columns={2} alignItems="baseline" my={2}>
            <Text>Handler Name:</Text>
            <HandlerSelector />
          </SimpleGrid>

          <SimpleGrid columns={2} alignItems="baseline" my={2}>
            <Text>Bill Type:</Text>
            <Menu>
              <MenuButton
                isDisabled={BillEntries.length !== 0}
                as={Button}
                rightIcon={<ChevronDownIcon />}
                textAlign="left"
                variant="outline"
              >
                {billType || "Not Selected"}
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => setBillType("wholesale")}>
                  Wholesale
                </MenuItem>
                <MenuItem onClick={() => setBillType("retail")}>
                  Retail
                </MenuItem>
              </MenuList>
            </Menu>
          </SimpleGrid>
        </SimpleGrid>

        <SimpleGrid columns={2} alignItems="baseline" my={2}>
          <Text>Items Handled:</Text>
          <Switch
            id="item-handled"
            colorScheme="teal"
            isChecked={itemHandled}
            onChange={() => setItemHandled(!itemHandled)}
          />
        </SimpleGrid>

        <SimpleGrid columns={2} alignItems="baseline" my={2}>
          <Text>Items Delivered:</Text>
          <Switch
            id="item-handled"
            colorScheme="teal"
            isChecked={itemDelivered}
            onChange={() => setItemDelievered(!itemDelivered)}
          />
        </SimpleGrid>
      </Box>

      <Box>
        <Button
          colorScheme="blue"
          width="100%"
          isDisabled={
            currentUserType !== "admin"
              ? true
              : BillEntries.length === 0
              ? true
              : false
          }
          onClick={onOpen}
        >
          Perform Bill
        </Button>
        <BillPaymentModal isOpen={isOpen} onClose={onClose} />
      </Box>
    </Flex>
  );
};
