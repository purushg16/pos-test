import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Heading,
  Input,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  SimpleGrid,
} from "@chakra-ui/react";
import { useState } from "react";
import useReverseBill from "../../functions/hooks/useReverseBill";

const ReverseBill = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);

  const [reverseItem, editReverseItem] = useState({
    billNo: parseInt(""),
    mode: "",
  });

  const { mutate } = useReverseBill((yes) => setLoading(yes));

  const onReverse = () => {
    setLoading(true);
    mutate(reverseItem);
  };

  return (
    <>
      <Button onClick={onOpen} colorScheme="red">
        Reverse Bill
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading size="lg">Reverse Bill</Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Heading size="sm" mb={2}>
              Bill Number:
            </Heading>
            <Input
              type="number"
              mb={5}
              placeholder="Bill Number"
              value={reverseItem.billNo}
              onChange={(event) =>
                editReverseItem({
                  ...reverseItem,
                  billNo: parseInt(event.target.value),
                })
              }
            />

            <SimpleGrid columns={2} mb={2} alignItems="baseline">
              <Heading size="sm"> Payment Mode: </Heading>
              <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                  {reverseItem.mode || "Select"}
                </MenuButton>
                <MenuList>
                  <MenuItem
                    onClick={() => {
                      editReverseItem({ ...reverseItem, mode: "upi" });
                    }}
                  >
                    UPI
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      editReverseItem({ ...reverseItem, mode: "cash" });
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
              Close
            </Button>
            <Button
              colorScheme="red"
              onClick={onReverse}
              isLoading={loading}
              isDisabled={!reverseItem.billNo && reverseItem.mode !== ""}
            >
              Reverse
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ReverseBill;
