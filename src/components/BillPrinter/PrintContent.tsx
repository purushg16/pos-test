import { forwardRef } from "react";
import "./billprinter.css";
import { Box, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import useBillStore from "../../functions/store/billStore";
import { BillingEntry } from "../entities/BillingEntry";
import useCustomerStore from "../../functions/store/customerStore";
import useEmployeStore from "../../functions/store/employeStore";

interface PrintableComponentProps {}

const PrintableComponent = forwardRef<HTMLDivElement, PrintableComponentProps>(
  (props, ref) => {
    const BillEntries = useBillStore((s) => s.BillEntries);
    const biller = useEmployeStore((s) => s.currentBiller);
    const currentCustmer = useCustomerStore((s) => s.currentCustmer);
    const billNo = useBillStore((s) => s.billNo);
    const paymentMode = useBillStore((s) => s.paymentMode);
    const partialPayment = useBillStore((s) => s.partialPayment);
    const partialAmount = useBillStore((s) => s.partialAmount);

    const currentDateAndTime = new Date();
    const year = currentDateAndTime.getFullYear();
    const month = currentDateAndTime.getMonth() + 1;
    const day = currentDateAndTime.getDate();
    const hours = currentDateAndTime.getHours();
    const minutes = currentDateAndTime.getMinutes();
    const seconds =
      currentDateAndTime.getSeconds() > 9
        ? currentDateAndTime.getSeconds()
        : `0${currentDateAndTime.getSeconds()}`;

    return (
      <div id="invoice-POS" ref={ref}>
        <center id="top">
          <div className="info">
            <h6 style={{ textDecoration: "underline" }}> உ </h6>
            <p> ஸ்ரீ அங்காளபரமேஸ்வரி துணை </p>
            <p>50-வது ஆண்டு பொன்விழா காணும்</p>
            <h1>பத்மா ஸ்டோர்</h1>
          </div>
        </center>

        <div id="mid">
          <div className="info">
            <p>
              232 சேலம் மெயின் ரோடு
              <br />
              சின்ன சேலம் <br />
            </p>
          </div>
          <h2 style={{ margin: "10px 0" }}> Cash Bill </h2>

          <SimpleGrid columns={2} my={1}>
            <SimpleGrid columns={2}>
              <p> Bill No.: </p>
              <p> {billNo} </p>
            </SimpleGrid>
            <SimpleGrid columns={2}>
              <p> Date: </p>
              <p> {`${year}-${month}-${day}`} </p>
            </SimpleGrid>
            <SimpleGrid columns={2}>
              <p> Biller: </p>
              <p> {biller?.name} </p>
            </SimpleGrid>
            <SimpleGrid columns={2}>
              <p> Time: </p>
              <p> {`${hours}:${minutes}:${seconds}`} </p>
            </SimpleGrid>
          </SimpleGrid>
          <Text textAlign="center"> </Text>
        </div>

        <div id="bot">
          <div id="table">
            <table>
              <tr className="tabletitle">
                <td className="item">
                  <h2>Item Name</h2>
                </td>
                <td className="Hours">
                  <h2>Qty</h2>
                </td>
                <td className="Hours">
                  <h2>Unit</h2>
                </td>
                <td className="Rate">
                  <h2>MRP</h2>
                </td>
                <td className="Rate">
                  <h2>Rate</h2>
                </td>
                <td className="Rate">
                  <h2> Amount </h2>
                </td>
              </tr>

              {BillEntries.map((entry) => (
                <tr className="service">
                  <td className="tableitem">
                    <h2 className="itemtext">{entry.productName}</h2>
                  </td>
                  <td className="tableitem">
                    <h2 className="itemtext">{entry.quantity}</h2>
                  </td>
                  <td className="tableitem">
                    <h2 className="itemtext">{entry.unit}</h2>
                  </td>
                  <td className="tableitem">
                    <h2 className="itemtext">
                      {(entry.mrp * entry.currentUnitValue!).toFixed(2)}
                    </h2>
                  </td>
                  <td className="tableitem">
                    <h2 className="itemtext">{entry.billPrice.toFixed(2)}</h2>
                  </td>
                  <td className="tableitem">
                    <h2 className="itemtext">{entry.total.toFixed(2)}</h2>
                  </td>
                </tr>
              ))}
            </table>

            <SimpleGrid
              paddingY={1}
              columns={2}
              borderTop="1px dashed #666"
              borderBottom="1px dashed #666"
            >
              <SimpleGrid columns={2}>
                <p> Total Quantity: </p>
                <p>
                  {BillEntries.reduce(
                    (acc, entry: BillingEntry) => acc + entry.quantity,
                    0
                  )}
                </p>
              </SimpleGrid>
              <SimpleGrid columns={2}>
                <p> Amount: </p>
                <p>
                  {BillEntries.reduce(
                    (acc, entry: BillingEntry) => acc + entry.total,
                    0
                  ).toFixed(2)}
                </p>
              </SimpleGrid>
              <SimpleGrid columns={2}>
                <p> Total Items: </p>
                <p> {BillEntries.length} </p>
              </SimpleGrid>
            </SimpleGrid>
          </div>

          <div id="legalcopy" style={{ borderBottom: "1px dashed #666" }}>
            <Heading size="md" textAlign="center" pb={2}>
              Net Amount:{" "}
              {BillEntries.reduce(
                (acc, entry: BillingEntry) => acc + entry.total,
                0
              ).toFixed(2)}
            </Heading>
            <Heading textAlign="center" size="sm" pb={2}>
              You have saved:{" "}
              {(
                BillEntries.reduce(
                  (acc, entry: BillingEntry) =>
                    acc + entry.mrp * entry.quantity * entry.currentUnitValue!,
                  0
                ) -
                BillEntries.reduce(
                  (acc, entry: BillingEntry) =>
                    acc + entry.billPrice * entry.quantity,
                  0
                )
              ).toFixed(2)}
            </Heading>

            <SimpleGrid columns={3} spacing={3}>
              <Box>
                <Heading pb={2}> UPI </Heading>
                {paymentMode !== "upi" && <Text> - </Text>}
                {paymentMode === "upi" && partialPayment === "no-credit" && (
                  <Text>
                    {BillEntries.reduce(
                      (acc, entry: BillingEntry) => acc + entry.total,
                      0
                    ).toFixed(2)}
                  </Text>
                )}
                {paymentMode === "upi" &&
                  partialPayment === "partial-credit" && (
                    <Text>{partialAmount!.toFixed(2)}</Text>
                  )}
              </Box>

              <Box>
                <Heading pb={2}> Cash </Heading>
                {paymentMode !== "cash" && <Text> - </Text>}
                <Text>
                  {paymentMode === "cash" &&
                    partialPayment === "no-credit" &&
                    BillEntries.reduce(
                      (acc, entry: BillingEntry) => acc + entry.total,
                      0
                    ).toFixed(2)}
                </Text>

                {paymentMode === "cash" &&
                  partialPayment === "partial-credit" &&
                  !!partialAmount && <Text>{partialAmount.toFixed(2)}</Text>}
              </Box>

              <Box>
                <Heading> Credit </Heading>
                {paymentMode !== "credit" &&
                  partialPayment !== "partial-credit" && <Text> - </Text>}

                {partialPayment === "partial-credit" && (
                  <Text>
                    {(
                      BillEntries.reduce(
                        (acc, entry: BillingEntry) => acc + entry.total,
                        0
                      ) - partialAmount!
                    ).toFixed(2)}
                  </Text>
                )}

                <Text>
                  {partialPayment === "credit" &&
                    BillEntries.reduce(
                      (acc, entry: BillingEntry) => acc + entry.total,
                      0
                    ).toFixed(2)}
                </Text>
              </Box>
            </SimpleGrid>

            {/* <Heading
              textAlign="center"
              size="sm"
              p={2}
              borderTop="1px dashed #666"
              borderBottom="1px dashed #666"
            >
              ** Thank You! Visit Again! **
            </Heading> */}
            {/* 
            <Box py={2}>
              <Heading size="xs">Customer Details</Heading>
              <Text my={1}> {currentCustmer?.name} </Text>
              <Text my={1}> {currentCustmer?.phone}</Text>
            </Box> */}

            <Text textAlign="center" className="legal">
              <strong>வாருங்கள் வரவேற்கிறோம் வாழ்த்துங்கள் வளர்கிறோம்</strong> 
            </Text>
          </div>
        </div>
      </div>
    );
  }
);

export default PrintableComponent;
