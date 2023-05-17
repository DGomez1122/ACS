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

const columns = [
  { field: "id", headerName: "ID", width: 100, type: "string" },
  { field: "name", headerName: "Nombre", width: 160, type: "string" },
  {
    field: "outsorced",
    headerName: "Subcontratado",
    type: "boolean",
    width: 150,
  },
  {
    field: "location",
    headerName: "Localización",
    sortable: false,
    type: "string",
    width: 150,
  },
];

export default function EditOperator() {
  let { id } = useParams();
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

  document.title = "Editar Operador";
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

  const handleDelete = async () => {
    //const id = state.id;

    console.log("DELETE");

    try {
      const res = await axios.delete(
        `http://localhost:9000/api/operator/` + operatorTemp.id
      );
      console.log(res.data);
    } catch (err) {
      console.log("ERROR DELETE");
      console.log(err);
    }
    navigate("/GeneralMenu", { replace: true });
  };

  const navigate = useNavigate();

  const editarOperador = async (data) => {
    var contenido = {
      _id: data.id,
      fullName: data.fullName,
      phoneNumber: data.phoneNumber,
      email: data.email,
      empType: "operator",
    };

    contenido.parkingLotId =
      selectedRow[0] === undefined
        ? operatorTemp.parkingLotId
        : selectedRow[0].id;

    contenido.outsourcedParkingLot =
      selectedRow[0] === undefined
        ? operatorTemp.outsourcedParkingLot
        : selectedRow[0].outsorced;

    try {
      const resp = await axios.put(
        "http://localhost:9000/api/operator/" + operatorTemp._id,
        contenido
      );
      console.log(resp.data);
      alert("Operador Actualizado");
    } catch (err) {
      alert("ERROR: Operador No Actualizado");
      // Handle Error Here
      console.error(err);
    }

    navigate("/GeneralMenu", { replace: true });
  };

  React.useEffect(() => {
    axios.get(`http://localhost:9000/api/operator/` + id).then((res) => {
      const data = res.data;
      setInitialValues({
        fullName: data.fullName,
        id: data._id,
        phoneNumber: data.phoneNumber,
        email: data.email,
        parkingLotId: data.parkingLotId,
      });
      setOperatorTemp(data);
      console.log("user", data);
    });

    axios
      .get(`http://localhost:9000/api/parkingLot`)
      .then((res) => {
        let result = [];
        for (let i = 0; i < res.data.length; i++) {
          let newParkingLot = {
            id: res.data[i].id,
            name: res.data[i].name,
            location: res.data[i].location,
            outsorced: false,
          };
          result.push(newParkingLot);
        }
        setRows(result);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`http://localhost:9000/api/outsourcedParkingLot`)
      .then((res2) => {
        let result2 = [];
        for (let i = 0; i < res2.data.length; i++) {
          let newParkingLot2 = {
            id: res2.data[i].id,
            name: res2.data[i].name,
            location: res2.data[i].location,
            outsorced: true,
          };
          result2.push(newParkingLot2);
        }
        setRows2(result2);
      })
      .catch((err2) => {
        console.log(err2);
      });
  }, []);

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
                <Box sx={{ mb: 1 }}>
                  <Typography color="textPrimary" variant="h2">
                    Editar Operador
                  </Typography>
                </Box>
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
                  error={Boolean(touched.id && errors.id)}
                  fullWidth
                  helperText={touched.id && errors.id}
                  label="Identificación"
                  margin="normal"
                  name="id"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.id}
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
                <Box sx={{ minWidth: 120 }} mt={3}>
                  <div style={{ height: 300, width: "100%" }}>
                    <Typography color="textPrimary" variant="h5">
                      Estacionamientos internos
                    </Typography>
                    <DataGrid
                      localeText={
                        esES.components.MuiDataGrid.defaultProps.localeText
                      }
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
                </Box>
                <Box sx={{ minWidth: 120, mt: 5 }}>
                  <div style={{ height: 300, width: "100%" }}>
                    <Typography color="textPrimary" variant="h5">
                      Estacionamientos Subcontratados
                    </Typography>
                    <DataGrid
                      localeText={
                        esES.components.MuiDataGrid.defaultProps.localeText
                      }
                      rows={rows2}
                      columns={columns}
                      pageSize={5}
                      rowsPerPageOptions={[5]}
                      onSelectionModelChange={(ids) => {
                        const selectedIDs = new Set(ids);
                        const selectedRowData = rows2.filter((row) =>
                          selectedIDs.has(row.id.toString())
                        );
                        setSelectedRow(selectedRowData);
                      }}
                    />
                  </div>
                </Box>
                <Box sx={{ minWidth: 120, mt: 5 }}>
                  <StyledTextField
                    fullWidth
                    label={
                      selectedRow[0] === undefined
                        ? "Estacionamiento actual"
                        : "Estacionamiento escogido"
                    }
                    margin="normal"
                    name="parkinglot"
                    value={
                      selectedRow[0] === undefined
                        ? values.parkingLotId
                        : selectedRow[0].id + " - " + selectedRow[0].name
                    }
                    variant="outlined"
                    color=""
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Box>
                <Box sx={{ py: 2 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Button
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
                </Box>{" "}
              </form>
            )}
          </Formik>
        </Box>
      </Box>
    </DashboardPage>
  );
}
