import {
  Box,
  Button,
  Card,
  CardHeader,
  HStack,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useRef } from "react";
import { BsSearch } from "react-icons/bs";
import useCategoryies from "../../functions/hooks/useCategories";
import useProducts from "../../functions/hooks/useProducts";
import useProductStore from "../../functions/store/ProductStore";
import LoadingPage from "../LoadingPage/LoadingPage";
import ProductReportModal from "./ProductReportModal";
import useProductReport from "../../functions/hooks/useProductReport";
import reportStore from "../../functions/store/reportStore";

const ProductsReport = () => {
  useProductReport();
  const productReports = reportStore((s) => s.searchedProduct);
  const searchProductById = reportStore((s) => s.searchProductList);
  const filterCritical = reportStore((s) => s.filterCritical);
  const critical = reportStore((s) => s.critical);
  const ref = useRef<HTMLInputElement>(null);

  if (!productReports)
    return (
      <LoadingPage
        children={
          <>
            <Spinner mr={3} />
            <Heading> Loading... </Heading>
          </>
        }
      />
    );

  return (
    <Box paddingX={20} py={3}>
      <Box mb={5} textAlign="right">
        <InputGroup>
          <InputLeftElement children={<BsSearch />} />
          <Input
            focusBorderColor="gray.300"
            ref={ref}
            placeholder="Search Products..."
            variant={"filled"}
            borderRadius={7}
            onChange={() => {
              if (ref.current) searchProductById(ref.current.value);
            }}
          />
        </InputGroup>
      </Box>

      <HStack my={2} mb={5} gap={3}>
        <Heading size="md"> View: </Heading>
        <Button
          colorScheme={!critical ? "blue" : "gray"}
          onClick={() => filterCritical(false)}
        >
          All
        </Button>
        <Button
          colorScheme={critical ? "blue" : "gray"}
          onClick={() => filterCritical(true)}
        >
          Critical
        </Button>
      </HStack>

      <Stack spacing={2}>
        <Card size={"sm"} borderRadius={7}>
          <CardHeader>
            <SimpleGrid columns={4}>
              <Heading size="md"> Code </Heading>
              <Heading size="md"> Product </Heading>
              <Heading size="md"> Stock </Heading>
              <Heading size="md"> Action </Heading>
            </SimpleGrid>
          </CardHeader>
        </Card>
        <Box height="90vh" overflowY="scroll">
          {productReports.map((product, index) => (
            <Card size={"sm"} borderRadius={1} mb={1}>
              <CardHeader>
                <SimpleGrid columns={4} alignItems="center">
                  <Heading size="md"> {product.code} </Heading>
                  <Heading size="md"> {product.itemName} </Heading>

                  <Heading size="md">
                    {product.suppliers?.reduce(
                      (acc, supplier) => acc + supplier.stock,
                      0
                    )
                      ? product.suppliers?.reduce(
                          (acc, supplier) => acc + supplier.stock,
                          0
                        )
                      : 0}
                  </Heading>
                  <Heading size="md">
                    <ProductReportModal product={product} />
                  </Heading>
                </SimpleGrid>
              </CardHeader>
            </Card>
          ))}
        </Box>
      </Stack>
    </Box>
  );
};

export default ProductsReport;
