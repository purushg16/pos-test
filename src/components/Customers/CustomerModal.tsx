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
import CustomerForm from "./CustomerForm";
import { useEffect, useState } from "react";

export default function CustomerModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button width="100%" colorScheme="yellow" onClick={onOpen}>
        Add Customer
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
        size="xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader />
          <ModalCloseButton />
          <ModalBody>
            <CustomerForm
              done={(status) => {
                status && onClose();
              }}
            />
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
