import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogTitle,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { DataGrid, esES } from "@mui/x-data-grid";
import axios from "axios";
import { Formik } from "formik";
import Grid from "@mui/material/Grid";
import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { DashboardPage } from "../../components/DashboardPage";
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

let defaultOp = [
  {
    _id: "",
    id: "",
    name: "",
    location: "",
  },
];

export default function EditOperator() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [parkinglot, setParkinglot] = React.useState(defaultOp[0].name);
  const [rows, setRows] = React.useState([]);
  const [rows2, setRows2] = React.useState([]);
  const [operatorTemp, setOperatorTemp] = React.useState({
    id: "",
    parkinglotId: "",
  });
  const [selectedRow, setSelectedRow] = React.useState([]);
  const [initialValues, setInitialValues] = React.useState({
    fullName: "",
    identification: "",
    phoneNumber: "",
    email: "",
    parkingLotId: "",
  });

  document.title = "Mi perfil";
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

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

  const navigate = useNavigate();

  const editarOperador = async (data) => {
    var contenido = {
      _id: user.id,
      fullName: data.fullName,
      phoneNumber: data.phoneNumber,
      email: data.email,
      empType: "operator",
      parkingLotId: user.parkingLotId,
      outsourcedParkingLot: user.outsourcedParkingLot,
    };

    try {
      const resp = await axios.put(
        "http://localhost:9000/api/operator/" + user._id,
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

  React.useEffect(() => {
    axios.get(`http://localhost:9000/api/operator/` + user._id).then((res) => {
      const data = res.data;
      setInitialValues({
        fullName: data.fullName,
        id: data._id,
        phoneNumber: data.phoneNumber,
        email: data.email,
      });
    });
  }, []);

  return (
    <DashboardPage title="Mi perfil">
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
            enableReinitialize
            initialValues={initialValues}
            validationSchema={Yup.object().shape({
              fullName: Yup.string()
                .max(255)
                .required("Es necesario indicar el nombre del usuario"),
              id: Yup.number()
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
              email: Yup.string()
                .email()
                .required("Es necesario indicar un correo electrónico"),
            })}
            onSubmit={async (data, actions) => {
              editarOperador(data);
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
                <StyledTextField
                  error={Boolean(touched.fullName && errors.fullName)}
                  fullWidth
                  helperText={touched.fullName && errors.fullName}
                  label="Nombre del operador"
                  margin="normal"
                  name="fullName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.fullName}
                  variant="outlined"
                  color=""
                />
                <StyledTextField
                  InputProps={{
                    readOnly: true,
                  }}
                  error={Boolean(touched.id && errors.id)}
                  fullWidth
                  helperText={touched.id && errors.id}
                  label="Identificación"
                  margin="normal"
                  name="id"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.id || ""}
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
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  type="email"
                  helperText={touched.email && errors.email}
                  label="Correo electrónico"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  variant="outlined"
                  color=""
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
                    Actualizar perfil
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
