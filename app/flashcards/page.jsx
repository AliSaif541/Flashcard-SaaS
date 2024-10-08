'use client'

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { redirect, useRouter } from "next/navigation";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { Grid, Card, CardActionArea, CardContent, Container, Typography, Box } from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Flashcards() {
    const {isLoaded, isSignedIn, user} = useUser();
    const [flashcards, setFlashcards] = useState([]);
    const router = useRouter();

    if (!user) {
        redirect("/sign-in")
    }

    useEffect(() => {
        async function getFlashcards() {
          if (!user) return
          const docRef = doc(collection(db, 'users'), user.id)
          const docSnap = await getDoc(docRef)
          if (docSnap.exists()) {
            const collections = docSnap.data().flashcards || []
            setFlashcards(collections)
          } else {
            await setDoc(docRef, { flashcards: [] })
          }
        }
        getFlashcards()
    }, [user])

    if (!isLoaded || !isSignedIn) {
        return <></>
    }

    const handleCardClick = (id) => {
        router.push(`/flashcard?id=${id}`)
    }

    return (
        <Box>
            <Header />
            <h1 style={{marginTop: '25px', textAlign: 'center'}} className="text-4xl font-extrabold sm:text-center sm:text-6xl">
                Saved Flashcards
            </h1>
            <Box sx={{p: 4, minHeight: '60vh'}}>
                <Grid container spacing={3} sx={{mt: 4}}>
                    {flashcards.map((flashcard, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card>
                                <CardActionArea onClick={(index) => {handleCardClick(flashcard.name)}}>
                                    <CardContent>
                                        <Typography variant="h6">{flashcard.name}</Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
            <Footer />
        </Box>
    )

}