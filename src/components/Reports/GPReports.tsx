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
import useReport from "../../functions/hooks/useReports";
import reportStore from "../../functions/store/reportStore";
import { useState } from "react";
import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";
import { GroupingType } from "../entities/GroupingType";
import { DateRange } from "react-date-range";

const TYPES = ["Product", "Customer", "Supplier", "Category", "Employe"];

const GPReports = () => {
  const reportList = reportStore((s) => s.orderedGroupedReports);
  const [selected, setSelected] = useState(false);
  const setReports = reportStore((s) => s.setReports);

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const { refetch } = useReport(state[0].startDate, state[0].endDate);

  const onSumbit = () => {
    setSelected(true);
    if (state[0].startDate && state[0].endDate)
      refetch().then((res) => {
        if (res.data) setReports(res.data || []);
      });
  };

  const sortReports = reportStore((s) => s.sortReports);
  const setReportList = reportStore((s) => s.setGroupedReports);
  const type = reportStore((s) => s.currentGroupKey);

  const [sortProfit, setSortProfit] = useState(1);
  const [sortName, setSortName] = useState(1);

  const handleSwitch = (groupBy: GroupingType) => {
    setSelected(true);
    setReportList(groupBy);
  };

  return (
    <Box>
      <Flex my={2}>
        <Heading size="lg">Gross Profit Report</Heading>
        <Spacer />

        <HStack mr={10}>
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

        <HStack>
          <Heading size="md">Sort By:</Heading>
          <Menu>
            <MenuButton as={Button}> {type} </MenuButton>
            <MenuList>
              {TYPES.map((t) => (
                <MenuItem
                  key={t}
                  onClick={() => {
                    handleSwitch(t as GroupingType);
                  }}
                >
                  {t}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </HStack>
      </Flex>

      {selected ? (
        <TableContainer my={5}>
          {reportList.length > 0 ? (
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Serial</Th>
                  <Th>
                    {type} Name
                    <Button
                      ml={2}
                      size="sm"
                      onClick={() => {
                        setSortName(sortName === 1 ? -1 : 1);
                        sortReports("name", sortName === 1 ? -1 : 1);
                      }}
                    >
                      {sortName === 1 ? <ArrowUpIcon /> : <ArrowDownIcon />}
                    </Button>
                  </Th>
                  <Th isNumeric>
                    Profit
                    <Button
                      ml={2}
                      size="sm"
                      onClick={() => {
                        setSortProfit(sortProfit === 1 ? -1 : 1);
                        sortReports("profit", sortProfit === 1 ? -1 : 1);
                      }}
                    >
                      {sortProfit === 1 ? <ArrowUpIcon /> : <ArrowDownIcon />}
                    </Button>
                  </Th>
                </Tr>
              </Thead>

              <Tbody>
                {reportList.map((product, index) => (
                  <Tr key={index}>
                    <Td>{index + 1}</Td>
                    <Td> {product.name} </Td>
                    <Td isNumeric color={product.profit > 0 ? "green" : "red"}>
                      {product.profit.toFixed(2)}
                      <small>{product.profit > 0 ? "(+)" : "(-)"}</small>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          ) : (
            <Heading> No data found </Heading>
          )}
        </TableContainer>
      ) : (
        <Heading textAlign="center"> Please Select Date Range </Heading>
      )}
    </Box>
  );
};

export default GPReports;

// purchase price (wt)
// sales price (wt)

// product : =>
// name
// profit

// Supplier: =>
// name
// profit
