// app/components/SimpleTopBar.tsx

"use client"; // Mark this file as a Client Component

import { Box, Container, Typography, IconButton } from "@mui/material";
import { PhoneOutlined, EmailOutlined } from "@mui/icons-material";
import Link from 'next/link';

export default function SimpleTopBar() {
  return (
    <Box sx={{ width: "100%", backgroundColor: "#333", color: "#fff", padding: "10px 0" }}>
      <Container maxWidth="lg">
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h6" component="div">
            My Top Bar
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton color="inherit">
              <PhoneOutlined />
            </IconButton>
            <Link href="tel:+1234567890" style={{ color: "#fff", textDecoration: "none" }}>
              +1 (234) 567-890
            </Link>
            <IconButton color="inherit">
              <EmailOutlined />
            </IconButton>
            <Link href="mailto:info@example.com" style={{ color: "#fff", textDecoration: "none" }}>
              info@example.com
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
