import {
  Box,
  Button,
  Card,
  CardHeader,
  Flex,
  Heading,
  Icon,
  Image,
  SimpleGrid,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaHome } from "react-icons/fa";
import { MdAttachMoney, MdImportExport, MdOutbox } from "react-icons/md";
import CashFlowReport from "./CashFlowReport";
import GPReports from "./GPReports";
import OverallReport from "./OverallReport";
import ProductsReport from "./ProductsReport";
import BillReports from "./BillReports";
import { BsCreditCard, BsGrid1X2Fill, BsListCheck } from "react-icons/bs";
import CreditorAndDebtorReport from "./CreditorAndDebtorReport";

const Reports = () => {
  const [reportTab, changeReportTab] = useState<string | null>(null);

  return (
    <Box padding={4}>
      <Flex>
        <Heading paddingX={4}>Reports </Heading>
        <Spacer />
        {reportTab !== null && (
          <Button onClick={() => changeReportTab(null)}>
            <FaHome />
          </Button>
        )}
      </Flex>

      {reportTab === null && (
        <Box padding={10}>
          <Box pb={5} borderBottom="1px solid #66666678">
            <OverallReport />
          </Box>

          <SimpleGrid columns={4} spacing={5} my={5}>
            <Card
              borderRadius={15}
              cursor="pointer"
              onClick={() => {
                changeReportTab("gp");
              }}
            >
              <CardHeader>
                <Image as={Icon} boxSize={100}>
                  <MdOutbox />
                </Image>
                <Heading size="md"> Gross Profit Report </Heading>
                <Text color="gray" my={2}>
                  Review all the profit measures in all terms.
                </Text>
                <Flex justifyContent="end" width="100%">
                  <Button colorScheme="teal"> View </Button>
                </Flex>
              </CardHeader>
            </Card>

            {/* <Card
              borderRadius={15}
              cursor="pointer"
              onClick={() => {
                changeReportTab("Prodcuts");
              }}
            >
              <CardHeader>
                <Image as={Icon} boxSize={100}>
                  <MdImportExport />
                </Image>
                <Heading size="md"> Products Report </Heading>

                <Text color="gray" my={2}>
                  Review all the products.
                </Text>
                <Flex justifyContent="end" width="100%">
                  <Button colorScheme="teal"> View </Button>
                </Flex>
              </CardHeader>
            </Card> */}

            <Card
              borderRadius={15}
              cursor="pointer"
              onClick={() => {
                changeReportTab("cashflow");
              }}
            >
              <CardHeader>
                <Image as={Icon} boxSize={100}>
                  <MdAttachMoney />
                </Image>
                <Heading size="md"> CashFlow Report </Heading>

                <Text color="gray" my={2}>
                  Review all the cash flown through.
                </Text>
                <Flex justifyContent="end" width="100%">
                  <Button colorScheme="teal"> View </Button>
                </Flex>
              </CardHeader>
            </Card>
            <Card
              borderRadius={15}
              cursor="pointer"
              onClick={() => {
                changeReportTab("bill");
              }}
            >
              <CardHeader>
                <Image as={Icon} boxSize={100}>
                  <BsListCheck />
                </Image>
                <Heading size="md"> Bill Report </Heading>

                <Text color="gray" my={2}>
                  Review all bills made ever.
                </Text>
                <Flex justifyContent="end" width="100%">
                  <Button colorScheme="teal"> View </Button>
                </Flex>
              </CardHeader>
            </Card>

            <Card
              borderRadius={15}
              cursor="pointer"
              onClick={() => {
                changeReportTab("c&d");
              }}
            >
              <CardHeader>
                <Image as={Icon} boxSize={100}>
                  <BsCreditCard />
                </Image>
                <Heading size="md"> Debtors & Creditors Report </Heading>

                <Text color="gray" my={2}>
                  Review all trasactions based on debtors and creditors
                </Text>
                <Flex justifyContent="end" width="100%">
                  <Button colorScheme="teal"> View </Button>
                </Flex>
              </CardHeader>
            </Card>
          </SimpleGrid>
        </Box>
      )}

      <Box pt={5}>
        {/* {reportTab === "Prodcuts" && <ProductsReport />} */}
        {reportTab === "gp" && <GPReports />}
        {reportTab === "cashflow" && <CashFlowReport />}
        {reportTab === "bill" && <BillReports />}
        {reportTab === "c&d" && <CreditorAndDebtorReport />}
      </Box>
    </Box>
  );
};

export default Reports;
