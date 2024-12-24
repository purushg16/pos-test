import { Box, Icon, useColorMode } from "@chakra-ui/react";
import { BsMic } from "react-icons/bs";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import useProductStore from "../../functions/store/ProductStore";
import { useEffect } from "react";
import { useToast } from "@chakra-ui/react";

interface Props {
  setValue: (val: string) => void;
  big?: boolean;
}

const AudioBiller = ({ setValue, big = false }: Props) => {
  const toast = useToast();
  const id = "test-toast";

  const { transcript, listening, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  const searchProductById = useProductStore((s) => s.searchProductByName);

  // Start Tamil speech recognition
  const startListening = () => {
    SpeechRecognition.startListening({
      language: "ta-IN", // Set Tamil as the language
      continuous: false, // Stop listening after a single input
    });
  };

  useEffect(() => {
    if (transcript) {
      setValue(transcript);
      searchProductById(transcript); // Search product based on recognized text
    }
  }, [transcript]);

  useEffect(() => {
    if (listening && !toast.isActive(id)) {
      toast({
        id,
        title: "Listening...",
        duration: 5000,
        position: "top",
      });
    }
  }, [listening]);

  const { colorMode } = useColorMode();

  if (big)
    return (
      <Box
        cursor="pointer"
        bottom={-6}
        px={4}
        py={3}
        bg="yellow.300"
        _hover={{ bg: "yellow.500" }}
        pos="absolute"
        border="1px solid"
        borderRadius="full"
        aria-label="audio-biller-mdl-btn"
        onClick={() =>
          browserSupportsSpeechRecognition
            ? startListening()
            : toast({
                status: "error",
                title: "Not Supported on this browser!",
                position: "top",
              })
        }
        color={colorMode === "dark" ? "black" : "white"}
        sx={{
          transition: "box-shadow 0.3s, background-color 0.3s",
          "&.mic-on": {
            boxShadow: "0 0 15px 3px rgba(255, 0, 0, 0.6)",
            bg: "red.500",
            color: "white",
          },
        }}
        className={listening ? "mic-on" : ""}
      >
        <Icon as={BsMic} boxSize={8} />
      </Box>
    );

  return (
    <>
      <Icon
        as={BsMic}
        onClick={() =>
          browserSupportsSpeechRecognition
            ? startListening()
            : toast({
                status: "error",
                title: "Not Supported on this browser!",
                position: "top",
              })
        }
        opacity={listening || !browserSupportsSpeechRecognition ? 0.5 : 1}
        cursor="pointer"
      />
    </>
  );
};

export default AudioBiller;
