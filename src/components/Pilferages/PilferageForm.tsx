import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputRightAddon,
  InputRightElement,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useProducts from "../../functions/hooks/useProducts";
import BillingItemIdSelector from "../Billings/BillingItemIdSelector";
import { PostPilferage } from "../entities/Pilferage";
import useProductStore from "../../functions/store/ProductStore";
import { usePostPilferage } from "../../functions/hooks/usePilferage";

const PilferageForm = () => {
  useProducts({ type: "GET" });
  const selectedProduct = useProductStore((s) => s.selectedProduct);

  const [isLoading, setLoading] = useState(false);
  const [newPilferage, editPilferage] = useState<PostPilferage>({
    productId: "",
    quantity: parseInt(""),
    reason: "",
  });

  useEffect(() => {
    editPilferage({ ...newPilferage, productId: selectedProduct?._id! });
  }, [selectedProduct]);

  const { mutate } = usePostPilferage((yes) => setLoading(yes));
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    mutate(newPilferage);
    editPilferage({
      productId: "",
      quantity: parseInt(""),
      reason: "",
    });
  };

  return (
    <Flex alignItems="center" justifyContent="center" height="100%">
      <Box width={600}>
        <Heading> Add Pilferage </Heading>
        <form onSubmit={(event) => onSubmit(event)}>
          <SimpleGrid columnGap={10}>
            <Flex flexDirection="column" gap={10} marginY={7}>
              <SimpleGrid columns={2}>
                <Text fontSize="xl"> Select Product: </Text>
                <BillingItemIdSelector pilferage />
              </SimpleGrid>

              <SimpleGrid columns={2}>
                <Text fontSize="xl"> Quantity: </Text>
                <InputGroup>
                  <Input
                    type="number"
                    value={newPilferage.quantity}
                    onChange={(event) => {
                      editPilferage({
                        ...newPilferage,
                        quantity: parseInt(event.target.value),
                      });
                    }}
                  />
                  <InputRightAddon children={selectedProduct?.unit} />
                </InputGroup>
              </SimpleGrid>

              <SimpleGrid columns={2}>
                <Text fontSize="xl"> Reason: </Text>
                <Input
                  value={newPilferage.reason}
                  onChange={(event) => {
                    editPilferage({
                      ...newPilferage,
                      reason: event.target.value,
                    });
                  }}
                />
              </SimpleGrid>
            </Flex>
          </SimpleGrid>

          <Button
            type="submit"
            colorScheme="teal"
            width="100%"
            isLoading={isLoading}
          >
            Submit
          </Button>
        </form>
      </Box>
    </Flex>
  );
};

export default PilferageForm;
