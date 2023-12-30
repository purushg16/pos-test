import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { usePostPayOut } from "../../functions/hooks/usePayOut";
import { Supplier } from "../entities/Supplier";

interface Props {
  id: string;
  amount: number;
  supplier: Supplier;
}

const PayOutModal = ({ id, amount, supplier }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [newPayOut, setNewPayout] = useState({
    acctPayableId: id,
    mode: "",
    payOut: amount,
    ref: "",
    supplierId: supplier._id!,
  });

  const [isLoading, setLoading] = useState(false);
  const [canSubmit, setSubmit] = useState(false);

  useEffect(() => {
    if (id && amount && newPayOut.mode && newPayOut.ref) setSubmit(true);
    else setSubmit(false);
  }, [newPayOut, id, amount]);

  const { mutate } = usePostPayOut((yes) => setLoading(yes), id);
  const onSubmit = () => {
    setLoading(true);
    mutate(newPayOut);
  };

  return (
    <>
      <Button colorScheme="green" onClick={onOpen}>
        Settle
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader> Pay-Out Menu </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box my={4}>
              <Text> Recipt No: </Text>
              <Input
                value={newPayOut.ref}
                onChange={(event) => {
                  setNewPayout({ ...newPayOut, ref: event.target.value });
                }}
              />
            </Box>

            <SimpleGrid my={4} columns={2}>
              <Text> Payment Type: </Text>

              <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                  {newPayOut.mode || "Select"}
                </MenuButton>
                <MenuList>
                  <MenuItem
                    onClick={() => {
                      setNewPayout({ ...newPayOut, mode: "upi" });
                    }}
                  >
                    UPI
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setNewPayout({ ...newPayOut, mode: "cash" });
                    }}
                  >
                    Cash
                  </MenuItem>
                </MenuList>
              </Menu>
            </SimpleGrid>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              isDisabled={!canSubmit}
              isLoading={isLoading}
              onClick={onSubmit}
            >
              Settle
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PayOutModal;
