import * as React from "react";
import { DashboardPage } from "../../components/DashboardPage";

import {
  Box,
  Grid,
  LinearProgress,
  listItemTextClasses,
  Typography,
} from "@mui/material";
import { PieChart } from "../../components/PieChart";
import axios from "axios";
import CustomizedTables from "../../components/CustomizedTable";
import CustomizedTableByType from "../../components/CustomizedTableByType";
import { SelectParkingLot } from "./SelectParkingLot";

export const OccupationByDepartment = () => {
  const [uiState, setUiState] = React.useState("loading");
  const [parkingLotId, setParkingLotId] = React.useState(null);
  const [data, setData] = React.useState({});

  React.useEffect(() => {
    (async () => {
      let { department: userDepartment, empType } = JSON.parse(
        localStorage.getItem("user")
      );
      try {
        console.log("CURRENT PARKING LOT: ", parkingLotId);
        if (!parkingLotId) return;

        let generalTotal = 0;
        let idx = 0;
        let labels = [];
        let values = [];
        if (empType === "Jefatura") {
          labels.push(userDepartment);
          const response = await axios.get(
            `http://localhost:9000/api/statistics/occupiedByDepartment/${parkingLotId}/${userDepartment}`
          );
          // console.log(`RESPONSE FOR ${userDepartment}: `, response);
          const value = response.data.departmentTotal;
          generalTotal = response.data.total;
          // console.log(spacesObj);
          values[idx] = value;
          idx++;
          labels.push("Otros/No aplica");
        } else {
          const departmentsResponse = await axios.post(
            "http://localhost:9000/api/employee/allDepartments"
          );

          const departments = departmentsResponse.data;
          console.log(departmentsResponse);
          labels = departments;
          values = [];

          for (const department of departments) {
            const response = await axios.get(
              `http://localhost:9000/api/statistics/occupiedByDepartment/${parkingLotId}/${department}`
            );
            console.log(`RESPONSE FOR ${department}: `, response);
            const value = response.data.departmentTotal;
            generalTotal = response.data.total;
            // console.log(spacesObj);
            values[idx] = value;
            idx++;
          }
          labels.push("No aplica");
        }

        values[idx] = generalTotal - values.reduce((a, b) => a + b, 0);
        console.log({ labels, values });

        setData({
          labels,
          values,
        });

        // console.log("result: ", { labels, values });
      } catch (err) {
        console.log(err);
        console.log("ERROR CARGANDO LA INFORMACION");
      }
      setUiState("loaded");
    })();
    // fetch
    // setUiState("loaded");
  }, [parkingLotId]);

  document.title = "Estadisticas";

  return (
    <DashboardPage>
      <Box sx={{ width: "70vw" }}>
        <Typography
          variant="h3"
          mb={4}
          sx={{ marginBottom: 6, width: "100%", textAlign: "center" }}
        >
          Ocupación por departamento
        </Typography>
        {!parkingLotId ? (
          <Box sx={{}}>
            <Typography
              sx={{ width: "100%", textAlign: "center" }}
              variant="h4"
              mb={6}
            >
              Seleccione el estacionamiento
            </Typography>
            <SelectParkingLot onClick={setParkingLotId} />
          </Box>
        ) : (
          <Box
            sx={{
              margin: "0 auto",
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {uiState === "loaded" ? (
              <Grid
                container
                direction={"column"}
                justifyContent={"center"}
                width="50vw"
              >
                <Grid item pl={15}>
                  <PieChart labels={data.labels} values={data.values} />
                </Grid>
                <Grid item width="80%" margin="0 auto">
                  <CustomizedTableByType
                    keys={[...data.labels, "Total"]}
                    values={[
                      ...data.values,
                      data.values.reduce((a, b) => a + b, 0),
                    ]}
                    keysHeader={"Departamento"}
                    valuesHeader={"Ocupaciones"}
                  />
                </Grid>
              </Grid>
            ) : (
              <Grid sx={{ width: "50vw" }}>
                <Grid item>
                  <LinearProgress color="secondary" />
                </Grid>
              </Grid>
            )}
          </Box>
        )}
      </Box>
    </DashboardPage>
  );
};
