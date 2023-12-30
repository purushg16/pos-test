import { Box } from "@chakra-ui/react";
import { useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const DatePicker = () => {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
      //   color: "black",
    },
  ]);

  return (
    <Box>
      <DateRange
        editableDateInputs={true}
        onChange={(item) =>
          setState([
            {
              startDate: item.selection.startDate ?? new Date(),
              endDate: item.selection.endDate ?? new Date(),
              key: "selection",
            },
          ])
        }
        moveRangeOnFirstSelection={false}
        ranges={state}
      />
    </Box>
  );
};

export default DatePicker;
