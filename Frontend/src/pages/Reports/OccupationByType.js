import * as React from "react";
import { DashboardPage } from "../../components/DashboardPage";

import { Box, Grid, LinearProgress, Typography } from "@mui/material";
import { PieChart } from "../../components/PieChart";
import axios from "axios";
import CustomizedTables from "../../components/CustomizedTable";
import CustomizedTableByType from "../../components/CustomizedTableByType";
import { SelectParkingLot } from "./SelectParkingLot";

export const OccupationByType = () => {
  const [uiState, setUiState] = React.useState("loading");
  const [parkingLotId, setParkingLotId] = React.useState(null);
  const [data, setData] = React.useState({});

  React.useEffect(() => {
    (async () => {
      let { department: userDepartment, empType } = JSON.parse(
        localStorage.getItem("user")
      );

      if (!parkingLotId) return;
      let response;
      if (empType === "Jefatura") {
        response = await axios.get(
          `http://localhost:9000/api/statistics/occupiedBySpace/${parkingLotId}/${userDepartment}`
        );
      } else {
        response = await axios.get(
          `http://localhost:9000/api/statistics/occupiedBySpace/${parkingLotId}`
        );
      }

      const spacesObj = response.data;
      console.log(spacesObj);
      const labels = [];
      const values = [];

      labels.push("Oficiales");
      values.push(spacesObj.officialTotal);

      labels.push("Discapacidad");
      values.push(spacesObj.specialTotal);

      labels.push("Jefaturas");
      values.push(spacesObj.leadershipTotal);

      labels.push("Visitantes");
      values.push(spacesObj.visitorTotal);

      labels.push("Estandar");
      values.push(spacesObj.generalTotal);

      if (empType === "Jefatura") {
        labels.push("Otro departamento/No aplica");
        values.push(spacesObj.totalOverall - values.reduce((a, b) => a + b, 0));

        labels.push("Total");
        values.push(spacesObj.totalOverall);
      }
      setData({
        labels,
        values,
      });

      console.log("result: ", { labels, values });
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
          Ocupación por tipo de espacio
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
                  <PieChart
                    labels={
                      JSON.parse(localStorage.getItem("user")).empType !==
                      "Jefatura"
                        ? data.labels
                        : data.labels.slice(0, -1)
                    }
                    values={
                      JSON.parse(localStorage.getItem("user")).empType !==
                      "Jefatura"
                        ? data.values
                        : data.values.slice(0, -1)
                    }
                  />
                </Grid>
                <Grid item width="80%" margin="0 auto">
                  <CustomizedTableByType
                    keys={
                      JSON.parse(localStorage.getItem("user")).empType !==
                      "Jefatura"
                        ? [...data.labels, "Total"]
                        : data.labels
                    }
                    values={
                      JSON.parse(localStorage.getItem("user")).empType !==
                      "Jefatura"
                        ? [
                            ...data.values,
                            data.values.reduce((a, b) => a + b, 0),
                          ]
                        : data.values
                    }
                    keysHeader={"Tipo de espacio"}
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

        {/* {uiState === "loaded" ? (
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
                keysHeader={"Tipo de espacio"}
                valuesHeader={"Ocupaciones"}
              />
            </Grid>
          </Grid>
        ) : (
          <LinearProgress color="secondary" />
        )} */}
      </Box>
    </DashboardPage>
  );
};
