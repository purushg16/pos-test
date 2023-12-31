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
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import usePayOut from "../../functions/hooks/usePayOut";
import usePayableStore from "../../functions/store/payableStore";
import PayOutModal from "./PayOutModal";
import { convertDate } from "../../functions/conversions/dateConversion";
import { useState } from "react";

const AddPayOutTable = () => {
  usePayOut({ type: "GET" });
  const baseParties = usePayableStore((s) => s.payablesList);
  const PayableParties = usePayableStore((s) => s.filteredPayables);
  const filter = usePayableStore((s) => s.filterPayables);
  const clear = usePayableStore((s) => s.clearFilters);
  const [numberOfDays, setperiod] = useState(parseInt(""));

  const fetchData = () => {
    const currentDate = new Date();
    const startDate = new Date(currentDate);
    startDate.setDate(startDate.getDate() - numberOfDays!);
    filter(startDate.setHours(0, 0, 0, 0));
  };

  return (
    <Box padding={10}>
      <Flex alignItems="baseline" mt={5} mb={10}>
        <Heading> Supplier Settlements </Heading>
        <Spacer />
        {!!PayableParties && (
          <HStack>
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

            {baseParties?.length !== PayableParties.length && (
              <Button
                ml={4}
                onClick={clear}
                colorScheme="red"
                variant="outline"
              >
                Clear
              </Button>
            )}
          </HStack>
        )}
      </Flex>

      {!!PayableParties ? (
        <TableContainer padding={10}>
          {PayableParties?.length > 0 ? (
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th> Date </Th>
                  <Th> Bill No. </Th>
                  <Th> Supplier </Th>
                  <Th> Amount </Th>
                  <Th> Action </Th>
                </Tr>
              </Thead>
              <Tbody>
                {PayableParties.map((d) => (
                  <Tr key={d._id}>
                    <Td width="min-content">{convertDate(d.createdAt)} </Td>
                    <Td>{d.billNo}</Td>
                    <Td>{d.supplierId.name}</Td>
                    <Td>{d.amount}</Td>
                    <Td>
                      <PayOutModal
                        id={d._id}
                        amount={d.amount}
                        supplier={d.supplierId}
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          ) : (
            <>
              <Heading textAlign="center"> No Data Found! </Heading>
            </>
          )}
        </TableContainer>
      ) : (
        <Spinner />
      )}
    </Box>
  );
};

export default AddPayOutTable;

// {PayableParties.length < 0 ? (
