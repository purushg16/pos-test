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
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { DateRange } from "react-date-range";
import { convertDate } from "../../functions/conversions/dateConversion";
import useCrDr from "../../functions/hooks/useCrDr";
import useCustomers from "../../functions/hooks/useCustomers";
import crdrStore from "../../functions/store/crdrStore";
import useCustomerStore from "../../functions/store/customerStore";
import useSupplierStore from "../../functions/store/suppliersStore";
import SelectCustomer from "../Customers/SelectCustomer";
import SelectSuppliers from "../Stock/SelectSuppliers";
import CrDrModal from "./CrDrModal";
import ImageModal from "../AddPayOut/ImageModal";
import { BsImage } from "react-icons/bs";

type partyType = "dr" | "cr";

const CreditorAndDebtorReport = () => {
  useCustomers({ type: "GET" });

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [party, setParty] = useState<partyType>("cr");
  const [selected, setSelected] = useState(false);

  const { refetch } = useCrDr(state[0].startDate, state[0].endDate);

  const crdrList = crdrStore((s) => s.filteredCrDr);
  const filter = crdrStore((s) => s.filterCrDr);
  const currentCustomer = useCustomerStore((s) => s.currentCustmer);
  const setCurrentCustomer = useCustomerStore((s) => s.setCurrentCustomer);
  const currentSupplier = useSupplierStore((s) => s.currentSupplier);
  const setCurrentSupplier = useSupplierStore((s) => s.setCurrentSupplier);

  const onSumbit = () => {
    if (state[0].startDate && state[0].endDate) refetch();
  };

  const filterDate = () => {
    if (!!crdrList) {
      if (party === "cr" && !!currentSupplier)
        filter(true, currentSupplier._id!);
      else if (party === "dr" && !!currentCustomer)
        filter(false, currentCustomer._id!);
      setSelected(true);
    }
  };

  useEffect(() => {
    console.log(crdrList);
  }, [crdrList]);

  return (
    <Box padding={7}>
      <Heading mb={10}> Creditor And Debtor Report </Heading>
      <Flex borderBottom="1px solid #66666678" pb={3}>
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

        {!!crdrList && (
          <>
            <HStack ml={10}>
              <Heading size="md"> Select Type: </Heading>
              <Button
                colorScheme={party === "dr" ? "blue" : "gray"}
                onClick={() => {
                  setParty("dr");
                  setCurrentCustomer(undefined);
                  setSelected(false);
                }}
              >
                Debtors
              </Button>
              <Button
                colorScheme={party === "cr" ? "blue" : "gray"}
                onClick={() => {
                  setParty("cr");
                  setSelected(false);
                  setCurrentSupplier(undefined);
                }}
              >
                Creditors
              </Button>
            </HStack>

            {party === "dr" && (
              <HStack ml={10}>
                <Heading size="md"> Customer: </Heading>
                <SelectCustomer />
              </HStack>
            )}

            {party === "cr" && (
              <HStack ml={10}>
                <Heading size="md"> Supplier: </Heading>
                <SelectSuppliers />
              </HStack>
            )}
          </>
        )}

        {!!crdrList && (
          <Button
            ml={10}
            onClick={filterDate}
            isDisabled={
              (party === "dr" && !currentCustomer) ||
              (party == "cr" && !currentSupplier)
            }
          >
            View Results
          </Button>
        )}
      </Flex>

      <Box padding={7}>
        {state[0].startDate ? (
          <>
            {selected && (
              <TableContainer>
                <Table>
                  <Thead>
                    <Tr>
                      <Th>Date</Th>
                      <Th> Bill No. </Th>
                      <Th> {party === "dr" ? "Description" : "Recipt No."} </Th>
                      <Th> Status </Th>
                      <Th isNumeric> Amount </Th>
                      <Th textAlign="center"> Action </Th>
                    </Tr>
                  </Thead>
                  {crdrList?.length! > 0 ? (
                    <Tbody>
                      {crdrList?.map((entry) => (
                        <Tr>
                          <Td> {convertDate(entry.createdAt)} </Td>
                          <Td>
                            {" "}
                            {entry.money === "pending"
                              ? entry.description
                              : "-"}{" "}
                          </Td>
                          <Td>
                            {" "}
                            {entry.money === "paid"
                              ? entry.description
                              : "-"}{" "}
                          </Td>
                          <Td
                            color={
                              entry.money.toUpperCase() === "PENDING"
                                ? "red"
                                : "green"
                            }
                          >
                            {entry.money.toUpperCase()}
                          </Td>
                          <Td isNumeric> {entry.amount.toFixed(2)} </Td>

                          <Td textAlign="center">
                            {!!entry.cartId?.product && (
                              <CrDrModal
                                products={entry.cartId?.product!}
                                type={party}
                              />
                            )}
                            {!!entry.link &&
                            entry.money.toUpperCase() === "PENDING" ? (
                              <ImageModal src={entry.link} />
                            ) : (
                              <Button ml={4} isDisabled>
                                <BsImage />
                              </Button>
                            )}
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  ) : (
                    <Heading> No data to display! </Heading>
                  )}
                </Table>
              </TableContainer>
            )}
          </>
        ) : (
          <Heading> Please Select Date Range. </Heading>
        )}
      </Box>
    </Box>
  );
};

export default CreditorAndDebtorReport;
