import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Input,
  SimpleGrid,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useCategoryies from "../../functions/hooks/useCategories";
import useCategoryStore from "../../functions/store/categoryStore";
import BillTabContainer from "../Billings/BillTabContainer";

const CategoryForm = () => {
  const [newCategory, setNewCategory] = useState({
    name: "",
    pId: "",
    isParent: true,
  });

  const [canSubmit, setSubmit] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();

  const { refetch } = useCategoryies({
    type: "POST",
    category: newCategory,
  });

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    console.log(newCategory);

    refetch().then((res) => {
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
        setNewCategory({ name: "", pId: "", isParent: true });
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
  useCategoryies({ type: "GET" });

  const selectedCategory = useCategoryStore((s) => s.currentCategory);

  useEffect(() => {
    if (newCategory.isParent) setNewCategory({ ...newCategory, pId: "" });
    else if (!!selectedCategory && !newCategory.isParent)
      setNewCategory({ ...newCategory, pId: selectedCategory._id! });

    if (newCategory.isParent && newCategory.name) setSubmit(true);
    else if (!newCategory.isParent && newCategory.pId && newCategory.name)
      setSubmit(true);
    else setSubmit(false);
  }, [newCategory, selectedCategory]);

  return (
    <Flex alignItems="center" justifyContent="center" height="100%">
      <Box width={500}>
        <Heading> Add Category </Heading>

        <form onSubmit={(event) => onSubmit(event)}>
          <Flex flexDirection="column" gap={5} marginY={7}>
            <Box>
              <Text>Category Name </Text>
              <Input
                focusBorderColor="teal"
                variant="flushed"
                value={newCategory.name}
                onChange={(event) => {
                  setNewCategory({
                    ...newCategory,
                    name: event.target.value,
                  });
                }}
              />
            </Box>

            <Box>
              <SimpleGrid columns={2} alignItems="center">
                <Checkbox
                  isChecked={newCategory.isParent}
                  onChange={() => {
                    setNewCategory({
                      ...newCategory,
                      isParent: !newCategory.isParent,
                    });
                  }}
                  colorScheme="teal"
                  defaultChecked
                  size="lg"
                  children="Parent Catergory"
                />
                {!newCategory.isParent && <BillTabContainer selector />}
              </SimpleGrid>
            </Box>

            {!!selectedCategory && !newCategory.isParent && (
              <Box>
                <SimpleGrid columns={2} alignItems="center" marginY={1}>
                  <Heading size="sm"> Selected Category: </Heading>

                  <Button colorScheme="yellow">{selectedCategory.name} </Button>
                </SimpleGrid>
              </Box>
            )}
            <Button
              colorScheme="teal"
              type="submit"
              my={2}
              isLoading={isLoading}
              isDisabled={!canSubmit}
              loadingText="Adding Category..."
            >
              Add Category
            </Button>
          </Flex>
        </form>
      </Box>
    </Flex>
  );
};

export default CategoryForm;
