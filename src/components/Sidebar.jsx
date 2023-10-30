import React from 'react';
import {
    Box,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    useTheme,
  } from "@mui/material";
  import {
    SettingsOutlined,
    ChevronLeft,
    ChevronRightOutlined,
    HomeOutlined,
    DepartureBoardOutlined,
    Groups2Outlined,
    EmojiTransportationOutlined,
    AirportShuttleOutlined,
    PointOfSaleOutlined,
    TodayOutlined,
    CalendarMonthOutlined,
    AdminPanelSettingsOutlined,
    TrendingUpOutlined,
    PieChartOutlined,
  } from "@mui/icons-material";
  import { useEffect, useState } from "react";
  import { useLocation, useNavigate } from "react-router-dom";
  import FlexBetween from "./FlexBetween";
  import profileImage from "assets/pro_pic.webp";
  import logoimg from "assets/logo_blue.png"
  import { useSelector } from 'react-redux';

  const navItems = [
    {
      text: "Dashboard",
      icon: <HomeOutlined />,
    },
    {
      text: "Trains",
      icon: null,
    },
    {
      text: "TrainSchedule",
      icon: <DepartureBoardOutlined  />,
    },
    {
      text: "TrainStops",
      icon: <Groups2Outlined />,
    },
    {
      text: "Stations",
      icon: <EmojiTransportationOutlined />,
    },
    {
      text: "Wagons",
      icon: <AirportShuttleOutlined />,
    },
    {
      text: "Bookings",
      icon: null,
    },
    {
      text: "Overview",
      icon: <PointOfSaleOutlined />,
    },
    {
      text: "Daily",
      icon: <TodayOutlined />,
    },
    {
      text: "Monthly",
      icon: <CalendarMonthOutlined />,
    },
    {
      text: "Breakdown",
      icon: <PieChartOutlined />,
    },
    {
      text: "Prices",
      icon: null,
    },
    {
      text: "BookingPrices",
      icon: <AdminPanelSettingsOutlined />,
    },
    
  ];


const Sidebar = ({
    user,
    drawerWidth,
    isSidebarOpen,
    setIsSidebarOpen,
    isNonMobile,
  }) => {
    const { pathname } = useLocation();
    const [active, setActive] = useState("");
    const navigate = useNavigate();
    const theme = useTheme();

    const { userInfo } = useSelector((state) => state.auth);
    var isLoggedIn = false;
  
    useEffect(() => {
      setActive(pathname.substring(1));
      if (userInfo) {
        isLoggedIn = true;
      }
    }, [pathname]);

    return (
        <Box component="nav" >
          {isSidebarOpen && (
            <Drawer
              open={isSidebarOpen}
              onClose={() => setIsSidebarOpen(false)}
              variant="persistent"
              anchor="left"
              sx={{
                width: drawerWidth,
                "& .MuiDrawer-paper": {
                  color: theme.palette.secondary[200],
                  backgroundColor: theme.palette.background.alt,
                  boxSizing: "border-box",
                  borderWidth: isNonMobile ? 0 : "2px",
                  width: drawerWidth,
                },
              }}
            >
                 <Box width="100%">
            <Box m="1.5rem 2rem 1rem 2rem">
              <FlexBetween color={theme.palette.secondary.main}>
              <Box
                component="img"
                alt="profile"
                src={logoimg}
                height="60px"
              />
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Typography variant="h5" fontWeight="bold" color={theme.palette.secondary[500]}>
                    TravelGo
                  </Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>

            <List>
              {navItems.map(({ text, icon }) => {
                if (!icon) {
                  return (
                    <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                      {text}
                    </Typography>
                  );
                }
                const lcText = text.toLowerCase();

                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${lcText}`);
                        setActive(lcText);
                      }}
                      sx={{
                        backgroundColor:
                          active === lcText
                            ? theme.palette.secondary[400]
                            : "transparent",
                        color:
                          active === lcText
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[100],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color:
                            active === lcText
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === lcText && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>

            
          </Box>

          {/* <Box position='fixed' bottom="1rem">
            <Divider />
            <FlexBetween textTransform="none" gap="1rem" m="1.5rem 2rem 0 3rem">
              <Box
                component="img"
                alt="profile"
                src={profileImage}
                height="40px"
                width="40px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.9rem"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {userInfo.firstname}
                </Typography>
                <Typography
                  fontSize="0.8rem"
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  
                </Typography>
              </Box>
              <SettingsOutlined
                sx={{
                  color: theme.palette.secondary[300],
                  fontSize: "25px ",
                }}
              />
            </FlexBetween>
            </Box> */}
                </Drawer>
  )}
  </Box>
  )
}

export default Sidebar