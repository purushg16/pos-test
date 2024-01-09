import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuList,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import { BsSearch } from "react-icons/bs";
import useSuppliers from "../../functions/hooks/useSuppliers";
import useSupplierStore from "../../functions/store/suppliersStore";
import SupplierModal from "../Suppliers/SupplierModal";
import PaginatedWindow from "../Window/Window";

const SelectSuppliers = () => {
  const ref = useRef<HTMLInputElement>(null);

  useSuppliers({ type: "GET" });
  const selectSupplier = useSupplierStore((s) => s.selectSupplier);
  const selectedSuppliers = useSupplierStore((s) => s.selectedSuppliers);
  const currentSupplier = useSupplierStore((s) => s.currentSupplier);
  const setCurrentSupplier = useSupplierStore((s) => s.setCurrentSupplier);

  // Custom component for rendering each supplier in the FixedSizeList
  const SupplierItem = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => {
    const supplier = selectedSuppliers![index];

    return (
      <Box style={style}>
        <Button
          width="100%"
          key={index}
          onClick={() => {
            setCurrentSupplier(supplier);
          }}
        >
          {supplier.name}
        </Button>
      </Box>
    );
  };

  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<ChevronDownIcon />}
        width="100%"
        textAlign="left"
      >
        {currentSupplier?.name || "Select Supplier"}
      </MenuButton>

      <MenuList>
        <Box paddingX={2} marginY={2}>
          <InputGroup width="100%">
            <InputLeftElement children={<BsSearch />} />
            <Input
              ref={ref}
              placeholder="Search Items..."
              variant={"filled"}
              borderRadius={7}
              onChange={() => {
                if (ref.current) {
                  selectSupplier(ref.current.value);
                }
              }}
            />
          </InputGroup>
        </Box>

        {!selectedSuppliers ? (
          <Spinner />
        ) : (
          <Box maxHeight={500} overflowY="scroll">
            <VStack marginX={3} gap={3}>
              <SupplierModal />

              <PaginatedWindow
                height={300}
                length={selectedSuppliers.length}
                itemSize={50}
                width="100%"
                children={SupplierItem}
              />
            </VStack>
          </Box>
        )}
      </MenuList>
    </Menu>
  );
};

export default SelectSuppliers;
