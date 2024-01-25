import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useBilling from "../../functions/hooks/useBilling";
import useBillStore from "../../functions/store/billStore";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import PrintContent from "../BillPrinter/PrintContent";
import { AxiosError } from "axios";
import useCustomerStore from "../../functions/store/customerStore";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export interface InternalError {
  message: string;
}

const PPartial = {
  "UPI/Cash": "no-credit",
  "Partial Credit": "partial-credit",
  Credit: "credit",
};

const Partial = ["No Credit", "Partial Credit", "Credit"];

export default function BillPaymentModal({ isOpen, onClose }: Props) {
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const partialPayment = useBillStore((s) => s.partialPayment);
  const paymentMode = useBillStore((s) => s.paymentMode);
  const partialAmount = useBillStore((s) => s.partialAmount);
  const setPartialPayment = useBillStore((s) => s.setPartialPayment);
  const setPartialAmount = useBillStore((s) => s.setPartialAmount);
  const setPaymentMode = useBillStore((s) => s.setPaymentMode);
  const [isLoading, setLoading] = useState(false);
  const clearEntries = useBillStore((s) => s.clearEntries);
  const setBillNo = useBillStore((s) => s.setBillNo);
  const billNo = useBillStore((s) => s.billNo);
  const setCurrentCustomer = useCustomerStore((s) => s.setCurrentCustomer);
  const setBillType = useBillStore((s) => s.setBillType);

  const { refetch } = useBilling({ type: "POST" })!;
  const toast = useToast();

  const onSubmitBill = () => {
    setLoading(true);
    refetch().then((res) => {
      const { data, isSuccess, isError } = res;

      if (isSuccess) {
        toast({
          title: data.msg,
          status: "success",
          duration: 1000,
          isClosable: true,
          position: "top",
        });
        setLoading(false);
        onClose();
        setBillNo(data.billNo);
        setCurrentCustomer(undefined);
        setBillType(undefined);

        if (!!billNo) handlePrint();
      } else if (isError) {
        setLoading(false);
        toast({
          title: (res.error as AxiosError<InternalError>).response?.data
            .message,
          status: "error",
          duration: 1000,
          isClosable: true,
          position: "top",
        });
      }
    });
  };

  useEffect(() => {
    if (!!billNo) {
      handlePrint();
      clearEntries();
      setBillNo(undefined);
    }
  }, [billNo]);

  return (
    <>
      <div style={{ display: "none" }}>
        <PrintContent ref={componentRef} />
      </div>

      <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader> Payment Method </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack>
              <SimpleGrid width="100%" columns={2} alignItems="baseline" my={2}>
                <Text> Payment: </Text>
                <Menu>
                  <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                    {!!partialPayment
                      ? partialPayment === "no-credit"
                        ? "UPI/Cash"
                        : partialPayment
                      : "Not Selected"}
                  </MenuButton>

                  <MenuList>
                    {Partial.map((p, index) => (
                      <MenuItem
                        key={index}
                        onClick={() =>
                          setPartialPayment(p.replace(" ", "-").toLowerCase())
                        }
                      >
                        {p === "No Credit" ? "UPI/Cash" : p}
                      </MenuItem>
                    ))}
                  </MenuList>
                </Menu>
              </SimpleGrid>

              {partialPayment === "partial-credit" && (
                <SimpleGrid
                  width="100%"
                  columns={2}
                  alignItems="baseline"
                  my={2}
                >
                  <Text> Amount Paid: </Text>
                  <InputGroup>
                    <InputLeftAddon children="Rs." />
                    <Input
                      type="number"
                      placeholder="Amount"
                      value={partialAmount || parseFloat("")}
                      onChange={(event) => {
                        setPartialAmount(parseFloat(event.target.value));
                      }}
                    />
                  </InputGroup>
                </SimpleGrid>
              )}

              {partialPayment !== "credit" && (
                <SimpleGrid
                  width="100%"
                  columns={2}
                  alignItems="baseline"
                  my={2}
                >
                  <Text> Payment Mode: </Text>
                  <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                      {paymentMode || "Not Selected"}
                    </MenuButton>
                    <MenuList>
                      <MenuItem
                        onClick={() => {
                          setPaymentMode("upi");
                        }}
                      >
                        UPI
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          setPaymentMode("cash");
                        }}
                      >
                        Cash
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </SimpleGrid>
              )}
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} mr={3}>
              Back
            </Button>
            <Button
              colorScheme="blue"
              isLoading={isLoading}
              loadingText="Please wait..."
              isDisabled={
                (paymentMode && partialPayment === "no-credit") ||
                partialPayment === "credit"
                  ? false
                  : paymentMode && partialPayment && partialAmount
                  ? false
                  : true
              }
              onClick={() => {
                onSubmitBill();
              }}
            >
              Perfom Bill
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
