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
import CustomerModal from "./CustomerModal";
import { useRef } from "react";
import useCustomerStore from "../../functions/store/customerStore";
import PaginatedWindow from "../Window/Window";

interface Props {
  canAdd?: boolean;
}

const SelectCustomer = ({ canAdd = true }: Props) => {
  const ref = useRef<HTMLInputElement>(null);
  const selectCustomers = useCustomerStore((s) => s.selectCustomers);
  const selectedCustomers = useCustomerStore((s) => s.selectedCustomers);
  const currentCustomer = useCustomerStore((s) => s.currentCustmer);
  const setCurrentCustomer = useCustomerStore((s) => s.setCurrentCustomer);

  const CustomerItem = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => {
    const customer = selectedCustomers![index];

    return (
      <Box style={style}>
        <Button
          width="100%"
          key={index}
          onClick={() => {
            setCurrentCustomer(customer);
          }}
        >
          {customer.name}
          {!!customer.balance && customer.balance !== 0 && (
            <Text pl={1} color={customer.balance! > 0 ? "green" : "red"}>
              ({customer.balance})
            </Text>
          )}
        </Button>
      </Box>
    );
  };

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
          {canAdd && (
            <Box paddingX={2} marginY={2}>
              <CustomerModal />
            </Box>
          )}
        </Box>

        {!selectedCustomers ? (
          <Spinner />
        ) : (
          <Box maxHeight={300} overflowY="scroll" paddingX={4}>
            <PaginatedWindow
              height={300}
              length={selectedCustomers.length}
              itemSize={50}
              width="100%"
              children={CustomerItem}
            />
          </Box>
        )}
      </MenuList>
    </Menu>
  );
};

export default SelectCustomer;
