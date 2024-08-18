import { SignUp } from "@clerk/nextjs";
import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material";
import Link from "next/link";

export default function Page() {
  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{flexGrow: 1}}>Flashcard SaaS</Typography>
            <Button color="inherit">
                <Link href="/login">Login</Link>
            </Button>
            <Button color="inherit">
                <Link href="/signup">Signup</Link>
            </Button>
        </Toolbar>
      </AppBar>

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