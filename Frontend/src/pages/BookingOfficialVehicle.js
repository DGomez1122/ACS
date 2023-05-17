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
} from "@mui/material";
// import { Box } from "@mui/system";
import React, { useState } from "react";
import { DashboardPage } from "../components/DashboardPage";
import { OfficialVehicleCard } from "../components/OfficialVehicleCard";

export const BookingOfficialVehicle = () => {
  const [officialVehicles, setOfficialVehicles] = useState([
    {
      plate: "352030",
      model: "BMW A7",
      color: "Gris",
      driverName: "Johan Calvo",
      driverId: "123456789",
      _id: "5e9f8f8f8f8f8f8f8f8f8f8f",
    },
    {
      plate: "ASD123",
      model: "Toyota Corolla",
      color: "Rojo",
      driverName: "Juan Pérez",
      driverId: "120987601",
      _id: "5562Q-SD5252_SA",
    },
  ]);

  const [selectedVehicle, setSelectedVehicle] = useState({
    plate: "352030",
  });
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = (_id) => {
    setSelectedVehicle(officialVehicles.find((vehicle) => vehicle._id === _id));
    setOpen(true);
    setOfficialVehicles((prevState) => {
      return prevState.filter((vehicle) => vehicle._id !== _id);
    });
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
          //   width: "90%",
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
            <Typography color="textPrimary" variant="h2">
              Reservar espacio para vehículo oficial
            </Typography>
          </Box>
          <Grid
            container
            direction={"column"}
            justifyContent="center"
            spacing={2}
          >
            {officialVehicles.map((officialVehicle) => (
              <Grid item key={officialVehicle._id}>
                <OfficialVehicleCard
                  _id={officialVehicle._id}
                  plate={officialVehicle.plate}
                  model={officialVehicle.model}
                  color={officialVehicle.color}
                  driverName={officialVehicle.driverName}
                  driverId={officialVehicle.driverId}
                  options={[
                    {
                      name: "Seleccionar",
                      onClick: handleClickOpen,
                      path:
                        "/adminMenu/EditOfficialVehicle/" + officialVehicle._id,
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
              <DialogTitle id="responsive-dialog-title">
                Espacio reservado exitosamente
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  El espacio para el vehículo oficial con placa{" "}
                  {selectedVehicle.plate} ha sido reservado exitosamente. Cuando
                  el vehículo oficial abondene el parqueo, asegurese de que el
                  espacio sea liberado mediante la opción "Liberar espacio".
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button autoFocus onClick={handleClose} sx={{ color: "white" }}>
                  OK
                </Button>
              </DialogActions>
            </Dialog>

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
