import { Box, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import getStripe from "@/utils/get-stripe";

const PricingPlans = () => {
  const handleSubmit = async (plan) => {
    const planAmount = plan === 'Pro' ? 10 : 5;
    const checkoutSession = await fetch('/api/checkout_session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        origin: process.env.NEXT_PUBLIC_ORIGIN_URL
      },
      body: JSON.stringify({ plan, amount: planAmount }),
    });

    const checkoutSessionJson = await checkoutSession.json();
    if (checkoutSessionJson.statusCode === 500) {
      console.error(checkoutSessionJson.message);
      return;
    }

    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    });

    if (error) {
      console.warn(error.message);
    }
  }

  return (
    <Box id="pricing" sx={{ color: '#fff', py: 6, p: 2 }}>
      <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
        Pricing Plans
      </h1>
      <Typography variant="h6" sx={{ mt: 2 }} fontWeight='300' align="center" gutterBottom>
        Start building for free, then add a site plan to go live. Account plans unlock additional features.
      </Typography>

      <Grid container justifyContent="center" spacing={4} sx={{ mt: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ backgroundColor: '#18181B', color: '#fff', p: 2, borderRadius: '10px' }}>
            <CardContent>
              <h2 className="text-2xl font-semibold leading-6 text-white mb-4">
                  Free
              </h2>
              <p className="mt-4 text-zinc-300">Generate upto 5 flashcards with no save option</p>
              <p className="mt-8">
                  <span className="text-5xl font-extrabold white">
                  $0
                  </span>
                  <span className="text-base font-medium text-zinc-100">
                  /month
                  </span>
              </p>
              <Button variant="contained" sx={{ backgroundColor: '#fff', color: '#000', mt: 4, borderRadius: 0, width: '100%', '&:hover': { bgcolor: '#fff' } }}>
                Subscribe
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ backgroundColor: '#18181B', color: '#fff', p: 2, borderRadius: '10px' }}>
            <CardContent>
              <h2 className="text-2xl font-semibold leading-6 text-white mb-4">
                Basic
              </h2>
              <p className="mt-4 text-zinc-300">Generate unlimited flashcards while saving a maximum of 10</p>
              <p className="mt-8">
                <span className="text-5xl font-extrabold white">
                  $5
                </span>
                <span className="text-base font-medium text-zinc-100">
                  /month
                </span>
              </p>
              <Button variant="contained" onClick={() => handleSubmit('Basic')} sx={{ backgroundColor: '#fff', color: '#000', mt: 4, borderRadius: 0, width: '100%', '&:hover': { bgcolor: '#fff' } }}>
                Subscribe
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ backgroundColor: '#18181B', color: '#fff', p: 2, borderRadius: '10px' }}>
            <CardContent>
              <h2 className="text-2xl font-semibold leading-6 text-white mb-4">
                Pro
              </h2>
              <p className="mt-4 text-zinc-300">Generate unlimited flashcards and save as many as you like!</p>
              <p className="mt-8">
                <span className="text-5xl font-extrabold white">
                  $10
                </span>
                <span className="text-base font-medium text-zinc-100">
                    /month
                </span>
              </p>
              <Button variant="contained" onClick={() => handleSubmit('Pro')} sx={{ backgroundColor: '#fff', color: '#000', mt: 4, borderRadius: 0, width: '100%', '&:hover': { bgcolor: '#fff' } }}>
                Subscribe
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PricingPlans;
