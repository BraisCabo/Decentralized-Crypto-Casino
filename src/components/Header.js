import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  Link,
  MenuItem,
  Grid,
  Avatar,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { makeStyles } from "tss-react/mui";
import { Box } from "@mui/system";
import CustomButton from "./CustomButton";
import casinoToken from "../images/Casino.png";
import WalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { useNavigate } from "react-router";

const headersData = [
  {
    label: "Games",
    href: "/games",
  }
];

const useStyles = makeStyles()(() => ({
  header: {
    paddingRight: "79px",
    paddingLeft: "118px",
    "@media (max-width: 900px)": {
      paddingLeft: 0,
    },
  },
  logo: {
    fontFamily: "Work Sans, sans-serif",
    fontWeight: 600,
    color: "#FFFEFE",
    textAlign: "left",
  },
  menuButton: {
    fontFamily: "Open Sans, sans-serif",
    fontWeight: 700,
    size: "18px",
    marginLeft: "38px",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "#222c31",
  },
  drawerContainer: {
    padding: "20px 30px",
  },
}));

export default function Header({ login, account, balance }) {
  const { header, menuButton, toolbar, drawerContainer } = useStyles();

  const navigate = useNavigate();
  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
  });

  const { mobileView, drawerOpen } = state;

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };

    setResponsiveness();

    window.addEventListener("resize", () => setResponsiveness());

    return () => {
      window.removeEventListener("resize", () => setResponsiveness());
    };
  }, []);

  const LoginButton = () => {
    if (account === "") {
      return (
        <Button variant="contained" color="error" onClick={login}>
          Conect
        </Button>
      );
    } else {
      return (
        <CustomButton
          backGround={"#222c31"}
          text={"#fff"}
          display={`${account.slice(0, 5)}...`}
        />
      );
    }
  };

  const displayDesktop = () => {
    const handleDrawerOpen = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: true }));
    const handleDrawerClose = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: false }));
    return (
<Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container columns={6}>
            <Grid item xs={1}>
              <IconButton
                {...{
                  edge: "start",
                  color: "inherit",
                  "aria-label": "menu",
                  "aria-haspopup": "true",
                  onClick: handleDrawerOpen,
                }}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                {...{
                  anchor: "left",
                  open: drawerOpen,
                  onClose: handleDrawerClose,
                }}
                PaperProps={{
                  sx: {
                    backgroundColor: "#2f3d45",
                    color: "white",
                  },
                }}
              >
                <IconButton
                  {...{
                    edge: "start",
                    color: "inherit",
                    "aria-label": "menu",
                    "aria-haspopup": "true",
                    onClick: handleDrawerClose,
                  }}
                >
                  <CloseIcon />
                </IconButton>
                <div className={drawerContainer}>{getDrawerChoices()}</div>
              </Drawer>
            </Grid>
            <Grid item xs={4}>
              <Grid container alignItems="center" justifyContent="center">
                {femmecubatorLogo('30%')}
              </Grid>
            </Grid>
            <Grid item xs={1}>
              <Grid container alignItems="flex-end" justifyContent="right">
                <LoginButton />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Toolbar>
    );
  };

  const displayMobile = () => {
    const handleDrawerOpen = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: true }));
    const handleDrawerClose = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: false }));
    return (
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container columns={6}>
            <Grid item xs={1}>
              <IconButton
                {...{
                  edge: "start",
                  color: "inherit",
                  "aria-label": "menu",
                  "aria-haspopup": "true",
                  onClick: handleDrawerOpen,
                }}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                {...{
                  anchor: "left",
                  open: drawerOpen,
                  onClose: handleDrawerClose,
                }}
                PaperProps={{
                  sx: {
                    backgroundColor: "#2f3d45",
                    color: "white",
                  },
                }}
              >
                <IconButton
                  {...{
                    edge: "start",
                    color: "inherit",
                    "aria-label": "menu",
                    "aria-haspopup": "true",
                    onClick: handleDrawerClose,
                  }}
                >
                  <CloseIcon />
                </IconButton>
                <div className={drawerContainer}>{getDrawerChoices()}</div>
              </Drawer>
            </Grid>
            <Grid item xs={4}>
              <Grid container alignItems="center" justifyContent="center">
                {femmecubatorLogo('70%')}
              </Grid>
            </Grid>
            <Grid item xs={1}>
              <Grid container alignItems="flex-end" justifyContent="right">
                <LoginButton />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Toolbar>
    );
  };

  const getDrawerChoices = () => {
    return headersData.map(({ label, href }) => {
      return (
        <Link
          {...{
            component: RouterLink,
            to: href,
            color: "inherit",
            style: { textDecoration: "none" },
            key: label,
          }}
        >
          <MenuItem>{label}</MenuItem>
        </Link>
      );
    });
  };

  const femmecubatorLogo = (width) => (
    <Box
      sx={{
        backgroundColor: "#222c31",
        border: 5,
        borderColor: "#222c31",
        borderRadius: "10px",
        width:{width},
      }}
      component="div"
    >
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        columnSpacing={1}
      >
        <Grid item xs={6}>
          <Box alignItems="start" justifyContent="left">
            <Grid container columnSpacing={{ xs: 0.5, md: 1 }}>
              <Grid item>
                <Grid item xs={10} sm={6}>
                  <Grid container>{balance}</Grid>
                </Grid>
              </Grid>
              <Grid item xs={2} sm={6}>
                <Grid container alignItems="end" justifyContent="left">
                  <Avatar
                    alt=""
                    src={casinoToken}
                    sx={{ width: 24, height: 24 }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Grid>

        <Grid item xs={6}>
          <Grid
            container
            columnSpacing={2}
            alignItems="end"
            justifyContent="right"
          >
            <Button
              variant="contained"
              color="success"
              startIcon={<WalletIcon sx={{ color: "#1f1f1f" }} />}
              onClick={() => navigate("/Wallet/buyTokens")}
            >
              <Typography display={{ xs: "none", md: "contents" }}>
                Wallet
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );

  const getMenuButtons = () => {
    return headersData.map(({ label, href }) => {
      return (
        <Button
          {...{
            key: label,
            color: "inherit",
            to: href,
            component: RouterLink,
            className: menuButton,
          }}
        >
          {label}
        </Button>
      );
    });
  };

  return (
    <header>
      <AppBar sx={{ bgcolor: "#2f3d45" }} className={header}>
        {mobileView ? displayMobile() : displayDesktop()}
      </AppBar>
    </header>
  );
}
