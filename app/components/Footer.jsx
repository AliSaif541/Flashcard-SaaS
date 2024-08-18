import { Box, Typography } from "@mui/material";

export default function Footer() {
    return (
        <Box sx={{mt: 6, height: '75px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white'}}>
            <Typography variant='body1'>© 2024 Flashcards AI. All rights reserved.</Typography>
        </Box>
    )
}