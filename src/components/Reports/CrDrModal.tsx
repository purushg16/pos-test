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

interface Props {
  products: CrDrCart[];
  type: "dr" | "cr";
}

const CrDrModal = ({ products, type }: Props) => {
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
                    <Th>{type === "cr" ? "purchase price" : "sales price"} </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {products.map((product) => (
                    <Tr key={product._id}>
                      <Td>{product.productId.code}</Td>
                      <Td>{product.productId.itemName}</Td>
                      <Td>
                        {!!product.selectedUnit
                          ? product.stock / product.selectedUnit
                          : product.stock}
                      </Td>
                      <Td>
                        {product.selectedUnit !== 1
                          ? product.productId.topUnit
                          : product.productId.unit}
                      </Td>
                      <Td>
                        {type === "cr"
                          ? product.purchasePrice! * product.selectedUnit!
                          : product.salesPrice! * product.selectedUnit!}
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

export default CrDrModal;
