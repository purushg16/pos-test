import {
  Box,
  Button,
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
import { useState } from "react";
import { DateRange } from "react-date-range";
import useAttendence from "../../functions/hooks/useAttendence";
import { Attendace } from "../entities/attendace";
import AttendanceModal from "./AttendanceModal";
import { convertDate } from "../../functions/conversions/dateConversion";

const AttendanceReport = () => {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [attendanceList, setAttendanceList] = useState<null | Attendace[]>(
    null
  );
  const [selected, setSelected] = useState(false);
  const { refetch } = useAttendence({
    startDate: state[0].startDate,
    endDate: state[0].endDate,
  });

  const onSumbit = () => {
    setSelected(true);
    refetch().then((res) => {
      if (res.data) setAttendanceList(res.data.data);
      else setAttendanceList(null);
    });
  };

  return (
    <Box p={10}>
      <Box pt={7} borderBottom="1px solid #66666678">
        <Heading> Manage Attendace </Heading>
        <HStack m={7}>
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
      </Box>

      <Box p={5}>
        {!selected ? <Heading> Please Select a Date Range </Heading> : <></>}

        {attendanceList !== null && (
          <TableContainer>
            <Table size={"lg"}>
              <Thead>
                <Tr>
                  <Th> sl.no. </Th>
                  <Th>Date</Th>
                  <Th isNumeric> No. of Presents </Th>
                  <Th isNumeric> No. of Absents </Th>
                  <Th textAlign="center"> Action </Th>
                </Tr>
              </Thead>
              <Tbody>
                {attendanceList.map((list, index) => (
                  <Tr>
                    <Td> {index + 1} </Td>
                    <Td> {convertDate(list.date)} </Td>
                    <Td isNumeric>
                      {
                        list.employee.filter((emp) => emp.checkIn === true)
                          .length
                      }
                    </Td>
                    <Td isNumeric>
                      {
                        list.employee.filter((emp) => emp.checkIn === false)
                          .length
                      }
                    </Td>
                    <Td textAlign="center">
                      <AttendanceModal
                        date={list.date}
                        employeeList={list.employee}
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        )}

        {attendanceList?.length === 0 && <Heading> No data found! </Heading>}
      </Box>
    </Box>
  );
};

export default AttendanceReport;
