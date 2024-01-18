import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Box,
  IconButton,
} from "@chakra-ui/react";
import BillingTabItemSelector from "./BillingItemTabSelector";
import useCategoryStore from "../../functions/store/categoryStore";
import useProductStore from "../../functions/store/ProductStore";
import useCategoryies from "../../functions/hooks/useCategories";
import { EditIcon } from "@chakra-ui/icons";
import useBillStore from "../../functions/store/billStore";
import useEmployeStore from "../../functions/store/employeStore";
import useGSTStore from "../../functions/store/gstStore";
import useCustomerStore from "../../functions/store/customerStore";
import { useRef } from "react";

interface Props {
  small?: boolean;
  selector?: boolean;
  stock?: boolean;
  inline?: boolean;
  billing?: boolean;
}

const BillTabContainer = ({
  small = false,
  selector = false,
  stock = false,
  inline = false,
  billing = false,
}: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const clearCategoryFilters = useCategoryStore(
    (s) => s.clearCategoriesFilters
  );
  const clearProductFilters = useProductStore((s) => s.clearProductFilters);
  const reverseCategory = useCategoryStore((s) => s.reverseCategory);
  useCategoryies({ type: "GET" });

  const billType = useBillStore((s) => s.billType);
  const currentBiller = useEmployeStore((s) => s.currentBiller);
  const currentHandler = useEmployeStore((s) => s.currentHandler);
  const currentGstin = useGSTStore((s) => s.currentGstin);
  const currentCustmer = useCustomerStore((s) => s.currentCustmer);

  const modalRef = useRef<HTMLButtonElement>(null);

  return (
    <Box>
      {inline && (
        <IconButton
          colorScheme="teal"
          aria-label="Search database"
          icon={<EditIcon />}
          onClick={onOpen}
        />
      )}

      {!inline && billing && (
        <Button
          onClick={onOpen}
          size={small ? "sm" : "md"}
          isDisabled={
            !(
              currentBiller &&
              currentHandler &&
              currentGstin &&
              billType &&
              currentCustmer
            )
          }
        >
          {small ? "Pick" : "Using Category"}
        </Button>
      )}

      {stock && (
        <Button onClick={onOpen} size={small ? "sm" : "md"}>
          {small ? "Pick" : "Using Category"}
        </Button>
      )}

      {!inline && selector && <Button onClick={onOpen}>Select Category</Button>}

      <Modal
        finalFocusRef={modalRef}
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={() => {
          onClose();
          clearCategoryFilters();
          clearProductFilters();
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader> Select Item </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <BillingTabItemSelector stock={stock} selector={selector} />
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={() => {
                reverseCategory();
                clearProductFilters();
              }}
              mx={2}
              variant="outline"
              colorScheme="yellow"
            >
              To Top
            </Button>

            {selector && (
              <Button onClick={onClose} mx={2} colorScheme="green">
                Select
              </Button>
            )}

            <Button
              colorScheme="red"
              onClick={() => {
                clearCategoryFilters();
                clearProductFilters();
                onClose();
              }}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default BillTabContainer;
