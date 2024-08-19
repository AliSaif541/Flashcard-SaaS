'use client'

import { Box, Button, Grid, Card, CardContent, Typography } from "@mui/material";
import PricingPlans from "./components/Pricing";
import Link from "next/link";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <Box width="100%" sx={{backgroundColor: 'black'}} >
      <Header />

      <Box 
      sx={{
        textAlign: 'center',
        my: 4,
        height: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
      }}>
        <Typography variant="h2" fontWeight='bold' gutterBottom>Welcome to Flashcard Saas</Typography>
        <Typography variant="h5" fontWeight='400' gutterBottom>
          {' '}
          The easiest way to make flashcards from your text
        </Typography>
        <Button variant="contained" color="primary" sx={{mt: 2, p: '10px', backgroundColor: 'white', color: 'black', borderRadius: '15px', '&:hover': {bgcolor: '#fff'}}}>
          <Link href="/generate">Get Started</Link>
        </Button>
      </Box>

      <Box sx={{my: 6, textAlign: 'center', color: 'white'}}>
        <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
          Features
        </h1>
        <Grid container justifyContent="center" spacing={4} p={4} sx={{ mt: 4 }}>
          <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ backgroundColor: '#18181B', color: '#fff', p: 2, borderRadius: '10px' }}>
                  <CardContent>
                  <h2 className="text-2xl font-semibold leading-6 text-white mb-4">
                    Easy Text Input
                  </h2>
                  <p className="mt-4 text-zinc-300">Simply input your text and let our software do the rest. Creating Flashcards has never been easier</p>
                  </CardContent>
              </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ backgroundColor: '#18181B', color: '#fff', p: 2, borderRadius: '10px' }}>
                  <CardContent>
                  <h2 className="text-2xl font-semibold leading-6 text-white mb-4">
                    Smart Flashcards
                  </h2>
                  <p className="mt-4 text-zinc-300">Our AI intelligently breaks down your text into concise flashcards, perfect for studying.</p>
                  </CardContent>
              </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ backgroundColor: '#18181B', color: '#fff', p: 2, borderRadius: '10px' }}>
                  <CardContent>
                  <h2 className="text-2xl font-semibold leading-6 text-white mb-4">
                    Accessible Anywhere
                  </h2>
                  <p className="mt-4 text-zinc-300">Access your flashcards from any device, at any time. Study on the go with ease.</p>
                  </CardContent>
              </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ backgroundColor: '#18181B', color: '#fff', p: 2, borderRadius: '10px' }}>
                  <CardContent>
                  <h2 className="text-2xl font-semibold leading-6 text-white mb-4">
                   Study Together
                  </h2>
                  <p className="mt-4 text-zinc-300">Share your flashcards with friends or classmates. Collaborate on creating study sets and compete in fun quizzes.</p>
                  </CardContent>
              </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ backgroundColor: '#18181B', color: '#fff', p: 2, borderRadius: '10px' }}>
                  <CardContent>
                  <h2 className="text-2xl font-semibold leading-6 text-white mb-4">
                    Organized Flashcard Library
                  </h2>
                  <p className="mt-4 text-zinc-300">Never lose track of your hard work. Our app lets you save, organize, and revisit past flashcards. </p>
                  </CardContent>
              </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ backgroundColor: '#18181B', color: '#fff', p: 2, borderRadius: '10px' }}>
                  <CardContent>
                  <h2 className="text-2xl font-semibold leading-6 text-white mb-4">
                    Multi-format Flashcard Creation
                  </h2>
                  <p className="mt-4 text-zinc-300">Convert PDFs and images into flashcards alongside your text content. (Available in the Future!)</p>
                  </CardContent>
              </Card>
          </Grid>
        </Grid>
      </Box>

      <PricingPlans />
      <Footer />
    </Box>
  );
}
