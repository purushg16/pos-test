import { FixedSizeList, ListChildComponentProps } from "react-window";

interface Props {
  length: number;
  children: (props: ListChildComponentProps) => React.ReactElement | null;
  height: number;
  width?: number | string;
  itemSize: number;
}

const PaginatedWindow = ({
  length,
  children,
  height,
  width,
  itemSize,
}: Props) => {
  return (
    <FixedSizeList
      height={height}
      itemCount={length}
      itemSize={itemSize}
      width={width!}
    >
      {children}
    </FixedSizeList>
  );
};

export default PaginatedWindow;
