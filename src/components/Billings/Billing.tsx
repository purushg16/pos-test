import { Box, Flex, Grid, GridItem } from "@chakra-ui/react";
import { BillingDetails } from "./BillingDetails";
import { BillingHeader } from "./BillingHeader";
import { BillingTable } from "./BillingTable";

const Billing = () => {
  return (
    <Grid
      templateAreas={`"table details"`}
      gridTemplateColumns={"1fr 30%"}
      padding={5}
      // maxHeight="93vh"
      overflowY="scroll"
    >
      <GridItem area={"table"}>
        <Flex
          justifyContent="center"
          alignItems="start"
          flexDirection="column"
          gap={2}
          paddingRight={2}
        >
          <Box
            width="100%"
            padding={2}
            border="1px solid #80808030"
            borderRadius={7}
          >
            <BillingHeader billing />
          </Box>

          <Box flex={1} width="100%">
            <BillingTable />
          </Box>
        </Flex>
      </GridItem>
      <GridItem area={"details"}>
        <BillingDetails />
      </GridItem>
    </Grid>
  );
};

export default Billing;
