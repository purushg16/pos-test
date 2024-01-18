import { Box, Flex, Grid, GridItem } from "@chakra-ui/react";
import { BillingDetails } from "./BillingDetails";
import { BillingHeader } from "./BillingHeader";
import { BillingTable } from "./BillingTable";
import { useRef, useEffect } from "react";
import useBillStore from "../../functions/store/billStore";

const Billing = () => {
  const BillEntries = useBillStore((s) => s.BillEntries);
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tableRef.current)
      tableRef.current.scrollTop = tableRef.current.scrollHeight;
  }, [BillEntries.length]);

  return (
    <Grid
      templateAreas={`"table details"`}
      gridTemplateColumns={"1fr 30%"}
      padding={5}
      // maxHeight="93vh"
      overflowY="scroll"
    >
      <GridItem area={"table"}>
        <Box height="90vh" overflowY="scroll" mr={2} ref={tableRef}>
          <Box
            width="100%"
            padding={2}
            border="1px solid #80808030"
            borderRadius={7}
            mb={1}
          >
            <BillingHeader billing />
          </Box>

          <Box flex={1} width="100%">
            <BillingTable />
          </Box>
        </Box>
      </GridItem>
      <GridItem area={"details"}>
        <BillingDetails />
      </GridItem>
    </Grid>
  );
};

export default Billing;
