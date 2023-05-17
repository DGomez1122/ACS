import SearchIcon from "@mui/icons-material/Search";
import { Box, Button, InputAdornment, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { styled, useTheme } from "@mui/material/styles";
import { Formik } from "formik";
import * as React from "react";
import { useNavigate } from "react-router-dom";
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

export default function FindUser() {
  document.title = "Buscar Usuario";
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
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
          height: "120%",
          // py: 20
        }}
      >
        <Box maxWidth="sm">
          <Formik
            initialValues={{
              idUser: "",
            }}
            validationSchema={Yup.object().shape({
              idUser: Yup.number()
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
            })}
            onSubmit={async (data, actions) => {
              navigate("/adminMenu/userProfile/" + data.idUser, {
                replace: true,
              });
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
                    Buscar Usuario
                  </Typography>
                </Box>
                <StyledTextField
                  error={Boolean(touched.idUser && errors.idUser)}
                  fullWidth
                  helperText={touched.idUser && errors.idUser}
                  label="Número de Identificación"
                  margin="normal"
                  name="idUser"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.idUser}
                  variant="outlined"
                  color=""
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ color: grey[50] }} />
                      </InputAdornment>
                    ),
                  }}
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
                    Buscar usuario
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      </Box>
    </DashboardPage>
  );
}
