import { ChevronDownIcon } from "@chakra-ui/icons";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import useGSTStore from "../../functions/store/gstStore";

const GSTSelector = () => {
  const currentGstin = useGSTStore((s) => s.currentGstin);
  const gstList = useGSTStore((s) => s.gstList);
  const setGstin = useGSTStore((s) => s.setGstin);

  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<ChevronDownIcon />}
        textAlign="left"
        variant="outline"
      >
        {currentGstin ? currentGstin.gstinNo : "Select"}
      </MenuButton>
      <MenuList>
        {gstList.map((gst, index) => (
          <MenuItem key={index} onClick={() => setGstin(gst)}>
            {gst.gstinNo}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default GSTSelector;
