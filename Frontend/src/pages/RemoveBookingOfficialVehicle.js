import { useTheme } from "@emotion/react";
import {
  Typography,
  Box,
  Grid,
  DialogTitle,
  useMediaQuery,
  Button,
  DialogActions,
  Dialog,
  Alert,
} from "@mui/material";
import axios from "axios";
// import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { DashboardPage } from "../components/DashboardPage";
import { OVBookingCard } from "../components/OVBookingCard";

export const RemoveBookingOfficialVehicle = () => {
  const [uiState, setUiState] = useState("loading");
  document.title = "Liberar espacio de visitante";
  const [bookingOVList, setBookingOVList] = useState([
    // {
    //   _id: "62ad0504274ff3c2903c5be5",
    //   plate: "894108",
    //   model: "honda",
    //   color: "cafe",
    //   driverName: " Jose Pedro Cristobal ",
    //   driverId: "704247181",
    //   parkingLot: "331961402",
    // },
  ]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          "http://localhost:9000/api/oficialVehicle/getAll"
        );

        setBookingOVList(response.data);
      } catch (err) {
        console.log(err);
      }
      setUiState("loaded");
    })();
  }, []);

  const [selectedVehicle, setSelectedVehicle] = useState({
    vehiclePlate: "",
  });
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = (_id) => {
    (async () => {
      let auxiliar = bookingOVList.find((vehicle) => vehicle._id === _id);
      let resp;
      let resp2;
      let parkingSpace;

      try {
        resp = await axios.get(
          `http://localhost:9000/api/reservationPerPlate/${auxiliar.driverId}/${auxiliar.plate}`
        );
      } catch (err) {
        // Handle Error Here
        console.error(err);
        parkingSpace = resp.data[0].parkingSpaceId;
      }

      try {
        resp2 = await axios.get(
          `http://localhost:9000/api/parkingSpecificSpace/${resp.data[0].parkingSpaceId}`
        );
        // console.log(resp2.data);
      } catch (err) {
        // Handle Error Here
        console.error(err);
      }

      resp2.data.taken = false;

      try {
        const resp3 = await axios.put(
          `http://localhost:9000/api/parkingSpace/${resp2.data._id}`,
          resp2.data
        );
        console.log(resp3.data);
        alert("Vehiculo Oficial liberado");
      } catch (err) {
        alert("ERROR: Vehículo Oficial No liberado");
        // Handle Error Here
        console.error(err);
      }

      try {
        const response = await axios.delete(
          `http://localhost:9000/api/oficialVehicle/${_id}`
        );
        setSelectedVehicle(
          bookingOVList.find((vehicle) => vehicle._id === _id)
        );
        setOpen(true);
        setBookingOVList((prevState) => {
          return prevState.filter((vehicle) => vehicle._id !== _id);
        });
      } catch (err) {
        console.log(err);
      }
    })();
  };

  const handleClose = () => {
    setOpen(false);
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
          width: "50%",
          //   maxWidth: "90%",
        }}
      >
        <Box
          //   maxWidth="sm"
          sx={{
            margin: "0 auto",
            padding: 0,
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <Box sx={{ mb: 5 }}>
            <Grid container flexDirection={"column"} justifyContent={"center"}>
              <Grid item xs={12} sx={{ margin: "0 auto" }}>
                <Typography color="textPrimary" variant="h2">
                  Liberar espacio de vehículo oficial
                </Typography>
              </Grid>
              <Grid item xs={12} sx={{ margin: "0 auto" }}>
                <Typography color="textPrimary" variant="h5">
                  Reservas actuales
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Grid
            container
            direction={"column"}
            justifyContent="center"
            spacing={2}
          >
            {bookingOVList.map((OVBooking) => (
              <Grid item key={OVBooking._id}>
                <OVBookingCard
                  _id={OVBooking._id}
                  plate={OVBooking.plate}
                  model={OVBooking.model}
                  color={OVBooking.color}
                  driverName={OVBooking.driverName}
                  driverId={OVBooking.driverId}
                  parkingLot={OVBooking.parkingLot}
                  options={[
                    {
                      name: "Liberar",
                      onClick: handleClickOpen,
                      path: "/adminMenu/EditOfficialVehicle/" + OVBooking._id,
                    },
                  ]}
                />
              </Grid>
            ))}
            <Dialog
              fullScreen={fullScreen}
              open={open}
              onClose={handleClose}
              aria-labelledby="responsive-dialog-title"
            >
              <DialogTitle id="responsive-dialog-title" color={"#a487ef"}>
                Espacio liberado exitosamente
              </DialogTitle>
              <DialogActions>
                <Button autoFocus onClick={handleClose} sx={{ color: "white" }}>
                  OK
                </Button>
              </DialogActions>
            </Dialog>
            <Box mt={5} sx={{ margin: "0 auto", width: "28%" }}>
              {uiState === "loaded" && bookingOVList.length === 0 && (
                <Alert
                  variant="outlined"
                  severity="warning"
                  sx={{ color: "white" }}
                >
                  No se encontraron reservas
                </Alert>
              )}
            </Box>
            {/* <Grid item sx={{ width: "100%" }}>
              <OfficialVehicleCard name="Johan" schedule="Jesus" />
            </Grid>
            <Grid item>
              <OfficialVehicleCard name="Johan" schedule="Jesus" />
            </Grid> */}
          </Grid>
        </Box>
      </Box>
    </DashboardPage>
  );
};
