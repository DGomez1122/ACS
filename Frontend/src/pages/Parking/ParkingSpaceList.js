import { Box, Grid, Slide } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import axios from "axios";
import dayjs from "dayjs";
import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DashboardPage } from "../../components/DashboardPage";
import { SpacePicker } from "../../components/SpacePicker";
const drawerWidth = 240;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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

export default function ParkingList() {
  let { id } = useParams();
  document.title = "Parqueos";
  const theme = useTheme();
  const user = JSON.parse(localStorage.getItem("user"));
  const [parkingSpaceLink, setParkingSpaceLink] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(`http://localhost:9000/api/parkingSpace/${id}`)
      .then((res) => {
        setParkingSpaceLink(res.data);
        console.log("res.data", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const navigate = useNavigate();

  const [openDialog, setOpenDialog] = React.useState(false);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

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
        <Grid
          container
          // columnSpacing={{ xs: 1, sm: 1, md: 1 }}
          // spacing={{ xs: 2, md: 2 }}
          // columns={{ xs: 4, sm: 8, md: 12 }}
          justifyContent={"center"}
          wid
        >
          {parkingSpaceLink.map((space) => (
            <Grid item>
              {(space.type === "general" && user.empType === "Funcionario") ||
              (space.type === "special" && user.isHandicapped) ? (
                <SpacePicker space={space} />
              ) : (space.type === "leadership" &&
                  user.empType === "Jefatura") ||
                (space.type === "special" && user.isHandicapped) ||
                (space.type === "visitor" && user.empType === "Jefatura") ? (
                <SpacePicker space={space} />
              ) : space.type === "official" && user.empType === "Operador" ? (
                <SpacePicker space={space} />
              ) : space.type === "visitor" && user.empType === "Admin" ? (
                <SpacePicker space={space} />
              ) : (
                <></>
              )}
            </Grid>
          ))}
        </Grid>
      </Box>
    </DashboardPage>
  );
}
