import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";
import { DataGrid, esES } from "@mui/x-data-grid";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { StyledTextField } from "../../theme/theme";
import { DashboardPage } from "../../components/DashboardPage";
const drawerWidth = 240;

const columns = [
  { field: "id", headerName: "ID", width: 130, type: "string" },
  { field: "name", headerName: "Nombre", width: 220, type: "string" },
  { field: "location", headerName: "Locación", width: 220, type: "string" },
  { field: "accessInfo", headerName: "Acceso", width: 220, type: "string" },
  {
    field: "officialVehicles",
    headerName: "Oficial",
    width: 80,
    type: "string",
  },
  {
    field: "leadershipFields",
    headerName: "Jefatura",
    width: 80,
    type: "string",
  },
  { field: "generalUsers", headerName: "General", width: 80, type: "string" },
  { field: "visitors", headerName: "Visitas", width: 80, type: "string" },
  {
    field: "specialFields",
    headerName: "Discapacitados",
    width: 130,
    type: "string",
  },
];

const columns2 = [
  { field: "id", headerName: "ID", width: 100, type: "string" },
  { field: "name", headerName: "Nombre", width: 160, type: "string" },
  { field: "location", headerName: "Locación", width: 160, type: "string" },
  { field: "accessInfo", headerName: "Acceso", width: 160, type: "string" },
  {
    field: "officialVehicles",
    headerName: "Oficial",
    width: 80,
    type: "string",
  },
  {
    field: "leadershipFields",
    headerName: "Jefatura",
    width: 80,
    type: "string",
  },
  { field: "generalUsers", headerName: "General", width: 80, type: "string" },
  { field: "visitors", headerName: "Visitas", width: 80, type: "string" },
  {
    field: "specialFields",
    headerName: "Discapacitados",
    width: 130,
    type: "string",
  },
  {
    field: "admiName",
    headerName: "Administrador",
    width: 140,
    type: "string",
  },
  {
    field: "admiPhone",
    headerName: "Teléfono",
    width: 110,
    type: "string",
  },
];

export default function ParkingListInfo() {
  document.title = "Parqueos";
  const user = JSON.parse(localStorage.getItem("user"));
  const [open, setOpen] = React.useState(false);
  const [parkingList, setParkingList] = React.useState([]);
  const [outsourcedParkingList, setOutsourcedParkingList] = React.useState([]);
  const [rows, setRows] = React.useState([]);

  const [selectedRow, setSelectedRow] = React.useState([{ shift: "" }]);
  const [rows2, setRows2] = React.useState([]);

  const parseShift = (shift) => {
    try {
      let result = "";
      var obj = JSON.parse(shift);

      for (let i = 0; i < obj.length; i++) {
        if (obj[i].periods.length > 0) {
          result += obj[i].day;
          result += ": ";
          for (let y = 0; y < obj[i].periods.length; y++) {
            result += dayjs(obj[i].periods[y].start).format("h:mm A");
            result += " - ";
            result += dayjs(obj[i].periods[y].end).format("h:mm A");

            if (y !== obj[i].periods.length - 1) {
              result += ", ";
            }
          }
          result += "\n";
        }
      }
      console.log(result);
      return result;
    } catch {}
  };

  React.useEffect(() => {
    let jsons = new Array();
    axios
      .get(`http://localhost:9000/api/parkingLot`)
      .then((res) => {
        setRows(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`http://localhost:9000/api/outsourcedParkingLot`)
      .then((res2) => {
        setRows2(res2.data);
      })
      .catch((err2) => {
        console.log(err2);
      });
  }, []);

  const navigate = useNavigate();

  return (
    <DashboardPage>
      <Box
        className="login-container"
        sx={{
          backgroundColor: "background.default",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          width: "70%",
          maxWidth: "70%",
          margin: "0 auto",
          // py: 20
        }}
      >
        <Box sx={{ minWidth: 120 }} mt={3}>
          <div style={{ height: 400, width: 1300 }}>
            <Typography color="textPrimary" variant="h5">
              Estacionamientos Internos
            </Typography>
            <DataGrid
              localeText={esES.components.MuiDataGrid.defaultProps.localeText}
              rows={rows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              onSelectionModelChange={(ids) => {
                const selectedIDs = new Set(ids);
                const selectedRowData = rows.filter((row) =>
                  selectedIDs.has(row.id.toString())
                );
                setSelectedRow(selectedRowData);
              }}
            />
          </div>
          <Box sx={{ minWidth: 120 }} mt={7}>
            <div style={{ height: 400, width: 1300 }}>
              <Typography color="textPrimary" variant="h5">
                Estacionamientos Subcontratados
              </Typography>
              <DataGrid
                localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                rows={rows2}
                columns={columns2}
                pageSize={5}
                rowsPerPageOptions={[5]}
                onSelectionModelChange={(ids) => {
                  const selectedIDs = new Set(ids);
                  const selectedRowData = rows2.filter((row) =>
                    selectedIDs.has(row.id.toString())
                  );
                  setSelectedRow(selectedRowData);
                  console.log(selectedRowData);
                }}
              />
            </div>
          </Box>
          <Box sx={{ minWidth: 120 }} mt={7}>
            <StyledTextField
              fullWidth
              label="Horario del parqueo seleccionado"
              margin="normal"
              multiline
              name="shift"
              style={{ whiteSpace: "pre-line" }}
              value={parseShift(selectedRow[0].shift) || ""}
              variant="outlined"
              color=""
              InputProps={{
                readOnly: true,
              }}
            />
          </Box>
        </Box>
      </Box>
    </DashboardPage>
  );
}
