import { Box, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { BillReport } from "../../functions/services/billing-services";
import { forwardRef } from "react";
import "./billprinter.css";

interface Props {
  entry: BillReport;
}

const BillPrint = forwardRef<HTMLDivElement, Props>(({ entry }, ref) => {
  const currentDateAndTime = new Date(entry.createdAt);
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
        <h2 style={{ margin: "10px 0" }}> Bill No: {entry.billNo} </h2>

        <SimpleGrid columns={2} my={1}>
          <SimpleGrid columns={2}>
            <p> Biller: </p>
            <p> {entry.billerName} </p>
          </SimpleGrid>
          <SimpleGrid columns={2}>
            <p> Date: </p>
            <p> {`${year}-${month}-${day}`} </p>
          </SimpleGrid>
          <SimpleGrid columns={2}>
            <p> Handler: </p>
            <p> {entry.handler} </p>
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

            {entry.cart.product.map((product) => (
              <tr className="service">
                <td className="tableitem">
                  <h3 className="itemtext">{product.productId.itemName}</h3>
                </td>
                <td className="tableitem">
                  <h2 className="itemtext">{product.stock}</h2>
                </td>
                <td className="tableitem">
                  <h2 className="itemtext">{product.productId.unit}</h2>
                </td>
                <td className="tableitem">
                  <h2 className="itemtext">
                    {product.productId.mrp.toFixed(2)}
                  </h2>
                </td>
                <td className="tableitem">
                  <h2 className="itemtext">{product.salesPrice.toFixed(2)}</h2>
                </td>
                <td className="tableitem">
                  <h2 className="itemtext">
                    {(product.salesPrice * product.stock).toFixed(2)}
                  </h2>
                </td>
              </tr>
            ))}
            <tr className="service">
              <td className="tableitem">
                <h3 className="itemtext"> - </h3>
              </td>
              <td className="tableitem">
                <h3 className="itemtext">- </h3>
              </td>
              <td className="tableitem">
                <h3 className="itemtext">- </h3>
              </td>
              <td className="tableitem">
                <h3 className="itemtext">-</h3>
              </td>
              <td className="tableitem">
                <h2>Total</h2>
              </td>
              <td className="tableitem">
                <h2>{entry.billAmount.toFixed(2)}</h2>
              </td>
            </tr>
          </table>

          <SimpleGrid
            paddingY={1}
            columns={2}
            borderTop="1px dashed #666"
            borderBottom="1px dashed #666"
          >
            {/* <SimpleGrid columns={2}>
              <h2> Amount: </h2>
              <h2>
                {entry.cart.product
                  .reduce(
                    (acc, entry) => acc + (entry.stock / entry.selectedUnit) * entry.salesPrice,
                    0
                  )
                  .toFixed(2)}
              </h2>
            </SimpleGrid> */}
            <SimpleGrid columns={2}>
              <h3 className="itemtext"> Total Items: </h3>
              <h3 className="itemtext"> {entry.cart.product.length} </h3>
            </SimpleGrid>
          </SimpleGrid>
        </div>

        <div id="legalcopy" style={{ borderBottom: "1px dashed #666" }}>
          <Heading size="md" textAlign="center" pb={2}>
            Net Amount: {entry.billAmount.toFixed(2)}
          </Heading>
          <Heading textAlign="center" size="sm" pb={2}>
            You have saved:{" "}
            {(
              entry.cart.product.reduce(
                (acc, entry) => acc + entry.productId.mrp * entry.stock,
                0
              ) - entry.billAmount
            ).toFixed(2)}
          </Heading>

          <SimpleGrid columns={3} spacing={3}>
            <Box>
              <Heading pb={2}> UPI </Heading>
              {entry.paymentMode !== "upi" && <Text> - </Text>}
              {entry.paymentMode === "upi" && entry.payment === "no-credit" && (
                <Text>{entry.billAmount.toFixed(2)}</Text>
              )}
              {entry.paymentMode === "upi" &&
                entry.payment === "partial-credit" && (
                  <Text>{entry.partialAmount!.toFixed(2)}</Text>
                )}
            </Box>

            <Box>
              <Heading pb={2}> Cash </Heading>
              {entry.paymentMode !== "cash" && <Text> - </Text>}
              {entry.paymentMode === "cash" &&
                entry.payment === "no-credit" && (
                  <Text>{entry.billAmount.toFixed(2)}</Text>
                )}

              {entry.paymentMode === "cash" &&
                entry.payment === "partial-credit" &&
                !!entry.partialAmount && (
                  <Text>{entry.partialAmount.toFixed(2)}</Text>
                )}
            </Box>

            <Box>
              <Heading> Credit </Heading>
              {entry.paymentMode !== "credit" &&
                entry.payment !== "partial-credit" && <Text> - </Text>}

              {entry.payment === "partial-credit" && (
                <Text>
                  {(entry.billAmount - entry.partialAmount!).toFixed(2)}
                </Text>
              )}
              {entry.paymentMode === "credit" && (
                <Text>{entry.billAmount.toFixed(2)}</Text>
              )}
            </Box>
          </SimpleGrid>

          <Text textAlign="center" className="legal">
            <strong>வாருங்கள் வரவேற்கிறோம் வாழ்த்துங்கள் வளர்கிறோம்</strong> 
          </Text>
        </div>
      </div>
    </div>
  );
});

export default BillPrint;
