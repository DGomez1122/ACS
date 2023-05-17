import MuiAppBar from "@mui/material/AppBar";
import { styled, useTheme } from "@mui/material/styles";
import { Formik } from "formik";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { SchedulePicker } from "../../components/SchedulePicker";
import { StyledTextField } from "../../theme/theme";

import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";
import axios from "axios";
import { DashboardPage } from "../../components/DashboardPage";
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
  const agregarParqueoNuevo = async (data) => {
    var contenido = {
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
      const resp = await axios.post(
        "http://localhost:9000/api/parkingLot",
        contenido
      );
      console.log(resp.data);
      navigate("/GeneralMenu", { replace: true });
      alert("Parqueo Añadido");
    } catch (err) {
      alert("ERROR: Parqueo No Añadido");
      // Handle Error Here
      console.error(err);
    }
  };

  const agregarParqueoSubNuevo = async (data) => {
    var contenido = {
      admiName: admiName,
      admiPhone: admiPhone,
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
      const resp = await axios.post(
        "http://localhost:9000/api/outsourcedParkingLot",
        contenido
      );
      console.log(resp.data);
      navigate("/GeneralMenu", { replace: true });
    } catch (err) {
      // Handle Error Here
      console.error(err);
    }
  };

  document.title = "Añadir Parqueo";
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [outSourceFlag, setOutSourceFlag] = React.useState(false);
  const [schedule, setSchedule] = React.useState(initialState);
  const [admiName, setAdmiName] = React.useState("");
  const [admiPhone, setAdmiPhone] = React.useState("");

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

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
        <Box maxWidth="sm">
          <Formik
            initialValues={{
              name: "",
              address: "",
              accessInfo: "",
              oficialSpace: "",
              leadershipSpace: "",
              usersSpace: "",
              visitorSpace: "",
              disabilitySpace: "",
              adminName: "",
              adminPhone: "",
              outSourceForm: false,
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string().required(
                "Es necesario indicar un nombre al parqueo"
              ),
              address: Yup.string().required(
                "Es necesario indicar una dirección al parqueo"
              ),
              accessInfo: Yup.string().required(
                "Es necesario indicar la información de acceso al parqueo"
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
              adminName: Yup.string().when("outSourceForm", {
                is: true,
                then: Yup.string().required(
                  "Debe indicar el nombre del administrador"
                ),
              }),
              adminPhone: Yup.number().when("outSourceForm", {
                is: true,
                then: Yup.number()
                  .required("Debe indicar el numero del administrador")
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
              }),
            })}
            onSubmit={async (data, actions) => {
              if (!outSourceFlag) {
                console.log("NORMAL");
                navigate(agregarParqueoNuevo(data), { replace: true });
              } else {
                console.log("SUBCONTRATADO");
                navigate(agregarParqueoSubNuevo(data), { replace: true });
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
                    Añadir Parqueo
                  </Typography>
                </Box>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={outSourceFlag}
                      onChange={(e) => {
                        let varBool = e.target.checked;
                        values.outSourceForm = varBool;
                        setOutSourceFlag(() => {
                          console.log("Flag:", varBool);
                          return varBool;
                        });

                        console.log("Valor:", values.outSourceForm);
                        //console.log("Flag:", outSourceFlag);
                        console.log("Var:", varBool);
                      }}
                    />
                  }
                  label="Parqueo subcontratado"
                />
                {outSourceFlag ? (
                  <StyledTextField
                    error={Boolean(touched.adminName && errors.adminName)}
                    fullWidth
                    helperText={touched.adminName && errors.adminName}
                    label="Nombre del Administrador"
                    margin="normal"
                    name="adminName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={setAdmiName(values.adminName)}
                    variant="outlined"
                    color=""
                  />
                ) : (
                  <></>
                )}
                {outSourceFlag ? (
                  <StyledTextField
                    error={Boolean(touched.adminPhone && errors.adminPhone)}
                    fullWidth
                    helperText={touched.adminPhone && errors.adminPhone}
                    label="Numero telefonico del Administrador"
                    margin="normal"
                    name="adminPhone"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={setAdmiPhone(values.adminPhone)}
                    variant="outlined"
                    color=""
                  />
                ) : (
                  <></>
                )}
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
                />
                <Typography variant="h4" mt={7}>
                  Horario
                </Typography>
                <SchedulePicker schedule={schedule} setSchedule={setSchedule} />
                <Box sx={{ py: 2 }}>
                  <Button
                    disable={isSubmitting ? 1 : 0}
                    color="primary"
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Crear Parqueo
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      </Box>
    </DashboardPage>
  );
}
