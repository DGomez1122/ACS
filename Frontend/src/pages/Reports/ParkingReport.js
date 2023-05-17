import { Box, Typography } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import { styled, useTheme } from "@mui/material/styles";
import { Formik } from "formik";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { StyledTextField } from "../../theme/theme";
import { DashboardPage } from "../../components/DashboardPage";
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

export default function ParkingAdminMenu() {
  document.title = "Reporte de Parqueo";
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
  };

  const navigate = useNavigate();

  return (
    <DashboardPage>
      <Box
        className="login-container"
        sx={{
          backgroundColor: "background.default",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          width: "70%",
          maxWidth: "70%",
          margin: "0 auto",
          // py: 20
        }}
      >
        <Box maxWidth="sm">
          <Formik
            initialValues={{
              name: "",
              address: "",
              accessInfo: "",
              totalSpace: "",
              oficialSpace: "",
              leadershipSpace: "",
              usersSpace: "",
              visitorSpace: "",
              disabilitySpace: "",
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
                    Reporte de Parqueo
                  </Typography>
                </Box>
                <StyledTextField
                  fullWidth
                  label="Nombre de Parqueo"
                  margin="normal"
                  name="name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  variant="outlined"
                  color=""
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <StyledTextField
                  fullWidth
                  label="Dirección"
                  margin="normal"
                  name="address"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.address}
                  variant="outlined"
                  color=""
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <StyledTextField
                  fullWidth
                  label="Información de Acceso"
                  margin="normal"
                  name="accessInfo"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.accessInfo}
                  variant="outlined"
                  color=""
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <StyledTextField
                  fullWidth
                  type="number"
                  label="Total de espacios"
                  margin="normal"
                  name="totalSpace"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.totalSpace}
                  variant="outlined"
                  color=""
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <StyledTextField
                  fullWidth
                  type="number"
                  label="Total de espacios de oficiales"
                  margin="normal"
                  name="oficialSpace"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.oficialSpace}
                  variant="outlined"
                  color=""
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <StyledTextField
                  fullWidth
                  type="number"
                  label="Total de espacios de jefatura"
                  margin="normal"
                  name="leadershipSpace"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.leadershipSpace}
                  variant="outlined"
                  color=""
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <StyledTextField
                  fullWidth
                  type="number"
                  label="Total de espacios de usuarios generales"
                  margin="normal"
                  name="usersSpace"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.usersSpace}
                  variant="outlined"
                  color=""
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <StyledTextField
                  fullWidth
                  type="number"
                  label="Total de espacios de visitantes"
                  margin="normal"
                  name="visitorSpace"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.visitorSpace}
                  variant="outlined"
                  color=""
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <StyledTextField
                  fullWidth
                  type="number"
                  label="Total de espacios de discapacitados"
                  margin="normal"
                  name="disabilitySpace"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.disabilitySpace}
                  variant="outlined"
                  color=""
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </form>
            )}
          </Formik>
        </Box>
      </Box>
    </DashboardPage>
  );
}
