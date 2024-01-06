import {
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useGetPilferage } from "../../functions/hooks/usePilferage";

const PilferageList = () => {
  const { data } = useGetPilferage();

  return (
    <TableContainer>
      <Table>
        <Thead>
          <Th> code </Th>
          <Th> Item Name </Th>
          <Th> quantity </Th>
          <Th> reason </Th>
        </Thead>
        <Tbody>
          {!!data ? (
            <>
              {data.map((d) => (
                <Tr>
                  <Td>{d.productId.code}</Td>
                  <Td> {d.productId.itemName} </Td>
                  <Td>
                    {d.quantity} ({d.productId.unit})
                  </Td>
                  <Td> {d.reason}</Td>
                </Tr>
              ))}
            </>
          ) : (
            <Spinner />
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default PilferageList;

// const data = {
//   data: [
//     {
//       _id: "659903c3bd2bee89a6fb7eb2",
//       productId: {
//         _id: "6591085bb54ba96f02dbf612",
//         itemName: "சாம்பார் பொடி",
//         code: 1001,
//         unit: "கிலோகிராம்",
//       },
//       quantity: 5,
//       reason: "spilled",
//       __v: 0,
//     },
//     {
//       _id: "659928ecf400a20bc167be5e",
//       productId: {
//         _id: "6597ec0f037c29ee23d63779",
//         itemName: "shampoo clinic",
//         code: 2001,
//         unit: "PIECES",
//       },
//       quantity: 1,
//       reason: "Damaged",
//       __v: 0,
//     },
//     {
//       _id: "6599293bf400a20bc167c276",
//       productId: {
//         _id: "6597ec0f037c29ee23d63779",
//         itemName: "shampoo clinic",
//         code: 2001,
//         unit: "PIECES",
//       },
//       quantity: 9,
//       reason: "Damaged",
//       __v: 0,
//     },
//   ],
// };
