import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { CardActionArea } from "@mui/material";

export default function DashboardCard({
  title,
  spaces,
  description,
  schedule,
  id,
  empType,
  onClick,
}) {
  return (
    <Card
      sx={{ maxWidth: 345, backgroundColor: "grey.800", borderRadius: "15px" }}
      {...(onClick && { onClick: () => onClick(id) })}
    >
      <CardActionArea>
        <Link
          action="replace"
          // style={{ color: "#FFF" }}
          component={Link}
          to={
            onClick
              ? "#"
              : empType == "Admin"
              ? "/adminMenu/ParkingMenu/EditParking/" + id
              : "/ParkingList/ParkingSpaceList/" + id
          }
          variant="h5"
          underline="hover"
          color="#FFFF"
          style={{ textDecoration: "none" }}
        >
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" color="#FFFF">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {spaces}
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            height="180"
            image={
              "http://www.comedytrafficschool.com/wp-content/uploads/2015/02/Screen-Shot-2015-02-26-at-2.41.04-PM.png"
            }
          />
          <CardContent>
            <Typography variant="body2" color="#FFFF">
              {description}
            </Typography>
            <Typography
              variant="body2"
              color="#FFFF"
              style={{ whiteSpace: "pre-line" }}
            >
              {schedule}
            </Typography>
          </CardContent>
        </Link>
      </CardActionArea>
    </Card>
  );
}
