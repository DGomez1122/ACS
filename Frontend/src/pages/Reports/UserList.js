import { Box } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import axios from "axios";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { DashboardPage } from "../../components/DashboardPage";
import UserList from "../../components/UserList";
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

export default function AdminMenu() {
  document.title = "Usuarios";
  const theme = useTheme();
  const user = JSON.parse(localStorage.getItem("user"));
  const [open, setOpen] = React.useState(false);
  const [rows, setRows] = React.useState([]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();

  React.useEffect(() => {
    if (user.empType === "Jefatura") {
      axios
        .get(
          "http://localhost:9000/api/employee/getDepartment/" + user.department
        )
        .then((res) => {
          let result = [];
          for (let i = 0; i < res.data.length; i++) {
            let newUser = {
              id: i,
              identification: res.data[i]._id,
              fullName: res.data[i].fullName,
              institutionalMail: res.data[i].institutionalMail,
              phoneNumber: res.data[i].phoneNumber,
              department: res.data[i].department,
            };
            result.push(newUser);
          }
          setRows(result);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .get(`http://localhost:9000/api/employee/getAll`)
        .then((res) => {
          let result = [];
          for (let i = 0; i < res.data.length; i++) {
            let newUser = {
              id: i,
              identification: res.data[i]._id,
              fullName: res.data[i].fullName,
              institutionalMail: res.data[i].institutionalMail,
              phoneNumber: res.data[i].phoneNumber,
              department: res.data[i].department,
            };
            result.push(newUser);
          }
          setRows(result);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  // const rows = [
  //   {
  //     id: 208350858,
  //     name: "Roy Vinicio Garcia Alvarado",
  //     email: "rvga1311@estudiantec.cr",
  //     isLeadership: true,
  //     department: "Estudiante Compu",
  //   },
  //   {
  //     id: 208350851,
  //     name: "Roy Vinicio Garcia Alvarado",
  //     email: "rvga1311@estudiantec.cr",
  //     isLeadership: false,
  //     department: "Estudiante Compu",
  //   },
  // ];

  return (
    <DashboardPage title="Lista de Usuarios">
      <Box
        className="login-container"
        sx={{
          backgroundColor: "background.default",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "90%",
          maxWidth: "90%",
          margin: "0 auto",
          // py: 20
        }}
      >
        <UserList rows={rows} />
      </Box>
    </DashboardPage>
  );
}
