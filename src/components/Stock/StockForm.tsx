import { Box, Flex, Grid, GridItem } from "@chakra-ui/react";
import { BillingHeader } from "../Billings/BillingHeader";
import StockDetails from "./StockDetails";
import StockTable from "./StockTable";

const StockForm = () => {
  return (
    <Grid
      templateAreas={`"table details"`}
      gridTemplateColumns={"1fr 30%"}
      padding={5}
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
            <BillingHeader stock />
          </Box>

          <Box flex={1} width="100%">
            <StockTable />
          </Box>
        </Flex>
      </GridItem>
      <GridItem area={"details"}>
        <StockDetails />
      </GridItem>
    </Grid>
  );
};

export default StockForm;
