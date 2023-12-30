import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import useStock from "../../functions/hooks/useStock";
import useSuppliers from "../../functions/hooks/useSuppliers";
import useStockStore from "../../functions/store/stockStore";
import useSupplierStore from "../../functions/store/suppliersStore";
import SelectSuppliers from "./SelectSuppliers";

const StockDetails = () => {
  const Billref = useRef<HTMLInputElement>(null);
  const currentSupplier = useSupplierStore((s) => s.currentSupplier);
  const billNo = useStockStore((s) => s.billNo);
  const setBillNo = useStockStore((s) => s.setBillNo);

  const total = useStockStore((s) => s.total);
  const stockProducts = useStockStore((s) => s.stockProducts);
  const [canSubmit, setSubmit] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (total && stockProducts && !!billNo && !!currentSupplier)
      setSubmit(true);
    else setSubmit(false);
  }, [total, stockProducts, billNo, currentSupplier]);

  useSuppliers({ type: "GET" });

  const newStock = {
    supplierId: currentSupplier?._id!,
    amount: total!,
    billNo: billNo!,
    products: stockProducts.map((product) => {
      return {
        productId: product.productId!,
        purchasePrice: parseFloat(
          (product.purchasePrice / product.currentUnitValue!).toFixed(2)
        ),
        stock: product.stock!,
        selectedUnit: product.currentUnitValue!,
      };
    }),
  };

  const { refetch } = useStock({ stock: newStock });

  const toast = useToast();

  const onSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    setLoading(true);

    console.log(newStock);

    refetch().then((res) => {
      const { data, isError, isSuccess } = res;

      if (isSuccess) {
        toast({
          title: data.msg,
          status: "success",
          duration: 1000,
          isClosable: true,
          position: "top",
        });
        setLoading(false);
      } else if (isError) {
        toast({
          title: data.message,
          status: "error",
          duration: 1000,
          isClosable: true,
          position: "top",
        });
      }
    });
  };

  return (
    <Flex flexDirection={"column"} gap={2} height="95vh">
      <Box padding={2} border="1px solid #80808030" borderRadius={7}>
        <Heading size="1xl" mb={2}>
          Supplier Name
        </Heading>
        <SelectSuppliers />
        {/* <Menu>
          <MenuButton
            as={Button}
            rightIcon={<ChevronDownIcon />}
            width="100%"
            textAlign="left"
          >
            {currentSupplier?.name || "Select Supplier"}
          </MenuButton>

          <MenuList>
            <Box paddingX={2} marginY={2}>
              <InputGroup width="100%">
                <InputLeftElement children={<BsSearch />} />
                <Input
                  ref={ref}
                  placeholder="Search Items..."
                  variant={"filled"}
                  borderRadius={7}
                  onChange={() => {
                    if (ref.current) {
                      selectSupplier(ref.current.value);
                    }
                  }}
                />
              </InputGroup>
            </Box>

            {!selectedSuppliers ? (
              <Spinner />
            ) : (
              <Box maxHeight={500} overflowY="scroll">
                <VStack marginX={3} gap={3}>
                  <SupplierModal />

                  {selectedSuppliers?.map(
                    (supplier: Supplier, index: number) => (
                      <Button
                        width="100%"
                        marginX={2}
                        key={index}
                        onClick={() => {
                          setCurrentSupplier(supplier);
                        }}
                      >
                        {supplier.name}
                      </Button>
                    )
                  )}
                </VStack>
              </Box>
            )}
          </MenuList>
        </Menu> */}

        <Box my={5}>
          <Heading size="1xl" mb={2}>
            Bill Number
          </Heading>

          <InputGroup width="100%">
            <Input
              ref={Billref}
              placeholder="Enter Bill Number"
              variant={"filled"}
              borderRadius={7}
              onChange={() => {
                setBillNo(parseInt(Billref.current?.value!));
              }}
            />
          </InputGroup>
        </Box>

        <Box my={5}>
          <Heading size="1xl" mb={2}>
            Total Amount
          </Heading>

          <InputGroup width="100%">
            <Input
              readOnly
              isDisabled
              placeholder="Enter Bill Number"
              variant={"filled"}
              borderRadius={7}
              value={total?.toString()}
            />
          </InputGroup>
        </Box>

        <Button
          colorScheme="blue"
          width="100%"
          isLoading={loading}
          isDisabled={!canSubmit}
          onClick={(event) => {
            onSubmit(event);
          }}
        >
          Add Stock
        </Button>
      </Box>
    </Flex>
  );
};

export default StockDetails;
