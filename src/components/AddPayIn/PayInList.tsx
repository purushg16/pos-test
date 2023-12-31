import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Input,
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
import usePayInStore from "../../functions/store/payInStore";
import { useGetPayInList } from "../../functions/hooks/usePayIn";
import { convertDate } from "../../functions/conversions/dateConversion";
import { useState } from "react";

const PayInList = () => {
  useGetPayInList();
  const baseList = usePayInStore((s) => s.payInList);
  const payInList = usePayInStore((s) => s.filteredPayIn);
  const filter = usePayInStore((s) => s.filterPayInList);
  const clear = usePayInStore((s) => s.clearFilters);
  const [numberOfDays, setperiod] = useState(parseInt(""));

  const fetchData = () => {
    const currentDate = new Date();
    const startDate = new Date(currentDate);
    startDate.setDate(startDate.getDate() - numberOfDays!);

    filter(startDate.setHours(0, 0, 0, 0));
  };

  if (!payInList) return <Spinner />;
  return (
    <Box>
      <Flex mb={4}>
        <Heading> Overall Payins </Heading>
        <Spacer />
        <HStack alignItems="baseline">
          <Heading size="md"> More Than </Heading>
          <Input
            type="number"
            width={90}
            value={numberOfDays}
            onChange={(event) => setperiod(parseInt(event.target.value))}
            textAlign="right"
          />
          <Heading size="md"> Days </Heading>

          <Button
            ml={4}
            onClick={fetchData}
            colorScheme="blue"
            isDisabled={!numberOfDays}
          >
            Fetch
          </Button>

          {baseList?.length !== payInList.length && (
            <Button ml={4} onClick={clear} colorScheme="red" variant="outline">
              Clear
            </Button>
          )}
        </HStack>
      </Flex>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>date</Th>
              <Th>bill no.</Th>
              <Th>customer</Th>
              <Th isNumeric>amount</Th>
            </Tr>
          </Thead>

          {payInList?.length! > 0 ? (
            <Tbody>
              {payInList?.map((list) => (
                <Tr>
                  <Td> {convertDate(list.createdAt)} </Td>
                  <Td> {list.billId.billNo} </Td>
                  <Td> {list.customer.name} </Td>
                  <Td isNumeric> {list.payable.toFixed(2)} </Td>
                </Tr>
              ))}
            </Tbody>
          ) : (
            <Heading> No data found </Heading>
          )}
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PayInList;
