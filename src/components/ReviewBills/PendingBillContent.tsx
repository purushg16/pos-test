// headers, billNo, billAmount, bill date

import { SimpleGrid } from "@chakra-ui/react";
import { PendingBill } from "../../functions/services/review-client";
import { formattedDate } from "../../functions/conversions/dateConversion";
import { forwardRef } from "react";

interface PrintableComponentProps {
  entry: PendingBill;
}

const PendingBillContent = forwardRef<HTMLDivElement, PrintableComponentProps>(
  ({ entry }, ref) => {
    // .sort((a, b) => a.age - b.age);

    return (
      <div id="invoice-POS" ref={ref}>
        <center id="top">
          <div className="info">
            <h2>SBISTechs Inc</h2>
          </div>
        </center>

        <div id="mid">
          <div className="info">
            <p>
              Address : street city, state 0000 <br />
              Email : JohnDoe@gmail.com <br />
              Phone : 555-555-5555 <br />
            </p>
          </div>
          <h2 style={{ margin: "10px 0" }}> Wallet Bill </h2>

          <SimpleGrid columns={2} my={1}>
            <SimpleGrid columns={2}>
              <p> Bill No.: </p>
              <p> {entry.billNo} </p>
            </SimpleGrid>
            <SimpleGrid columns={2}>
              <p> Date: </p>
              <p> {formattedDate(entry.createdAt)[0]} </p>
            </SimpleGrid>
            <SimpleGrid columns={2}>
              <p> Bill Amount: </p>
              <p> {entry.billAmount} </p>
            </SimpleGrid>
            <SimpleGrid columns={2}>
              <p> Time: </p>
              <p> {formattedDate(entry.createdAt)[1]} </p>
            </SimpleGrid>
          </SimpleGrid>
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
                  <h2>Zone</h2>
                </td>
              </tr>

              {entry.cart[0].product
                .sort((a, b) => parseInt(a.zone) - parseInt(b.zone))
                .map((product) => (
                  <tr className="service">
                    <td className="tableitem">
                      <p className="itemtext"> {product.itemName} </p>
                    </td>
                    <td className="tableitem">
                      <p className="itemtext">
                        {product.stock / product.selectedUnit}
                      </p>
                    </td>
                    <td className="tableitem">
                      <p className="itemtext">
                        {product.selectedUnit === 1
                          ? product.unit
                          : product.topUnit}
                      </p>
                    </td>
                    <td className="tableitem">
                      <p className="itemtext">
                        {product.stock / product.selectedUnit}
                      </p>
                    </td>
                  </tr>
                ))}
            </table>
          </div>
        </div>
      </div>
    );
  }
);

export default PendingBillContent;
