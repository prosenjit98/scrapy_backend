import React from 'react'
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Container,
  Paper,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
} from '@mui/material'
import { useForm } from '@inertiajs/react'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'

interface Flash {
  success?: string
  errors?: {
    email?: string
  }
}

const SignUp = ({ flash }: { flash: Flash }) => {
  const { data: form, setData, post, processing } = useForm({
    full_name: '',
    email: '',
    phone_code: '+91',
    phone_number: '',
    pin_code: '',
    password: '',
    sign_up_as_seller: false
  })

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target
    setData({ ...form, [name]: type === 'checkbox' ? checked : value })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    post('/sign-up')
  }

  return (
    <Container maxWidth={false} sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ overflow: 'hidden', borderRadius: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, backgroundColor: 'secondary.main' }}>
          {/* Left Section */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              p: { xs: 4, md: 6 },
              flex: { xs: 'none', md: '1' },
              minHeight: { xs: 'auto', md: '100vh' }
            }}
          >
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 3, color: 'primary.main' }}>
              Sign Up to Get The Best Deals, Exclusive Offers with <span style={{ color: '#2c0775' }}>ScrapBro</span>
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <img
                src="/images/signup-illustration.png"
                alt="Sign up illustration"
                style={{ maxWidth: '80%', height: 'auto' }}
              />
            </Box>
          </Box>

          {/* Right Section */}
          <Box sx={{ p: { xs: 4, md: 6 }, flex: { xs: 'none', md: '1' }, backgroundColor: 'white'  }}>
            <Typography variant="h4" fontWeight={600} gutterBottom color="primary.main">
              Sign Up
            </Typography>
            <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary' }}>
              Create your account for free & join millions of businesses engaged in bulk buying and selling on ScrapBro's marketplace.
            </Typography>

            {flash?.success && <Alert severity="success" sx={{ mb: 2 }}>{flash.success}</Alert>}
            {flash?.errors?.email && <Alert severity="error" sx={{ mb: 2 }}>{flash.errors.email}</Alert>}

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                margin="normal"
                label="Full Name"
                name="full_name"
                value={form.full_name}
                onChange={handleChange}
                required
              />
              <TextField
                fullWidth
                margin="normal"
                label="Email Address"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
              />

              <Box sx={{ display: 'flex', gap: 1 }}>
                <Select
                  value={form.phone_code}
                  onChange={(e) => setData({ ...form, phone_code: e.target.value })}
                  sx={{ minWidth: 90, mt: 2 }}
                >
                  <MenuItem value="+91">🇮🇳 +91</MenuItem>
                  <MenuItem value="+1">🇺🇸 +1</MenuItem>
                  <MenuItem value="+44">🇬🇧 +44</MenuItem>
                </Select>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Mobile Number"
                  name="phone_number"
                  value={form.phone_number}
                  onChange={handleChange}
                  required
                />
              </Box>
              <TextField
                fullWidth
                margin="normal"
                label="Pin Code"
                name="pin_code"
                value={form.pin_code}
                onChange={handleChange}
              />

              <FormControlLabel
                control={
                  <Checkbox
                    name="sign_up_as_seller"
                    checked={form.sign_up_as_seller}
                    onChange={handleChange}
                    color="primary"
                  />
                }
                label="Sign Up as Seller"
              />

              <TextField
                fullWidth
                margin="normal"
                label="Password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                required
              />

              <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
                By signing up, I agree to{' '}
                <span style={{ color: '#420aa8', cursor: 'pointer' }}>Terms and Conditions</span>.
              </Typography>

              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={processing}
                sx={{ mt: 3 }}
              >
                Continue to Sign Up →
              </Button>
            </form>
          </Box>
        </Box>
      </Paper>
    </Container>
  )
}

export default SignUp