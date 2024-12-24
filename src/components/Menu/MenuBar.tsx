import { Box, Button, ButtonGroup, useDisclosure } from "@chakra-ui/react";
import MainDrawer from "./MainDrawer";
import { Link } from "react-router-dom";
import { BsFullscreen } from "react-icons/bs";
import AudioBillerModal from "../Billings/AudioBillerModal";

export const MenuBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      zIndex={999}
      position="absolute"
      transform="translateX(-50%)"
      left="50%"
      bottom={0}
      width="100%"
      display="flex"
      justifyContent="center"
      borderBottom="6px solid teal"
    >
      <ButtonGroup size={"sm"} isAttached>
        <Button
          onClick={() => onOpen()}
          borderRadius={"20px 0 0 0"}
          size={"lg"}
          colorScheme="teal"
        >
          Menu
        </Button>
        <Link to="/">
          <Button borderRadius={"0 0 0 0"} size={"lg"} colorScheme="gray">
            Billing
          </Button>
        </Link>

        <Button
          borderRadius={"0 20px 0 0"}
          size={"lg"}
          colorScheme="blue"
          onClick={toggleFullScreen}
        >
          <BsFullscreen />
        </Button>
      </ButtonGroup>

      <AudioBillerModal />

      <MainDrawer onOpen={onOpen} isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

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
