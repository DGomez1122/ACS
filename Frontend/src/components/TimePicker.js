import * as React from "react";
// import AdapterDateFns from "@mui/lab/AdapterDateFns";
import AdapterDayjs from "@mui/lab/AdapterDayjs";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TimePicker from "@mui/lab/TimePicker";
import dayjs from "dayjs";
import { StyledTextField } from "../theme/theme";

export default function TimeBasePicker({
  label,
  dayIdx,
  periodIdx,
  setSchedule,
  isStart,
  initialDate,
  readOnly,
}) {
  const [value, setValue] = React.useState(null);
  const [dayvalue, setDayValue] = React.useState(
    initialDate ? dayjs(initialDate) : dayjs()
  );

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TimePicker
          label={label}
          value={dayvalue}
          onChange={(newDayValue) => {
            setDayValue(newDayValue);
            setSchedule((schedule) => {
              let newSchedule = [...schedule];
              let currentDay = newSchedule[dayIdx];
              // delete the period from the current day
              console.log("Nueva hora:", newDayValue.format("HH:mm"));
              if (isStart) {
                currentDay.periods[periodIdx].start = newDayValue;
              } else {
                currentDay.periods[periodIdx].end = newDayValue;
              }
              return newSchedule;
              // console.log(newSchedule);

              // console.log(schedule);
              // setSchedule(newSchedule);
              // currentDay.periods.push({
              // setSchedule([...schedule, { day: day, periods: [...periods, {start: "12:00", end: "13:00"}] }]);
            });
          }}
          renderInput={(params) => (
            <StyledTextField {...params} className="time-input"
            />
          )}
        />
      </LocalizationProvider>
    </>
  );
}
