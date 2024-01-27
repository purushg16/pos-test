import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  HStack,
  Heading,
  Input,
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
import { ProductReport } from "../entities/ProductReport";
import { useEffect, useState } from "react";
import { EditProduct } from "../entities/EditProduct";
import useEditProduct from "../../functions/hooks/useEditProduct";
import BarcodeScanner from "../Billings/BarcodeBiller";

interface Props {
  product: ProductReport;
}

const ProductReportModal = ({ product }: Props) => {
  const stock = product.suppliers?.reduce(
    (acc, supplier) => acc + supplier.stock,
    0
  )
    ? product.suppliers?.reduce((acc, supplier) => acc + supplier.stock, 0)
    : 0;

  const purchasePrice =
    product.suppliers?.length! > 0 ? product.suppliers![0].purchasePrice : "-";

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [edit, toggleEdit] = useState(false);
  const [editProduct, setEditProduct] = useState<EditProduct>({
    productId: product._id,
    barCode: product.barCode,
    itemName: product.itemName,
    unitConv: product.unitConv,
    salesPriceWholesale: product.salesPriceWholesale,
    salesPriceRetail: product.salesPriceRetail,
    taxRate: product.taxRate,
    mrp: product.mrp,
    zone: product.zone,
    critical: product.critical,
  });

  const [disabled, setDisabled] = useState(false);
  useEffect(() => {
    if (
      Number.isNaN(editProduct.unitConv) ||
      Number.isNaN(editProduct.critical) ||
      Number.isNaN(editProduct.salesPriceRetail) ||
      Number.isNaN(editProduct.salesPriceWholesale) ||
      Number.isNaN(editProduct.mrp) ||
      Number.isNaN(editProduct.taxRate) ||
      !editProduct.itemName ||
      !editProduct.zone
    )
      setDisabled(true);
    else setDisabled(false);
  }, [editProduct, edit]);

  const [loading, setLoading] = useState(false);
  const { mutate } = useEditProduct((yes) => setLoading(yes));
  const submitEdit = () => {
    if (editProduct.barCode !== product.barCode)
      setEditProduct({
        ...editProduct,
        barCode: (
          document.getElementById("edit-product-bar-code") as HTMLInputElement
        ).value,
      });

    setLoading(true);
    mutate(editProduct);
  };

  return (
    <>
      <Button onClick={onOpen}> View More </Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
        size="full"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading>
              {product.itemName}
              <Button
                ml={3}
                onClick={() => toggleEdit(!edit)}
                colorScheme={edit ? "red" : "blue"}
              >
                {!edit ? "Edit" : "Cancel"}
              </Button>
            </Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody p={10}>
            <SimpleGrid columns={4} spacing={7} pb={5}>
              {edit && (
                <Card boxShadow="2xl" p={2}>
                  <CardBody textAlign="left">
                    <Heading size="xs" fontWeight="normal" color="gray">
                      Item Name:
                    </Heading>
                    <Input
                      value={editProduct.itemName}
                      onChange={(event) => {
                        setEditProduct({
                          ...editProduct,
                          itemName: event.target.value,
                        });
                      }}
                      my={2}
                    />
                  </CardBody>
                </Card>
              )}

              <Card boxShadow="2xl" p={2}>
                <CardBody textAlign="left">
                  <Heading size="xs" fontWeight="normal" color="gray">
                    Code:
                  </Heading>
                  <Heading size="md"> {product.code} </Heading>
                </CardBody>
              </Card>

              <Card boxShadow="2xl" p={2}>
                <CardBody textAlign="left">
                  <Heading size="xs" fontWeight="normal" color="gray">
                    Bar Code:
                  </Heading>
                  {!edit && <Heading size="md"> {product.barCode} </Heading>}
                  <Input
                    defaultValue={product.barCode}
                    display={edit ? "hidden" : "none"}
                    id="edit-product-bar-code"
                    my={2}
                  />
                </CardBody>
                <BarcodeScanner />
              </Card>

              <Card boxShadow="2xl" p={2}>
                <CardBody textAlign="left">
                  <Heading size="xs" fontWeight="normal" color="gray">
                    Stock:
                  </Heading>
                  <Heading
                    size="md"
                    color={stock > product.critical ? "green" : "red"}
                  >
                    {stock}
                  </Heading>
                </CardBody>
              </Card>

              <Card boxShadow="2xl" p={2}>
                <CardBody textAlign="left">
                  <Heading size="xs" fontWeight="normal" color="gray">
                    Zone:
                  </Heading>
                  {edit ? (
                    <Input
                      value={editProduct.zone}
                      type="number"
                      onChange={(event) => {
                        setEditProduct({
                          ...editProduct,
                          zone: parseFloat(event.target.value),
                        });
                      }}
                      my={2}
                    />
                  ) : (
                    <Heading size="md">{product.zone}</Heading>
                  )}
                </CardBody>
              </Card>

              <Card boxShadow="2xl" p={2}>
                <CardBody textAlign="left">
                  <Heading size="xs" fontWeight="normal" color="gray">
                    Category:
                  </Heading>
                  <Heading size="md">{product.category.name}</Heading>
                </CardBody>
              </Card>

              <Card boxShadow="2xl" p={2}>
                <CardBody textAlign="left">
                  <Heading size="xs" fontWeight="normal" color="gray">
                    Purchase Price:
                  </Heading>
                  <Heading size="md">{purchasePrice}</Heading>
                </CardBody>
              </Card>

              <Card boxShadow="2xl" p={2}>
                <CardBody textAlign="left">
                  <Heading size="xs" fontWeight="normal" color="gray">
                    Sales Price(Wholsesale):
                  </Heading>
                  {edit ? (
                    <Input
                      value={editProduct.salesPriceWholesale}
                      type="number"
                      onChange={(event) => {
                        setEditProduct({
                          ...editProduct,
                          salesPriceWholesale: parseFloat(event.target.value),
                        });
                      }}
                      my={2}
                    />
                  ) : (
                    <Heading size="md">{product.salesPriceWholesale}</Heading>
                  )}
                </CardBody>
              </Card>

              <Card boxShadow="2xl" p={2}>
                <CardBody textAlign="left">
                  <Heading size="xs" fontWeight="normal" color="gray">
                    Sales Price(Retail):
                  </Heading>
                  {edit ? (
                    <Input
                      value={editProduct.salesPriceRetail}
                      type="number"
                      onChange={(event) => {
                        setEditProduct({
                          ...editProduct,
                          salesPriceRetail: parseFloat(event.target.value),
                        });
                      }}
                      my={2}
                    />
                  ) : (
                    <Heading size="md">{product.salesPriceRetail}</Heading>
                  )}
                </CardBody>
              </Card>

              <Card boxShadow="2xl" p={2}>
                <CardBody textAlign="left">
                  <Heading size="xs" fontWeight="normal" color="gray">
                    MRP:
                  </Heading>
                  {edit ? (
                    <Input
                      value={editProduct.mrp}
                      type="number"
                      onChange={(event) => {
                        setEditProduct({
                          ...editProduct,
                          mrp: parseFloat(event.target.value),
                        });
                      }}
                      my={2}
                    />
                  ) : (
                    <Heading size="md">{product.mrp}</Heading>
                  )}
                </CardBody>
              </Card>

              <Card boxShadow="2xl" p={2}>
                <CardBody textAlign="left">
                  <Heading size="xs" fontWeight="normal" color="gray">
                    Tax:
                  </Heading>
                  {edit ? (
                    <Input
                      value={editProduct.taxRate}
                      type="number"
                      onChange={(event) => {
                        setEditProduct({
                          ...editProduct,
                          taxRate: parseFloat(event.target.value),
                        });
                      }}
                      my={2}
                    />
                  ) : (
                    <Heading size="md">{product.taxRate}%</Heading>
                  )}
                </CardBody>
              </Card>

              <Card boxShadow="2xl" p={2}>
                <CardBody textAlign="left">
                  <Heading size="xs" fontWeight="normal" color="gray">
                    Unit:
                  </Heading>
                  <Heading size="md"> {product.unit || "-"} </Heading>
                </CardBody>
              </Card>

              <Card boxShadow="2xl" p={2}>
                <CardBody textAlign="left">
                  <Heading size="xs" fontWeight="normal" color="gray">
                    Top Unit:
                  </Heading>
                  <Heading size="md"> {product.topUnit || "-"} </Heading>{" "}
                </CardBody>
              </Card>

              <Card boxShadow="2xl" p={2}>
                <CardBody textAlign="left">
                  <Heading size="xs" fontWeight="normal" color="gray">
                    Top Unit Conversion:
                  </Heading>

                  {edit ? (
                    <Input
                      value={editProduct.unitConv}
                      type="number"
                      onChange={(event) => {
                        setEditProduct({
                          ...editProduct,
                          unitConv: parseInt(event.target.value),
                        });
                      }}
                      my={2}
                    />
                  ) : (
                    <Heading size="md">
                      {product.unitConv || "-"} {product.unit}
                    </Heading>
                  )}
                </CardBody>
              </Card>

              <Card boxShadow="2xl" p={2}>
                <CardBody textAlign="left">
                  <Heading size="xs" fontWeight="normal" color="gray">
                    Critical:
                  </Heading>

                  {edit ? (
                    <Input
                      value={editProduct.critical}
                      type="number"
                      onChange={(event) => {
                        setEditProduct({
                          ...editProduct,
                          critical: parseInt(event.target.value),
                        });
                      }}
                      my={2}
                    />
                  ) : (
                    <Heading size="md">{product.critical}</Heading>
                  )}
                </CardBody>
              </Card>

              {edit && (
                <Button
                  colorScheme="blue"
                  ml={3}
                  height="100%"
                  isDisabled={disabled}
                  isLoading={loading}
                  onClick={submitEdit}
                >
                  Submit
                </Button>
              )}
            </SimpleGrid>
            <Divider />

            {!edit && (
              <>
                <Heading size="md" my={3}>
                  Suppliers
                </Heading>
                <SimpleGrid columns={4} spacing={2}>
                  {product.suppliers?.length! > 0 ? (
                    product.suppliers?.map((supplier) => (
                      <Card boxShadow="2xl" borderRadius={20}>
                        <CardHeader>
                          <Heading
                            size="md"
                            borderBottom="1px solid #666"
                            pb={2}
                          >
                            {supplier.supplierId.name}
                          </Heading>
                        </CardHeader>
                        <CardBody
                          textAlign="left"
                          display="flex"
                          alignItems="end"
                        >
                          <HStack gap={5}>
                            <Box>
                              <Heading
                                size="xs"
                                fontWeight="normal"
                                color="gray"
                              >
                                Stock:
                              </Heading>
                              <Heading size="md"> {supplier.stock} </Heading>
                            </Box>
                            <Box>
                              <Heading
                                size="xs"
                                fontWeight="normal"
                                color="gray"
                              >
                                Purchase Price:
                              </Heading>
                              <Heading size="md">
                                {supplier.purchasePrice}
                              </Heading>
                            </Box>
                          </HStack>
                        </CardBody>
                      </Card>
                    ))
                  ) : (
                    <Text>No data to display!</Text>
                  )}
                </SimpleGrid>
              </>
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" variant="ghost" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProductReportModal;
