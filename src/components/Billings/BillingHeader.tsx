import { Box, Button, Flex, Spacer, Text } from "@chakra-ui/react";
import { useState } from "react";
import { BsCartPlusFill } from "react-icons/bs";
import { FaFileImport } from "react-icons/fa";
import useAddCart from "../../functions/hooks/useAddCart";
import useCategoryies from "../../functions/hooks/useCategories";
import useGetCart from "../../functions/hooks/useGetCart";
import useProducts from "../../functions/hooks/useProducts";
import useBillStore from "../../functions/store/billStore";
import useCustomerStore from "../../functions/store/customerStore";
import useEmployeStore from "../../functions/store/employeStore";
import useGSTStore from "../../functions/store/gstStore";
import useStockStore from "../../functions/store/stockStore";
import AddTemplate from "./AddTemplate";
import Import from "./Import";
import ReverseBill from "./ReverseBill";

interface Props {
  stock?: boolean;
  billing?: boolean;
  small?: boolean;
}

export const BillingHeader = ({
  stock = false,
  billing = false,
  small = false,
}: Props) => {
  const clearEntries = useBillStore((s) => s.clearEntries);
  const BillEntries = useBillStore((s) => s.BillEntries);
  const [cartLoading, setCartLoading] = useState(false);

  const stockProducts = useStockStore((s) => s.stockProducts);
  const clearStock = useStockStore((s) => s.clearStock);
  useCategoryies({ type: "GET" });
  useProducts({ type: "GET" });

  const billType = useBillStore((s) => s.billType);
  const currentCustomer = useCustomerStore((s) => s.currentCustmer);
  const currentBiller = useEmployeStore((s) => s.currentBiller);
  const currentHandler = useEmployeStore((s) => s.currentHandler);
  const currentGstin = useGSTStore((s) => s.currentGstin);
  const addCart = useAddCart((yes) => setCartLoading(yes));

  const addToCart = () => {
    setCartLoading(true);
    const products = BillEntries.map((entry) => {
      return {
        productId: entry._id,
        stock: entry.quantity,
        selectedUnit: entry.currentUnitValue!,
      };
    });

    addCart.mutate({
      products: products,
      customer: currentCustomer?._id!,
    });
  };

  const { refetch } = useGetCart(currentCustomer?._id!);
  return (
    <Flex gap={5} alignItems="center" width="100%">
      {/* <Heading size={"1xl"}> Select Products: </Heading> */}
      {/* <BillTabContainer small={small} stock={stock} billing={billing} /> */}
      {/* <BillingItemIdSelector stock={stock} /> */}

      <Box>
        <Button
          isLoading={cartLoading}
          colorScheme="green"
          onClick={addToCart}
          isDisabled={
            !(
              currentCustomer &&
              billType &&
              currentBiller &&
              currentHandler &&
              currentGstin &&
              BillEntries.length > 0
            )
          }
        >
          <BsCartPlusFill />
          <Text ml={2}>Add To Cart</Text>
        </Button>
      </Box>

      <Box>
        <Button
          background="green.300"
          colorScheme="green"
          isDisabled={
            !(
              currentCustomer &&
              billType &&
              currentBiller &&
              currentHandler &&
              currentGstin
            )
          }
          onClick={() => {
            console.log("clicked");
            refetch();
          }}
        >
          <FaFileImport />
          <Text ml={2}> Import Cart </Text>
        </Button>
      </Box>

      <Box>
        <AddTemplate />
      </Box>

      <Box>
        <Import />
      </Box>

      <Box>
        <ReverseBill />
      </Box>

      <Spacer />

      {!stock && (
        <Box>
          {BillEntries.length > 0 && (
            <Button
              colorScheme="red"
              alignSelf="end"
              variant="outline"
              onClick={() => {
                clearEntries();
              }}
            >
              Clear
            </Button>
          )}
        </Box>
      )}

      {stock && (
        <Box>
          {stockProducts.length > 0 && (
            <Button
              colorScheme="red"
              alignSelf="end"
              variant="outline"
              onClick={clearStock}
            >
              Clear
            </Button>
          )}
        </Box>
      )}
    </Flex>
  );
};
