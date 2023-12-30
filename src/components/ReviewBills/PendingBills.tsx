import { DownloadIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Icon,
  Image,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { BsCheckCircle, BsXCircle } from "react-icons/bs";
import { convertDate } from "../../functions/conversions/dateConversion";
import useReview from "../../functions/hooks/useReview";
import PendingBillsStore from "../../functions/store/pendingBillsStore";
import PendingModal from "./PendingModal";

const PendingBills = () => {
  useReview({ type: "GET" });

  const pendingBills = PendingBillsStore((s) => s.filteredPendingBills);
  const filterPendingBills = PendingBillsStore((s) => s.filterPendingBills);
  const currentFilter = PendingBillsStore((s) => s.currentFilter);
  const clearFilter = PendingBillsStore((s) => s.clearFilter);

  if (!pendingBills) return <Spinner />;
  return (
    <Box padding={10}>
      <Flex my={2}>
        <Heading size="lg" mr={10}>
          Pending Bills
        </Heading>
        <HStack mb={4}>
          <Heading size="md">Filter:</Heading>

          <Button
            onClick={clearFilter}
            colorScheme={!currentFilter ? "blue" : "gray"}
          >
            All
          </Button>
          <Button
            colorScheme={currentFilter === "handle" ? "blue" : "gray"}
            onClick={() => {
              filterPendingBills(true);
            }}
          >
            Not Handled
          </Button>
          <Button
            colorScheme={currentFilter === "delivery" ? "blue" : "gray"}
            onClick={() => {
              filterPendingBills(false, true);
            }}
          >
            Not Delivered
          </Button>
        </HStack>
      </Flex>

      <TableContainer my={5}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Bill Number</Th>
              <Th>Created At</Th>
              <Th> Customer </Th>
              <Th> Bill Amount </Th>
              <Th textAlign="center">Item Handled</Th>
              <Th textAlign="center">Item Delivered</Th>
              <Th isNumeric> Action </Th>
            </Tr>
          </Thead>

          <Tbody>
            {pendingBills?.map((bill) => (
              <Tr>
                <Td> {bill.billNo} </Td>

                <Td> {convertDate(bill.createdAt)} </Td>
                <Td> {bill.customer[0].name} </Td>
                <Td>
                  <small>₹</small>
                  {bill.billAmount}
                </Td>
                <Td textAlign="center">
                  <Image
                    as={Icon}
                    color={bill.itemHandled ? "green" : "red"}
                    boxSize="10"
                  >
                    {bill.itemHandled ? <BsCheckCircle /> : <BsXCircle />}
                  </Image>
                </Td>
                <Td textAlign="center">
                  <Image
                    as={Icon}
                    color={bill.delivery ? "green" : "red"}
                    boxSize="10"
                  >
                    {bill.delivery ? <BsCheckCircle /> : <BsXCircle />}
                  </Image>
                </Td>
                <Td isNumeric>
                  <PendingModal entry={bill} />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PendingBills;
