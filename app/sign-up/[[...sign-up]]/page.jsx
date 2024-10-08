import { SignUp } from "@clerk/nextjs";
import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material";
import Link from "next/link";

export default function Page() {
  return (
    <Container>
      <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      mt={4}
      mb={4}
      >
        <SignUp />
      </Box>
    </Container>
  );
}