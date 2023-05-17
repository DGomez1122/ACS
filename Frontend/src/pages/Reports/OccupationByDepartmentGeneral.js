import * as React from "react";
import { DashboardPage } from "../../components/DashboardPage";

import { Box, Grid, LinearProgress, Typography } from "@mui/material";
import { PieChart } from "../../components/PieChart";
import axios from "axios";
import CustomizedTables from "../../components/CustomizedTable";
import CustomizedTableByType from "../../components/CustomizedTableByType";
import { SelectParkingLot } from "./SelectParkingLot";

export const OccupationByDepartmentGeneral = () => {
  const [uiState, setUiState] = React.useState("loading");
  const [data, setData] = React.useState({});

  React.useEffect(() => {
    (async () => {
      let { department: userDepartment, empType } = JSON.parse(
        localStorage.getItem("user")
      );

      try {
        const parkingLotIds = [];

        const generalParkingLots = await axios.get(
          "http://localhost:9000/api/parkingLot"
        );

        generalParkingLots.data.forEach((parkingLot) => {
          parkingLotIds.push(parkingLot.id);
        });
        // console.log("LOADING PARKING LOTS");

        const outsourcedParkingLots = await axios.get(
          "http://localhost:9000/api/outsourcedParkingLot"
        );

        outsourcedParkingLots.data.forEach((parkingLot) => {
          parkingLotIds.push(parkingLot.id);
        });

        // console.log(parkingLotIds);
        let idx = 0;
        let labels = [];
        let values = [];
        let totalOccupation = 0;

        if (empType === "Jefatura") {
          labels.push(userDepartment);
          for (let parkingLot of parkingLotIds) {
            idx = 0;
            const response = await axios.get(
              `http://localhost:9000/api/statistics/occupiedByDepartment/${parkingLot}/${userDepartment}`
            );
            const value = response.data.departmentTotal;
            totalOccupation += response.data.total;
            if (values[idx] === undefined) {
              values[idx] = value;
            } else {
              values[idx] += value;
            }
            idx++;
          }
          labels.push("Otros/No aplica");
        } else {
          const departmentsResponse = await axios.post(
            "http://localhost:9000/api/employee/allDepartments"
          );

          // console.log(departmentsResponse);

          const departments = departmentsResponse.data;
          labels = departments;
          values = [];

          for (let parkingLot of parkingLotIds) {
            idx = 0;
            let parkingTotal = 0;
            for (const department of departments) {
              const response = await axios.get(
                `http://localhost:9000/api/statistics/occupiedByDepartment/${parkingLot}/${department}`
              );

              console.log(response);
              // console.log(`RESPONSE FOR ${department}: `, response);
              const value = response.data.departmentTotal;
              parkingTotal = response.data.total;
              // console.log(spacesObj);
              // check if idx is in the array
              if (values[idx] === undefined) {
                values[idx] = value;
              } else {
                values[idx] += value;
              }
              // values[idx] = values[idx] + value;
              idx++;
            }
            totalOccupation += parkingTotal;
          }
          labels.push("No aplica");
        }

        // console.log(departmentsResponse);

        values[idx] = totalOccupation - values.reduce((a, b) => a + b, 0);

        console.log({ labels, values });

        setData({
          labels,
          values,
        });

        // console.log("result: ", { labels, values });
      } catch (err) {
        // console.log("ERROR CARGANDO LA INFORMACION");
        console.log(err);
      }
      setUiState("loaded");
    })();
    // fetch
    // setUiState("loaded");
  }, []);

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

        {uiState === "loaded" ? (
          <Grid
            container
            direction={"column"}
            justifyContent={"center"}
            width="50vw"
            sx={{ margin: "0 auto" }}
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
          <Grid sx={{ width: "50vw", margin: "0 auto" }}>
            <Grid item>
              <LinearProgress color="secondary" />
            </Grid>
          </Grid>
        )}
      </Box>
    </DashboardPage>
  );
};
