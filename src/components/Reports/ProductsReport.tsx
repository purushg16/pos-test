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
} from "@chakra-ui/react";
import { useRef } from "react";
import { BsSearch } from "react-icons/bs";
import useProductReport from "../../functions/hooks/useProductReport";
import reportStore from "../../functions/store/reportStore";
import LoadingPage from "../LoadingPage/LoadingPage";
import PaginatedWindow from "../Window/Window";
import ProductReportModal from "./ProductReportModal";

const ProductsReport = () => {
  useProductReport();
  const productReports = reportStore((s) => s.searchedProduct);
  const searchProductById = reportStore((s) => s.searchProductList);
  const filterCritical = reportStore((s) => s.filterCritical);
  const filterNoStock = reportStore((s) => s.filterNoStock);
  const critical = reportStore((s) => s.critical);
  const noStock = reportStore((s) => s.noStock);
  const ref = useRef<HTMLInputElement>(null);

  const productItem = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => {
    const product = productReports![index];

    return (
      <Card size={"sm"} borderRadius={1} mb={1} style={style}>
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
    );
  };

  if (!productReports) return <LoadingPage />;

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
          colorScheme={!critical && !noStock ? "blue" : "gray"}
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
        <Button
          colorScheme={noStock ? "blue" : "gray"}
          onClick={() => filterNoStock(true)}
        >
          No Stock
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
        <Box maxHeight="90vh" overflowY="scroll">
          <PaginatedWindow
            children={productItem}
            height={800}
            length={productReports.length}
            width="100%"
            itemSize={60}
          />
        </Box>
      </Stack>
    </Box>
  );
};

export default ProductsReport;
