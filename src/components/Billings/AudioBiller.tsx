import { Icon } from "@chakra-ui/react";
import { BsMic } from "react-icons/bs";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import useProductStore from "../../functions/store/ProductStore";
import { useEffect } from "react";
import { useToast } from "@chakra-ui/react";

interface Props {
  setValue: (val: string) => void;
}

const AudioBiller = ({ setValue }: Props) => {
  const toast = useToast();

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
    if (listening) {
      toast({ title: "Listening...", duration: 5000, position: "top" });
    } else {
      toast.closeAll();
    }
  }, [listening]);

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
