import { DownloadIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Checkbox,
  Heading,
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
import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { convertDate } from "../../functions/conversions/dateConversion";
import { useSettlePending } from "../../functions/hooks/useReview";
import { PendingBill } from "../../functions/services/review-client";
import PendingBillContent from "./PendingBillContent";

interface Props {
  entry: PendingBill;
}

const PendingModal = ({ entry }: Props) => {
  const [itemHandled, setHandled] = useState(entry.itemHandled);
  const [itemDelivered, setDelivered] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const { mutate } = useSettlePending((yes) => setLoading(yes), entry, {
    billNo: entry.billNo,
    itemHandled,
    delivery: itemDelivered,
  });

  const onSumbit = () => {
    setLoading(true);
    mutate({ billNo: entry.billNo, itemHandled, delivery: itemDelivered });
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <div style={{ display: "none" }}>
        <PendingBillContent entry={entry} ref={componentRef} />
      </div>

      <Button onClick={onOpen} colorScheme="teal" mr={2}>
        Resolve
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Bill Number: {entry.billNo}
            <Text fontSize="sm" color="gray">
              Created at: {convertDate(entry.createdAt)}
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box mb={10}>
              <SimpleGrid columns={2} mb={5}>
                <Text> Customer Name: </Text>
                <Heading size="md"> {entry.customer[0].name} </Heading>
              </SimpleGrid>
              <SimpleGrid columns={2}>
                <Text> Bill Amout: </Text>
                <Heading size="md">
                  <small>₹</small> {entry.billAmount}
                </Heading>
              </SimpleGrid>
            </Box>

            <Box>
              <SimpleGrid columns={1} mb={5} spacing={5}>
                {entry.itemHandled && (
                  <Checkbox
                    colorScheme="red"
                    isChecked={true}
                    size="lg"
                    isDisabled
                  >
                    Item Already Handled
                  </Checkbox>
                )}
                {!entry.itemHandled && (
                  <Checkbox
                    size="lg"
                    isChecked={itemHandled}
                    onChange={() => {
                      setHandled(!itemHandled);
                    }}
                  >
                    Item Handled
                  </Checkbox>
                )}

                {entry.delivery && (
                  <Checkbox
                    colorScheme="red"
                    isChecked={true}
                    size="lg"
                    isDisabled
                  >
                    Item Already Delivered
                  </Checkbox>
                )}

                {!entry.delivery && (
                  <Checkbox
                    size="lg"
                    isChecked={itemDelivered}
                    onChange={() => {
                      setDelivered(!itemDelivered);
                    }}
                  >
                    Item Delivered
                  </Checkbox>
                )}
              </SimpleGrid>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" variant="ghost" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              colorScheme="blue"
              onClick={onSumbit}
              isLoading={isLoading}
              mr={3}
            >
              Resolve
            </Button>
            <Button colorScheme="blue" onClick={handlePrint}>
              <DownloadIcon />
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PendingModal;
