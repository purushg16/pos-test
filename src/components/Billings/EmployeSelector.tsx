import { ChevronDownIcon } from "@chakra-ui/icons";
import { Menu, MenuButton, Button, MenuList, MenuItem } from "@chakra-ui/react";
import useEmployeStore from "../../functions/store/employeStore";

const EmployeSelector = () => {
  const employeeList = useEmployeStore((s) => s.employeeList);
  const currentBiller = useEmployeStore((s) => s.currentBiller);
  const setBiller = useEmployeStore((s) => s.setBiller);

  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<ChevronDownIcon />}
        textAlign="left"
        variant="outline"
      >
        {currentBiller ? currentBiller.name : "Select"}
      </MenuButton>
      <MenuList>
        {employeeList.map((employee, index) => (
          <MenuItem key={index} onClick={() => setBiller(employee)}>
            {employee.name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default EmployeSelector;
