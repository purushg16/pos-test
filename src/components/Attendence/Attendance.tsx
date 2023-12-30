import {
  Box,
  Card,
  CardHeader,
  Heading,
  Image,
  SimpleGrid,
} from "@chakra-ui/react";
import { MdAssignment, MdAssignmentTurnedIn } from "react-icons/md";
import { MenuCard } from "../Menu/MenuCard";
import { Link } from "react-router-dom";

const Attendance = () => {
  return (
    <Box padding={10}>
      <Box py={7} borderBottom="1px solid #66666678">
        <Heading> Manage Attendace </Heading>
      </Box>

      <SimpleGrid columns={3} spacing={5} paddingY={10}>
        <Link to="/postAttendance">
          <Box boxShadow="dark-lg" borderRadius={20}>
            <MenuCard
              title="Post Attendance"
              icon={MdAssignmentTurnedIn}
              desc={["Make today' attendance"]}
            />
          </Box>
        </Link>

        <Link to="/viewAttendance">
          <Box boxShadow="dark-lg" borderRadius={20}>
            <MenuCard
              title="Attendance Report"
              icon={MdAssignment}
              desc={["Make today' attendance"]}
            />
          </Box>
        </Link>
      </SimpleGrid>
    </Box>
  );
};

export default Attendance;
