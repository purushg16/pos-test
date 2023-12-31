import { BellIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  Icon,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Text,
  useColorMode,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios, { AxiosResponse } from "axios";
import { IconType } from "react-icons";
import {
  BsBox,
  BsCalculator,
  BsFullscreen,
  BsJournalCheck,
  BsKanban,
  BsPersonPlusFill,
  BsToggles2,
} from "react-icons/bs";
import { FaPeopleCarry } from "react-icons/fa";
import {
  MdCategory,
  MdClose,
  MdConstruction,
  MdDarkMode,
  MdDeleteForever,
  MdLightMode,
  MdLogout,
  MdOutlineAccountTree,
  MdOutlineFactCheck,
  MdOutlineMoney,
  MdRadioButtonChecked,
  MdRadioButtonUnchecked,
} from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import useTokenStore from "../../functions/store/token";
import { MenuCard } from "./MenuCard";

interface Props {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const routes: {
  [key: string]: [route: string, icon: IconType, desc: string[]];
} = {
  Billing: ["/", BsCalculator, ["Perform Billing"]],
  Attendence: ["/attendance", BsJournalCheck, ["Manage Attendence"]],
  Reports: ["/reports", MdOutlineAccountTree, ["Review Reports"]],
  "Add Product": ["/addProduct", BsBox, ["Add New Products"]],
  "Add Stock": ["/addStock", BsKanban, ["Add stock to existing Products Data"]],
  "Add Category": ["/addCategory", MdCategory, ["Add New Categories"]],

  "Add Customer": ["/addCustomer", BsPersonPlusFill, ["Add New Customers"]],
  "Add Supplier": ["/addSupplier", FaPeopleCarry, ["Add New Suppliers"]],

  "Add Employee": ["/addEmployee", MdConstruction, ["Add New Employee"]],
  "Pay In": ["/addPayIn", MdRadioButtonChecked, ["Perform Pay In"]],
  "Pay Out": ["/addPayOut", MdRadioButtonUnchecked, ["Perform Pay Out"]],
  "Expense Management": [
    "/addExpense",
    MdOutlineFactCheck,
    ["Manage Expenses"],
  ],
  "Drawings Management": ["/addDrawings", MdOutlineMoney, ["Manage Drawings"]],
};

export default function MainDrawer({ isOpen, onClose }: Props) {
  const { toggleColorMode, colorMode } = useColorMode();
  const currentUserType = useTokenStore((s) => s.currentUserType);

  const navigate = useNavigate();

  const logout = () => {
    onClose();
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <Drawer
        placement={"bottom"}
        onClose={onClose}
        isOpen={isOpen}
        size={"full"}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton size="lg" />
          <DrawerHeader>
            <SimpleGrid columns={2} alignItems="baseline">
              <Heading>
                Menu
                <Button
                  ml={5}
                  colorScheme="teal"
                  onClick={toggleColorMode}
                  size="lg"
                >
                  {colorMode === "dark" ? <MdDarkMode /> : <MdLightMode />}
                </Button>
                <Link to="/reviewBills" onClick={onClose}>
                  <Button ml={5} colorScheme="yellow" size="lg">
                    <BellIcon />
                  </Button>
                </Link>
                <Button
                  onClick={toggleFullScreen}
                  size="lg"
                  ml={5}
                  colorScheme="teal"
                >
                  <BsFullscreen />
                </Button>
                <Button onClick={logout} size="lg" ml={5} colorScheme="red">
                  <MdLogout />
                </Button>
              </Heading>
            </SimpleGrid>
          </DrawerHeader>

          <DrawerBody padding={10}>
            <SimpleGrid columns={4} spacing={10} padding={10}>
              {Object.keys(routes).map((route, index) => (
                <Box
                  boxShadow="dark-lg"
                  borderRadius={20}
                  key={index}
                  pointerEvents={
                    route === "Reports" && currentUserType !== "admin"
                      ? "none"
                      : "all"
                  }
                  opacity={
                    route === "Reports" && currentUserType !== "admin" ? 0.4 : 1
                  }
                >
                  <Link to={routes[route][0]} onClick={onClose}>
                    <MenuCard
                      title={route}
                      icon={routes[route][1]}
                      desc={routes[route][2]}
                    />
                  </Link>
                </Box>
              ))}

              <ConfirmModal />
              {/* <Box
                boxShadow="dark-lg"
                borderRadius={20}
                cursor="pointer"
                // onClick={toggleColorMode}
                background="teal.700"
              >
                <SimpleGrid padding={10} gap={8}>
                  <Icon as={MdDeleteForever} boxSize={12} />
                  <Box flex={1}>
                    <Heading size="md"> Clear Transaction </Heading>
                    <Text color="gray" mt={1}>
                      Delete All Transactions
                    </Text>
                  </Box>
                </SimpleGrid>
              </Box> */}

              <Box
                boxShadow="dark-lg"
                borderRadius={20}
                cursor="pointer"
                onClick={toggleColorMode}
                background="blue.800"
              >
                <SimpleGrid padding={10} gap={8}>
                  <Icon
                    as={BsToggles2}
                    boxSize={12}
                    transform={"rotate(-10deg)"}
                  />
                  <Box flex={1}>
                    <Heading size="md"> Toggle Theme </Heading>
                    <Text color="gray" mt={1}>
                      Switch between themes
                    </Text>
                  </Box>
                </SimpleGrid>
              </Box>

              <Button
                height="100%"
                boxShadow="dark-lg"
                borderRadius={20}
                onClick={onClose}
                colorScheme="red"
              >
                <Icon as={MdClose} boxSize={20} />
              </Button>
            </SimpleGrid>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

function toggleFullScreen() {
  var doc = window.document;
  var docEl = doc.documentElement;

  var requestFullScreen = docEl.requestFullscreen;
  // ||
  // docEl.mozRequestFullScreen ||
  // docEl.webkitRequestFullScreen ||
  // docEl.msRequestFullscreen;
  var cancelFullScreen = doc.exitFullscreen;
  // ||
  // doc.mozCancelFullScreen ||
  // doc.webkitExitFullscreen ||
  // doc.msExitFullscreen;

  if (
    !doc.fullscreenElement
    // &&
    // !doc.mozFullScreenElement &&
    // !doc.webkitFullscreenElement &&
    // !doc.msFullscreenElement
  ) {
    requestFullScreen.call(docEl);
  } else {
    cancelFullScreen.call(doc);
  }
}

interface Response {
  msg: string;
}

function ConfirmModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const deleteAllTransaction = () =>
    axios
      .post("https://padma-stores.onrender.com/settings/deleteTransaction")
      .then((res) => {
        toast({
          title: (res as AxiosResponse<Response>).data.msg,
          status: "success",
          duration: 1000,
          isClosable: true,
          position: "top",
        });
      });

  return (
    <>
      <Box
        boxShadow="dark-lg"
        borderRadius={20}
        cursor="pointer"
        onClick={onOpen}
        background="teal.700"
      >
        <SimpleGrid padding={10} gap={8}>
          <Icon as={MdDeleteForever} boxSize={12} />
          <Box flex={1}>
            <Heading size="md"> Clear Transaction </Heading>
            <Text color="gray" mt={1}>
              Delete All Transactions
            </Text>
          </Box>
        </SimpleGrid>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader> Confirm </ModalHeader>
          <ModalBody></ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={deleteAllTransaction}>
              Delete All Transaction
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
