import { useQuery } from "@tanstack/react-query";
import { Drawing } from "../../components/entities/Drawing";
import drawingClient from "../services/drawing-client";

const useDrawing = (drawing: Drawing) =>
  useQuery({
    queryKey: ["party", "expense"],
    queryFn: () => drawingClient.postData(drawing).then((res) => res),
    enabled: false,
  });

export default useDrawing;
