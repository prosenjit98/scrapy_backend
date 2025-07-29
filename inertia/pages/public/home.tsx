// import { styled } from '@mui/system'
import { Button, Container, Typography, Box, Grid } from '@mui/material'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'
import HandymanIcon from '@mui/icons-material/Handyman'
import BuildIcon from '@mui/icons-material/Build'
import { motion } from 'framer-motion'
import UserRoot from '~/shared/user_root'
import { useTheme, useMediaQuery } from '@mui/material'
import InquiryFormModal  from '~/pages/Inquiries/new'
import { useState } from 'react'




// const PurpleButton = styled(Button)({
//   backgroundColor: '#6a1b9a',
//   color: '#fff',
//   '&:hover': {
//     backgroundColor: '#4a148c'
//   }
// })

const Home = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  return (
    <Box>
      {/* Hero Section */}
      <Box sx={{ bgcolor: '#f5f6fa', py: isMobile ? 6 : 12 }}>
        <Container maxWidth="lg">
          <Grid container spacing={isMobile ? 2 : 4} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <motion.div
                initial={{ x: isMobile ? 0 : -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <Typography variant={isMobile ? 'h4' : 'h2'} fontWeight="bold" gutterBottom color="primary">
                  Scrap Smart. Buy Smarter.
                </Typography>
                <Typography variant="h6" color="text.secondary" paragraph>
                  Welcome to <strong>ScrapBro</strong>, your trusted platform to discover genuine, affordable vehicle parts directly from scrappers. Enjoy verified listings, real-time updates, and transparent deals.
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  🚗 Whether you're repairing, restoring, or reselling — find the right part at the right price.
                </Typography>
                <Button variant="contained" color="primary" size="large" sx={{ mr: 2 }}>
                  Explore Marketplace
                </Button>
                <Button variant="outlined" color="primary" size="large" onClick={() => setModalOpen(true)}>
                  Become a Seller
                </Button>
              </motion.div>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.2 }}
              >
                <motion.img
                  src="https://cdn-icons-png.flaticon.com/512/1995/1995539.png"
                  alt="scrap parts"
                  width="100%"
                  whileHover={{ scale: 1.05 }}
                />
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* How It Works */}
      <Box sx={{ py: 10 }}>
        <Container>
          <Typography variant="h4" align="center" fontWeight="bold" gutterBottom color="primary">
            How ScrapBro Works
          </Typography>
          <Grid container spacing={4} justifyContent="center" sx={{ mt: 4 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <DirectionsCarIcon color="primary" sx={{ fontSize: 50 }} />
              <Typography variant="h6" fontWeight="bold">Browse Spare Parts</Typography>
              <Typography color="text.secondary">Use smart filters and location-based search to find the right part quickly.</Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <HandymanIcon color="primary" sx={{ fontSize: 50 }} />
              <Typography variant="h6" fontWeight="bold">Connect with Scrappers</Typography>
              <Typography color="text.secondary">Message or call verified scrappers directly. No middlemen, no extra charges.</Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <BuildIcon color="primary" sx={{ fontSize: 50 }} />
              <Typography variant="h6" fontWeight="bold">Order & Save</Typography>
              <Typography color="text.secondary">Negotiate, purchase, and track your orders. Save up to 70% vs showroom prices.</Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Why ScrapBro */}
      <Box sx={{ bgcolor: '#f5f6fa', py: 10 }}>
        <Container>
          <Typography variant="h4" align="center" fontWeight="bold" gutterBottom color="primary">
            Why Choose ScrapBro?
          </Typography>
          <Grid container spacing={4} sx={{ mt: 4 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h6" fontWeight="bold">✅ Verified Sellers</Typography>
              <Typography color="text.secondary">We vet each scrapper to ensure quality and trustworthiness.</Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h6" fontWeight="bold">💰 Huge Savings</Typography>
              <Typography color="text.secondary">Used parts at up to 70% less than OEM replacements.</Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h6" fontWeight="bold">📦 Updated Stock</Typography>
              <Typography color="text.secondary">Real-time or periodic inventory so you always know what's available.</Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h6" fontWeight="bold">📞 Direct Contact</Typography>
              <Typography color="text.secondary">Reach out instantly via phone or WhatsApp.</Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Box component="footer" sx={{ bgcolor: '#420aa8', color: '#fff', py: 4 }}>
        <Container>
          <Typography variant="h6" align="center" gutterBottom>
            ScrapBro
          </Typography>
          <Typography variant="body2" align="center">
            Affordable, reliable, and accessible spare parts.
          </Typography>
          <Typography variant="body2" align="center" sx={{ mt: 1 }}>
            © {new Date().getFullYear()} ScrapBro. All rights reserved.
          </Typography>
        </Container>
      </Box>
      <InquiryFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        initialData={undefined} // Pass initial data if needed
      />
    </Box>

  )
}

interface User {
  name: string;
  email: string;
  [key: string]: any; // Extendable for additional user properties
}

interface HomePageProps {
  user: User;
}

const HomePage = ({ user }: HomePageProps) => {
  return (
    <>
      <UserRoot user={user} />
      <Home />
    </>
  )
}

export default HomePage





