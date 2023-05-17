import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import { StyledTextField } from "../theme/theme";
import { Formik } from "formik";
import { DashboardPage } from "../components/DashboardPage";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
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
  FormHelperText,
} from "@mui/material";

export default function BookingVisitant() {
  const navigate = useNavigate();
  const [parkingList, setParkingList] = React.useState([]);

  React.useEffect(() => {
    const asyncFunc = async () => {
      let parkingListRes = [];

      let firstRes = await axios.get(`http://localhost:9000/api/parkingLot`);
      parkingListRes = [...firstRes.data];
      let secondRes = await axios.get(
        `http://localhost:9000/api/outsourcedParkingLot`
      );
      parkingListRes = [...parkingListRes, ...secondRes.data];
      setParkingList(parkingListRes);
    };

    asyncFunc();
  }, []);

  document.title = "Reservar espacio para visitante";

  // {
  //   "adminId": "123",
  //   "parkingLot": "1",
  //   "userName": "juan" ,
  //   "userId": "1",
  //   "vehiclePlate": "89098",
  //   "reason":  "Anda vuelto loco",
  //   "destination": "al TEC",
  //   "date": "1/1/2"
  //   }
  const makeBookingVisitant = async (data) => {
    (async () => {
      console.log(data);

      const user = JSON.parse(localStorage.getItem("user"));
      console.log(user);
      let contenido = {
        adminId: user._id,
        parkingLot: data.parkingLot.id,
        userName: data.visitantName,
        userId: data.visitantIdentification,
        vehiclePlate: data.vehicleNumber,
        reason: data.visitReason,
        destination: data.visitPlace,
        date: "2050-01-1T19:55:00"
      };
      try {
        const resp = await axios.post(
          "http://localhost:9000/api/visitRequest",
          contenido
        );
        console.log(resp.data);
        alert("Reserva realizada con éxito");
        navigate("/adminMenu/BookingMenu");
      } catch (err) {
        alert("ERROR: Ya no quedan campos para visitas!");
        // Handle Error Here
        console.error(err);
      }
    })();
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
              visitantName: "",
              visitantIdentification: "",
              vehicleNumber: "",
              visitReason: "",
              visitPlace: "",
              parkingLot: "",
            }}
            validationSchema={Yup.object().shape({
              visitantName: Yup.string()
                .max(255)
                .required("Es necesario indicar el nombre del usuario"),
              visitantIdentification: Yup.number()
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
              vehicleNumber: Yup.string()
                .length(6, "El número de vehículo debe tener 6 digitos")
                .required("El número de vehículo es requerido"),
              visitReason: Yup.string().required(
                "Es necesario indicar el motivo de la visita"
              ),
              visitPlace: Yup.string().required(
                "Es necesario indicar el sitio dentro del TEC a donde se dirige la visita"
              ),
              parkingLot: Yup.object().shape({
                location: Yup.string().required(
                  "Es necesario indicar el estacionamiento al que se dirige la visita"
                ),
              }),
            })}
            onSubmit={async (data, actions) => {
              makeBookingVisitant(data);
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
              setFieldValue,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 1 }}>
                  <Typography color="textPrimary" variant="h2">
                    Reservar espacio para visitante
                  </Typography>
                </Box>
                <StyledTextField
                  error={Boolean(touched.visitantName && errors.visitantName)}
                  fullWidth
                  helperText={touched.visitantName && errors.visitantName}
                  label="Nombre del visitante"
                  margin="normal"
                  name="visitantName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.visitantName}
                  variant="outlined"
                  color=""
                />
                <StyledTextField
                  error={Boolean(
                    touched.visitantIdentification &&
                      errors.visitantIdentification
                  )}
                  fullWidth
                  helperText={
                    touched.visitantIdentification &&
                    errors.visitantIdentification
                  }
                  label="Identificación del visitante"
                  margin="normal"
                  name="visitantIdentification"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.visitantIdentification}
                  variant="outlined"
                  color=""
                />
                <StyledTextField
                  error={Boolean(touched.vehicleNumber && errors.vehicleNumber)}
                  fullWidth
                  helperText={touched.vehicleNumber && errors.vehicleNumber}
                  label="Número de vehiculo"
                  margin="normal"
                  name="vehicleNumber"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.vehicleNumber}
                  variant="outlined"
                  color=""
                />
                <StyledTextField
                  error={Boolean(touched.visitReason && errors.visitReason)}
                  fullWidth
                  helperText={touched.visitReason && errors.visitReason}
                  label="Motivo de la visita"
                  margin="normal"
                  name="visitReason"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.visitReason}
                  variant="outlined"
                  color=""
                  multiline
                />
                <StyledTextField
                  error={Boolean(touched.visitPlace && errors.visitPlace)}
                  fullWidth
                  helperText={touched.visitPlace && errors.visitPlace}
                  label="Sitio dentro del TEC a donde se dirige"
                  margin="normal"
                  name="visitPlace"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.visitPlace}
                  variant="outlined"
                  color=""
                  multiline
                />

                <Box sx={{ minWidth: 120 }} mt={3}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Estacionamiento
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="department"
                      value={values.parkingLot || ""}
                      input={
                        <OutlinedInput
                          label="Estacionamiento"
                          error={Boolean(
                            touched.parkingLot && errors.parkingLot
                          )}
                        />
                      }
                      label="parkingLot"
                      defaultValue={"Ninguno seleccionado"}
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
                        console.log(e.target.value);
                        setFieldValue("parkingLot", e.target.value);
                      }}
                    >
                      {parkingList.map((parking) => (
                        <MenuItem value={parking} key={parking._id}>
                          {parking.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {Boolean(touched.parkingLot && errors.parkingLot) && (
                      <FormHelperText error id="accountId-error">
                        {"Debe indicar el estacionamiento"}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Box>

                <Box sx={{ py: 2 }}>
                  <Button
                    disable={isSubmitting ? 1 : 0}
                    color="primary"
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Realizar reserva
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
