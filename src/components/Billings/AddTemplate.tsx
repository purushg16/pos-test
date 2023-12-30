import {
  Button,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import useBillStore from "../../functions/store/billStore";
import useCustomerStore from "../../functions/store/customerStore";
import { useRef, useState } from "react";
import { usePostTemplates } from "../../functions/hooks/useTemplates";
import useEmployeStore from "../../functions/store/employeStore";
import useGSTStore from "../../functions/store/gstStore";

const AddTemplate = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [templateName, setTemplateName] = useState("");

  const { mutate } = usePostTemplates((yes) => setLoading(yes));
  const BillEntries = useBillStore((s) => s.BillEntries);

  const billType = useBillStore((s) => s.billType);
  const currentCustomer = useCustomerStore((s) => s.currentCustmer);

  const currentBiller = useEmployeStore((s) => s.currentBiller);
  const currentHandler = useEmployeStore((s) => s.currentHandler);
  const currentGstin = useGSTStore((s) => s.currentGstin);

  const addTemplate = () => {
    setLoading(true);
    const products = BillEntries.map((entry) => {
      return {
        productId: entry._id,
        stock: entry.quantity,
        selectedUnit: entry.currentUnitValue!,
      };
    });

    if (templateName) mutate({ products, templateName });
  };

  return (
    <>
      <Button
        onClick={onOpen}
        colorScheme="blue"
        isDisabled={
          !(
            BillEntries.length > 0 &&
            currentCustomer &&
            billType &&
            currentBiller &&
            currentHandler &&
            currentGstin
          )
        }
      >
        <MdOutlineBookmarkAdd />
        <Text ml={2}> Add Template </Text>
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading size="lg" mb={2}>
              Add New Template
            </Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Heading size="md" mb={2}>
              Template Name:
            </Heading>
            <Input
              value={templateName}
              onChange={(e) => {
                setTemplateName(e.target.value);
              }}
              placeholder="Enter Template Name"
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" variant="ghost" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              colorScheme="blue"
              onClick={addTemplate}
              isLoading={loading}
              isDisabled={templateName === ""}
            >
              Add Template
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddTemplate;
