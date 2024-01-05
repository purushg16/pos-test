import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import {
  BillReport,
  getBills,
} from "../../functions/services/billing-services";
import { useGetBills } from "../../functions/hooks/useBilling";
import { useEffect, useState } from "react";
import { DateRange } from "react-date-range";
import { convertDate } from "../../functions/conversions/dateConversion";
import BillProductsModal from "./BillProductsModal";
import SelectCustomer from "../Customers/SelectCustomer";
import useCustomerStore from "../../functions/store/customerStore";
import { MdClear, MdClearAll } from "react-icons/md";

const BillReports = () => {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [selected, setSelected] = useState(false);
  const [billData, setBillDate] = useState<BillReport[]>(undefined || []);
  const [filteredBillData, setFilteredBillDate] = useState<BillReport[]>(
    undefined || []
  );
  const { refetch } = useGetBills(state[0].startDate, state[0].endDate);
  const currentCustomer = useCustomerStore((s) => s.currentCustmer);
  const setCurrentCustomer = useCustomerStore((s) => s.setCurrentCustomer);

  const onSumbit = () => {
    setSelected(true);
    if (state[0].startDate && state[0].endDate)
      refetch().then((res) => {
        if (res.data) {
          setBillDate(res.data?.data || []);
          setFilteredBillDate(res.data?.data || []);
        }
      });
  };

  const clearFilter = () => {
    setFilteredBillDate(billData);
    setCurrentCustomer(undefined);
  };

  useEffect(() => {
    if (!!currentCustomer)
      setFilteredBillDate(
        billData.filter((data) => data.customer._id! === currentCustomer?._id!)
      );
  }, [currentCustomer]);

  return (
    <Box padding={7}>
      <Flex alignItems="baseline">
        <Heading> Bill Report </Heading>

        <HStack ml={10}>
          <Heading size="md"> Select Range: </Heading>
          <Menu>
            <MenuButton as={Button}>{"Select"}</MenuButton>
            <MenuList padding={0}>
              <DateRange
                editableDateInputs={true}
                onChange={(item) =>
                  setState([
                    {
                      startDate: item.selection.startDate ?? new Date(),
                      endDate: item.selection.endDate ?? new Date(),
                      key: "selection",
                    },
                  ])
                }
                moveRangeOnFirstSelection={false}
                ranges={state}
              />

              <MenuItem justifyContent="end">
                <Button colorScheme="green" onClick={onSumbit}>
                  Select
                </Button>
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>

        <HStack ml={10}>
          <Heading size="md"> Customer: </Heading>
          <SelectCustomer canAdd={false} />
        </HStack>

        <Button ml={2} colorScheme="red" onClick={clearFilter}>
          <MdClear />
        </Button>

        <Spacer />
        <Heading size="md" mr={3}>
          Total Bills: {filteredBillData.length}
        </Heading>
        <Heading size="md">
          Total Bill Amount:{" "}
          {filteredBillData.reduce((acc, d) => acc + d.billAmount, 0)}
        </Heading>
      </Flex>

      <Box mt={10}>
        {selected ? (
          <>
            <TableContainer>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th> Date </Th>
                    <Th>Bill No</Th>
                    <Th>Customer</Th>
                    <Th> Bill Amount </Th>
                    <Th> Bill Type </Th>
                    <Th> Biller </Th>
                    <Th> Action</Th>
                  </Tr>
                </Thead>

                {!filteredBillData ? (
                  <Spinner />
                ) : (
                  <>
                    {!!filteredBillData && filteredBillData.length > 0 ? (
                      <Tbody>
                        {filteredBillData.map((bill) => (
                          <Tr>
                            <Td> {convertDate(bill.createdAt)} </Td>
                            <Td>{bill.billNo}</Td>
                            <Td>{bill.customer.name}</Td>
                            <Td> {bill.billAmount} </Td>
                            <Td> {bill.billType} </Td>
                            <Td> {bill.billerName} </Td>
                            <Td>
                              <BillProductsModal products={bill.cart.product} />
                            </Td>
                          </Tr>
                        ))}
                      </Tbody>
                    ) : (
                      <Heading> No data found! </Heading>
                    )}
                  </>
                )}
              </Table>
            </TableContainer>
          </>
        ) : (
          <Heading textAlign="center"> Please Select Date Range </Heading>
        )}
      </Box>
    </Box>
  );
};

export default BillReports;
