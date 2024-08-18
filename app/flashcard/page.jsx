'use client'

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { useRouter } from "next/navigation";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { Grid, Box, Button, Card, CardActionArea, CardContent, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, TextField, Typography } from "@mui/material";
import { useSearchParams } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Flashcard() {
    const {isLoaded, isSignedIn, user} = useUser();
    const [flashcards, setFlashcards] = useState([]);
    const [flipped, setFlipped] = useState([]);

    const searchParams = useSearchParams();
    const search = searchParams.get('id');

    useEffect(() => {
        async function getFlashcard() {
          if (!search || !user) return
      
          const colRef = collection(doc(collection(db, 'users'), user.id), search)
          const docs = await getDocs(colRef)
          const flashcards = []
          docs.forEach((doc) => {
            flashcards.push({ id: doc.id, ...doc.data() })
          })
          setFlashcards(flashcards)
        }
        getFlashcard()
    }, [search, user])

    const handleCardClick = (id) => {
        setFlipped((prev) => ({
            ...prev,
            [id]: !prev[id],
        }))
    }

    if (!isLoaded || !isSignedIn) {
        return <></>
    }

    return (
        <Container width='100%'>
            <Header />
            <h1 style={{marginTop: '25px'}} className="text-4xl font-extrabold sm:text-center sm:text-6xl">
                Flashcards: {search}
            </h1>
            <Grid container spacing={3} mt={4}>
                {flashcards.map((flashcard, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card onClick={() => handleCardClick(index)} sx={{cursor: 'pointer', backgroundColor: 'black'}}>
                        <CardContent>
                            <Box
                            sx={{
                                perspective: '1000px',
                                backgroundColor: '#18181B',
                                color: 'white',
                                textAlign: 'center',
                                borderRadius: '5px',
                                '& > div': {
                                transition: 'transform 0.6s',
                                transformStyle: 'preserve-3d',
                                position: 'relative',
                                width: '100%',
                                height: '200px',
                                boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                                transform: flipped[index]
                                    ? 'rotateY(180deg)'
                                    : 'rotateY(0deg)',
                                },
                                '& > div > div': {
                                position: 'absolute',
                                width: '100%',
                                height: '200px',
                                backfaceVisibility: 'hidden',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: 2,
                                boxSizing: 'border-box',
                                },
                                '& > div > div:nth-of-type(2)': {
                                transform: 'rotateY(180deg)',
                                },
                            }}
                            >
                            <div>
                                <div>
                                <Typography variant="h6" component="div">
                                    {flashcard.front}
                                </Typography>
                                </div>
                                <div>
                                <Typography variant="h6" component="div">
                                    {flashcard.back}
                                </Typography>
                                </div>
                            </div>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                ))}
            </Grid>
            <Footer />
        </Container>
    )
}
