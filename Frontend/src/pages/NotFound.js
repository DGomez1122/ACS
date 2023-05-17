import { Box, Typography } from "@mui/material";

document.title = "Error 404";

const NotFound = () => (
  <>
    <Box
      sx={{
        backgroundColor: "background.default",
        display: "flex",
        height: "100%",
        justifyContent: "center",
      }}
    >
      <Box maxWidth="md">
        <Typography align="center" color="textPrimary" variant="h1">
          404: La página que estas buscando no existe
        </Typography>
        <Box sx={{ textAlign: "center" }}>
          <img
            alt="Under development"
            src="https://stories.freepiklabs.com/storage/26838/oops-404-error-with-a-broken-robot-pana-2854.png"
            style={{
              marginTop: 50,
              display: "inline-block",
              maxWidth: "80%",
              width: 360,
            }}
          />
        </Box>
      </Box>
    </Box>
  </>
);

export default NotFound;
