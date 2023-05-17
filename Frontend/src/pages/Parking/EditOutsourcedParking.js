import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Typography,
} from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import Grid from "@mui/material/Grid";
import { styled, useTheme } from "@mui/material/styles";
import axios from "axios";
import { Formik } from "formik";
import * as React from "react";
import { useLocation } from "react-router";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { DashboardPage } from "../../components/DashboardPage";
import { SchedulePicker } from "../../components/SchedulePicker";
import { StyledTextField } from "../../theme/theme";
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

let initialState = [
  {
    day: "Lunes",
    periods: [
      // {
      //   start: "08:00",
      //   end: "09:00",
      // },
    ],
  },
  {
    day: "Martes",
    periods: [],
  },
  {
    day: "Miercoles",
    periods: [],
  },
  {
    day: "Jueves",
    periods: [],
  },
  {
    day: "Viernes",
    periods: [],
  }, // do the same thing for the rest of the days
  {
    day: "Sabado",
    periods: [],
  },
  {
    day: "Domingo",
    periods: [],
  },
];

export default function ParkingAdminMenu() {
  let { id } = useParams();
  document.title = "Editar Parqueo";
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const { state } = useLocation();
  const [button, setButton] = React.useState(0);
  const [schedule, setSchedule] = React.useState(initialState);
  const [initialValues, seInitialValues] = React.useState({
    admiName: "",
    admiPhone: "",
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

  const handleDelete = async () => {
    console.log("DELETE");

    try {
      const res = await axios.delete(
        `http://localhost:9000/api/outsourcedParkingLot/${id}`
      );
      console.log(res.data);
      alert("Parqueo Actualizado");
    } catch (err) {
      alert("ERROR: Parqueo No Actualizado");
      console.log("ERROR DELETE");
      console.log(err);
    }
    navigate("/GeneralMenu", { replace: true });
  };

  const handleUpdate = async (data) => {
    console.log("UPDATE");

    let info = {
      admiName: data.admiName,
      admiPhone: data.admiPhone,
      name: data.name,
      location: data.address,
      accessInfo: data.accessInfo,
      shift: JSON.stringify(schedule),
      officialVehicles: data.oficialSpace,
      leadershipFields: data.leadershipSpace,
      generalUsers: data.usersSpace,
      visitors: data.visitorSpace,
      specialFields: data.disabilitySpace,
    };

    try {
      const res = await axios.put(
        `http://localhost:9000/api/outsourcedParkingLot/${id}`,
        info
      );
      console.log(res.data);
    } catch (err) {
      console.log("ERROR UPDATE");
      console.log(err);
    }
    navigate("/GeneralMenu", { replace: true });
  };

  const navigate = useNavigate();

  React.useEffect(() => {
    console.log(id);

    axios
      .get(`http://localhost:9000/api/outsourcedParkingLot/${id}`)
      .then((res) => {
        const data = res.data;
        setSchedule(JSON.parse(data.shift));
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
        });
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
          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={Yup.object().shape({
              admiName: Yup.string()
                .max(255)
                .required("Es necesario indicar el nombre del administrador"),
              admiPhone: Yup.number()
                .required("Es necesario indicar el número del administrador")
                .typeError(
                  "Los datos ingresados no corresponden a un número telefonico"
                )
                .max(255)

                .positive(
                  "Los datos ingresados no corresponden a un número telefonico"
                )
                .integer(
                  "Los datos ingresados no corresponden a un número telefonico"
                )
                .min(10000000, "El número telefonico debe tener 8 digitos")
                .max(99999999, "El número telefonico debe tener 8 digitos"),
              name: Yup.string()
                .max(255)
                .required("Es necesario indicar un nombre al parqueo"),
              address: Yup.string()
                .max(255)
                .required("Es necesario indicar una dirección al parqueo"),
              accessInfo: Yup.string()
                .max(255)
                .required(
                  "Es necesario indicar la información de acceso al parqueo"
                ),
              totalSpace: Yup.number().required(
                "Falta indicar la cantidad total de espacios"
              ),
              oficialSpace: Yup.number().required(
                "Falta indicar la cantidad de espacios para oficiales"
              ),
              leadershipSpace: Yup.number().required(
                "Falta indicar la cantidad de espacios para jefatura"
              ),
              usersSpace: Yup.number().required(
                "Falta indicar la cantidad de espacios para usuarios generales"
              ),
              visitorSpace: Yup.number().required(
                "Falta indicar la cantidad de espacios para visitantes"
              ),
              disabilitySpace: Yup.number().required(
                "Falta indicar la cantidad de espacios para discapacitados"
              ),
            })}
            onSubmit={async (values, actions) => {
              if (button) {
                handleUpdate(values);
              }
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              touched,
              values,
              isSubmitting,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 1 }}>
                  <Typography color="textPrimary" variant="h2">
                    Editar Parqueo Subcontratado
                  </Typography>
                </Box>
                <StyledTextField
                  error={Boolean(touched.admiName && errors.admiName)}
                  fullWidth
                  helperText={touched.admiName && errors.admiName}
                  label="Nombre de Administrador"
                  margin="normal"
                  name="admiName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.admiName}
                  variant="outlined"
                  color=""
                />
                <StyledTextField
                  error={Boolean(touched.admiPhone && errors.admiPhone)}
                  fullWidth
                  helperText={touched.admiPhone && errors.admiPhone}
                  label="Numero telefonico del Administrador"
                  margin="normal"
                  name="adminPhone"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.admiPhone}
                  variant="outlined"
                  color=""
                />
                <StyledTextField
                  error={Boolean(touched.name && errors.name)}
                  fullWidth
                  helperText={touched.name && errors.name}
                  label="Nombre de Parqueo"
                  margin="normal"
                  name="name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  variant="outlined"
                  color=""
                />
                <StyledTextField
                  error={Boolean(touched.address && errors.address)}
                  fullWidth
                  helperText={touched.address && errors.address}
                  label="Dirección"
                  margin="normal"
                  name="address"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.address}
                  variant="outlined"
                  color=""
                />
                <StyledTextField
                  error={Boolean(touched.accessInfo && errors.accessInfo)}
                  fullWidth
                  helperText={touched.accessInfo && errors.accessInfo}
                  label="Información de Acceso"
                  margin="normal"
                  name="accessInfo"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.accessInfo}
                  variant="outlined"
                  color=""
                />
                <StyledTextField
                  error={Boolean(touched.totalSpace && errors.totalSpace)}
                  fullWidth
                  type="number"
                  helperText={touched.totalSpace && errors.totalSpace}
                  label="Total de espacios"
                  margin="normal"
                  name="totalSpace"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.totalSpace}
                  variant="outlined"
                  color=""
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <StyledTextField
                  error={Boolean(touched.oficialSpace && errors.oficialSpace)}
                  fullWidth
                  type="number"
                  helperText={touched.oficialSpace && errors.oficialSpace}
                  label="Total de espacios de oficiales"
                  margin="normal"
                  name="oficialSpace"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.oficialSpace}
                  variant="outlined"
                  color=""
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <StyledTextField
                  error={Boolean(
                    touched.leadershipSpace && errors.leadershipSpace
                  )}
                  fullWidth
                  type="number"
                  helperText={touched.leadershipSpace && errors.leadershipSpace}
                  label="Total de espacios de jefatura"
                  margin="normal"
                  name="leadershipSpace"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.leadershipSpace}
                  variant="outlined"
                  color=""
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <StyledTextField
                  error={Boolean(touched.usersSpace && errors.usersSpace)}
                  fullWidth
                  type="number"
                  helperText={touched.usersSpace && errors.usersSpace}
                  label="Total de espacios de usuarios generales"
                  margin="normal"
                  name="usersSpace"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.usersSpace}
                  variant="outlined"
                  color=""
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <StyledTextField
                  error={Boolean(touched.visitorSpace && errors.visitorSpace)}
                  fullWidth
                  type="number"
                  helperText={touched.visitorSpace && errors.visitorSpace}
                  label="Total de espacios de visitantes"
                  margin="normal"
                  name="visitorSpace"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.visitorSpace}
                  variant="outlined"
                  color=""
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <StyledTextField
                  error={Boolean(
                    touched.disabilitySpace && errors.disabilitySpace
                  )}
                  fullWidth
                  type="number"
                  helperText={touched.disabilitySpace && errors.disabilitySpace}
                  label="Total de espacios de discapacitados"
                  margin="normal"
                  name="disabilitySpace"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.disabilitySpace}
                  variant="outlined"
                  color=""
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <Typography variant="h4" mt={7}>
                  Horario
                </Typography>
                <SchedulePicker schedule={schedule} setSchedule={setSchedule} />
                <Box sx={{ py: 2 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Button
                        onClick={handleButton}
                        disable={isSubmitting ? 1 : 0}
                        color="primary"
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                      >
                        Actualizar Parqueo
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Button
                        color="primary"
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                        onClick={handleClickOpen}
                      >
                        Eliminar Parqueo
                      </Button>
                      <Dialog
                        open={open1}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                      >
                        <DialogTitle id="alert-dialog-title">
                          {"¿Desea eliminar este Parqueo?"}
                        </DialogTitle>
                        <DialogActions>
                          <Button onClick={handleClose} color="primary">
                            No, cancelar
                          </Button>
                          <Button
                            onClick={handleDelete}
                            color="primary"
                            autoFocus
                          >
                            Aceptar
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </Grid>
                  </Grid>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      </Box>
    </DashboardPage>
  );
}
