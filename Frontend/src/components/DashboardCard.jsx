import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { CardActionArea } from "@mui/material";

export default function DashboardCard({ image, title, route }) {
  return (
    <Card sx={{ maxWidth: 345, backgroundColor: "grey.800" }}>
      <CardActionArea>
        <Link
          action="replace"
          // style={{  }}
          component={Link}
          to={route}
          variant="h5"
          underline="hover"
          color="#FFF"
          style={{ textDecoration: "none" /*color: "#FFF"*/ }}
        >
          <CardMedia component="img" height="180" image={image} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" color="#FFFF">
              {title}
            </Typography>
          </CardContent>
        </Link>
      </CardActionArea>
    </Card>
  );
}
