import React from "react";
import {
  Card,
  Grid,
  CardContent,
  Typography,
  Avatar,
  Box,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";

export const OVBookingCard = ({
  _id,
  plate,
  model,
  color,
  driverName,
  driverId,
  parkingLot,

  options,
}) => {
  options = options || [{ name: "Editar", path: "/person/1" }];
  return (
    <>
      <Grid
        sx={{
          width: "60%",
          height: "14vh",
          backgroundColor: "#2C2C2C",
          boxShadow: "0",
          border: "2px solid #A394FF",
          borderRadius: "10px",
          overflow: "hidden",
          margin: "0 auto",
        }}
      >
        <Grid
          container
          alignItems="center"
          className="damaged-grid"
          sx={{ height: "100%" }}
        >
          <Grid
            item
            xs={9}
            container
            alignItems="center"
            sx={{ height: "100%" }}
            pt={2}
            pb={2}
            pl={3}
          >
            <Box>
              <Typography sx={{ color: "white" }} variant={"body2"}>
                <span style={{ fontWeight: 700 }}>Nombre del chofer: </span>
                {driverName}
              </Typography>
              <Typography sx={{ color: "white" }} variant={"body2"}>
                <span style={{ fontWeight: 700 }}>ID del chofer: </span>
                {driverId}
              </Typography>
              <Typography sx={{ color: "white" }} variant={"body2"}>
                <span style={{ fontWeight: 700 }}>Placa: </span>
                {plate}
              </Typography>
              <Typography sx={{ color: "white" }} variant={"body2"}>
                <span style={{ fontWeight: 700 }}>Modelo: </span>
                {model}
              </Typography>
              <Typography sx={{ color: "white" }} variant={"body2"}>
                <span style={{ fontWeight: 700 }}>Color del vehículo: </span>
                {color}
              </Typography>

              {/* <Typography sx={{ color: "white" }} variant={"body2"}>
                <span style={{ fontWeight: 700 }}>Motivo de la visita de vehículo:</span>
                {userName}
              </Typography> */}
            </Box>
          </Grid>
          <Grid
            item
            xs={3}
            container
            justifyContent={"flex-end"}
            className="ESTAROTISIMO"
            sx={{ height: "100%" }}
          >
            {options.map((option) => {
              return option.onClick ? (
                <>
                  <Button
                    onClick={() => option.onClick(_id)}
                    style={{
                      height: "100%",
                      textDecoration: "none",
                      padding: 0,
                      margin: 0,
                    }}
                  >
                    <Box
                      sx={{
                        "&": {
                          transition: "0.2s",
                        },
                        backgroundColor: "#f0f0f0",
                        ":hover": {
                          backgroundColor: "#6750A4",
                          color: "white",
                          "& *": { color: "white" },
                        },
                        height: "100%",
                        margin: "0 auto",
                        display: "flex",
                        alignItems: "center",
                        paddingLeft: 2,
                        paddingRight: 2,
                      }}
                    >
                      <Typography
                        ml={1}
                        mr={1}
                        sx={{
                          textDecoration: "none",
                          color: "#59389d",
                          fontWeight: "600",
                          textTransform: "initial",
                        }}
                      >
                        {option.name}
                      </Typography>
                    </Box>
                  </Button>
                </>
              ) : (
                <>
                  <Link
                    to={option.path}
                    style={{ height: "100%", textDecoration: "none" }}
                  >
                    <Box
                      sx={{
                        "&": {
                          transition: "0.2s",
                        },
                        backgroundColor: "#f0f0f0",
                        ":hover": {
                          backgroundColor: "#6750A4",
                          color: "white",
                          "& *": { color: "white" },
                        },
                        height: "100%",
                        margin: "0 auto",
                        display: "flex",
                        alignItems: "center",
                        paddingLeft: 2,
                        paddingRight: 2,
                      }}
                    >
                      <Typography
                        ml={1}
                        mr={1}
                        sx={{
                          textDecoration: "none",
                          color: "#59389d",
                          fontWeight: "600",
                        }}
                      >
                        {option.name}
                      </Typography>
                    </Box>
                  </Link>
                </>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
