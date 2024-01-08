import React from "react";
import PaginatedWindow from "./Window";
import { Tbody } from "@chakra-ui/react";

interface VirtualizedTbodyProps {
  length: number;
  itemSize: number;
  children: (props: {
    index: number;
    style: React.CSSProperties;
  }) => React.ReactElement | null;
  height: number;
  width?: number | string;
}

const PaginatedTable = ({
  length,
  itemSize,
  children,
  height,
  width = "100%",
}: VirtualizedTbodyProps) => {
  return (
    <Tbody>
      <PaginatedWindow
        length={length}
        itemSize={itemSize}
        children={children}
        height={height}
        width={width}
      />
    </Tbody>
  );
};

export default PaginatedTable;
