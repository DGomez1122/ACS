import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Popover,
  Slide,
  Typography,
} from "@mui/material";

import AdapterDayjs from "@mui/lab/AdapterDayjs";
import Select from "@mui/material/Select";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import axios from "axios";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { StyledTextField } from "../theme/theme";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function getDayName(dateStr, locale) {
  var date = new Date(dateStr);
  return date.toLocaleDateString(locale, { weekday: "long" });
}

function getDate(date, isJefatura) {
  let simulationDate = localStorage.getItem("simulationDate");
  let dd = String(date.getDate()).padStart(2, "0");
  let mm = String(date.getMonth() + 1).padStart(2, "0");
  let yyyy = date.getFullYear();
  let hh = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  let min = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  if (isJefatura) {
    if (simulationDate === "undefined") {
      return yyyy + "-" + mm + "-" + dd + "T" + "23" + ":" + "59" + ":59";
    } else {
      return simulationDate.split("T")[0] + "T" + "23" + ":" + "59" + ":59";
    }
  } else {
    if (simulationDate === "undefined") {
      return yyyy + "-" + mm + "-" + dd + "T" + hh + ":" + min + ":00";
    } else {
      return simulationDate.split("T")[0] + "T" + hh + ":" + min + ":00";
    }
  }
}

export const SpacePicker = ({ space }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const [open2, setOpen] = React.useState(false);

  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [licenseplate, setLicenseplate] = React.useState(user.licensePlates[0]);

  const [date1, setDate1] = React.useState(new Date());
  const [date2, setDate2] = React.useState(new Date());
  let simulationDate = localStorage.getItem("simulationDate");

  const handleConfirm = async () => {
    let isJefatura = user.empType === "Jefatura";
    var contenido = {
      userId: user._id,
      parkingLotId: space.idParkingLot,
      parkingSpaceId: space._id,
      vehiclePlate: licenseplate,
      isJefatura: isJefatura,
      startDate: getDate(date1, false),
      endDate: getDate(date2, isJefatura),
      currentDate:
        simulationDate === "undefined"
          ? getDate(new Date(), false)
          : simulationDate,
    };

    console.log("contenido", contenido);

    try {
      const response = await axios.get(
        "http://localhost:9000/api/reservation/getAllPerUser/" + user._id
      );
      let lastReservationTime =
        response.data.length > 0
          ? response.data[response.data.length - 1].date
          : "1990-01-01T00:00:00";
      // console.log("response.data", lastReservationTime);
      // console.log("contenido.currentDate", contenido.currentDate);

      if (lastReservationTime > contenido.currentDate) {
        alert(
          "ERROR: Su reserva no es permitida, ya tiene una activa.\nDebe esperar hasta las " +
            lastReservationTime.split("T")[1] +
            " para realizar una nueva reserva"
        );
      } else {
        try {
          const resp = await axios.post(
            "http://localhost:9000/api/reservation",
            contenido
          );
          console.log(resp.data);
          alert("Reserva realizada con éxito");
        } catch (err) {
          alert("ERROR: Su reserva no ha podio ser realizada");
          // Handle Error Here
          console.error(err);
        }
      }
    } catch (error) {
      console.log(error);
    }

    setOpen(false);
    navigate("/GeneralMenu", { replace: true });
  };

  const options = [];
  user.licensePlates.forEach((licensePlate) => {
    options.push({ value: licensePlate, label: licensePlate });
  });

  const open = Boolean(anchorEl);
  const isSpecial =
    space.type === "special"
      ? { color: "#0055ff", message: "Espacio para discapacitado disponible" }
      : space.type === "leadership"
      ? { color: "#23de16", message: "Espacio para jefatura disponible" }
      : space.type === "official"
      ? { color: "#23de16", message: "Espacio para oficial disponible" }
      : { color: "#23de16", message: "Espacio para funcionario disponible" };
  return (
    <>
      {space.taken ? (
        <>
          <IconButton
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
            aria-label="Example"
          >
            <DirectionsCarIcon sx={{ fontSize: 50, color: "#c21515" }} />
          </IconButton>
          <Popover
            id="mouse-over-popover"
            sx={{
              pointerEvents: "none",
            }}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            onClose={handlePopoverClose}
            disableRestoreFocus
          >
            <Typography sx={{ p: 1 }}>Espacio ocupado</Typography>
          </Popover>
        </>
      ) : space.type === "visitor" ? (
        <>
          <IconButton
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
            onClick={() =>
              navigate("/adminMenu/BookingVisitant", { replace: true })
            }
            aria-label="Example"
          >
            <DirectionsCarIcon sx={{ fontSize: 50, color: "#fca103" }} />
          </IconButton>
          <Popover
            id="mouse-over-popover"
            sx={{
              pointerEvents: "none",
            }}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            onClose={handlePopoverClose}
            disableRestoreFocus
          >
            <Typography sx={{ p: 1 }}>
              Espacio para visitante disponible
            </Typography>
          </Popover>
        </>
      ) : (
        <>
          <IconButton
            onClick={handleClickOpen}
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
            aria-label="Example"
          >
            <DirectionsCarIcon sx={{ fontSize: 50, color: isSpecial.color }} />
          </IconButton>
          <Popover
            id="mouse-over-popover"
            sx={{
              pointerEvents: "none",
            }}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            onClose={handlePopoverClose}
            disableRestoreFocus
          >
            <Typography sx={{ p: 1 }}>{isSpecial.message}</Typography>
          </Popover>
          <Dialog
            open={open2}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>{"¿Desea reservar?"}</DialogTitle>
            <DialogContent>
              {" "}
              <Box sx={{ minWidth: 120 }} mt={3}>
                <Typography color="textPrimary" variant="h6"></Typography>
              </Box>
              <Box sx={{ minWidth: 120 }} mt={3}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Placa de vehículo
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="licenseplate"
                    value={licenseplate}
                    input={<OutlinedInput label="Departamento" />}
                    label="licenseplate"
                    defaultValue={"Docente"}
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
                      setLicenseplate(e.target.value);
                    }}
                  >
                    {options.map((option) => (
                      <MenuItem value={option.value}>{option.label}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ minWidth: 120 }} mt={3}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    label="Hora de entrada"
                    value={date1}
                    onChange={(newValue) => {
                      setDate1(new Date(newValue.$d));
                    }}
                    renderInput={(params) => <StyledTextField {...params} />}
                  />
                </LocalizationProvider>
              </Box>
              {user.empType === "Jefatura" ? (
                <>
                  <Box sx={{ minWidth: 120 }} mt={3}>
                    {" "}
                    Su hora de salida será al finalizar el día{" "}
                  </Box>
                </>
              ) : (
                <>
                  <Box sx={{ minWidth: 120 }} mt={3}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        label="Hora de Salida"
                        value={date2}
                        onChange={(newValue) => {
                          setDate2(new Date(newValue.$d));
                        }}
                        renderInput={(params) => (
                          <StyledTextField {...params} />
                        )}
                      />
                    </LocalizationProvider>
                  </Box>
                </>
              )}
            </DialogContent>
            <DialogActions>
              <Button
                color="primary"
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                onClick={handleClose}
              >
                Cancelar
              </Button>
              <Button
                color="primary"
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                onClick={handleConfirm}
              >
                Confirmar
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </>
  );
};
