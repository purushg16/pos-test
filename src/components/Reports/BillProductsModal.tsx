import {
  Button,
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
import { CrDrCart } from "../../functions/services/cr-dr-services";
import { BillReportProduct } from "../../functions/services/billing-services";

interface Props {
  products: BillReportProduct[];
}

const BillProductsModal = ({ products }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}> View Bill </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader> Bill Products </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TableContainer>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th> code </Th>
                    <Th>name</Th>
                    <Th>stock</Th>
                    <Th>unit</Th>
                    <Th>sales price</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {products.map((product) => (
                    <Tr key={product._id}>
                      <Td>{product.productId.code}</Td>
                      <Td>{product.productId.itemName}</Td>
                      <Td>{product.stock / product.selectedUnit}</Td>
                      <Td>
                        {product.selectedUnit !== 1
                          ? product.productId.topUnit
                          : product.productId.unit}
                      </Td>
                      <Td>
                        {(product.salesPrice * product.selectedUnit).toFixed(2)}
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose} variant="ghost">
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default BillProductsModal;
