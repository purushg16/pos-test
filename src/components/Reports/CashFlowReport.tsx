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
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { convertDate } from "../../functions/conversions/dateConversion";
import useCashFlow from "../../functions/hooks/useCashFlow";
import cashFlowStore, { mode } from "../../functions/store/cashflowStore";
import { ArrowUpIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { BsArrowDown } from "react-icons/bs";
import { MdClear } from "react-icons/md";

type nature = "sale" | "payIn" | "payOut" | "drawing" | "expense";
const NATURES = ["sale", "payIn", "payOut", "drawing", "expense"];

const CashFlowReport = () => {
  const cashflowList = cashFlowStore((s) => s.filteredCashFlowList);
  const filterCashflow = cashFlowStore((s) => s.filterCashflow);
  const currentNarture = cashFlowStore((s) => s.currentNarture);
  const reverse = cashFlowStore((s) => s.reverse);
  const clear = cashFlowStore((s) => s.clearFilters);
  const [degree, setDegree] = useState(true);
  const [currentMode, setMode] = useState<mode | undefined>(undefined);

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const { refetch } = useCashFlow(state[0].startDate, state[0].endDate);

  const onSumbit = () => {
    if (state[0].startDate && state[0].endDate) refetch();
  };

  return (
    <Box padding={7}>
      <Flex my={2} borderBottom="1px solid #6666662b" pb={4}>
        <Heading size="lg"> Cash Flow Report</Heading>
        <HStack mx={7}>
          <HStack mr={3}>
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

          <HStack mr={3}>
            <Heading size="md"> Nature: </Heading>
            <Menu>
              <MenuButton as={Button}>
                {currentNarture ? currentNarture.toUpperCase() : "Select"}
              </MenuButton>
              <MenuList>
                {NATURES.map((nature) => (
                  <MenuItem
                    key={nature}
                    onClick={() => {
                      filterCashflow(nature as nature);
                    }}
                  >
                    {nature.toUpperCase()}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          </HStack>

          <HStack mr={3}>
            <Heading size="md"> Mode: </Heading>
            <Menu>
              <MenuButton as={Button}>
                {currentMode ? currentMode : "Select"}
                <ChevronDownIcon />
              </MenuButton>
              <MenuList>
                <MenuItem
                  onClick={() => {
                    filterCashflow(currentNarture, "cash");
                    setMode("cash");
                  }}
                >
                  Cash
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    filterCashflow(currentNarture, "upi");
                    setMode("upi");
                  }}
                >
                  UPI
                </MenuItem>
              </MenuList>
            </Menu>
          </HStack>
          <Button
            colorScheme="red"
            onClick={() => {
              clear();
              setMode(undefined);
            }}
          >
            <MdClear />
          </Button>
        </HStack>

        <Spacer />
        <Heading size="md" mr={3}>
          Total Entries: {cashflowList?.length}
        </Heading>
        <Heading size="md">
          Total Bill Amount:{" "}
          {cashflowList?.reduce((acc, d) => acc + d.amount, 0).toFixed(2)}
        </Heading>
      </Flex>

      {!!cashflowList ? (
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>
                  Date
                  <Button
                    size="sm"
                    ml={2}
                    onClick={() => {
                      reverse();
                      setDegree(!degree);
                    }}
                  >
                    {degree ? <ArrowUpIcon /> : <BsArrowDown />}
                  </Button>
                </Th>
                <Th> Description </Th>
                <Th isNumeric> Amount </Th>
                <Th isNumeric> Mode </Th>
              </Tr>
            </Thead>

            {cashflowList.length > 0 ? (
              <Tbody>
                {cashflowList?.map((entry) => (
                  <Tr>
                    <Td> {convertDate(entry.createdAt).toUpperCase()} </Td>
                    <Td> {entry.description} </Td>
                    <Td isNumeric> {entry.amount} </Td>
                    <Td isNumeric> {entry.mode} </Td>
                  </Tr>
                ))}
              </Tbody>
            ) : (
              <Heading> No data to display! </Heading>
            )}
          </Table>
        </TableContainer>
      ) : (
        <Heading> Select a Date Range </Heading>
      )}
    </Box>
  );
};

export default CashFlowReport;
