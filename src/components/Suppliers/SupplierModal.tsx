import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { SuppliersForm } from "./SuppliersForm";

export default function SupplierModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button width="100%" marginX={2} colorScheme="yellow" onClick={onOpen}>
        Add Supplier
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader />
          <ModalCloseButton />
          <ModalBody>
            <SuppliersForm />
          </ModalBody>

          <ModalFooter>
            <Button mr={3} colorScheme="red" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
