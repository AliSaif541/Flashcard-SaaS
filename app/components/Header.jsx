import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import Link from "next/link";

export default function Header() {
    return (
        <AppBar position="static" sx={{ backgroundColor: 'black' }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Flashcards AI
                </Typography>

                <Box sx={{ display: 'flex', gap: 4 }}>
                    <Link href="/"><Typography variant="h7">Home</Typography></Link>
                    <Link href="/generate"><Typography variant="h7">Generate</Typography></Link>
                    <Link href="/flashcards"><Typography variant="h7">Collection</Typography></Link>
                    <Link href="/#pricing"><Typography variant="h7">Pricing</Typography></Link>
                </Box>

                <SignedOut>
                    <Link href="/sign-in"><Button color="inherit">Login</Button></Link>
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </Toolbar>
      </AppBar>
    )
}