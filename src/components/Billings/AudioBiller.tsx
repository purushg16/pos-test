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

  useEffect(() => {
    if (transcript) {
      console.log(transcript);
      setValue(transcript);
      searchProductById(transcript);
    }
  }, [transcript]);

  useEffect(() => {
    if (listening)
      toast({ title: "Listening...", duration: 60 * 5000, position: "top" });
    else toast.closeAll();
  }, [listening]);

  return (
    <>
      <Icon
        as={BsMic}
        onClick={() =>
          browserSupportsSpeechRecognition
            ? SpeechRecognition.startListening()
            : toast({
                status: "error",
                title: "Not Supported on this browser!",
                position: "top",
              })
        }
        opacity={listening || !browserSupportsSpeechRecognition ? 0.5 : 1}
      />
    </>
  );
};

export default AudioBiller;
