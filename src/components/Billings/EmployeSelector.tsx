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
      <MenuList
        maxH={140}
        overflowY="scroll"
        style={{ top: -50, position: "fixed" }}
      >
        {employeeList.map((employee, index) => (
          <MenuItem
            key={index}
            onClick={() => {
              (document.getElementById("none") as HTMLElement)?.focus();
              setBiller(employee);
            }}
          >
            {employee.name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default EmployeSelector;
