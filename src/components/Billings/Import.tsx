import { AddIcon, DownloadIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Grid,
  Heading,
  IconButton,
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
import useCustomerStore from "../../functions/store/customerStore";
import { useGetTemplates } from "../../functions/hooks/useTemplates";
import useBillStore from "../../functions/store/billStore";
import convertToBill from "../../functions/conversions/convertToBill";
import useEmployeStore from "../../functions/store/employeStore";
import useGSTStore from "../../functions/store/gstStore";

const Import = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data } = useGetTemplates();
  const addBillEntry = useBillStore((s) => s.addBillEntries);
  const billType = useBillStore((s) => s.billType);
  const currentCustomer = useCustomerStore((s) => s.currentCustmer);
  const currentBiller = useEmployeStore((s) => s.currentBiller);
  const currentHandler = useEmployeStore((s) => s.currentHandler);
  const currentGstin = useGSTStore((s) => s.currentGstin);

  return (
    <>
      <Button
        onClick={onOpen}
        colorScheme="blue"
        background="blue.300"
        isDisabled={
          !(
            currentCustomer &&
            billType &&
            currentBiller &&
            currentHandler &&
            currentGstin
          )
        }
      >
        <DownloadIcon />
        <Text ml={2}>Import Template </Text>
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader> Import Template </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SimpleGrid columns={1} spacing={2} rowGap={5}>
              {data?.map((template) => (
                <Grid
                  pb={3}
                  mb={3}
                  templateColumns={"1fr 10%"}
                  borderBottom="1px solid #666678"
                >
                  <Heading> {template.templateName} </Heading>
                  <IconButton
                    onClick={() => {
                      template.product.map((product) =>
                        addBillEntry(
                          convertToBill(product.productId, billType!)
                        )
                      );
                    }}
                    colorScheme="green"
                    aria-label="Add from templates"
                    icon={<AddIcon />}
                  />
                </Grid>
              ))}
            </SimpleGrid>
          </ModalBody>

          <ModalFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Import;
