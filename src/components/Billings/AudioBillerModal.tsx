import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  IconButton,
  Icon,
  Box,
  useToast,
  VStack,
  Heading,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { BsMic } from "react-icons/bs";
import convertToBill from "../../functions/conversions/convertToBill";
import useBillStore from "../../functions/store/billStore";
import { Product } from "../entities/Product";
import PaginatedProductResult from "./PaginatedProductResult";
import useProductStore from "../../functions/store/ProductStore";
import AudioBiller from "./AudioBiller";
import { useState } from "react";
import useCustomerStore from "../../functions/store/customerStore";
import useEmployeStore from "../../functions/store/employeStore";
import useGSTStore from "../../functions/store/gstStore";

const AudioBillerModal = () => {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [transcript, setTranscript] = useState<string>("");

  const searchedProductList = useProductStore((s) => s.searchedProductList);
  const addBillEntries = useBillStore((s) => s.addBillEntries);
  const billType = useBillStore((s) => s.billType);
  const searchProductByName = useProductStore((s) => s.searchProductByName);

  const currentBiller = useEmployeStore((s) => s.currentBiller);
  const currentHandler = useEmployeStore((s) => s.currentHandler);
  const currentGstin = useGSTStore((s) => s.currentGstin);
  const currentCustomer = useCustomerStore((s) => s.currentCustmer);

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

  return (
    <>
      <IconButton
        size="lg"
        borderRadius="full"
        ml={4}
        aria-label="audio-biller-mdl-btn"
        icon={<Icon as={BsMic} />}
        onClick={() =>
          currentBiller &&
          currentHandler &&
          currentGstin &&
          billType &&
          !!currentCustomer &&
          onOpen()
        }
        colorScheme="yellow"
        isDisabled={
          !(
            currentBiller &&
            currentHandler &&
            currentGstin &&
            billType &&
            currentCustomer
          )
        }
      />

      <Modal
        isOpen={
          !!(
            currentBiller &&
            currentHandler &&
            currentGstin &&
            billType &&
            currentCustomer
          ) && isOpen
        }
        onClose={onClose}
        size="xl"
        closeOnEsc={false}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader> Search Product </ModalHeader>
          <ModalCloseButton />
          <ModalBody minH={320}>
            <VStack align="start" gap={0}>
              <Heading fontSize="md" fontWeight="normal" color="gray">
                Search Result...{" "}
                <span
                  style={{
                    fontSize: "20px",
                    fontWeight: 600,
                    color: colorMode === "dark" ? "white" : "black",
                  }}
                >
                  {" "}
                  {!!transcript && transcript}{" "}
                </span>
              </Heading>
              {searchedProductList && searchedProductList.length === 0 && (
                <Text> No Products found! </Text>
              )}
              {searchedProductList && searchedProductList.length > 0 && (
                <PaginatedProductResult
                  callback={(item) => {
                    addBillItem(item);
                    searchProductByName("");
                  }}
                  productList={searchedProductList}
                  height={320}
                />
              )}
            </VStack>
          </ModalBody>

          <ModalFooter pos="relative" justifyContent="center" mt={8}>
            <AudioBiller
              setValue={(val) => {
                searchProductByName(val);
                setTranscript(val);
              }}
              big
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AudioBillerModal;
