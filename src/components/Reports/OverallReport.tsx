import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  Image,
  SimpleGrid,
  Spacer,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import useOverall from "../../functions/hooks/useOverall";
import { DeleteIcon } from "@chakra-ui/icons";

const OverallReport = () => {
  const { data } = useOverall();

  if (!data) return <Spinner />;

  const currentFlow = data[1].data2;

  // const cashFlow = data[0].data1;
  const cashFlow = data[0].data1.filter((d) => d._id.mode === "cash");
  const upiFlow = data[0].data1.filter((d) => d._id.mode === "upi");

  const cashTotal = cashFlow
    .filter((d) => d._id.nature === "sale" || d._id.nature === "payIn")
    .reduce((acc, value) => acc + value.totalAmount, 0);

  const cashRemains = cashFlow
    .filter((d) => d._id.nature !== "sale" && d._id.nature !== "payIn")
    .reduce((acc, value) => acc + value.totalAmount, 0);

  const upiTotal = upiFlow
    .filter((d) => d._id.nature === "sale" || d._id.nature === "payIn")
    .reduce((acc, value) => acc + value.totalAmount, 0);

  const upiRemains = upiFlow
    .filter((d) => d._id.nature !== "sale" && d._id.nature !== "payIn")
    .reduce((acc, value) => acc + value.totalAmount, 0);

  return (
    <SimpleGrid columns={1} spacing={2}>
      <SimpleGrid columns={2} spacing={2}>
        <Card>
          <CardHeader pb={0}>
            <Heading size="md">Overall Flow</Heading>
          </CardHeader>
          <CardBody pt={2}>
            <Grid templateColumns={"1fr 5% 1fr 10% 1fr"} alignItems="center">
              <GridItem textAlign="center">
                <Heading> {currentFlow.totalBillAmount.toFixed(2)} </Heading>
                <Heading size="sm" color="gray">
                  Bill Amount
                </Heading>
              </GridItem>

              <GridItem textAlign="right">
                <Text> = </Text>
              </GridItem>

              <GridItem textAlign="right">
                <Heading> {currentFlow.salesTotal} </Heading>
                <Heading size="sm" color="gray">
                  Sales Total
                </Heading>
              </GridItem>

              <GridItem textAlign="right">
                <Text> + </Text>
              </GridItem>
              <GridItem textAlign="right">
                <Heading> {currentFlow.creditTotal} </Heading>
                <Heading size="sm" color="gray">
                  Credits
                </Heading>
              </GridItem>
            </Grid>
          </CardBody>
        </Card>
        <Box></Box>
      </SimpleGrid>

      <SimpleGrid columns={2} spacing={2}>
        <Card>
          <CardHeader>
            <Flex>
              <Heading>Cash</Heading>
              <Spacer />
              <Heading>₹{(cashTotal - cashRemains).toFixed(2)}</Heading>
            </Flex>
          </CardHeader>
          <CardBody>
            <SimpleGrid columns={cashFlow.length} textAlign="left" spacing={2}>
              {cashFlow.map((flow) => (
                <Box
                  key={flow._id.mode}
                  textAlign="right"
                  borderRadius={7}
                  padding={2}
                  background={
                    flow._id.nature === "sale" || flow._id.nature === "payIn"
                      ? "green"
                      : "red.300"
                  }
                >
                  <Heading size="lg"> {flow.totalAmount.toFixed(2)} </Heading>
                  <Heading size="sm">{flow._id.nature}</Heading>
                </Box>
              ))}
            </SimpleGrid>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <Flex>
              <Heading>UPI</Heading>
              <Spacer />
              <Heading>₹{(upiTotal - upiRemains).toFixed(2)}</Heading>
            </Flex>
          </CardHeader>
          <CardBody>
            <SimpleGrid columns={upiFlow.length} textAlign="left" spacing={2}>
              {upiFlow.map((flow) => (
                <Box
                  key={flow._id.mode}
                  textAlign="right"
                  borderRadius={7}
                  padding={2}
                  background={
                    flow._id.nature === "sale" || flow._id.nature === "payIn"
                      ? "green"
                      : "red.300"
                  }
                >
                  <Heading size="lg"> {flow.totalAmount.toFixed(2)} </Heading>
                  <Heading size="sm">{flow._id.nature}</Heading>
                </Box>
              ))}
            </SimpleGrid>
          </CardBody>
        </Card>
      </SimpleGrid>
    </SimpleGrid>
  );
};

export default OverallReport;
