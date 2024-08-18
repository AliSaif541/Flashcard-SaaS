'use client'

import { db } from "@/firebase";
import { useUser } from "@clerk/nextjs"
import { Grid, Box, Button, Card, CardActionArea, CardContent, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, TextField, Typography } from "@mui/material";
import { collection, doc, getDoc, writeBatch } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useState } from "react"
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Generate() {
    const {isLoaded, isSignedIn, user} = useUser();
    const [flashcards, setFlashcards] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const [text, setText] = useState('');
    const [name, setName] = useState('');
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const handleSubmit = async () => {
        if (!text.trim()) {
          alert('Please enter some text to generate flashcards.')
          return
        }
      
        try {
          const response = await fetch('/api/generate', {
            method: 'POST',
            body: text,
          })
      
          if (!response.ok) {
            throw new Error('Failed to generate flashcards')
          }

          
          const data = await response.json()
          console.log("Flashcards: ", data);
          setFlashcards(data)
        } catch (error) {
          console.log('\n\n\nError generating flashcards:', error)
          alert('An error occurred while generating flashcards. Please try again.')
        }
      }

    const handleCardClick = (id) => {
        setFlipped((prev) => ({
            ...prev,
            [id]: !prev[id],
        }))
    }

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const saveFlashcards = async () => {
        try {
          const batch = writeBatch(db)
          const docRef = doc(collection(db, 'users'), user.id)
          const docSnap = await getDoc(docRef)
      
      
          if (docSnap.exists()) {
            const collections = docSnap.data().flashcards || []
            if (collections.find((f) => f.name === name)) {
                alert('Flashcard collection with the same name already exists.')
                return
            } else {
                collections.push({name});
                batch.set(docRef, {flashcards: collections}, {merge: true})
            }
          } else {
            batch.set(docRef, { flashcards: [{ name }] })
          }
      
          const colRef = collection(docRef, name)
          flashcards.forEach((flashcard) => {
            const cardDocRef = doc(colRef)
            batch.set(cardDocRef, flashcard)
          })

          await batch.commit()
          handleClose()
          router.push('/flashcards')
        } catch (error) {
          console.error('Error saving flashcards:', error)
          alert('An error occurred while saving flashcards. Please try again.')
        }
    }

    return (
        <Box>
            <Header />
            <Box
            sx={{
                p: 0,
                m: 0,
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            >
                <Box
                    sx={{
                    mt: 4,
                    mb: 6,
                    width: '80%',
                    maxWidth: '800px',
                    }}
                >
                    <h1 className="text-4xl font-extrabold sm:text-center sm:text-6xl">
                        Generate Flashcards
                    </h1>
                    <Paper sx={{ p: 4, mt: 2, backgroundColor: 'black', justifyContent: 'center', display: 'flex', flexDirection: 'column' }}>
                    <TextField
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        label="Enter Text"
                        fullWidth
                        multiline
                        rows={4}
                        variant="outlined"
                        sx={{
                            mb: 2,
                            backgroundColor: '#18181B',
                            borderRadius: '10px',
                            '& .MuiInputBase-input': {
                            color: 'white', 
                            },
                            '& .MuiInputLabel-root': {
                            color: 'white', 
                            },
                            '& .MuiOutlinedInput-root': {
                            '&:hover fieldset': {
                                borderColor: 'white',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'white', 
                            },
                            },
                        }}
                    />
                    <Button variant="contained" color="primary" onClick={handleSubmit} sx={{backgroundColor: 'white', color: 'black', borderRadius: '10px', '&:hover': {bgcolor: '#fff'}}}>
                        SUBMIT
                    </Button>
                    </Paper>
                </Box>
            
                {flashcards.length > 0 && (
                    <Box sx={{ width: '80%', mt: 4 }}>
                    <Typography variant="h5" sx={{ color: 'white', mb: 2 }}>
                        Flashcards Preview
                    </Typography>
                    <Grid container spacing={3}>
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
                    <Box sx={{mt: 4, mb: 4, display: 'flex', justifyContent: 'center'}}>
                        <Button variant="contained" sx={{color: 'black', backgroundColor: 'white', '&:hover': {bgcolor: '#fff'}}} onClick={handleOpen}>
                        Save
                        </Button>
                    </Box>
                    </Box>
                )}

                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Save Flashcards</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please enter a name for your flashcards collection
                        </DialogContentText>
                        <TextField autoFocus margin="dense" label="Collection Name" type= "text" fullWidth value={name} onChange={(e) => setName(e.target.value)} variant="outlined" />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} sx={{color: 'black', '&:hover': {bgcolor: '#fff'}}}>
                            Cancel
                        </Button>
                        <Button onClick={saveFlashcards} sx={{color: 'black', '&:hover': {bgcolor: '#fff'}}}>
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
            <Footer />
        </Box>
      );
}