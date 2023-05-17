import { Box, Typography } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import axios from "axios";
import dayjs from "dayjs";
import { Formik } from "formik";
import * as React from "react";
import { useLocation } from "react-router";
import { useNavigate, useParams } from "react-router-dom";
import { DashboardPage } from "../../components/DashboardPage";
import { StyledTextField } from "../../theme/theme";
import { DataGrid, esES } from "@mui/x-data-grid";
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
    field: "userID",
    headerName: "Usuario",
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
    width: 120,
  },
  {
    field: "date",
    headerName: "Fecha",
    type: "date",
    width: 180,
  },
];

function formatDate(date) {
  var today = date === "" ? new Date() : new Date(date);
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();
  var hh = today.getHours();
  var min = today.getMinutes();
  today = yyyy + "-" + mm + "-" + dd;
  return today + "T" + hh + ":" + min + ":00";
}

export default function ViewParking() {
  let { id } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));
  document.title = "Ver Parqueo";
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const { state } = useLocation();
  const [button, setButton] = React.useState(0);
  const [initialValues, seInitialValues] = React.useState({
    name: "",
    address: "",
    accessInfo: "",
    shift: "",
    totalSpace: "",
    oficialSpace: "",
    leadershipSpace: "",
    usersSpace: "",
    visitorSpace: "",
    disabilitySpace: "",
    schedule: "",
  });

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [open1, setOpen1] = React.useState(false);

  const handleClickOpen = () => {
    setOpen1(true);
  };

  const handleClose = () => {
    setOpen1(false);
    console.log("CERRAR CANCELAR");
  };

  const handleButton = () => {
    setButton(1);
  };

  const navigate = useNavigate();

  const parseShift = (shift) => {
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
  };
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    if (user.outsourcedParkingLot) {
      axios
        .get(`http://localhost:9000/api/outsourcedParkingLot/${id}`)
        .then((res) => {
          const data = res.data;
          seInitialValues({
            admiName: data.admiName,
            admiPhone: data.admiPhone,
            name: data.name,
            address: data.location,
            accessInfo: data.accessInfo,
            shift: data.shift,
            totalSpace:
              data.officialVehicles +
              data.leadershipFields +
              data.generalUsers +
              data.visitors +
              data.specialFields,
            oficialSpace: data.officialVehicles,
            leadershipSpace: data.leadershipFields,
            usersSpace: data.generalUsers,
            visitorSpace: data.visitors,
            disabilitySpace: data.specialFields,
            schedule: parseShift(data.shift),
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .get(`http://localhost:9000/api/parkingLot/${id}`)
        .then((res) => {
          const data = res.data;
          seInitialValues({
            name: data.name,
            address: data.location,
            accessInfo: data.accessInfo,
            shift: data.shift,
            totalSpace:
              data.officialVehicles +
              data.leadershipFields +
              data.generalUsers +
              data.visitors +
              data.specialFields,
            oficialSpace: data.officialVehicles,
            leadershipSpace: data.leadershipFields,
            usersSpace: data.generalUsers,
            visitorSpace: data.visitors,
            disabilitySpace: data.specialFields,
            schedule: parseShift(data.shift),
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
    const list = [];
    axios
      .get("http://localhost:9000/api/reservation/getAll/" + id)
      .then((res) => {
        console.log(res.data);
        res.data.forEach((element, index) => {
          let reservationDate = formatDate(element.date);
          let currentDate = formatDate("");
          if (reservationDate > currentDate) {
            console.log("hola:", reservationDate);
            list.push({
              id: index + 1,
              userID: element.userId,
              parkingSpaceId: element.parkingSpaceId,
              vehiclePlate: element.vehiclePlate,
              date: element.date,
            });
          }
        });
        setRows(list);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
        <Box maxWidth="sm">
          <Formik enableReinitialize initialValues={initialValues}>
            {({ errors, touched, values }) => (
              <form>
                <Box sx={{ mb: 1 }}>
                  <Typography color="textPrimary" variant="h2">
                    Ver Parqueo
                  </Typography>
                </Box>
                {user.outsourcedParkingLot ? (
                  <>
                    <StyledTextField
                      InputProps={{
                        readOnly: true,
                      }}
                      error={Boolean(touched.admiName && errors.admiName)}
                      fullWidth
                      helperText={touched.admiName && errors.admiName}
                      label="Nombre de Administrador"
                      margin="normal"
                      name="admiName"
                      value={values.admiName || " prueba"}
                      variant="outlined"
                      color=""
                    />
                    <StyledTextField
                      InputProps={{
                        readOnly: true,
                      }}
                      error={Boolean(touched.admiPhone && errors.admiPhone)}
                      fullWidth
                      helperText={touched.admiPhone && errors.admiPhone}
                      label="Numero telefonico del Administrador"
                      margin="normal"
                      name="adminPhone"
                      value={values.admiPhone || " prueba"}
                      variant="outlined"
                      color=""
                    />
                  </>
                ) : (
                  <></>
                )}
                <StyledTextField
                  InputProps={{
                    readOnly: true,
                  }}
                  error={Boolean(touched.name && errors.name)}
                  fullWidth
                  helperText={touched.name && errors.name}
                  label="Nombre de Parqueo"
                  margin="normal"
                  name="name"
                  value={values.name}
                  variant="outlined"
                  color=""
                />
                <StyledTextField
                  InputProps={{
                    readOnly: true,
                  }}
                  fullWidth
                  label="Dirección"
                  margin="normal"
                  name="address"
                  value={values.address}
                  variant="outlined"
                  color=""
                />
                <StyledTextField
                  InputProps={{
                    readOnly: true,
                  }}
                  fullWidth
                  label="Información de Acceso"
                  margin="normal"
                  name="accessInfo"
                  value={values.accessInfo}
                  variant="outlined"
                  color=""
                />
                <StyledTextField
                  InputProps={{
                    readOnly: true,
                  }}
                  error={Boolean(touched.totalSpace && errors.totalSpace)}
                  fullWidth
                  type="number"
                  helperText={touched.totalSpace && errors.totalSpace}
                  label="Total de espacios"
                  margin="normal"
                  name="totalSpace"
                  value={values.totalSpace}
                  variant="outlined"
                  color=""
                />
                <StyledTextField
                  InputProps={{
                    readOnly: true,
                  }}
                  error={Boolean(touched.oficialSpace && errors.oficialSpace)}
                  fullWidth
                  type="number"
                  helperText={touched.oficialSpace && errors.oficialSpace}
                  label="Total de espacios de oficiales"
                  margin="normal"
                  name="oficialSpace"
                  value={values.oficialSpace}
                  variant="outlined"
                  color=""
                />
                <StyledTextField
                  InputProps={{
                    readOnly: true,
                  }}
                  error={Boolean(
                    touched.leadershipSpace && errors.leadershipSpace
                  )}
                  fullWidth
                  type="number"
                  helperText={touched.leadershipSpace && errors.leadershipSpace}
                  label="Total de espacios de jefatura"
                  margin="normal"
                  name="leadershipSpace"
                  value={values.leadershipSpace}
                  variant="outlined"
                  color=""
                />
                <StyledTextField
                  InputProps={{
                    readOnly: true,
                  }}
                  error={Boolean(touched.usersSpace && errors.usersSpace)}
                  fullWidth
                  type="number"
                  helperText={touched.usersSpace && errors.usersSpace}
                  label="Total de espacios de usuarios generales"
                  margin="normal"
                  name="usersSpace"
                  value={values.usersSpace}
                  variant="outlined"
                  color=""
                />
                <StyledTextField
                  InputProps={{
                    readOnly: true,
                  }}
                  error={Boolean(touched.visitorSpace && errors.visitorSpace)}
                  fullWidth
                  type="number"
                  helperText={touched.visitorSpace && errors.visitorSpace}
                  label="Total de espacios de visitantes"
                  margin="normal"
                  name="visitorSpace"
                  value={values.visitorSpace}
                  variant="outlined"
                  color=""
                />
                <StyledTextField
                  InputProps={{
                    readOnly: true,
                  }}
                  error={Boolean(
                    touched.disabilitySpace && errors.disabilitySpace
                  )}
                  fullWidth
                  type="number"
                  helperText={touched.disabilitySpace && errors.disabilitySpace}
                  label="Total de espacios de discapacitados"
                  margin="normal"
                  name="disabilitySpace"
                  value={values.disabilitySpace}
                  variant="outlined"
                  color=""
                />
                <StyledTextField
                  fullWidth
                  label="Horario"
                  margin="normal"
                  multiline
                  name="shift"
                  style={{ whiteSpace: "pre-line" }}
                  value={values.schedule}
                  variant="outlined"
                  color=""
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </form>
            )}
          </Formik>
        </Box>
      </Box>
      <Box sx={{ minWidth: 800 }} mt={3} mr={10}>
        <div style={{ height: 477, width: "100%" }}>
          <Typography color="textPrimary" variant="h5">
            Todas las reservas activas
          </Typography>
          <DataGrid
            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
            rows={rows}
            columns={columns}
            pageSize={8}
            rowsPerPageOptions={[8]}
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
    </DashboardPage>
  );
}
