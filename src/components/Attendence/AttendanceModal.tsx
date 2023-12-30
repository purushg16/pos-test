import {
  Box,
  Button,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { convertDate } from "../../functions/conversions/dateConversion";
import { AttendaceEmployee } from "../entities/attendace";
import { CheckCircleIcon, NotAllowedIcon } from "@chakra-ui/icons";

interface Props {
  date: string;
  employeeList: AttendaceEmployee[];
}

const AttendanceModal = ({ date, employeeList }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen} color="teal">
        View Details
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{convertDate(date)}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TableContainer>
              <Table>
                <Thead>
                  <Tr>
                    <Th> Employe Name </Th>
                    <Th textAlign="center"> Attendance </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {employeeList.map((employe) => (
                    <Tr>
                      <Td
                        textDecoration={!employe.checkIn ? "underline" : "none"}
                      >
                        {employe.employeeId.name}
                        {!employe.checkIn && "*"}
                      </Td>
                      <Td textAlign="center">
                        <Image
                          as={
                            employe.checkIn ? CheckCircleIcon : NotAllowedIcon
                          }
                          boxSize={5}
                          color={employe.checkIn ? "green" : "red"}
                        />
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AttendanceModal;
