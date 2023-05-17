import React, { useEffect, useState } from "react";
import { Grid, Typography, Divider, Button } from "@mui/material";
import TimeBasePicker from "./TimePicker";
import dayjs from "dayjs";

// initialState = JSON.parse(
//   `[{"day":"Lunes","periods":[{"start":"2022-05-07T03:12:02.500Z","end":"2022-05-06T16:24:00.000Z"},{"start":"2022-05-07T04:12:39.110Z","end":"2022-05-07T04:12:39.110Z"}]},{"day":"Martes","periods":[{"start":"2022-05-06T21:53:25.953Z","end":"2022-05-07T04:17:25.953Z"},{"start":"2022-05-06T23:45:38.302Z","end":"2022-05-06T22:13:38.302Z"},{"start":"2022-05-07T04:18:08.166Z","end":"2022-05-07T04:18:08.166Z"}]},{"day":"Miercoles","periods":[]},{"day":"Jueves","periods":[]},{"day":"Viernes","periods":[]},{"day":"Sabado","periods":[]},{"day":"Domingo","periods":[]}]`
// );

export const SchedulePicker = ({ schedule, setSchedule }) => {
  return (
    <Grid direction="column">
      <Divider color="#A394FF" sx={{ marginBottom: 3, marginTop: 3 }} />
      {schedule.map((day, indexDay) => {
        return (
          <Grid key={indexDay} mt={3} mb={3}>
            <Grid
              container
              key={indexDay}
              direction="row"
              alignItems="center"
              sx={{
                borderColor: "secondary",
                padding: "20px",
                borderRadius: "15px",
              }}
            >
              <Typography item xs={2} variant="h6" mr={5}>
                {day.day}
              </Typography>
              <Grid item container xs={10}>
                {day.periods.map((period, indexPeriod) => {
                  return (
                    <Grid
                      container
                      display="flex"
                      key={indexPeriod}
                      spacing={2}
                      sx={{ width: "100%" }}
                      direction="row"
                      alignItems="center"
                      justifyContent="center"
                      mt={1}
                    >
                      <Grid item xs={2.75}>
                        <Typography variant="body">
                          Periodo #{indexPeriod + 1}:
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <TimeBasePicker
                          label={"Hora de inicio"}
                          dayIdx={indexDay}
                          periodIdx={indexPeriod}
                          setSchedule={setSchedule}
                          isStart={true}
                          initialDate={period.start}
                        />
                      </Grid>
                      {/* <Typography variant="body">Fin</Typography> */}
                      <Grid item xs={4}>
                        <TimeBasePicker
                          label={"Hora de fin"}
                          dayIdx={indexDay}
                          periodIdx={indexPeriod}
                          setSchedule={setSchedule}
                          isStart={false}
                          initialDate={period.end}
                        />
                      </Grid>
                      <Grid item xs={1.25}>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => {
                            let newSchedule = [...schedule];
                            let currentDay = newSchedule[indexDay];
                            // delete the period from the current day
                            currentDay.periods.splice(indexPeriod, 1);
                            console.log(newSchedule);

                            console.log(schedule);
                            setSchedule(newSchedule);
                            // currentDay.periods.push({
                            // setSchedule([...schedule, { day: day, periods: [...periods, {start: "12:00", end: "13:00"}] }]);
                          }}
                        >
                          Eliminar
                        </Button>
                      </Grid>
                    </Grid>
                  );
                })}
                <Button
                  variant="contained"
                  sx={{
                    marginTop: 3,
                    textTransform: "none",
                    borderRadius: "25px",
                  }}
                  onClick={() => {
                    let newSchedule = [...schedule];
                    let currentDay = newSchedule[indexDay];
                    currentDay.periods.push({
                      start: dayjs(),
                      end: dayjs(),
                    });
                    console.log(newSchedule);
                    console.log(newSchedule);

                    console.log(schedule);
                    setSchedule(newSchedule);
                    // console.log(JSON.stringify(schedule));
                    // currentDay.periods.push({
                    // setSchedule([...schedule, { day: day, periods: [...periods, {start: "12:00", end: "13:00"}] }]);
                  }}
                >
                  + Agregar Periodo de Tiempo
                </Button>
              </Grid>
            </Grid>
            <Divider color="#A394FF" sx={{ marginTop: 3 }} />
          </Grid>
        );
      })}
    </Grid>
  );
};
