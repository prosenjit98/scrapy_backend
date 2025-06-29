import { useForm } from '@inertiajs/react'
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Alert,
  Paper,
} from '@mui/material'

export default function UserLogin() {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
    password: '',
  })

  const handleSubmit = (e: any) => {
    e.preventDefault()
    post('/login')
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Admin Login
        </Typography>

        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" gap={2}>
            {errors.email && (
              <Alert severity="error">{errors.email}</Alert>
            )}
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              value={data.email}
              onChange={(e) => setData('email', e.target.value)}
              error={!!errors.email}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              value={data.password}
              onChange={(e) => setData('password', e.target.value)}
              error={!!errors.password}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={processing}
            >
              Sign In
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  )
}
