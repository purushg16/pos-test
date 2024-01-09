import { EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
} from "@chakra-ui/react";
import { ChangeEvent, useRef, useState } from "react";
import useStock from "../../functions/hooks/useStock";
import useSuppliers from "../../functions/hooks/useSuppliers";
import useStockStore from "../../functions/store/stockStore";
import useSupplierStore from "../../functions/store/suppliersStore";
import SelectSuppliers from "./SelectSuppliers";

const StockDetails = () => {
  const currentSupplier = useSupplierStore((s) => s.currentSupplier);
  const billNo = useStockStore((s) => s.billNo);
  const setBillNo = useStockStore((s) => s.setBillNo);

  const total = useStockStore((s) => s.total);
  const stockProducts = useStockStore((s) => s.stockProducts);
  const [loading, setLoading] = useState(false);

  useSuppliers({ type: "GET" });

  const { mutate } = useStock((yes) => setLoading(yes));
  const data = new FormData();

  const imageRef = useRef<HTMLInputElement | null>(null);
  const [selectedImage, setImage] = useState<File | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);
  };

  const handleClick = () => {
    if (imageRef.current) {
      imageRef.current.click();
    }
  };

  const onSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    setLoading(true);

    data.append("file", selectedImage!);
    data.append("upload_preset", "purush");
    data.append("cloud_name", "dquna4wzz");

    fetch("https://api.cloudinary.com/v1_1/dquna4wzz/image/upload", {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        mutate({
          supplierId: currentSupplier?._id!,
          amount: total!,
          billNo: billNo!,

          link: data.url,
          products: stockProducts.map((product) => {
            return {
              productId: product.productId!,
              purchasePrice: parseFloat(
                (product.purchasePrice / product.currentUnitValue!).toFixed(2)
              ),
              stock: product.stock!,
              selectedUnit: product.currentUnitValue!,
            };
          }),
        });
      });
  };

  return (
    <Flex flexDirection={"column"} gap={2} height="95vh">
      <Box padding={2} border="1px solid #80808030" borderRadius={7}>
        <Heading size="1xl" mb={2}>
          Supplier Name
        </Heading>
        <SelectSuppliers />

        <Box my={5}>
          <Heading size="1xl" mb={2}>
            Bill Number
          </Heading>

          <InputGroup width="100%">
            <Input
              placeholder="Enter Bill Number"
              variant={"filled"}
              borderRadius={7}
              value={billNo}
              onChange={(event) => {
                setBillNo(parseInt(event.target.value));
              }}
            />
          </InputGroup>
        </Box>

        <Box my={5}>
          <Heading size="1xl" mb={2}>
            Upload Image
          </Heading>
          <Input
            ref={(el) => (imageRef.current = el)}
            onChange={handleFileChange}
            type="file"
            accept="image/*"
            width="100%"
            cursor="pointer"
            display="none"
          />
          <Button onClick={handleClick}>
            {selectedImage ? selectedImage.name : "Pick Image"}
            <EditIcon ml={3} />
          </Button>
        </Box>

        <Box my={5}>
          <Heading size="1xl" mb={2}>
            Total Amount
          </Heading>

          <InputGroup width="100%">
            <Input
              readOnly
              isDisabled
              placeholder="Enter Bill Number"
              variant={"filled"}
              borderRadius={7}
              value={total?.toString()}
            />
          </InputGroup>
        </Box>

        <Button
          colorScheme="blue"
          width="100%"
          isLoading={loading}
          isDisabled={
            total === null ||
            stockProducts.length === 0 ||
            !!!billNo ||
            !!!currentSupplier
          }
          onClick={(event) => {
            onSubmit(event);
          }}
        >
          Add Stock
        </Button>
      </Box>
    </Flex>
  );
};

export default StockDetails;
