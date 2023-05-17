import { Box, Grid, Slide, Typography } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import axios from "axios";
import dayjs from "dayjs";
import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DashboardPage } from "../components/DashboardPage";
import { SpacePicker } from "../components/SpacePicker";
import { DataGrid, esES } from "@mui/x-data-grid";
import { StyledTextField } from "../theme/theme";
const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const columns = [
  {
    field: "id",
    headerName: "ID",
    width: 80,
    type: "string",
  },
  {
    field: "parkingLotId",
    headerName: "Parqueo ID",
    width: 150,
    type: "string",
  },
  {
    field: "parkingSpaceId",
    headerName: "Espacio ID",
    width: 220,
    type: "string",
  },
  {
    field: "vehiclePlate",
    headerName: "Vehiculo",
    type: "string",
    width: 200,
  },
  {
    field: "date",
    headerName: "Fecha",
    type: "date",
    width: 120,
  },
];

export default function AllReservations() {
  document.title = "Reservas";
  const theme = useTheme();
  const user = JSON.parse(localStorage.getItem("user"));
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    const list = [];
    axios
      .get("http://localhost:9000/api/reservation/getAllPerUser/" + user._id)
      .then((res) => {
        console.log(res.data);
        res.data.forEach((element, index) => {
          list.push({
            id: index + 1,
            parkingLotId: element.parkingLotId,
            parkingSpaceId: element.parkingSpaceId,
            vehiclePlate: element.vehiclePlate,
            date: dayjs(element.date.split(" - ")[0]).format("DD/MM/YYYY"),
          });
        });
        setRows(list);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const navigate = useNavigate();

  const [openDialog, setOpenDialog] = React.useState(false);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <DashboardPage title="Mis reservas">
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
        <Box sx={{ minWidth: 800 }} mt={3}>
          <div style={{ height: 500, width: "100%" }}>
            <Typography color="textPrimary" variant="h5">
              Todas las reservas realizadas
            </Typography>
            <DataGrid
              localeText={esES.components.MuiDataGrid.defaultProps.localeText}
              rows={rows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              sx={{
                boxShadow: 2,
                border: 2,
                borderColor: "primary.light",
                "& .MuiDataGrid-cell:hover": {
                  color: "primary.main",
                },
                "& .MuiDataGrid-booleanCell": {
                  color: "primary.main",
                },
                "& .MuiDataGrid-sortIcon": {
                  color: "primary.contrastText",
                },
                "& .MuiDataGrid-menuIcon": {
                  color: "primary.contrastText",
                },
                "& .MuiDataGrid-menuIconButton": {
                  color: "primary.contrastText",
                },
                "& .MuiDataGrid-filterIcon": {
                  color: "primary.contrastText",
                },
                "& .MuiDataGrid-iconButtonContainer": {
                  color: "primary.main",
                },
                "& .MuiDataGrid-iconSeparator": {
                  color: "primary.main",
                },
                "& .MuiDataGrid-filterFormDeleteIcon": {
                  color: "primary.main",
                },
                "& GridCloseIcon": {
                  color: "primary.main",
                },
                "& .MuiDataGrid-row": {
                  color: "primary.contrastText",
                },
              }}
            />
          </div>
        </Box>
      </Box>
    </DashboardPage>
  );
}
