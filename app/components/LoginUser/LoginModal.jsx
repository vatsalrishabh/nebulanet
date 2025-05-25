import React from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Image from "next/image";

const theme = createTheme({
  palette: {
    primary: {
      main: "#e91e63", // Pink color
    },
    secondary: {
      main: "#f48fb1", // Light pink
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
});

const LoginModal = (props) => {
  return (
    <ThemeProvider theme={theme}>
      <Dialog open={props.isOpen} onClose={props.onClose} fullWidth maxWidth="xs">
        <DialogTitle>
          <Typography variant="h6" align="center" color="primary">
            Welcome to StyleDivaa
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap={2}
          >
            <Typography variant="body1" align="center" color="textSecondary">
              Sign in to continue
            </Typography>
            <Button
              variant="outlined"
              color="secondary"
              startIcon={
                <IconButton>
                  <Image
                  width={200}
                  height={200}
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/640px-Google_%22G%22_logo.svg.png"
                    alt="Google Logo"
                    style={{ width: "20px", height: "20px" }}
                  />
                </IconButton>
              }
              onClick={props.onGoogleSignIn}
              style={{
                textTransform: "none",
                padding: "10px 20px",
                borderRadius: "30px",
              }}
            >
              Sign in through Google
            </Button>
            <Button
              variant="text"
              color="primary"
              onClick={props.onClose}
              style={{ marginTop: "10px" }}
            >
              Cancel
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
};

export default LoginModal;
