import { ButtonGroup, Button } from "@chakra-ui/react";
import PaginatedWindow from "../Window/Window";
import { Product } from "../entities/Product";
import { useState, useEffect } from "react";

interface Props {
  callback: (item: Product) => void;
  productList: Product[];
  height?: number;
}

const PaginatedProductResult = ({ callback, productList, height }: Props) => {
  const itemRenderer = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => {
    const itemStyle: React.CSSProperties = {
      ...style,
      padding: 10,
    };

    const item = productList![index];
    return (
      <ButtonGroup
        key={item._id}
        size="md"
        isAttached
        variant="solid"
        width="100%"
        style={itemStyle}
      >
        <Button padding={2} fontSize="small">
          {item.code}
        </Button>
        <Button
          variant="outline"
          textAlign="left"
          paddingY={2}
          width="100%"
          key={item._id}
          onClick={() => callback(item)}
        >
          {item.itemName}
        </Button>
      </ButtonGroup>
    );
  };

  const [menuListMaxHeight, setMenuListMaxHeight] = useState(0);
  useEffect(() => {
    // Calculate available body height and set it as the maxHeight for MenuList
    const calculateMaxHeight = () => {
      const windowHeight =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight;
      const maxHeightPercentage = 0.35;
      setMenuListMaxHeight(windowHeight * maxHeightPercentage);
    };

    // Initial calculation
    calculateMaxHeight();

    // Recalculate on window resize
    window.addEventListener("resize", calculateMaxHeight);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", calculateMaxHeight);
    };
  }, []);

  return (
    <PaginatedWindow
      children={itemRenderer}
      height={height || menuListMaxHeight}
      length={productList.length}
      width="100%"
      itemSize={50}
    />
  );
};

export default PaginatedProductResult;
