import {
  Button,
  Icon,
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
import { BsPrinter } from "react-icons/bs";
import {
  BillReport,
  BillReportProduct,
} from "../../functions/services/billing-services";
import BillPrint from "../BillPrinter/BillPrint";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

interface Props {
  products: BillReportProduct[];
  entry: BillReport;
}

const BillProductsModal = ({ products, entry }: Props) => {
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}> View Bill </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Bill Products
            <Button colorScheme="blue" onClick={handlePrint} mx={5}>
              <Icon as={BsPrinter} mr={2} />
              Print Bill
            </Button>
          </ModalHeader>
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
                        {(
                          product.salesPrice *
                          product.selectedUnit *
                          product.stock
                        ).toFixed(2)}
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
            <div style={{ display: "none" }}>
              <BillPrint entry={entry} ref={componentRef} />
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default BillProductsModal;
