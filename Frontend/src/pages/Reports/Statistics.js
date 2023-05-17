import * as React from "react";
import { Chart } from "../../components/Chart";
import { DashboardPage } from "../../components/DashboardPage";
// import WeekPicker from "../components/WeekPicker";
import AdapterDayjs from "@mui/lab/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import {
  Box,
  TextField,
  Grid,
  Typography,
  Button,
  LinearProgress,
  ButtonGroup,
} from "@mui/material";
import { StyledTextField } from "../../theme/theme";
import CustomizedTables from "../../components/CustomizedTable";
import { useEffect } from "react";
import axios from "axios";
import { HeatMap } from "../../components/HeatMap";
import { BarChart } from "../../components/BarChart";
import { useState } from "react";

let initialState = [
  { day: "22/05/2022", value: 37 },
  { day: "23/05/2022", value: 21 },
  { day: "24/05/2022", value: 45 },
  { day: "25/05/2022", value: 59 },
  { day: "26/05/2022", value: 42 },
];

let labels = [
  "1-2:59am",
  "3-4:59am",
  "5-6:59am",
  "7-8:59am",
  "9-10:59am",
  "11-12:59pm",
  "1-2:59pm",
  "3-4:59pm",
  "5-6:59pm",
  "7-8:59pm",
  "9-10:59pm",
  "11-12:59am",
];

const listToLists = (obj) => {
  let daysList = [];
  let valuesList = [];
  for (let element of obj) {
    daysList.push(element.day);
    valuesList.push(element.value);
  }
  return [daysList, valuesList];
};

// const chartTypes = {
//   line: 0,
//   horizontalBar: 1,
//   verticalBar: 2,
// };

const chartTypes = ["Lineas", "Barras Horizontales", "Barras Verticales"];

export const Statistics = () => {
  const [selectedTypeGraph, setSelectedTypeGraph] = useState(0);
  const [uiState, setUiState] = React.useState("loading");
  const [stats, setStats] = React.useState(initialState);
  document.title = "Estadisticas";
  const [value, setValue] = React.useState(new Date("2014-08-18T21:11:54"));

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    (async () => {
      let { department, empType } = JSON.parse(localStorage.getItem("user"));
      try {
        let response;
        if (empType === "Jefatura") {
          console.log("JEFATURA");
          response = await axios.get(
            `http://localhost:9000/api/statistics/usersPerDayDepartment/${department}`
          );
        } else {
          console.log("ADMIN");
          response = await axios.get(
            "http://localhost:9000/api/statistics/usersPerDay"
          );
        }
        console.log(response.data);

        setStats(response.data);
      } catch (error) {
        console.log(error);
      }
      setUiState("loaded");
    })();
  }, []);

  return (
    <DashboardPage>
      <Box>
        <Typography
          variant="h3"
          mb={4}
          sx={{ marginBottom: 6, width: "100%", textAlign: "center" }}
        >
          Espacios ocupados por franja horaria
        </Typography>
        {uiState == "loaded" ? (
          <Box>
            <Box>
              <Grid
                container
                alignContent={"center"}
                justifyContent={"center"}
                mb={5}
              >
                <Grid
                  xs={1.5}
                  item
                  container
                  alignContent={"center"}
                  justifyContent={"center"}
                >
                  <Typography>Tipo de gráfico: </Typography>
                </Grid>
                <Grid item>
                  <ButtonGroup
                    variant="outlined"
                    aria-label="outlined button group"
                  >
                    {chartTypes.map((type, index) => (
                      <Button
                        key={index}
                        onClick={() => setSelectedTypeGraph(index)}
                        sx={
                          selectedTypeGraph !== index
                            ? {
                                color: "white",
                                borderColor: "#A394FF",
                              }
                            : {
                                color: "black",
                                borderColor: "#A394FF",
                                backgroundColor: "#A394FF",
                                "&:hover": {
                                  color: "white",
                                  backgroundColor: "#A394FF",
                                },
                              }
                        }
                      >
                        {type}
                      </Button>
                    ))}
                    {/* <Button sx={{ color: "white", borderColor: "#A394FF" }}>
                      Lineas
                    </Button>
                    <Button sx={{ color: "white", borderColor: "#A394FF" }}>
                      Barras horizontales
                    </Button> */}
                    {/* <Button
                    {...(selectedTypeGraph === chartTypes.verticalBar) && {
                      sx={{
                        color: "black",
                        borderColor: "#A394FF",
                        backgroundColor: "#A394FF",
                        "&:hover": {
                          color: "white",
                          backgroundColor: "#A394FF",
                        },
                      }}
                    }
                    }

                      
                    >
                      Barras verticales
                    </Button> */}
                    {/* color: "black",
                    borderColor: "#A394FF",
                  backgroundColor: "#A394FF", */}
                  </ButtonGroup>
                </Grid>
              </Grid>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                {/* <Grid
              container
              flexGrow={"unset"}
              justifyContent="center"
              width="100%"
              alignItems="center"
              mb={4}
              >
              <Grid item xs={1.65}>
              <Typography variant="h5">Rango de Fechas: </Typography>
              </Grid>
              <Grid item xs={2}>
                <DatePicker
                label="Fecha de Inicio"
                value={value}
                onChange={handleChange}
                renderInput={(params) => (
                  <StyledTextField className="time-input" {...params} />
                  )}
                  />
                  </Grid>
                  <Grid item xs={2}>
                  <DatePicker
                  label="Fecha de Fin"
                  value={value}
                  onChange={handleChange}
                  xs={{ marginLeft: 3 }}
                  renderInput={(params) => (
                    <StyledTextField
                    className="time-input"
                    xs={{ marginLeft: 3 }}
                    {...params}
                    />
                    )}
                    />
                    </Grid>
                    <Grid item xs={1.5}>
                    <Button color="success" variant="contained">
                    Mostrar Grafico
                    </Button>
                    </Grid>
                  </Grid> */}
              </LocalizationProvider>
            </Box>
            <Box sx={{ backgroundColor: "", margin: "0 auto" }}>
              {selectedTypeGraph === 0 ? (
                <Chart yAxis={stats} xAxis={labels} />
              ) : selectedTypeGraph === 1 ? (
                <BarChart horizontal yAxis={stats} xAxis={labels} />
              ) : (
                <BarChart yAxis={stats} xAxis={labels} />
              )}
              {/* <HeatMap values={stats} /> */}
            </Box>
            <Box>
              <CustomizedTables tableRows={stats} />
            </Box>
          </Box>
        ) : (
          <LinearProgress color="secondary" />
        )}
      </Box>
    </DashboardPage>
  );
};
