import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import { styled, useTheme } from "@mui/material/styles";
import axios from "axios";
import { Formik } from "formik";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { DashboardPage } from "../components/DashboardPage";
import { SchedulePicker } from "../components/SchedulePicker";
import { StyledTextField } from "../theme/theme";

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

export default function NewUser() {
  const [schedule, setSchedule] = React.useState(initialState);
  const [disableFlag, setDisableFlag] = React.useState(false);
  const [department, setDepartment] = React.useState("Docencia");
  const [empType, setEmpType] = React.useState("Funcionario");

  document.title = "Añadir Usuario";
  const [open, setOpen] = React.useState(false);

  const navigate = useNavigate();

  const options = [
    { value: "Docencia", label: "Docencia" },
    { value: "Administrativo", label: "Administrativo" },
    { value: "Seguridad", label: "Seguridad" },
  ];

  const options2 = [
    { value: "Jefatura", label: "Jefatura" },
    { value: "Admin", label: "Admin" },
    { value: "Funcionario", label: "Funcionario" },
  ];

  const agregarUsuarioNuevo = async (data) => {
    var contenido = {
      _id: data.identification,
      fullName: data.name,
      phoneNumber: data.phoneNumber,
      institutionalMail: data.institutionEmail,
      altMail: data.secondaryEmail,
      department: department,
      empType: empType,
      isHandicapped: disableFlag,
      shift: JSON.stringify(schedule),
    };

    try {
      const resp = await axios.post(
        "http://localhost:9000/api/employee",
        contenido
      );
      console.log(resp.data);
      alert("Usuario Añadido");
    } catch (err) {
      alert("ERROR: Usuario No Añadido");
      // Handle Error Here
      console.error(err);
    }

    navigate("/GeneralMenu", { replace: true });
  };

  return (
    <DashboardPage>
      <Box
        sx={{
          backgroundColor: "background.default",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          width: "70%",
          maxWidth: "70%",
        }}
      >
        <Box
          maxWidth="sm"
          sx={{
            margin: "0 auto",
            padding: 0,
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Formik
            initialValues={{
              name: "",
              identification: "",
              phoneNumber: "",
              institutionEmail: "",
              secondaryEmail: "",
              deparment: "",
            }}
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
                .min(
                  100000000,
                  "La identificación debe tener 9 digitos validos"
                )
                .max(
                  999999999,
                  "La identificación debe tener 9 digitos validos"
                )
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
                .email()
                .required("Es necesario indicar un correo institucional"),
              secondaryEmail: Yup.string().email(),
            })}
            onSubmit={async (data, actions) => {
              agregarUsuarioNuevo(data);
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
                    Añadir Usuario
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
                      id="department"
                      value={department}
                      input={<OutlinedInput label="Departamento" />}
                      label="department"
                      defaultValue={"Docente"}
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
                    Registrar usuario
                  </Button>
                  {/* <TimeBasePicker /> */}
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      </Box>
    </DashboardPage>
  );
}
