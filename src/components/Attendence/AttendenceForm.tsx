import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { usePostAttendace } from "../../functions/hooks/useAttendence";
import useEmployee from "../../functions/hooks/useEmployee";
import useAttendenceStore from "../../functions/store/attendenceStore";
import useEmployeStore from "../../functions/store/employeStore";

const AttendenceForm = () => {
  useEmployee({ type: "GET" });

  const employeeList = useEmployeStore((s) => s.employeeList);
  const attendenceEntryList = useAttendenceStore((s) => s.attendenceEntryList);
  const performAttendence = useAttendenceStore((s) => s.performAttendence);
  const clearAttendence = useAttendenceStore((s) => s.clearAttendence);
  const [isLoading, setLoading] = useState(false);

  const { mutate } = usePostAttendace((yes) => {
    setLoading(yes);
    clearAttendence();
  });

  const onSubmit = () => {
    setLoading(true);
    mutate({
      employeeData: attendenceEntryList,
    });
  };

  return (
    <Flex alignItems="top" justifyContent="center" height="100%" paddingY={10}>
      <Box width={800}>
        <Heading> Attendence </Heading>

        <SimpleGrid my={5}>
          <SimpleGrid
            columns={2}
            textAlign="center"
            background="gray.700"
            padding={2}
            borderRadius={2}
          >
            <Heading size="md"> Employee Name </Heading>
            <Heading size="md"> Checked In </Heading>
          </SimpleGrid>

          <Box height="60vh" overflowY="scroll" borderRadius={7} paddingX={5}>
            {employeeList.map((employee) => (
              <SimpleGrid
                columns={2}
                my={2}
                textAlign="center"
                borderBottom="1px solid gray"
                borderColor="gray.700"
                py={4}
              >
                <Heading size="md"> {employee.name} </Heading>
                <Text>
                  <Checkbox
                    colorScheme="teal"
                    size="lg"
                    onChange={(event) => {
                      performAttendence(event.target.checked, employee._id!);
                    }}
                  />
                </Text>
              </SimpleGrid>
            ))}
          </Box>
        </SimpleGrid>

        <Box display="flex" justifyContent="space-between">
          <Link to="/attendance">
            <Button colorScheme="gray" isLoading={isLoading}>
              {"<"} Back
            </Button>
          </Link>
          <Button colorScheme="green" onClick={onSubmit} isLoading={isLoading}>
            Submit
          </Button>
        </Box>
      </Box>
    </Flex>
  );
};

export default AttendenceForm;
