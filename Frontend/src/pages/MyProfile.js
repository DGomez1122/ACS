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
import dayjs from "dayjs";
import { Formik } from "formik";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { DashboardPage } from "../components/DashboardPage";
import { LicensePlatesPicker } from "../components/LicensePlates";
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

const plateArr = [
  {
    type: "text",
    id: 1,
    value: "",
  },
];
export default function NewUser() {
  const user = JSON.parse(localStorage.getItem("user"));
  let licensePlatesTemp = [];
  user.licensePlates.forEach(function (item, index) {
    licensePlatesTemp.push({ type: "text", id: index, value: item });
  });
  if (licensePlatesTemp.length === 0) {
    licensePlatesTemp.push({ type: "text", id: 0, value: "" });
  }

  const [licensePlates, setLicensePlates] = React.useState(licensePlatesTemp);
  const [disableFlag, setDisableFlag] = React.useState(user.isHandicapped);
  const [altMailFlag, setaltMailFlag] = React.useState(user.altMail);
  const [department, setDepartment] = React.useState(user.department);
  const [empType, setEmpType] = React.useState(user.empType);

  document.title = "Mi perfil";
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();

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

  const actualizarUsuario = async (data) => {
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
      shift: user.shift,
    };
    try {
      const resp = await axios.put(
        "http://localhost:9000/api/employee/" + user._id,
        contenido
      );
      console.log(resp.data);
      alert("Su perfil ha sido actualizado");
    } catch (err) {
      alert("ERROR: Su perfil NO ha podido ser actualizado");
      // Handle Error Here
      console.error(err);
    }
    localStorage.removeItem("user");
    localStorage.setItem("user", contenido);
    alert("Sesión Cerrada por cambios realizados");
    navigate("/", { replace: true });
  };

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
              name: user.fullName,
              identification: user._id,
              phoneNumber: user.phoneNumber,
              institutionEmail: user.institutionalMail,
              secondaryEmail: user.altMail,
            }}
            onSubmit={async (data, actions) => {
              actualizarUsuario(data);
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
                    Mi perfil
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
                      readOnly
                      labelId="demo-simple-select-label"
                      id="department"
                      value={department}
                      input={<OutlinedInput label="Departamento" />}
                      label="department"
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
                      readOnly
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
                <StyledTextField
                  fullWidth
                  label="Horario"
                  margin="normal"
                  multiline
                  name="shift"
                  onBlur={handleBlur}
                  style={{ whiteSpace: "pre-line" }}
                  value={parseShift(user.shift)}
                  variant="outlined"
                  color=""
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <Box sx={{ py: 2 }}>
                  <Button
                    disable={isSubmitting ? 1 : 0}
                    color="primary"
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Actualizar Perfil
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
