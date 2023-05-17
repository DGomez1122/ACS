import { useTheme } from "@emotion/react";
import {
  Typography,
  Box,
  Grid,
  DialogTitle,
  DialogContent,
  DialogContentText,
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
import { VisitantBookingCard } from "../components/VisitantBookingCard";

export const RemoveBookingVisitant = () => {
  const [uiState, setUiState] = useState("loading");
  document.title = "Liberar espacio de visitante";
  const [bookingVisitantList, setBookingVisitantList] = useState([
    // {
    //   _id: "62ad0c6fab0e16b65ba567e5",
    //   adminId: "12345678",
    //   parkingLot: "331961402",
    //   userName: "Lucas Perez",
    //   userId: "120001200",
    //   vehiclePlate: "ADS120",
    //   reason: "321",
    //   destination: "21212",
    //   date: "0/0/0",
    //   __v: 0,
    // },
    // {
    //   _id: "5452132456324532",
    //   adminId: "12345678",
    //   parkingLot: "331961402",
    //   userName: "Johan Calvo",
    //   userId: "12002369",
    //   vehiclePlate: "POP123",
    //   reason: "321",
    //   destination: "21212",
    //   date: "0/0/0",
    //   __v: 0,
    // },
  ]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          "http://localhost:9000/api/visitRequest/getAll"
        );

        setBookingVisitantList(response.data);
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
      let auxiliar = bookingVisitantList.find((vehicle) => vehicle._id === _id);
      let resp;
      let resp2;
      let parkingSpace;

      // console.log(auxiliar);

      try {
        resp = await axios.get(
          `http://localhost:9000/api/reservationPerPlate/${auxiliar.userId}/${auxiliar.vehiclePlate}`
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

      console.log(resp2.data);

      try {
        const resp3 = await axios.put(
          `http://localhost:9000/api/parkingSpace/${resp2.data._id}`,
          resp2.data
        );
        console.log(resp3.data);
        // alert("Vehiculo Visitante liberado");
      } catch (err) {
        alert("ERROR: Vehículo Visitante No liberado");
        // Handle Error Here
        console.error(err);
      }

      try {
        const response = await axios.delete(
          `http://localhost:9000/api/visitRequest/${_id}`
        );
        setSelectedVehicle(
          bookingVisitantList.find((vehicle) => vehicle._id === _id)
        );
        setOpen(true);
        setBookingVisitantList((prevState) => {
          return prevState.filter((vehicle) => vehicle._id !== _id);
        });
      } catch (err) {
        console.log(err);
      }
      setUiState("loaded");
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
                  Liberar espacio de visitante
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
            {bookingVisitantList.map((visitantBooking) => (
              <Grid item key={visitantBooking._id}>
                <VisitantBookingCard
                  _id={visitantBooking._id}
                  adminId={visitantBooking.adminId}
                  parkingLot={visitantBooking.parkingLot}
                  userName={visitantBooking.userName}
                  userId={visitantBooking.userId}
                  vehiclePlate={visitantBooking.vehiclePlate}
                  reason={visitantBooking.reason}
                  destination={visitantBooking.destination}
                  date={visitantBooking.date}
                  options={[
                    {
                      name: "Liberar",
                      onClick: handleClickOpen,
                      path:
                        "/adminMenu/EditOfficialVehicle/" + visitantBooking._id,
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
              {uiState === "loaded" && bookingVisitantList.length === 0 && (
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
