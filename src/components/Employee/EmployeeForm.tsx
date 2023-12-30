import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useCustomers from "../../functions/hooks/useCustomers";
import useEmployee from "../../functions/hooks/useEmployee";

const EmployeeForm = () => {
  const toast = useToast();

  const [newEmploye, editEmploye] = useState({
    name: "",
    passcode: parseInt(""),
  });
  const [canSubmit, setSubmit] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const { refetch } = useEmployee({
    type: "POST",
    employe: newEmploye,
  });

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    refetch().then((res) => {
      console.log(res);
      const { data, isSuccess, isError } = res;

      if (isSuccess) {
        toast({
          title: data.msg,
          status: "success",
          duration: 1000,
          isClosable: true,
          position: "top",
        });
        setLoading(false);
        editEmploye({ name: "", passcode: 0 });
      } else if (isError) {
        toast({
          title: data.message,
          status: "error",
          duration: 1000,
          isClosable: true,
          position: "top",
        });
      }
    });
  };

  useEffect(() => {
    if (newEmploye.name && newEmploye.passcode) setSubmit(true);
    else setSubmit(false);
  });

  return (
    <Flex alignItems="center" justifyContent="center" height="100%">
      <Box width={500}>
        <Heading> Add Employee </Heading>

        <form onSubmit={(event) => onSubmit(event)}>
          <Flex flexDirection="column" gap={5} marginY={7}>
            <Box>
              <Text>Employee Name</Text>
              <Input
                focusBorderColor="teal"
                variant="flushed"
                value={newEmploye.name}
                onChange={(event) => {
                  editEmploye({
                    ...newEmploye,
                    name: event.target.value,
                  });
                }}
              />
            </Box>

            <Box>
              <Text>Passcode</Text>
              <Input
                focusBorderColor="teal"
                variant="flushed"
                type="number"
                value={newEmploye.passcode}
                onChange={(event) => {
                  editEmploye({
                    ...newEmploye,
                    passcode: parseInt(event.target.value),
                  });
                }}
              />
            </Box>

            <Button
              colorScheme="teal"
              type="submit"
              my={2}
              isLoading={isLoading}
              isDisabled={!canSubmit}
              loadingText="Adding Employee..."
            >
              Add Employee
            </Button>
          </Flex>
        </form>
      </Box>
    </Flex>
  );
};

export default EmployeeForm;
