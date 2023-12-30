import {
  Box,
  Card,
  CardHeader,
  Heading,
  SimpleGrid,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import useProductStore from "../../functions/store/ProductStore";
import useBillStore from "../../functions/store/billStore";
import useCategoryStore from "../../functions/store/categoryStore";
import convertToBill from "../../functions/conversions/convertToBill";
import useStockStore from "../../functions/store/stockStore";
import { StockProduct } from "../entities/StockProduct";
import { Product } from "../entities/Product";

interface Props {
  stock?: boolean;
  selector?: boolean;
}

const BillingTabItemSelector = ({ stock = false, selector = false }: Props) => {
  const filteredCategories = useCategoryStore((s) => s.filteredCategories);
  const filterCategory = useCategoryStore((s) => s.filterCategory);
  const productsList = useProductStore((s) => s.productsList);
  const searchProducts = useProductStore((s) => s.searchProductsByCategory);
  const addBillEntries = useBillStore((s) => s.addBillEntries);
  const billType = useBillStore((s) => s.billType);
  const toast = useToast();

  if (!!!filteredCategories) return <Spinner />;

  const addBillItem = (item: Product) => {
    addBillEntries(convertToBill(item, billType!));
    toast({
      title: "Item added to bill",
      // description: desc,
      status: "success",
      duration: 1000,
      isClosable: true,
      position: "top",
    });
  };

  const addProduct = useStockStore((s) => s.addProducts);
  const addStockItem = (item: Product) => {
    const newStock: StockProduct = {
      productId: item._id!,
      purchasePrice: parseInt(""),
      stock: 1,

      code: item.code,
      productName: item.itemName,
      unit: item.unit,
      topUnit: item.topUnit,
      quantity: parseInt(""),
      currentUnitValue: 1,
      unitConv: item.unitConv,
      currentUnit: item.unit,
    };
    addProduct(newStock);
  };

  return (
    <>
      {!selector && productsList?.length > 0 ? (
        <>
          <Heading size="md" mb={5}>
            Products
          </Heading>
          <Box maxHeight={300} overflowY="scroll">
            <SimpleGrid columns={1} spacing={3} alignItems="center">
              {productsList.map((product) => (
                <Card
                  variant="outline"
                  background="#a592d3fa"
                  textAlign="center"
                  size="lg"
                  colorScheme="blue"
                  key={product._id}
                  id={`product` + String(product._id)}
                  onClick={() => {
                    stock ? addStockItem(product) : addBillItem(product);
                  }}
                  cursor="pointer"
                >
                  <CardHeader>
                    <Heading
                      size={"sm"}
                      whiteSpace="nowrap"
                      textTransform="capitalize"
                    >
                      {product.itemName}
                    </Heading>
                  </CardHeader>
                </Card>
              ))}
            </SimpleGrid>
          </Box>
        </>
      ) : (
        <>
          <Heading size={"md"} mb={5}>
            Category
          </Heading>
          <Box maxHeight={300} overflowY="scroll">
            <SimpleGrid columns={1} spacing={3} alignItems="center">
              {filteredCategories.length > 0 ? (
                filteredCategories.map((category, index) => {
                  return (
                    <Card
                      size="lg"
                      variant="outline"
                      textAlign="center"
                      key={index}
                      onClick={() => {
                        filterCategory(category._id!);
                        searchProducts(category._id!);
                      }}
                      cursor="pointer"
                    >
                      <CardHeader>
                        <Heading
                          size={"sm"}
                          whiteSpace="nowrap"
                          textTransform="capitalize"
                        >
                          {category.name}
                        </Heading>
                      </CardHeader>
                    </Card>
                  );
                })
              ) : (
                <Heading size="lg">
                  {!selector
                    ? "No items in this catergory!"
                    : "Add products in this category!"}
                </Heading>
              )}
            </SimpleGrid>
          </Box>
        </>
      )}
    </>
  );
};

export default BillingTabItemSelector;
