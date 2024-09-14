'use client';

import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery, Toolbar, Container, Grid, Box, List, ListItemButton, IconButton, Drawer, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  // Toggle the drawer for small screens
  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  // Scroll smoothly to the appointment form
  const handleScrollToAppointmentForm = () => {
    const formElement = document.getElementById('appointment-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Scroll smoothly to the service list
  const handleScrollToServices = () => {
    const serviceListElement = document.getElementById('service-list');
    if (serviceListElement) {
      serviceListElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Drawer content for small screens
  const drawerContent = (
    <Box sx={{ width: 250 }}>
      <List>
        <ListItemButton component={Link} href="/">
          Home
        </ListItemButton>
        <ListItemButton component={Link} href="/about">
          About Us
        </ListItemButton>
        <ListItemButton component={Link} href="/barbers">
          Barbers
        </ListItemButton>
        <ListItemButton onClick={handleScrollToServices}>
          Services
        </ListItemButton>
        <ListItemButton component={Link} href="/contact">
          Contact Us
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <Box component="nav">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              {!isSmallScreen ? (
                <>
                  <Button component={Link} href="/" color="inherit">
                    Home
                  </Button>
                  <Button component={Link} href="/about" color="inherit">
                    About Us
                  </Button>
                  <Button component={Link} href="/barbers" color="inherit">
                    Barbers
                  </Button>
                  <Button onClick={handleScrollToServices} color="inherit">
                    Services
                  </Button>
                  <Button component={Link} href="/contact" color="inherit">
                    Contact Us
                  </Button>
                </>
              ) : (
                <>
                  <IconButton edge="start" color="inherit" onClick={handleDrawerToggle}>
                    <MenuIcon />
                  </IconButton>
                  <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
                    {drawerContent}
                  </Drawer>
                </>
              )}
            </Grid>
            <Grid item>
              <Button variant="outlined" onClick={handleScrollToAppointmentForm}>
                Book Now
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </Container>
    </Box>
  );
}
