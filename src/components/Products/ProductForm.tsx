import { ChevronDownIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Grid,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLongPress } from "use-long-press";
import { postNewProduct } from "../../functions/hooks/useProducts";
import useSuppliers from "../../functions/hooks/useSuppliers";
import useCategoryStore from "../../functions/store/categoryStore";
import BillTabContainer from "../Billings/BillTabContainer";

const UNITS = [
  "None",
  "BAGS",
  "BOTTLES",
  "BOX",
  "BUNDLES",
  "CANS",
  "CARTONS",
  "DOZENS",
  "GRAMMES",
  "KILOGRAMS",
  "LITRE",
  "METERS",
  "MILILITRE",
  "NUMBERS",
  "PACKS",
  "PAIRS",
  "PIECES",
  "QUINTAL",
  "ROLLS",
  "SQUARE FEET",
  "SQUARE METERS",
  "TABLETS",
];

const ProductForm = () => {
  useSuppliers({ type: "GET" });

  const [barcodeData, setBarcodeData] = useState<string>("");
  const currentCategory = useCategoryStore((s) => s.currentCategory);
  const [newProduct, editProduct] = useState({
    itemName: "",
    barCode: parseInt(""),
    code: parseInt(""),
    taxRate: parseInt(""),
    mrp: parseInt(""),
    zone: "",
    unit: "None",
    topUnit: "None",
    unitConv: parseInt(""),
    critical: parseInt(""),
    category: currentCategory?._id!,
    salesPriceWholesale: parseInt(""),
    salesPriceRetail: parseInt(""),
  });

  const [canSubmit, setSubmit] = useState(false);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    editProduct({ ...newProduct, category: currentCategory?._id! });
  }, [currentCategory]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Check if the key pressed is a printable ASCII character
      if (event.key.length === 1) {
        setBarcodeData((prevData) => prevData + event.key);
      } else if (event.key === "Enter") {
        if (
          document.getElementById("product-barCode") &&
          location.pathname === "/addProduct"
        ) {
          editProduct({ ...newProduct, barCode: parseInt(barcodeData) });
        }
        setBarcodeData(""); // Clear the buffer for the next scan
      }
    };

    // Attach the event listener
    document.addEventListener("keypress", handleKeyPress);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  }, [barcodeData]);

  const { mutate } = postNewProduct((yes) => setLoading(yes));
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    mutate(newProduct);
  };

  useEffect(() => {
    if (
      newProduct.itemName &&
      newProduct.barCode &&
      newProduct.code &&
      newProduct.unit !== "None" &&
      newProduct.category &&
      newProduct.taxRate &&
      newProduct.mrp &&
      newProduct.salesPriceWholesale &&
      newProduct.salesPriceRetail &&
      currentCategory &&
      (newProduct.topUnit === "None" ||
        (newProduct.topUnit !== "None" && newProduct.unitConv))
    )
      setSubmit(true);
    else setSubmit(false);
  }, [newProduct, currentCategory]);

  const bind = useLongPress(() => {
    editProduct({
      itemName: "",
      barCode: parseInt(""),
      code: parseInt(""),
      category: "",
      taxRate: parseInt(""),
      mrp: parseInt(""),
      unit: "",
      topUnit: "None",
      unitConv: parseInt(""),
      salesPriceWholesale: parseInt(""),
      salesPriceRetail: parseInt(""),
      zone: "",
      critical: parseInt(""),
    });
  });

  return (
    <Flex alignItems="center" justifyContent="center" height="100%">
      <Box width="90%">
        <Heading> Add Product </Heading>
        <form onSubmit={(event) => onSubmit(event)}>
          <SimpleGrid columns={3} columnGap={10}>
            <Flex flexDirection="column" gap={5} marginY={7}>
              <Box>
                <Text fontSize="xl"> Product Name</Text>
                <Input
                  focusBorderColor="teal"
                  variant="flushed"
                  value={newProduct.itemName}
                  onChange={(event) => {
                    editProduct({
                      ...newProduct,
                      itemName: event.target.value,
                    });
                  }}
                />
              </Box>

              <Box>
                <Text fontSize="xl"> Bar Code </Text>
                <Input
                  id="product-barCode"
                  focusBorderColor="teal"
                  variant="flushed"
                  type="number"
                  value={newProduct.barCode}
                  onChange={(event) => {
                    editProduct({
                      ...newProduct,
                      barCode: parseInt(event.target.value),
                    });
                  }}
                />
              </Box>

              <Box>
                <Text fontSize="xl"> Code </Text>
                <Input
                  focusBorderColor="teal"
                  variant="flushed"
                  type="number"
                  value={newProduct.code}
                  onChange={(event) => {
                    editProduct({
                      ...newProduct,
                      code: parseInt(event.target.value),
                    });
                  }}
                />
              </Box>

              <Box>
                <Text fontSize="xl"> Tax Rate </Text>
                <Input
                  focusBorderColor="teal"
                  variant="flushed"
                  type="number"
                  value={newProduct.taxRate}
                  onChange={(event) => {
                    editProduct({
                      ...newProduct,
                      taxRate: parseFloat(event.target.value),
                    });
                  }}
                />
              </Box>
            </Flex>

            <Flex flexDirection="column" gap={5} marginY={7}>
              <Box>
                <Text fontSize="xl"> MRP </Text>
                <Input
                  focusBorderColor="teal"
                  variant="flushed"
                  type="number"
                  value={newProduct.mrp}
                  onChange={(event) => {
                    editProduct({
                      ...newProduct,
                      mrp: parseInt(event.target.value),
                    });
                  }}
                />
              </Box>

              <Box>
                <Text fontSize="xl"> Zone </Text>
                <Input
                  focusBorderColor="teal"
                  type="number"
                  variant="flushed"
                  value={newProduct.zone}
                  onChange={(event) => {
                    editProduct({
                      ...newProduct,
                      zone: event.target.value,
                    });
                  }}
                />
              </Box>

              <Box>
                <Text fontSize="xl">
                  Sales Price<small>(Wholesale)</small>{" "}
                </Text>
                <Input
                  focusBorderColor="teal"
                  variant="flushed"
                  type="number"
                  value={newProduct.salesPriceWholesale}
                  onChange={(event) => {
                    editProduct({
                      ...newProduct,
                      salesPriceWholesale: parseInt(event.target.value),
                    });
                  }}
                />
              </Box>

              <Box>
                <Text fontSize="xl">
                  Sales Price<small>(Retail)</small>
                </Text>
                <Input
                  focusBorderColor="teal"
                  variant="flushed"
                  type="number"
                  value={newProduct.salesPriceRetail}
                  onChange={(event) => {
                    editProduct({
                      ...newProduct,
                      salesPriceRetail: parseInt(event.target.value),
                    });
                  }}
                />
              </Box>
            </Flex>

            <Flex flexDirection="column" gap={5} marginY={7}>
              <Box>
                <Text fontSize="xl"> Category: </Text>
                <ButtonGroup isAttached size="md" width="100%">
                  <Button width="100%">
                    {currentCategory ? currentCategory.name : "-"}{" "}
                  </Button>
                  <BillTabContainer selector inline />
                </ButtonGroup>
              </Box>

              <Box>
                <SimpleGrid columns={2} spacing={2}>
                  <Box>
                    <Text fontSize="xl"> Unit </Text>
                    <Menu>
                      <MenuButton
                        as={Button}
                        rightIcon={<ChevronDownIcon />}
                        size="lg"
                        width="100%"
                      >
                        {newProduct.unit || "None"}
                      </MenuButton>
                      <MenuList maxHeight={250} overflowY="scroll">
                        {UNITS.map((unit: string) => (
                          <MenuItem
                            onClick={() =>
                              editProduct({ ...newProduct, unit: unit })
                            }
                          >
                            {unit}
                          </MenuItem>
                        ))}
                      </MenuList>
                    </Menu>
                  </Box>

                  <Box>
                    <Text fontSize="xl"> Top Unit </Text>
                    <Menu>
                      <MenuButton
                        as={Button}
                        rightIcon={<ChevronDownIcon />}
                        size="lg"
                        width="100%"
                      >
                        {newProduct.topUnit || "None"}
                      </MenuButton>
                      <MenuList maxHeight={250} overflowY="scroll">
                        {UNITS.map((unit: string) => (
                          <MenuItem
                            onClick={() =>
                              editProduct({ ...newProduct, topUnit: unit })
                            }
                          >
                            {unit}
                          </MenuItem>
                        ))}
                      </MenuList>
                    </Menu>
                  </Box>
                </SimpleGrid>
              </Box>
              {newProduct.topUnit !== "None" && (
                <Box>
                  <Text fontSize="xl"> Unit Conversion </Text>
                  <Input
                    focusBorderColor="teal"
                    variant="flushed"
                    type="number"
                    value={newProduct.unitConv}
                    onChange={(event) => {
                      editProduct({
                        ...newProduct,
                        unitConv: parseInt(event.target.value),
                      });
                    }}
                  />
                </Box>
              )}

              <Box>
                <Text fontSize="xl"> Critical Level </Text>
                <InputGroup>
                  <Input
                    type="number"
                    value={newProduct.critical}
                    onChange={(event) => {
                      editProduct({
                        ...newProduct,
                        critical: parseInt(event.target.value),
                      });
                    }}
                  />
                  <InputRightAddon>
                    {newProduct.unit !== "None" ? newProduct.unit : "-"}
                  </InputRightAddon>
                </InputGroup>
              </Box>
            </Flex>
          </SimpleGrid>
          <Grid templateColumns={"1fr 5%"} gap={3} alignItems="center">
            <Button
              width="100%"
              colorScheme="teal"
              type="submit"
              my={2}
              isLoading={isLoading}
              isDisabled={!canSubmit}
              loadingText="Adding Product..."
            >
              Add Product
            </Button>
            <Button {...bind()}>
              <DeleteIcon />
            </Button>
          </Grid>
        </form>
      </Box>
    </Flex>
  );
};

export default ProductForm;
