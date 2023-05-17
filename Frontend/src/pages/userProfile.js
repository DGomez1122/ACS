import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import { styled, useTheme } from "@mui/material/styles";
import { Formik } from "formik";
import * as React from "react";
import { LicensePlatesPicker } from "../components/LicensePlates";
import { useNavigate, useParams } from "react-router-dom";
import { DashboardPage } from "../components/DashboardPage";
import * as Yup from "yup";
import { StyledTextField } from "../theme/theme";

import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControlLabel,
  Typography,
} from "@mui/material";
import axios from "axios";
import { SchedulePicker } from "../components/SchedulePicker";

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

const plateArr = [
  {
    type: "text",
    id: 1,
    value: "",
  },
];
export default function ParkingAdminMenu() {
  let { id } = useParams();
  const [schedule, setSchedule] = React.useState(initialState);
  const [disableFlag, setDisableFlag] = React.useState(false);
  const [licensePlates, setLicensePlates] = React.useState(plateArr);
  const [altMailFlag, setaltMailFlag] = React.useState(false);
  const [department, setDepartment] = React.useState("");
  const [empType, setEmpType] = React.useState("");

  const [userID, setUserID] = React.useState("");

  document.title = "Perfil de usuario";
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [button, setButton] = React.useState(0);

  const [initialValues, seInitialValues] = React.useState({
    name: "",
    identification: "",
    phoneNumber: "",
    institutionEmail: "",
    secondaryEmail: "",
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
    //const id = state.id;

    console.log("DELETE");

    try {
      const res = await axios.delete(
        `http://localhost:9000/api/employee/` + id
      );
      console.log(res.data);
    } catch (err) {
      console.log("ERROR DELETE");
      console.log(err);
    }
    navigate("/GeneralMenu", { replace: true });
  };

  const handleUpdate = async (data) => {
    let licensePlatesArray = [];
    licensePlates.forEach(function (item) {
      if (item.value != "") {
        licensePlatesArray.push(item.value);
      }
    });
    var contenido = {
      _id: data.identification,
      fullName: data.name,
      phoneNumber: data.phoneNumber,
      institutionalMail: data.institutionEmail,
      altMail: data.secondaryEmail,
      department: department,
      empType: empType,
      isHandicapped: disableFlag,
      licensePlates: licensePlatesArray,
      email1: altMailFlag,
      shift: JSON.stringify(schedule),
    };

    try {
      const res = await axios.put(
        `http://localhost:9000/api/employee/` + userID,
        contenido
      );
      console.log(res.data);
      alert("Usuario Actualizado");
    } catch (err) {
      alert("ERROR: Usuario No Actualizado");
      console.log("ERROR UPDATE");
      console.log(err);
    }
    navigate("/GeneralMenu", { replace: true });
  };

  const navigate = useNavigate();

  const [age, setAge] = React.useState("");

  const handleChange2 = (event) => {
    setAge(event.target.value);
  };

  const options = [
    { value: "Docencia", label: "Docencia" },
    { value: "Administrativo", label: "Administrativo" },
    { value: "Seguridad", label: "Seguridad" },
  ];

  const options2 = [
    { value: "Jefatura", label: "Jefatura" },
    { value: "Admin", label: "Admin" },
    { value: "Operador", label: "Operador" },
    { value: "Funcionario", label: "Funcionario" },
  ];

  React.useEffect(() => {
    axios
      .get(`http://localhost:9000/api/employee/` + id)
      .then((res) => {
        const data = res.data;
        let myBool = data.empType === "true";
        setSchedule(JSON.parse(data.shift));
        seInitialValues({
          name: data.fullName,
          identification: data._id,
          phoneNumber: data.phoneNumber,
          institutionEmail: data.institutionalMail,
          secondaryEmail: data.altMail,
          deparment: "",
        });

        setDepartment(data.department);
        setEmpType(data.empType);
        setUserID(data._id);
        setaltMailFlag(data.email1);
        setDisableFlag(data.isHandicapped);

        let licensePlatesTemp = [];
        data.licensePlates.forEach(function (item, index) {
          licensePlatesTemp.push({ type: "text", id: index, value: item });
        });
        if (licensePlatesTemp.length === 0) {
          licensePlatesTemp.push({ type: "text", id: 0, value: "" });
        }
        setLicensePlates(licensePlatesTemp);
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
              name: Yup.string()
                .max(255)
                .required("Es necesario indicar el nombre del usuario"),
              identification: Yup.number()
                .typeError(
                  "Los datos ingresados no corresponden a identificación"
                )
                .positive(
                  "Los datos ingresados no corresponden a identificación"
                )
                .integer(
                  "Los datos ingresados no corresponden a identificación"
                )
                .min(100000000, "La identificación debe tener 9 digitos")
                .max(999999999, "La identificación debe tener 9 digitos")
                .required("La identificación del usuario es requerida"),
              phoneNumber: Yup.number()
                .typeError(
                  "Los datos ingresados no corresponden a un número telefonico"
                )
                .positive(
                  "Los datos ingresados no corresponden a un número telefonico"
                )
                .integer(
                  "Los datos ingresados no corresponden a un número telefonico"
                )
                .min(10000000, "El número telefonico debe tener 8 digitos")
                .max(99999999, "El número telefonico debe tener 8 digitos")
                .required("El número telefonico es requerido"),
              institutionEmail: Yup.string()
                .max(255)
                .required("Es necesario indicar un correo institucional"),
            })}
            onSubmit={async (data, actions) => {
              if (button) {
                handleUpdate(data);
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
                    Editar Usuario
                  </Typography>
                </Box>
                <StyledTextField
                  error={Boolean(touched.name && errors.name)}
                  fullWidth
                  helperText={touched.name && errors.name}
                  label="Nombre del usuario"
                  margin="normal"
                  name="name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  variant="outlined"
                  color=""
                />
                <StyledTextField
                  error={Boolean(
                    touched.identification && errors.identification
                  )}
                  fullWidth
                  helperText={touched.identification && errors.identification}
                  label="Identificación"
                  margin="normal"
                  name="identification"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.identification}
                  variant="outlined"
                  color=""
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <StyledTextField
                  error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                  fullWidth
                  helperText={touched.phoneNumber && errors.phoneNumber}
                  label="Número telefónico"
                  margin="normal"
                  name="phoneNumber"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.phoneNumber}
                  variant="outlined"
                  color=""
                />
                <StyledTextField
                  error={Boolean(
                    touched.institutionEmail && errors.institutionEmail
                  )}
                  fullWidth
                  type="email"
                  helperText={
                    touched.institutionEmail && errors.institutionEmail
                  }
                  label="Correo electrónico institucional"
                  margin="normal"
                  name="institutionEmail"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.institutionEmail}
                  variant="outlined"
                  color=""
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <StyledTextField
                  error={Boolean(
                    touched.secondaryEmail && errors.secondaryEmail
                  )}
                  fullWidth
                  type="email"
                  helperText={touched.secondaryEmail && errors.secondaryEmail}
                  label="Correo electrónico secundario"
                  margin="normal"
                  name="secondaryEmail"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.secondaryEmail}
                  variant="outlined"
                  color=""
                />
                <Box sx={{ minWidth: 120 }} mt={3}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Departamento
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={department}
                      input={<OutlinedInput label="Departamento" />}
                      label="Age"
                      variant="outlined"
                      color=""
                      MenuProps={{
                        PaperProps: {
                          sx: {
                            bgcolor: "#6750A4",
                            "& .MuiMenuItem-root": {
                              padding: 2,
                            },
                            borderColor: "red",
                          },
                        },
                      }}
                      onChange={(e) => {
                        setDepartment(e.target.value);
                      }}
                    >
                      {options.map((option) => (
                        <MenuItem value={option.value}>{option.label}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
                <Box sx={{ minWidth: 120 }} mt={3}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Tipo de empleado
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="employeeType"
                      value={empType}
                      input={<OutlinedInput label="Departamento" />}
                      label="employeeType"
                      variant="outlined"
                      color=""
                      MenuProps={{
                        PaperProps: {
                          sx: {
                            bgcolor: "#6750A4",
                            "& .MuiMenuItem-root": {
                              padding: 2,
                            },
                          },
                        },
                      }}
                      onChange={(e) => {
                        setEmpType(e.target.value);
                      }}
                    >
                      {options2.map((option) => (
                        <MenuItem value={option.value}>{option.label}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
                <Box sx={{ minWidth: 120 }} mt={3}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={disableFlag}
                        onChange={(e) => {
                          setDisableFlag(e.target.checked);
                        }}
                      />
                    }
                    label="Discapacitado"
                  />
                </Box>
                <Box sx={{ minWidth: 120 }} mt={3}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={altMailFlag}
                        onChange={(e) => {
                          setaltMailFlag(e.target.checked);
                        }}
                      />
                    }
                    label="Usar Correo Secundario"
                  />
                </Box>
                <LicensePlatesPicker
                  licensePlates={licensePlates}
                  setLicensePlates={setLicensePlates}
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
                        Actualizar Usuario
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
                        Eliminar Usuario
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
