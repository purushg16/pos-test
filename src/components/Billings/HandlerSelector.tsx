import { ChevronDownIcon } from "@chakra-ui/icons";
import { Menu, MenuButton, Button, MenuList, MenuItem } from "@chakra-ui/react";
import useEmployeStore from "../../functions/store/employeStore";

const HandlerSelector = () => {
  const employeeList = useEmployeStore((s) => s.employeeList);
  const currentHandler = useEmployeStore((s) => s.currentHandler);
  const setHandler = useEmployeStore((s) => s.setHandler);

  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<ChevronDownIcon />}
        textAlign="left"
        variant="outline"
      >
        {currentHandler ? currentHandler.name : "Select"}
      </MenuButton>
      <MenuList>
        {employeeList.map((employee, index) => (
          <MenuItem key={index} onClick={() => setHandler(employee)}>
            {employee.name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default HandlerSelector;
