import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import { StyledTextField } from "../theme/theme";
import { Formik } from "formik";
import { DashboardPage } from "../components/DashboardPage";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import {
  Typography,
  Box,
  Button,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { SchedulePicker } from "../components/SchedulePicker";

export default function EditOfficialVehicle() {
 let navigate = useNavigate();
  const [vehicle, setVehicle] = React.useState({
    plate: "352030",
    model: "BMW A7",
    color: "Gris",
    driverName: "Johan Calvo",
    driverId: "123456789",
    _id: "5e9f8f8f8f8f8f8f8f8f8f8f",
  });
   let { id } = useParams();
  document.title = "Editar Vehículo Oficial";

  

      React.useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        axios
        .get(`http://localhost:9000/api/oficialVehicle/${id}`)
        .then((res) => {
          const data = res.data;
          setVehicle(data);
         // console.log(vehicle);
      
        })
        .catch((err) => {
          console.log(err);
        });
      }, []);
  
      const agregarUsuarioNuevo = async (data) => {
        //console.log(data);

        //console.log("click");
        const user = JSON.parse(localStorage.getItem("user"));
        var contenido = {
          _id: id,
          plate: data.plate,
          model: data.model,
          color: data.color,
          driverName: data.driverName,
          driverId: data.driverId,
          parkingLot: data.parkingLot
        };
    
        console.log(contenido);

        try {
          const resp = await axios.put(
            `http://localhost:9000/api/oficialVehicle/${id}`,
            contenido
          );
          console.log(resp.data);
          alert("Vehiculo Oficial Actualizado");
        } catch (err) {
          alert("ERROR: Vehículo Oficial No Actualizado");
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
          width: "90%",
          maxWidth: "90%",
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
            initialValues={
            vehicle
            }
            validationSchema={Yup.object().shape({
              model: Yup.string().required("El modelo es requerido"),
              color: Yup.string().required("El color es requerido"),
              plate: Yup.string()
                .length(6, "El número de vehículo debe tener 8 digitos")
                .required("La placa del vehículo es requerida"),
              driverName: Yup.string()
                .max(255, "El nombre del chofer es muy largo")
                .required("Es necesario indicar el nombre del chofer"),
              driverId: Yup.number()
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
                .required("La identificación del chofer es requerida"),
            })}
            onSubmit={async (data, actions) => {
               agregarUsuarioNuevo(data);
            }}
            enableReinitialize={true}          >
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
                    Editar vehículo oficial
                  </Typography>
                </Box>
                <StyledTextField
                  error={Boolean(touched.plate && errors.plate)}
                  fullWidth
                  helperText={touched.plate && errors.plate}
                  label="Placa"
                  margin="normal"
                  name="plate"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.plate}
                  variant="outlined"
                  color=""
                />
                <StyledTextField
                  error={Boolean(touched.model && errors.model)}
                  fullWidth
                  helperText={touched.model && errors.model}
                  label="Modelo"
                  margin="normal"
                  name="model"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.model}
                  variant="outlined"
                  color=""
                />
                <StyledTextField
                  error={Boolean(touched.color && errors.color)}
                  fullWidth
                  helperText={touched.color && errors.color}
                  label="Color del vehículo"
                  margin="normal"
                  name="color"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.color}
                  variant="outlined"
                  color=""
                />
                <StyledTextField
                  error={Boolean(touched.driverName && errors.driverName)}
                  fullWidth
                  helperText={touched.driverName && errors.driverName}
                  label="Nombre del chofer"
                  margin="normal"
                  name="driverName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.driverName}
                  variant="outlined"
                  color=""
                  multiline
                />
                <StyledTextField
                  error={Boolean(touched.driverId && errors.driverId)}
                  fullWidth
                  helperText={touched.driverId && errors.driverId}
                  label="Identificación del chofer"
                  margin="normal"
                  name="driverId"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.driverId}
                  variant="outlined"
                  color=""
                  multiline
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
                    Editar Vehículo Oficial
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
