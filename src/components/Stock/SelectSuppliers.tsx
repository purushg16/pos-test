import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Menu,
  MenuButton,
  Button,
  MenuList,
  InputGroup,
  InputLeftElement,
  Input,
  Spinner,
  Box,
  VStack,
} from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";
import SupplierModal from "../Suppliers/SupplierModal";
import { Supplier } from "../entities/Supplier";
import useSuppliers from "../../functions/hooks/useSuppliers";
import useSupplierStore from "../../functions/store/suppliersStore";
import { useRef } from "react";

const SelectSuppliers = () => {
  const ref = useRef<HTMLInputElement>(null);

  useSuppliers({ type: "GET" });
  const selectSupplier = useSupplierStore((s) => s.selectSupplier);
  const selectedSuppliers = useSupplierStore((s) => s.selectedSuppliers);
  const currentSupplier = useSupplierStore((s) => s.currentSupplier);
  const setCurrentSupplier = useSupplierStore((s) => s.setCurrentSupplier);

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

              {selectedSuppliers?.map((supplier: Supplier, index: number) => (
                <Button
                  width="100%"
                  marginX={2}
                  key={index}
                  onClick={() => {
                    setCurrentSupplier(supplier);
                  }}
                >
                  {supplier.name}
                </Button>
              ))}
            </VStack>
          </Box>
        )}
      </MenuList>
    </Menu>
  );
};

export default SelectSuppliers;
