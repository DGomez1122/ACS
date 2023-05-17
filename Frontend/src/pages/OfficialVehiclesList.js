import { Typography, Box, Grid } from "@mui/material";
// import { Box } from "@mui/system";
import React, { useState } from "react";
import { DashboardPage } from "../components/DashboardPage";
import { OfficialVehicleCard } from "../components/OfficialVehicleCard";
import axios from "axios";

export const OfficialVehiclesList = () => {
  const [officialVehicles, setOfficialVehicles] = useState([]);




  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    axios
      .get(`http://localhost:9000/api/oficialVehicleParkingSpace/${user.parkingLotId}`)
      .then((res) => {
        const data = res.data;
        console.log(data);
        setOfficialVehicles(data);
      })
      .catch((err) => {
        console.log(err);
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
              Vehiculos oficiales registrados
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
                  plate={officialVehicle.plate}
                  model={officialVehicle.model}
                  color={officialVehicle.color}
                  driverName={officialVehicle.driverName}
                  driverId={officialVehicle.driverId}
                  options={[
                    {
                      name: "Editar",
                      path:
                        "/adminMenu/EditOfficialVehicle/" + officialVehicle._id,
                    },
                  ]}
                />
              </Grid>
            ))}

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
