import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import useAuth from "../../functions/hooks/useAuth";

const Authentication = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token !== null) {
      navigate("/");
    }
  }, [token]);

  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [canSubmit, setSubmit] = useState(false);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    if (userName && password) setSubmit(true);
    else setSubmit(false);
  }, [userName, password]);

  const authenticateUser = useAuth((yes) => setLoading(yes));
  const onSubmit = () => {
    setLoading(true);

    authenticateUser.mutate({
      userName,
      password,
    });
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      height="100vh"
      alignItems="center"
    >
      <Box textAlign="center">
        <Heading mb={5}> Login </Heading>
        <FormControl isRequired mb={5}>
          <FormLabel> Username</FormLabel>
          <Input
            placeholder="Username"
            value={userName}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
        </FormControl>

        <FormControl isRequired mb={5}>
          <FormLabel> Password</FormLabel>
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? <BsEye /> : <BsEyeSlash />}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <Button
          colorScheme="green"
          isDisabled={!canSubmit}
          isLoading={isLoading}
          onClick={onSubmit}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default Authentication;
