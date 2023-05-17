import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  Slide,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { StyledTextField } from "../theme/theme";

import AdapterDayjs from "@mui/lab/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Formik } from "formik";
import * as Yup from "yup";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function getDate(date) {
  let dd = String(date.getDate()).padStart(2, "0");
  let mm = String(date.getMonth() + 1).padStart(2, "0");
  let yyyy = date.getFullYear();
  let hh = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  let min = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  return yyyy + "-" + mm + "-" + dd + "T" + hh + ":" + min + ":00";
}
const Login = () => {
  React.useEffect(() => {
    localStorage.setItem("simulationDate", "undefined");
  }, []);
  const iniciarSesion = async (data) => {
    const obj = {
      username: data.username,
      password: data.password,
    };
    console.log(obj);
    try {
      const resp = await axios.post(
        "http://localhost:9000/api/employee/login",
        obj
      );
      if (resp.data.length === 0) {
        try {
          const resp2 = await axios.post(
            "http://localhost:9000/api/operator/login",
            obj
          );
          if (resp2.data.length === 0) {
            alert("Mal usuario o constraseña");
          } else if (resp2.data.length === 1) {
            localStorage.removeItem("user");
            localStorage.setItem("user", JSON.stringify(resp2.data[0]));
            console.log(resp2.data[0]);
            alert("BIENVENIDO QUERIDO(A): " + resp2.data[0].fullName);
            navigate("/GeneralMenu", { replace: true });
          }
        } catch (err) {
          // Handle Error Here
          console.error(err);
        }
      } else if (resp.data.length === 1) {
        localStorage.removeItem("user");
        localStorage.setItem("user", JSON.stringify(resp.data[0]));
        console.log(resp.data[0]);
        alert("BIENVENIDO QUERIDO(A): " + resp.data[0].fullName);
        navigate("/GeneralMenu", { replace: true });
      }
    } catch (err) {
      // Handle Error Here
      console.error(err);
    }
  };
  const [open2, setOpen] = React.useState(false);

  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [date, setDate] = React.useState(new Date());
  const handleConfirm = async () => {
    setOpen(false);
    alert("Simulación iniciada");
    console.log("date", getDate(new Date(date)));
    localStorage.removeItem("simulationDate");
    localStorage.setItem("simulationDate", getDate(new Date(date)));

    
    var contenido = {
      
        fechaSimulacion: localStorage.getItem("simulationDate")
      
      
    };

    try {
      const resp = await axios.post(
        "http://localhost:9000/api/reservation/deleteAllExpired",
        contenido
      );
      
    } catch (err) {
      // Handle Error Here
      console.error(err);
    }

  };

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  document.title = "Iniciar Sesion";

  return (
    <>
      <Box
        className="login-container"
        sx={{
          backgroundColor: "background.default",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          // py: 20
        }}
      >
        <Box maxWidth="sm">
          <Formik
            initialValues={{
              username: "",
              password: "",
            }}
            validationSchema={Yup.object().shape({
              username: Yup.string()
                .max(255)
                .required("El nombre de usuario es requerido"),
              password: Yup.string()
                .max(255)
                .required("La contraseña es requerida"),
            })}
            onSubmit={async (data, actions) => {
              iniciarSesion(data);
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
                    Iniciar Sesión
                  </Typography>
                </Box>
                <StyledTextField
                  error={Boolean(touched.username && errors.username)}
                  fullWidth
                  helperText={touched.username && errors.username}
                  label="Nombre de Usuario"
                  margin="normal"
                  name="username"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.username}
                  variant="outlined"
                  color=""
                />
                {/* <StyledTextField label="Rata" /> */}
                <StyledTextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Contraseña"
                  margin="normal"
                  name="password"
                  autoComplete="off"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type={showPassword ? "text" : "password"}
                  value={values.password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? (
                            <VisibilityIcon sx={{ color: grey[50] }} />
                          ) : (
                            <VisibilityOffIcon sx={{ color: grey[50] }} />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
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
                    Ingresar
                  </Button>
                </Box>
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    fullWidth
                    size="large"
                    onClick={handleClickOpen}
                    variant="contained"
                  >
                    Simulacion
                  </Button>
                </Box>
                <Dialog
                  open={open2}
                  TransitionComponent={Transition}
                  keepMounted
                  onClose={handleClose}
                  aria-describedby="alert-dialog-slide-description"
                >
                  <DialogTitle>{"¿Desea Iniciar la simulación?"}</DialogTitle>
                  <DialogContent>
                    {" "}
                    <Box sx={{ minWidth: 120 }} mt={3}>
                      <Typography color="textPrimary" variant="h6"></Typography>
                    </Box>
                    <>
                      <Box sx={{ minWidth: 120 }} mt={3}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DateTimePicker
                            label="Hora de Simulación"
                            value={date}
                            onChange={(newValue) => {
                              setDate(new Date(newValue.$d));
                            }}
                            renderInput={(params) => (
                              <StyledTextField {...params} />
                            )}
                          />
                        </LocalizationProvider>
                      </Box>
                    </>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      color="primary"
                      fullWidth
                      size="large"
                      variant="contained"
                      onClick={handleClose}
                    >
                      Cancelar
                    </Button>
                    <Button
                      color="primary"
                      fullWidth
                      size="large"
                      variant="contained"
                      onClick={handleConfirm}
                    >
                      Confirmar
                    </Button>
                  </DialogActions>
                </Dialog>
                <Typography
                  color="textSecondary"
                  variant="body1"
                  display="inline"
                  sx={{ color: "white" }}
                >
                  No tienes una cuenta? <br /> Envía una solicitud de registro a
                </Typography>
                <Typography color="textSecondary" variant="body1">
                  sistema-parqueo@itcr.ac.cr
                </Typography>
              </form>
            )}
          </Formik>
        </Box>
      </Box>
    </>
  );
};

export default Login;
