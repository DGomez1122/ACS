import { Box, Button, Grid, LinearProgress, Typography } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { DataGrid, esES } from "@mui/x-data-grid";
import axios from "axios";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import CustomizedTableByType from "../../components/CustomizedTableByType";
import { DashboardPage } from "../../components/DashboardPage";
import { PieChart } from "../../components/PieChart";
import { StyledTextField } from "../../theme/theme";

let defaultOp = [
  {
    _id: "",
    id: "",
    name: "",
    location: "",
  },
];

const columns = [
  { field: "id", headerName: "ID", width: 100, type: "string" },
  { field: "name", headerName: "Nombre", width: 160, type: "string" },
  {
    field: "outsorced",
    headerName: "Subcontratado",
    type: "boolean",
    width: 150,
  },
  {
    field: "location",
    headerName: "Localización",
    sortable: false,
    type: "string",
    width: 150,
  },
];

export default function ParkingStats() {
  const [rows, setRows] = React.useState([]);
  const [rows2, setRows2] = React.useState([]);
  const [parkingLotList, setParkingLotList] = React.useState([]);
  const [selectedRow, setSelectedRow] = React.useState([]);
  const [uiState, setUiState] = React.useState("loading");
  const [data, setData] = React.useState({});

  document.title = "Estadísticas de estacionamientos";

  React.useEffect(() => {
    let jsons = new Array();
    axios
      .get(`http://localhost:9000/api/parkingLot`)
      .then((res) => {
        let result = [];
        for (let i = 0; i < res.data.length; i++) {
          let newParkingLot = {
            id: res.data[i].id,
            name: res.data[i].name,
            location: res.data[i].location,
            outsorced: false,
          };
          result.push(newParkingLot);
          setParkingLotList((prev) => [...prev, res.data[i]]);
          setSelectedRow([res.data[i]]);
        }
        setRows(result);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`http://localhost:9000/api/outsourcedParkingLot`)
      .then((res2) => {
        let result2 = [];
        for (let i = 0; i < res2.data.length; i++) {
          let newParkingLot2 = {
            id: res2.data[i].id,
            name: res2.data[i].name,
            location: res2.data[i].location,
            outsorced: true,
          };
          result2.push(newParkingLot2);
          setParkingLotList((prev) => [...prev, res2.data[i]]);
          setSelectedRow([res2.data[i]]);
        }
        setRows2(result2);
      })
      .catch((err2) => {
        console.log(err2);
      });
  }, []);

  React.useEffect(() => {
    (async () => {
      let { department: userDepartment, empType } = JSON.parse(
        localStorage.getItem("user")
      );
      console.log(selectedRow);

      if (!selectedRow[0]?.id) return;
      let response;
      if (selectedRow[0]?.empType === "Jefatura") {
        response = await axios.get(
          `http://localhost:9000/api/statistics/occupiedBySpace/${selectedRow[0]?.id}/${userDepartment}`
        );
      } else {
        response = await axios.get(
          `http://localhost:9000/api/statistics/occupiedBySpace/${selectedRow[0]?.id}`
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
  }, [selectedRow]);

  //   React.useEffect(() => {
  //     console.log(selectedRow);
  //   }, [selectedRow]);

  return (
    <DashboardPage>
      <Box
        sx={{
          backgroundColor: "background.default",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          height: "100%",
          width: "90vw",
          maxWidth: "90vw",
        }}
      >
        <Box
          maxWidth="sm"
          sx={{
            margin: "0 auto",
            padding: 0,
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            width: "90vw",
            maxWidth: "90vw",
          }}
        >
          <Box sx={{ mb: 1, margin: "0 auto" }}>
            <Typography color="textPrimary" variant="h2">
              Estadísticas de estacionamientos
            </Typography>
          </Box>

          <Grid container>
            <Grid item xs={4}>
              <Box sx={{ minWidth: 70 }} mt={3}>
                <div style={{ height: 300, width: "100%" }}>
                  <Typography color="textPrimary" variant="h5">
                    Estacionamientos internos
                  </Typography>
                  <DataGrid
                    localeText={
                      esES.components.MuiDataGrid.defaultProps.localeText
                    }
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    onSelectionModelChange={(ids) => {
                      const selectedIDs = new Set(ids);
                      const selectedRowData = rows.filter((row) =>
                        selectedIDs.has(row.id.toString())
                      );
                      console.log("selectedRowData", selectedRowData);
                      console.log(parkingLotList);
                      setSelectedRow([
                        parkingLotList.find((parkingLot) => {
                          return selectedRowData[0].id == parkingLot.id;
                        }),
                      ]);
                    }}
                  />
                </div>
              </Box>
              <Box sx={{ minWidth: 70, mt: 5 }}>
                <div style={{ height: 300, width: "100%" }}>
                  <Typography color="textPrimary" variant="h5">
                    Estacionamientos Subcontratados
                  </Typography>
                  <DataGrid
                    localeText={
                      esES.components.MuiDataGrid.defaultProps.localeText
                    }
                    rows={rows2}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    onSelectionModelChange={(ids) => {
                      const selectedIDs = new Set(ids);
                      const selectedRowData = rows2.filter((row) =>
                        selectedIDs.has(row.id.toString())
                      );
                      setSelectedRow([
                        parkingLotList.find((parkingLot) => {
                          return selectedRowData[0].id == parkingLot.id;
                        }),
                      ]);
                    }}
                  />
                </div>
              </Box>
            </Grid>
            <Grid
              item
              xs={8}
              justifyContent="center"
              alignItems="center"
              direction={"column"}
              mt={5}
            >
              <Grid item>
                <Typography
                  color="textPrimary"
                  variant="h5"
                  textAlign={"center"}
                >
                  Distribución de los espacios
                </Typography>
              </Grid>
              <Grid item sx={{ margin: "0 auto" }}>
                <CustomizedTableByType
                  keys={[
                    "Oficiales",
                    "Discapacidad",
                    "Jefaturas",
                    "Visitantes",
                    "Estandar",
                    "Total",
                  ]}
                  values={(() => {
                    let values = [
                      selectedRow[0]?.officialVehicles || 0,
                      selectedRow[0]?.specialFields || 0,
                      selectedRow[0]?.leadershipFields || 0,
                      selectedRow[0]?.visitors || 0,
                      selectedRow[0]?.generalUsers || 0,
                    ];
                    values.push(values.reduce((a, b) => a + b, 0));
                    // console.log("values", values);
                    return values;
                  })()}
                  keysHeader={"Tipo de espacio"}
                  valuesHeader={"Campos"}
                />
              </Grid>
              <Grid item mt={5} mb={5}>
                <Typography
                  color="textPrimary"
                  variant="h5"
                  textAlign={"center"}
                >
                  Ocupación por tipo de espacio
                </Typography>
              </Grid>

              <Grid item>
                {uiState === "loaded" ? (
                  <Grid
                    container
                    direction={"column"}
                    justifyContent={"center"}
                    width="50vw"
                    sx={{ margin: "0 auto" }}
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
                  <Grid
                    item
                    sx={{ width: "20vw", margin: "0 auto", marginTop: 5 }}
                  >
                    <LinearProgress color="secondary" />
                  </Grid>
                )}
              </Grid>
            </Grid>
            {/* <Box sx={{ minWidth: 120, mt: 5 }}>
              <StyledTextFeield
                fullWidth
                label="Estacionamiento escogido"
                margin="normal"
                name="parkinglot"
                value={
                  selectedRow[0] === undefined
                    ? ""
                    : selectedRow[0].id + " - " + selectedRow[0].name
                }
                variant="outlined"
                color=""
                InputProps={{
                  readOnly: true,
                }}
              />
            </Box> */}

            {/* <Box sx={{ py: 2 }}>
            <Button
              disable={isSubmitting ? 1 : 0}
              color="primary"
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              Registrar operador
            </Button>
          </Box> */}
          </Grid>
        </Box>
      </Box>
    </DashboardPage>
  );
}
