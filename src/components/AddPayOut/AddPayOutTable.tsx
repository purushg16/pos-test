import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Input,
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
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import usePayOut from "../../functions/hooks/usePayOut";
import usePayableStore from "../../functions/store/payableStore";
import PayOutModal from "./PayOutModal";
import { convertDate } from "../../functions/conversions/dateConversion";
import { useEffect, useState } from "react";
import ImageModal from "./ImageModal";
import useSupplierStore from "../../functions/store/suppliersStore";
import SelectSuppliers from "../Stock/SelectSuppliers";

const AddPayOutTable = () => {
  usePayOut({ type: "GET" });
  const baseParties = usePayableStore((s) => s.payablesList);
  const PayableParties = usePayableStore((s) => s.filteredPayables);
  const filter = usePayableStore((s) => s.filterPayables);
  const filterBySuppliers = usePayableStore((s) => s.filterBySuppliers);
  const clear = usePayableStore((s) => s.clearFilters);
  const [numberOfDays, setperiod] = useState(parseInt(""));

  const currentSupplier = useSupplierStore((s) => s.currentSupplier);
  const setCurrentSupplier = useSupplierStore((s) => s.setCurrentSupplier);

  const fetchData = () => {
    const currentDate = new Date();
    const startDate = new Date(currentDate);
    startDate.setDate(startDate.getDate() - numberOfDays!);
    filter(startDate.setHours(0, 0, 0, 0));
  };

  useEffect(() => {
    filterBySuppliers(currentSupplier!);
  }, [currentSupplier]);

  return (
    <Box padding={10}>
      <Heading> Supplier Settlements </Heading>
      <Flex alignItems="baseline" mt={5} mb={10}>
        <HStack>
          <Heading size="md" whiteSpace="nowrap">
            Select Supplier:
          </Heading>
          <SelectSuppliers />
        </HStack>

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

            <Button
              ml={4}
              onClick={() => {
                clear();
                setCurrentSupplier(undefined);
              }}
              colorScheme="red"
              variant="outline"
              isDisabled={baseParties?.length === PayableParties.length}
            >
              Clear
            </Button>
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
                      <ImageModal src={d.link!} />
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
