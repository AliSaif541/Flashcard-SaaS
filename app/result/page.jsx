'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import getStripe from "@/utils/get-stripe";
import { useSearchParams } from "next/navigation";
import { Box, Button, CircularProgress, Container, Typography } from "@mui/material";
import Link from "next/link";

const ResultPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const session_id = searchParams.get('session_id');

    const [loading, setLoading] = useState(true);
    const [session, setSession] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCheckoutSession = async () => {
          if (!session_id) return
          try {
            const res = await fetch(`/api/checkout_session?session_id=${session_id}`)
            const sessionData = await res.json()
            if (res.ok) {
              setSession(sessionData)
            } else {
              setError(sessionData.error)
            }
          } catch (err) {
            setError('An error occurred while retrieving the session.')
          } finally {
            setLoading(false)
          }
        }
        fetchCheckoutSession()
    }, [session_id])

    if (loading) {
        return (
            <Container sx={{textAlign: 'center', mt: 4}}>
                <CircularProgress />
                <Typography variant="h6">Loading...</Typography>
            </Container>
        )
    }

    if (error) {
        return (
            <Container sx={{textAlign: 'center', mt: 4}}>
                <Typography variant="h6">{error}</Typography>
            </Container>
        )
    }

    return (
        <Container maxWidth="sm" sx={{textAlign: 'center', mt: 4}}>
            {session.payment_status === 'paid' ? (
            <>
                <Typography variant="h4">Thank you for your purchase!</Typography>
                <Box sx={{mt: 2}}>
                <Typography variant="body1">Session ID: {session_id}</Typography>
                <Typography variant="h6" mt={4}>
                    We have received your payment. You will receive an email with the
                    order details shortly.
                </Typography>
                <Button variant="contained" color="primary" sx={{mt: 2, p: '10px', backgroundColor: 'white', color: 'black', borderRadius: '10px', '&:hover': {bgcolor: '#fff'}}}>
                    <Link href="/">Go Back</Link>
                </Button>
                </Box>
            </>
            ) : (
            <>
                <Typography variant="h4">Payment failed</Typography>
                <Box sx={{mt: 2}}>
                <Typography variant="body1">
                    Your payment was not successful. Please try again.
                </Typography>
                <Button variant="contained" color="primary" sx={{mt: 2, p: '10px', backgroundColor: 'white', color: 'black', borderRadius: '10px', '&:hover': {bgcolor: '#fff'}}}>
                    <Link href="/">Go Back</Link>
                </Button>
                </Box>
            </>
            )}
        </Container>
    )
}

export default ResultPage